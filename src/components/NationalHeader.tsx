export function NationalHeader() {
  return (
    <header className="nat-header" data-screen-label="National Header">
      <div className="nat-header-inner">
        <div className="seal-wrap">
          <NationalSeal />
        </div>

        <div className="title-wrap">
          <h1>
            <span className="h1-small">The Sovereign Republic of</span>
            DOGESTAN
          </h1>
          <div className="motto">
            <span>To the Moon, Through Faith</span>
          </div>
        </div>

        <div className="flag-pole">
          <div className="flag" aria-label="National flag">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <circle
                cx="16"
                cy="16"
                r="11"
                fill="none"
                stroke="#d8b366"
                strokeWidth="1"
              />
              <path d="M11 14 q5 -6 10 0 v3 q-5 4 -10 0 z" fill="#d8b366" />
            </svg>
          </div>
          <span>NATIONAL ENSIGN</span>
        </div>
      </div>

      <nav className="nat-nav" aria-label="Primary">
        <div className="nat-nav-inner">
          <a href="#president">Office of the President</a>
          <a href="#treasury">Ministry of the Treasury</a>
          <a href="#citizenship">Department of Citizenship</a>
          <a href="#/issue">Issue Passport</a>
          <a href="#constitution">The Constitution</a>
          <a href="#bulletin">Economic Bulletins</a>
          <a href="#contact">Foreign Relations</a>
        </div>
      </nav>
    </header>
  );
}

