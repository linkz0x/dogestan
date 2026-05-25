import { useEffect, useState } from "react";
import {
  CONTRACT_ADDRESS,
  DEXSCREENER_TOKEN_ENDPOINT,
  MOCK_MARKET_CAP,
  POLL_INTERVAL_MS,
} from "../config";

export type MarketCapStatus = "live" | "estimate" | "error" | "loading";

export interface MarketCapState {
  /** Market cap in USD. Falls back to MOCK_MARKET_CAP when unavailable. */
  marketCap: number;
  /** Where the value came from. */
  status: MarketCapStatus;
  /** ISO timestamp of the last successful fetch (live only). */
  lastUpdated: string | null;
}

interface DexscreenerPair {
  marketCap?: number;
  fdv?: number;
  liquidity?: { usd?: number };
  baseToken?: { symbol?: string };
}

interface DexscreenerResponse {
  pairs?: DexscreenerPair[] | null;
}

/**
 * Picks the most reliable market cap figure across all returned pairs.
 * Preference order: pair with highest USD liquidity → marketCap → fdv.
 */
function extractMarketCap(pairs: DexscreenerPair[]): number | null {
  if (!pairs.length) return null;

  const ranked = [...pairs].sort(
    (a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0)
  );

  for (const pair of ranked) {
    const value = pair.marketCap ?? pair.fdv;
    if (typeof value === "number" && value > 0) return value;
  }
  return null;
}

const PLACEHOLDER = "PASTE_CONTRACT_ADDRESS_HERE";

export function useMarketCap(): MarketCapState {
  const hasRealContract =
    CONTRACT_ADDRESS && CONTRACT_ADDRESS !== PLACEHOLDER;

  const [state, setState] = useState<MarketCapState>({
    marketCap: MOCK_MARKET_CAP,
    status: hasRealContract ? "loading" : "estimate",
    lastUpdated: null,
  });

  useEffect(() => {
    if (!hasRealContract) return;

    const controller = new AbortController();
    let cancelled = false;

    const fetchOnce = async () => {
      try {
        const res = await fetch(
          `${DEXSCREENER_TOKEN_ENDPOINT}/${CONTRACT_ADDRESS}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: DexscreenerResponse = await res.json();
        const cap = extractMarketCap(data.pairs ?? []);

        if (cancelled) return;

        if (cap == null) {
          setState((prev) => ({
            marketCap: prev.marketCap,
            status: "error",
            lastUpdated: prev.lastUpdated,
          }));
          return;
        }

        setState({
          marketCap: cap,
          status: "live",
          lastUpdated: new Date().toISOString(),
        });
      } catch (err) {
        if (cancelled || (err as Error).name === "AbortError") return;
        setState((prev) => ({
          marketCap: prev.marketCap,
          status: "error",
          lastUpdated: prev.lastUpdated,
        }));
      }
    };

    fetchOnce();
    const id = window.setInterval(fetchOnce, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(id);
    };
  }, [hasRealContract]);

  return state;
}
