export function Citizenship() {
  return (
    <section
      className="section"
      id="citizenship"
      data-screen-label="Department of Citizenship"
    >
      <p className="eyebrow">
        Department of Citizenship &mdash; Enrolment
      </p>
      <h2 className="section-title">Becoming a Citizen of Dogestan</h2>
      <p className="section-lede">
        Citizenship is conferred by the act of holding the national token. No
        paperwork is required. No oath is administered. The chain is the
        registrar.
      </p>

      <div className="citizen-grid">
        <div className="enroll-notice">
          <div className="notice-head">
            <div className="form-no">
              Form DG-001 · Notice of Enrolment
            </div>
            <h4>OFFICIAL ENROLMENT INSTRUCTIONS</h4>
            <div className="sub">
              Issued under authority of the Department of Citizenship.
            </div>
          </div>

          <ol>
            <li>
              <div className="desc">
                <b>Connect a sovereign wallet.</b>
                <br />
                <i>
                  A non-custodial wallet on the Ethereum mainnet is required.
                  Hardware wallets are recognised as &ldquo;reinforced
                  sovereign instruments&rdquo;.
                </i>
              </div>
            </li>
            <li>
              <div className="desc">
                <b>Acquire one (1) or more units of the national token.</b>
                <br />
                <i>
                  Any non-zero balance shall be sufficient. Fractional holdings
                  are recognised as full citizenship for the purposes of voting
                  and bragging.
                </i>
              </div>
            </li>
            <li>
              <div className="desc">
                <b>Await on-chain confirmation.</b>
                <br />
                <i>
                  Citizenship is conferred at the moment the transaction reaches
                  finality. No further filings are required.
                </i>
              </div>
            </li>
            <li>
              <div className="desc">
                <b>Optionally, declare yourself.</b>
                <br />
                <i>
                  Citizens are invited &mdash; but not required &mdash; to
                  update their on-chain profile, social handle, or telegram bio
                  to reflect their new nationality.
                </i>
              </div>
            </li>
          </ol>

          <div className="cta">
            <a className="btn" href="#/issue">
              Issue Your Passport
            </a>
            <a className="btn ghost" href="#">
              Verify a Citizen
            </a>
          </div>
        </div>

        <Passport />
      </div>
    </section>
  );
}

function Passport() {
  return (
    <div className="passport" aria-label="National passport of Dogestan">
      <div className="pp-top">
        PASSPORT &mdash; PASSEPORT &mdash; ПАСПОРТ
        <br />
        <b>SOVEREIGN REPUBLIC OF DOGESTAN</b>
        On-chain travel document
      </div>
      <svg className="pp-seal" viewBox="0 0 200 200" aria-hidden="true">
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#d8b366"
          strokeWidth="2"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="#0b2545"
          stroke="#d8b366"
          strokeWidth="1"
        />
        <g fill="#d8b366" stroke="#8a6826" strokeWidth="0.6">
          <path
            d="M100 60
               c -16 0 -26 8 -32 18
               c -3 6 -3 14 0 20
               c 2 4 6 8 12 11
               c 4 2 8 3 8 7
               l 0 12
               l 24 0
               l 0 -12
               c 0 -4 4 -5 8 -7
               c 6 -3 10 -7 12 -11
               c 3 -6 3 -14 0 -20
               c -6 -10 -16 -18 -32 -18 z"
          />
          <path d="M76 70 l -6 -18 l 16 10 z" fill="#b48a3d" />
          <path d="M124 70 l 6 -18 l -16 10 z" fill="#b48a3d" />
          <path
            d="M90 90 c 5 -6 15 -6 20 0 l -3 22 l -14 0 z"
            fill="#f0d68a"
            stroke="none"
          />
          <ellipse cx="87" cy="95" rx="2" ry="2.6" fill="#0b2545" stroke="none" />
          <ellipse
            cx="113"
            cy="95"
            rx="2"
            ry="2.6"
            fill="#0b2545"
            stroke="none"
          />
          <path d="M96 108 l 8 0 l -4 5 z" fill="#0b2545" stroke="none" />
        </g>
        <text
          fontFamily="Cinzel, serif"
          fontSize="7"
          fontWeight="600"
          fill="#d8b366"
          letterSpacing="2.5"
        >
          <textPath href="#sealCircleTop" startOffset="50%" textAnchor="middle">
            DOGESTAN · ON-CHAIN · CITIZEN
          </textPath>
        </text>
      </svg>
      <div className="pp-bot">
        <div className="row">
          <span>Type</span>
          <b>P</b>
        </div>
        <div className="row">
          <span>Code</span>
          <b>DGS</b>
        </div>
        <div className="row">
          <span>No.</span>
          <b>0x4F2A&hellip;91Bc</b>
        </div>
        <div className="row">
          <span>Name</span>
          <b>HOLDER, CITIZEN</b>
        </div>
        <div className="row">
          <span>Issued</span>
          <b>BLOCK 18,201,440</b>
        </div>
        <div className="row">
          <span>Expires</span>
          <b>NEVER</b>
        </div>
        <div
          style={{ marginTop: 14, color: "#cbb87c", letterSpacing: "0.5px" }}
        >
          P&lt;DGSHOLDER&lt;&lt;CITIZEN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          <br />
          0x4F2A91Bc1DGS&lt;&lt;&lt;&lt;&lt;ETHMAIN&lt;&lt;&lt;&lt;&lt;&lt;0
        </div>
      </div>
    </div>
  );
}
