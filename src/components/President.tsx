export function President() {
  return (
    <section
      className="section"
      id="president"
      data-screen-label="Office of the President"
    >
      <p className="eyebrow">Office of the President &mdash; Profile</p>
      <h2 className="section-title">President Bingus the First</h2>
      <p className="section-lede">
        Head of State, Commander of the Chain, and Chief Steward of the Treasury
        &mdash; elected unanimously by the founding wallet, in a vote of one to
        nothing.
      </p>

      <div className="president">
        <div className="portrait-frame">
          <div className="inner">
            <PresidentPortrait />
          </div>
          <div className="plaque">
            <b>BINGUS I.</b>
            PRESIDENT OF THE REPUBLIC
          </div>
        </div>

        <div className="bio">
          <h3>His Excellency, Bingus the First</h3>
          <div className="role">
            President of the Sovereign Republic of Dogestan &middot; First of
            His Name
          </div>

          <div className="detail-grid">
            <div>
              <div className="k">Office</div>
              <div className="v">Head of State &amp; Government</div>
            </div>
            <div>
              <div className="k">Term</div>
              <div className="v">Until liquidity is removed</div>
            </div>
            <div>
              <div className="k">Sworn In</div>
              <div className="v">Block 18,000,001</div>
            </div>
            <div>
              <div className="k">Residence</div>
              <div className="v">The Genesis Wallet</div>
            </div>
          </div>

          <p>
            President Bingus the First was elevated to the highest office of the
            Republic by acclamation of the founding wallet, on the eve of the
            mainnet deployment. A statesman of few words and fewer keystrokes,
            His Excellency holds 4.2&nbsp;% of the national supply in personal
            trust, and has pledged not to liquidate his position before the
            second flip of Argentina.
          </p>
          <p>
            Prior to assuming office, the President served with distinction as a
            jpeg, a desktop wallpaper, and the cover image of three (3)
            unrelated Telegram groups. He is a graduate of the school of life,
            and an honorary doctorate of the University of On-Chain Studies.
          </p>

          <blockquote className="quote">
            &ldquo;A nation is not made of soil, nor borders, nor passports of
            paper. A nation is made of conviction &mdash; and of a sufficiently
            liquid order book.&rdquo;
            <span className="attr">— Inaugural Address, Block 18,000,001</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function PresidentPortrait() {
  return (
    <svg
      viewBox="0 0 200 240"
      aria-label="Official portrait of President Bingus the First"
    >
      <rect width="200" height="240" fill="#1a3a64" />
      <path
        d="M0 0 L200 0 L200 90 Q100 130 0 90 Z"
        fill="#0b2545"
        opacity="0.6"
      />
      <rect x="6" y="0" width="6" height="240" fill="#0b2545" opacity="0.4" />
      <rect
        x="188"
        y="0"
        width="6"
        height="240"
        fill="#0b2545"
        opacity="0.4"
      />

      <path
        d="M 60 240 L 60 200
           Q 60 168 100 160
           Q 140 168 140 200
           L 140 240 Z"
        fill="#0a1f3d"
        stroke="#5a3f12"
        strokeWidth="0.6"
      />
      <path
        d="M 70 175 L 100 240 L 92 240 L 62 178 Z"
        fill="#a8262a"
        stroke="#5a3f12"
        strokeWidth="0.4"
      />
      <circle
        cx="118"
        cy="200"
        r="6"
        fill="#d8b366"
        stroke="#5a3f12"
        strokeWidth="0.6"
      />
      <rect x="116" y="184" width="4" height="16" fill="#a8262a" />

      <rect x="92" y="155" width="16" height="10" fill="#f0d68a" />

      <g>
        <path
          d="M70 100 L 64 76 L 86 92 Z"
          fill="#b48a3d"
          stroke="#5a3f12"
          strokeWidth="0.6"
        />
        <path
          d="M130 100 L 136 76 L 114 92 Z"
          fill="#b48a3d"
          stroke="#5a3f12"
          strokeWidth="0.6"
        />
        <path d="M73 96 L 70 82 L 82 91 Z" fill="#f0d68a" />
        <path d="M127 96 L 130 82 L 118 91 Z" fill="#f0d68a" />

        <path
          d="M100 84
             c -22 0 -34 14 -34 32
             c 0 14 6 24 14 30
             c 5 4 12 6 20 6
             c 8 0 15 -2 20 -6
             c 8 -6 14 -16 14 -30
             c 0 -18 -12 -32 -34 -32 z"
          fill="#d8b366"
          stroke="#5a3f12"
          strokeWidth="0.8"
        />

        <path
          d="M86 116
             q14 -16 28 0
             l -3 24
             q-11 6 -22 0 z"
          fill="#f3e1b3"
        />

        <path
          d="M84 110 q6 -3 12 0"
          stroke="#5a3f12"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M104 110 q6 -3 12 0"
          stroke="#5a3f12"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        <ellipse cx="89" cy="118" rx="2.4" ry="3" fill="#0b1a30" />
        <ellipse cx="111" cy="118" rx="2.4" ry="3" fill="#0b1a30" />
        <circle cx="90" cy="117" r="0.7" fill="#fff" />
        <circle cx="112" cy="117" r="0.7" fill="#fff" />

        <path d="M96 130 l 8 0 l -4 5 z" fill="#0b1a30" />

        <path
          d="M100 135 q -6 8 -12 5"
          stroke="#5a3f12"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 135 q 6 8 12 5"
          stroke="#5a3f12"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        <g fill="#5a3f12">
          <circle cx="86" cy="138" r="0.6" />
          <circle cx="89" cy="141" r="0.6" />
          <circle cx="114" cy="138" r="0.6" />
          <circle cx="111" cy="141" r="0.6" />
        </g>

        <path
          d="M88 80 L 92 88 L 100 78 L 108 88 L 112 80 L 112 92 L 88 92 Z"
          fill="#d8b366"
          stroke="#5a3f12"
          strokeWidth="0.6"
        />
        <circle cx="92" cy="86" r="1.4" fill="#a8262a" />
        <circle cx="100" cy="86" r="1.4" fill="#a8262a" />
        <circle cx="108" cy="86" r="1.4" fill="#a8262a" />
      </g>

      <text
        x="100"
        y="232"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontSize="6"
        fill="#d8b366"
        letterSpacing="2"
      >
        OFFICIAL PORTRAIT · MMXXIV
      </text>
    </svg>
  );
}