function NationalSeal() {
  return (
    <svg
      className="seal"
      viewBox="0 0 200 200"
      aria-label="National Seal of the Sovereign Republic of Dogestan"
    >
      <defs>
        <radialGradient id="sealG" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#f0d68a" />
          <stop offset="70%" stopColor="#c89a3e" />
          <stop offset="100%" stopColor="#8a6826" />
        </radialGradient>
        <path
          id="sealCircleTop"
          d="M 100,100 m -80,0 a 80,80 0 1,1 160,0"
        />
        <path
          id="sealCircleBot"
          d="M 100,100 m -75,0 a 75,75 0 1,0 150,0"
        />
      </defs>

      {/* outer rope ring */}
      <circle
        cx="100"
        cy="100"
        r="94"
        fill="none"
        stroke="#d8b366"
        strokeWidth="1.2"
        strokeDasharray="2 3"
      />
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="url(#sealG)"
        stroke="#5a3f12"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke="#5a3f12"
        strokeWidth="0.8"
      />

      {/* text around the perimeter */}
      <text
        fontFamily="Cinzel, serif"
        fontSize="11"
        fontWeight="600"
        fill="#1a1a14"
        letterSpacing="2.5"
      >
        <textPath href="#sealCircleTop" startOffset="50%" textAnchor="middle">
          SOVEREIGN REPUBLIC OF DOGESTAN
        </textPath>
      </text>
      <text
        fontFamily="Cinzel, serif"
        fontSize="9"
        fontWeight="500"
        fill="#1a1a14"
        letterSpacing="3.5"
      >
        <textPath href="#sealCircleBot" startOffset="50%" textAnchor="middle">
          ★  EST. MMXXIV  ·  ON-CHAIN  ·  ★
        </textPath>
      </text>

      {/* inner field */}
      <circle
        cx="100"
        cy="106"
        r="60"
        fill="#0b2545"
        stroke="#5a3f12"
        strokeWidth="1.2"
      />
      <circle
        cx="100"
        cy="106"
        r="57"
        fill="none"
        stroke="#d8b366"
        strokeWidth="0.6"
      />

      {/* laurel left */}
      <g stroke="#d8b366" strokeWidth="1.1" fill="none" opacity="0.85">
        <path d="M55,130 q-6,-22 4,-46" />
        <g>
          <ellipse
            cx="51"
            cy="120"
            rx="6"
            ry="2.4"
            transform="rotate(-30 51 120)"
            fill="#d8b366"
          />
          <ellipse
            cx="49"
            cy="110"
            rx="6"
            ry="2.4"
            transform="rotate(-22 49 110)"
            fill="#d8b366"
          />
          <ellipse
            cx="49"
            cy="100"
            rx="6"
            ry="2.4"
            transform="rotate(-12 49 100)"
            fill="#d8b366"
          />
          <ellipse
            cx="51"
            cy="90"
            rx="6"
            ry="2.4"
            transform="rotate(0 51 90)"
            fill="#d8b366"
          />
          <ellipse
            cx="54"
            cy="80"
            rx="5"
            ry="2.2"
            transform="rotate(15 54 80)"
            fill="#d8b366"
          />
        </g>
      </g>
      {/* laurel right */}
      <g stroke="#d8b366" strokeWidth="1.1" fill="none" opacity="0.85">
        <path d="M145,130 q6,-22 -4,-46" />
        <g>
          <ellipse
            cx="149"
            cy="120"
            rx="6"
            ry="2.4"
            transform="rotate(30 149 120)"
            fill="#d8b366"
          />
          <ellipse
            cx="151"
            cy="110"
            rx="6"
            ry="2.4"
            transform="rotate(22 151 110)"
            fill="#d8b366"
          />
          <ellipse
            cx="151"
            cy="100"
            rx="6"
            ry="2.4"
            transform="rotate(12 151 100)"
            fill="#d8b366"
          />
          <ellipse
            cx="149"
            cy="90"
            rx="6"
            ry="2.4"
            transform="rotate(0 149 90)"
            fill="#d8b366"
          />
          <ellipse
            cx="146"
            cy="80"
            rx="5"
            ry="2.2"
            transform="rotate(-15 146 80)"
            fill="#d8b366"
          />
        </g>
      </g>

      {/* shiba bust silhouette */}
      <g fill="#d8b366" stroke="#8a6826" strokeWidth="0.8">
        <path
          d="M100 78
             c -10 0 -16 5 -20 12
             c -2 4 -2 9 0 13
             c 1 3 4 6 8 8
             c 3 1 6 2 6 5
             l 0 6
             l 12 0
             l 0 -6
             c 0 -3 3 -4 6 -5
             c 4 -2 7 -5 8 -8
             c 2 -4 2 -9 0 -13
             c -4 -7 -10 -12 -20 -12 z"
        />
        <path d="M84 78 l -4 -12 l 10 6 z" fill="#b48a3d" />
        <path d="M116 78 l 4 -12 l -10 6 z" fill="#b48a3d" />
        <path
          d="M94 93 c 3 -4 9 -4 12 0 l -2 14 l -8 0 z"
          fill="#f0d68a"
          stroke="none"
        />
        <ellipse cx="92" cy="96" rx="1.6" ry="2" fill="#0b2545" stroke="none" />
        <ellipse
          cx="108"
          cy="96"
          rx="1.6"
          ry="2"
          fill="#0b2545"
          stroke="none"
        />
        <path d="M98 104 l 4 0 l -2 3 z" fill="#0b2545" stroke="none" />
        <rect
          x="86"
          y="118"
          width="28"
          height="4"
          fill="#a8262a"
          stroke="#5a3f12"
          strokeWidth="0.4"
        />
        <circle
          cx="100"
          cy="120"
          r="2"
          fill="#f0d68a"
          stroke="#5a3f12"
          strokeWidth="0.4"
        />
      </g>

      {/* ribbon banner with motto */}
      <g>
        <path
          d="M30,150 q70,28 140,0 l -4,18 q-66,22 -132,0 z"
          fill="#a8262a"
          stroke="#5a3f12"
          strokeWidth="1"
        />
        <path
          d="M30,150 l -6,8 l 10,6 z"
          fill="#7a1c1f"
          stroke="#5a3f12"
          strokeWidth="0.6"
        />
        <path
          d="M170,150 l 6,8 l -10,6 z"
          fill="#7a1c1f"
          stroke="#5a3f12"
          strokeWidth="0.6"
        />
        <text
          x="100"
          y="166"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize="9"
          fontWeight="600"
          fill="#f0d68a"
          letterSpacing="2"
        >
          AD LUNAM PER FIDEM
        </text>
      </g>
    </svg>
  );
}
