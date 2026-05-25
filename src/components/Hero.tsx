export function Hero() {
  return (
    <section
      className="hero"
      id="declaration"
      data-screen-label="Founding Declaration"
    >
      <div className="doc-meta">
        <span>
          <b>ISSUED</b> · 14 Brumaire MMXXIV
        </span>
        <span>
          <b>BY</b> · The Founding Wallet
        </span>
        <span>
          <b>STATUS</b> · In perpetuity
        </span>
      </div>
      <h2>
        By Decree of the People,
        <br />
        and the <em>Mempool</em>.
      </h2>
      <p className="declaration">
        Whereas all prior nations have been bound to the inconvenience of land,
        borders, customs houses, and rainfall &mdash; the Sovereign Republic of
        Dogestan hereby declares itself the first nation in recorded history to
        consist <em>solely</em> of a contract address. We have no territory. We
        have no airport. We have a verified mainnet deployment, and that is
        enough.
      </p>

      <div className="registry">
        <div className="reg-head">
          Registry of Incorporation &nbsp;·&nbsp; National Charter №&nbsp;000001
        </div>
        <div className="reg-no">
          <b>CA</b> &nbsp;0xD06E57AN42069B1n6u5F1r57Pr351D3n7C0n7r4c7
        </div>
        <div className="reg-foot">
          Filed on the public ledger. Witnessed by 14,221 nodes. Verifiable from
          any sovereign device.
        </div>
      </div>

      <div className="pair">
        <div className="stat-card">
          <div className="label">Population</div>
          <div className="val">24,118 citizens</div>
        </div>
        <div className="stat-card">
          <div className="label">Land Mass</div>
          <div className="val">
            0 km<sup>2</sup>
          </div>
        </div>
        <div className="stat-card">
          <div className="label">Time Zone</div>
          <div className="val">UTC +∞</div>
        </div>
        <div className="stat-card">
          <div className="label">National Animal</div>
          <div className="val">The Shiba</div>
        </div>
      </div>
    </section>
  );
}
