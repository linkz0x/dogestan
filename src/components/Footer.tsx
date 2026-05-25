export function Footer() {
  return (
    <footer
      className="nat-foot"
      id="contact"
      data-screen-label="National Footer"
    >
      <div className="nat-foot-inner">
        <div>
          <svg
            className="seal-mini"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#d8b366"
              strokeWidth="1.5"
            />
            <circle
              cx="100"
              cy="100"
              r="74"
              fill="#0b2545"
              stroke="#d8b366"
              strokeWidth="0.8"
            />
            <g fill="#d8b366">
              <path
                d="M100 65
                   c -16 0 -26 8 -32 18
                   c -3 6 -3 14 0 20
                   c 2 4 6 8 12 11
                   c 4 2 8 3 8 7
                   l 0 10
                   l 24 0
                   l 0 -10
                   c 0 -4 4 -5 8 -7
                   c 6 -3 10 -7 12 -11
                   c 3 -6 3 -14 0 -20
                   c -6 -10 -16 -18 -32 -18 z"
              />
              <path
                d="M90 92 c 5 -6 15 -6 20 0 l -3 20 l -14 0 z"
                fill="#f0d68a"
              />
            </g>
          </svg>
        </div>
        <div>
          <h5>Branches of Government</h5>
          <a href="#president">Office of the President</a>
          <a href="#treasury">Ministry of the Treasury</a>
          <a href="#bulletin">Office of National Statistics</a>
          <a href="#citizenship">Department of Citizenship</a>
        </div>
        <div>
          <h5>Founding Documents</h5>
          <a href="#declaration">Founding Declaration</a>
          <a href="#constitution">The Constitution</a>
          <a href="#bulletin">Latest Economic Bulletin</a>
          <a href="#">National Token Charter</a>
        </div>
        <div>
          <h5>Contact a Minister</h5>
          <a href="#">press@dogestan.gov.dg</a>
          <a href="#">treasury@dogestan.gov.dg</a>
          <a href="#">citizenship@dogestan.gov.dg</a>
          <a href="#">Telegram: @SovereignDogestan</a>
        </div>

        <div className="colofon">
          <span>
            © Sovereign Republic of Dogestan, MMXXIV. &nbsp; Capitol of
            Dogestan, Block 18,234,567 &nbsp;·&nbsp; Mainnet, Ethereum.
          </span>
          <span>
            This portal is a parody. No financial advice. Held together by faith
            and gas fees.
          </span>
        </div>
      </div>
    </footer>
  );
}
