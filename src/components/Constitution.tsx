interface Article {
  numeral: string;
  caption: string;
  heading: string;
  body: string;
}

const ARTICLES: Article[] = [
  {
    numeral: "I",
    caption: "OF SOVEREIGNTY",
    heading: "The Republic exists where the contract is verified.",
    body: "The Sovereign Republic of Dogestan shall consist of all addresses holding, at any block height, one (1) or more units of the national token. The Republic has no physical territory, requires none, and shall not, under any administration, acquire any. A flagpole may be erected on Block 21,000,000 ceremonially.",
  },
  {
    numeral: "II",
    caption: "OF CITIZENSHIP",
    heading: "To hold the token is to be a citizen.",
    body: "Citizenship in the Republic is conferred automatically and irrevocably upon the receipt of any non-zero balance of the national token. Citizenship may be transferred to a third party at the citizen’s discretion. Dual citizenship with other nations — including those with land — is expressly permitted and quietly encouraged.",
  },
  {
    numeral: "III",
    caption: "OF THE TREASURY",
    heading: "The Treasury shall be public, on-chain, and immutable.",
    body: "All assets of the Republic shall be held in a multi-signature wallet, the signatories to which are the President, the Minister of the Treasury, and a randomly-selected citizen drawn each quarter. Any disbursement shall be subject to a public vote of no fewer than seventy-two (72) hours. The Treasury may not be denominated in fiat currencies of any nation that has, in the last decade, defaulted on its sovereign debt.",
  },
  {
    numeral: "IV",
    caption: "OF THE PRESIDENCY",
    heading: "The Head of State serves at the pleasure of liquidity.",
    body: "The President shall hold office for so long as the Republic maintains a market capitalisation in excess of five hundred thousand United States dollars ($500,000). Should the Republic fall below this threshold for fourteen (14) consecutive days, the office shall pass to the largest remaining holder, who may not refuse.",
  },
  {
    numeral: "V",
    caption: "OF FOREIGN RELATIONS",
    heading: "We extend recognition to all nations, with or without land.",
    body: "The Republic shall maintain peaceful and respectful relations with all sovereign states, whether constituted of soil, of charter, or of contract address. The Republic shall not engage in war, having no army; nor in trade tariffs, having no border; nor in diplomatic intrigue, having no ambassador. Memes may, however, be exchanged at par.",
  },
  {
    numeral: "VI",
    caption: "OF AMENDMENT",
    heading: "The Constitution may be amended by supermajority of token holders.",
    body: "Any amendment to this Constitution shall require the affirmative vote of two-thirds (²⁄₃) of the supply, measured by token weight, over a period of no fewer than seven (7) days. The text of this Constitution, once ratified, shall be inscribed on-chain in calldata, and shall not be removable while a single node remains.",
  },
];

export function Constitution() {
  return (
    <section
      className="section"
      id="constitution"
      data-screen-label="The Constitution"
    >
      <p className="eyebrow center">The Founding Document</p>
      <h2 className="section-title" style={{ textAlign: "center" }}>
        The Constitution of Dogestan
      </h2>

      <div className="ornament">❦ &nbsp;·&nbsp; ❦ &nbsp;·&nbsp; ❦</div>

      <article className="constitution">
        <div className="doc-title">THE CONSTITUTION</div>
        <div className="doc-sub">
          of the Sovereign Republic of Dogestan &middot; Ratified at Block
          18,000,000
        </div>

        <p className="preamble">
          We, the holders of the Dogestan token, in order to form a more liquid
          union, establish a sovereignty unencumbered by geography, promote the
          general up-only, and secure the blessings of yield to ourselves and
          our diamond-handed posterity, do ordain and establish this
          Constitution for the Sovereign Republic of Dogestan.
        </p>

        {ARTICLES.map((a) => (
          <div className="article" key={a.numeral}>
            <div className="art-num">
              <b>{a.numeral}</b>
              {a.caption}
            </div>
            <div className="art-body">
              <h4>{a.heading}</h4>
              <p>{a.body}</p>
            </div>
          </div>
        ))}

        <div className="signed-by">
          <div>
            <div className="sig-line">B. Bingus</div>
            <div className="sig-meta">
              <b>BINGUS THE FIRST</b>President of the Republic
            </div>
          </div>
          <div>
            <div className="sig-line">J. Wagmi</div>
            <div className="sig-meta">
              <b>JEREMY WAGMI</b>Minister of the Treasury
            </div>
          </div>
          <div>
            <div className="sig-line">A. Hodler</div>
            <div className="sig-meta">
              <b>ANONYMOUS HODLER</b>Chief Justice, ad interim
            </div>
          </div>
        </div>

        <WaxSeal />
      </article>
    </section>
  );
}

function WaxSeal() {
  return (
    <svg className="wax-seal" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#d44b50" />
          <stop offset="60%" stopColor="#a8262a" />
          <stop offset="100%" stopColor="#5a0f12" />
        </radialGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="url(#wax)"
        stroke="#5a0f12"
        strokeWidth="1"
      />
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="#5a0f12"
        strokeWidth="0.6"
      />
      <text
        x="50"
        y="44"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontSize="9"
        fontWeight="700"
        fill="#f0d68a"
        letterSpacing="1.5"
      >
        SRD
      </text>
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontSize="6"
        fontWeight="500"
        fill="#f0d68a"
        letterSpacing="1.5"
      >
        ON-CHAIN
      </text>
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontSize="6"
        fontWeight="500"
        fill="#f0d68a"
        letterSpacing="1.5"
      >
        MMXXIV
      </text>
    </svg>
  );
}
