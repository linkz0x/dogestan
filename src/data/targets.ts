export interface GdpTarget {
  rank: string;
  name: string;
  sub: string;
  gdp: number;
  flagGradient: string;
}

/**
 * The ladder of foreign economies, ascending by GDP.
 * Figures are approximate, as the brief specifies.
 */
export const TARGETS: GdpTarget[] = [
  {
    rank: "I.",
    name: "The Pitcairn Islands",
    sub: "Pacific dependency — population 47.",
    gdp: 5_000_000,
    flagGradient: "linear-gradient(180deg,#1a4789 50%, #c8102e 50%)",
  },
  {
    rank: "II.",
    name: "Tokelau",
    sub: "Polynesian protectorate — three atolls.",
    gdp: 10_000_000,
    flagGradient: "linear-gradient(180deg,#0064b1 50%, #fcd116 50%)",
  },
  {
    rank: "III.",
    name: "Saint Helena",
    sub: "South Atlantic territory; exiled an emperor here.",
    gdp: 50_000_000,
    flagGradient: "linear-gradient(180deg,#012169 50%, #c8102e 50%)",
  },
  {
    rank: "IV.",
    name: "Tuvalu",
    sub: "Sovereign island state — population 11,500.",
    gdp: 63_000_000,
    flagGradient: "linear-gradient(180deg,#418fde 50%, #fff4a3 50%)",
  },
  {
    rank: "V.",
    name: "Nauru",
    sub: "Smallest republic on Earth.",
    gdp: 160_000_000,
    flagGradient: "linear-gradient(180deg,#002b7f 50%, #ffc61e 50%)",
  },
  {
    rank: "VI.",
    name: "The Republic of Palau",
    sub: "Western Pacific. Famous for jellyfish.",
    gdp: 300_000_000,
    flagGradient: "linear-gradient(180deg,#4aadd6 60%, #ffde00 60%)",
  },
  {
    rank: "VII.",
    name: "Central African Republic",
    sub: "Bitcoin was, briefly, legal tender here.",
    gdp: 2_500_000_000,
    flagGradient:
      "linear-gradient(180deg,#003082 33%, #fcd116 66%, #009543 100%)",
  },
  {
    rank: "VIII.",
    name: "The Argentine Republic",
    sub: "A nation with which we share a passion for novel currencies.",
    gdp: 640_000_000_000,
    flagGradient: "linear-gradient(180deg,#74acdf 50%, #fff 50%)",
  },
];
