export function TopStrip() {
  return (
    <div className="gov-strip" role="banner">
      <div className="gov-strip-inner">
        <svg className="tiny-seal" viewBox="0 0 32 32" aria-hidden="true">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="#cbb87c"
            strokeWidth="1.5"
          />
          <circle cx="16" cy="16" r="9" fill="#cbb87c" />
          <path d="M11 14 q5 -6 10 0 v3 q-5 4 -10 0 z" fill="#1a1a14" />
        </svg>
        <span>
          <strong>
            An official portal of the Sovereign Republic of Dogestan.
          </strong>
        </span>
        <span className="pipe">|</span>
        <span>
          Here&rsquo;s how you know <span style={{ color: "#cbb87c" }}>↓</span>
        </span>
        <span style={{ marginLeft: "auto", opacity: 0.7 }}>
          🔒 dogestan.gov.dg &nbsp; · &nbsp; Verified on-chain
        </span>
      </div>
    </div>
  );
}
