// Dogestan token contract. Replace with the live deployment address
// when the token is deployed; until then we fall back to mock data
// so the GDP Flip Tracker still tells the story.
export const CONTRACT_ADDRESS = "PASTE_CONTRACT_ADDRESS_HERE";

// Dexscreener supports any chain it indexes — the /tokens/{address}
// endpoint searches across all of them and returns matching pairs.
// If you know the chain in advance you can also use
// /latest/dex/pairs/{chainId}/{pairAddress} for a single pair.
export const DEXSCREENER_TOKEN_ENDPOINT =
  "https://api.dexscreener.com/latest/dex/tokens";

// How often to refresh the market cap, in milliseconds.
export const POLL_INTERVAL_MS = 30_000;

// Mock value used when no real contract is wired up yet.
// Sits just past Pitcairn's $5M so the ladder demonstrates a flipped
// row + an active target — matches the original mockup's visual state.
export const MOCK_MARKET_CAP = 6_247_318;
