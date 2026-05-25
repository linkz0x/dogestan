import type { CSSProperties } from "react";
import { useMarketCap, type MarketCapStatus } from "../hooks/useMarketCap";
import { TARGETS, type GdpTarget } from "../data/targets";

function formatUSD(n: number): string {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function formatPct(value: number, target: number): string {
  const pct = (value / target) * 100;
  if (pct < 0.01) return "< 0.01%";
  if (pct < 1) return `${pct.toFixed(2)}%`;
  if (pct < 100) return `${pct.toFixed(1)}%`;
  return "100%";
}

function pipLabel(status: MarketCapStatus): { text: string; cls: string } {
  switch (status) {
    case "live":
      return { text: "Live · Dexscreener", cls: "" };
    case "estimate":
      return { text: "Estimate · Sample", cls: "estimate" };
    case "error":
      return { text: "Stale · Reconnecting", cls: "error" };
    case "loading":
      return { text: "Polling…", cls: "" };
  }
}

function buildHeadline(marketCap: number, targets: GdpTarget[]) {
  const sorted = [...targets].sort((a, b) => a.gdp - b.gdp);
  const flipped = sorted.filter((t) => marketCap >= t.gdp);

  if (flipped.length > 0) {
    const latest = flipped[flipped.length - 1];
    return {
      pre: "Today's headline",
      body: (
        <>
          We are now richer than &nbsp;<em>{latest.name}.</em>
        </>
      ),
    };
  }

  const next = sorted[0];
  const pct = ((marketCap / next.gdp) * 100).toFixed(1);
  return {
    pre: "Closing in",
    body: (
      <>
        Approaching &nbsp;<em>{next.name}</em>&nbsp; — {pct}% of the way.
      </>
    ),
  };
}

export function GDPFlipTracker() {
  const { marketCap, status } = useMarketCap();
  const pip = pipLabel(status);
  const headline = buildHeadline(marketCap, TARGETS);

  return (
    <section
      className="section"
      id="bulletin"
      data-screen-label="GDP Flip Tracker"
    >
      <p className="eyebrow center">
        Office of National Statistics · Bulletin No. 0017
      </p>
      <h2 className="section-title">The GDP Flip Tracker</h2>
      <p className="section-lede">
        A continuously-updated ledger of the foreign economies our Republic has
        surpassed, is about to surpass, and shall, in the fullness of time,
        surpass.
      </p>

      <div className="bulletin-frame">
        <div className="bulletin-head">
          <div className="left">
            <div className="issuer">
              Office of the Ministry of the Treasury
            </div>
            <h3>Official Economic Bulletin</h3>
          </div>
          <div className="right">
            <span className="lineitem">
              <b>Published</b> &nbsp; 11:42 UTC, this morning
            </span>
            <span className="lineitem">
              <b>Reporting period</b> &nbsp; Block 18,234,567 → 18,235,001
            </span>
            <span className="lineitem">
              <b>Methodology</b> &nbsp; Spot market capitalisation
            </span>
          </div>
        </div>

        <div className="bulletin-current">
          <div>
            <div className="label">National GDP — Current</div>
            <div className="big-num">
              {formatUSD(marketCap)}
              <span className={`live-pip ${pip.cls}`}>
                <span className="dot" />
                {pip.text}
              </span>
            </div>
            <div className="sub">
              <span className="delta-up">▲ +18.4%</span> &nbsp; vs. previous
              bulletin
            </div>
          </div>
          <div>
            <div className="label">Treasury Reserves</div>
            <div className="small-val">$184,920</div>
            <div className="sub">Held in liquidity, ETH-denominated.</div>
          </div>
          <div>
            <div className="label">Citizens Enrolled</div>
            <div className="small-val">24,118</div>
            <div className="sub">+412 in the last 24 hours.</div>
          </div>
        </div>

        <div className="headline-banner">
          <span className="pre">{headline.pre}</span>
          {headline.body}
        </div>

        <div className="ladder">
          {TARGETS.map((target) => (
            <LadderRow
              key={target.rank}
              target={target}
              marketCap={marketCap}
            />
          ))}
        </div>

        <div className="bulletin-foot">
          <div>
            Bulletins are issued every block. &nbsp; All figures &mdash; ours
            and theirs &mdash; are public.
          </div>
          <div className="sig">— J. Wagmi, Chief Statistician</div>
        </div>
      </div>
    </section>
  );
}

function LadderRow({
  target,
  marketCap,
}: {
  target: GdpTarget;
  marketCap: number;
}) {
  const flipped = marketCap >= target.gdp;
  const pctNum = Math.min(100, (marketCap / target.gdp) * 100);
  const pctLabel = flipped ? "100%" : formatPct(marketCap, target.gdp);

  const rowStyle = { "--pct": `${pctNum}%` } as CSSProperties;

  return (
    <div className={`ladder-row${flipped ? " flipped" : ""}`} style={rowStyle}>
      <div className="rank">{target.rank}</div>
      <div className="name">
        <span
          className="flag-dot"
          style={{ background: target.flagGradient }}
        />
        <b>{target.name}</b>
        <span className="sub">{target.sub}</span>
      </div>
      <div className="gdp-val">
        <b>{formatUSD(target.gdp)}</b>
        <br />
        est. GDP
      </div>
      {flipped ? (
        <div>
          <span className="stamp">
            Flipped
            <small>BL. 18,201,440</small>
          </span>
        </div>
      ) : (
        <div className="pct">{pctLabel}</div>
      )}
      <div className="bar-cell">
        <div className="bar">
          <div className={`fill${flipped ? " flipped" : ""}`} />
          {!flipped && <div className="marker" />}
        </div>
      </div>
    </div>
  );
}
