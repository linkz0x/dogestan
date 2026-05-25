import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { toBlob, getFontEmbedCSS } from "html-to-image";

type SnapshotOptions = NonNullable<Parameters<typeof toBlob>[1]>;

const CLASSES = [
  { roman: "I.", value: "I. Diamond Hand", label: "Diamond Hand" },
  { roman: "II.", value: "II. Loyal Holder", label: "Loyal Holder" },
  { roman: "III.", value: "III. Day-One Patriot", label: "Day-One Patriot" },
  { roman: "IV.", value: "IV. Recently Enlightened", label: "Recently Enlightened" },
];

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function splitName(full: string) {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { surname: "HOLDER", given: "CITIZEN OF DOGESTAN" };
  if (parts.length === 1) return { surname: parts[0], given: "CITIZEN OF DOGESTAN" };
  const surname = parts[parts.length - 1];
  const given = parts.slice(0, -1).join(" ");
  return { surname, given };
}

function shortAddr(a: string) {
  if (!a) return "0x4F2A…91Bc";
  const t = a.trim();
  if (t.length <= 14) return t.toUpperCase();
  return (t.slice(0, 6) + "…" + t.slice(-4)).toUpperCase();
}

function buildMrz(surname: string, given: string, addr: string) {
  const clean = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const sur = clean(surname).slice(0, 18);
  const giv = clean(given).slice(0, 18);
  let line1 = "P<DGS" + sur + "<<" + giv;
  line1 = (line1 + "<".repeat(44)).slice(0, 44);

  const a = clean(addr).slice(0, 16) || "DOGESTANCITIZEN0";
  let line2 = a + "DGS<<<<<ETHMAIN<<<<<<<0";
  line2 = (line2 + "<".repeat(44)).slice(0, 44);
  return { l1: line1, l2: line2 };
}

function todayLikeStamp() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function IssueCitizenship() {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [wallet, setWallet] = useState("");
  const [dob, setDob] = useState("");
  const [origin, setOrigin] = useState("");
  const [signature, setSignature] = useState("");
  const [citizenClass, setCitizenClass] = useState(CLASSES[0].value);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [issued, setIssued] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const [downloadState, setDownloadState] = useState<"idle" | "saving" | "error">("idle");

  const photoInputRef = useRef<HTMLInputElement>(null);
  const passportRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fontCssRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (document.fonts?.ready) await document.fonts.ready;
        if (cancelled || !passportRef.current) return;
        const css = await getFontEmbedCSS(passportRef.current);
        if (!cancelled) {
          fontCssRef.current = css;
          if (!css) {
            console.warn("Font embed CSS came back empty — snapshots may use fallback fonts.");
          }
        }
      } catch (err) {
        console.warn("Pre-caching font embed CSS failed:", err);
        if (!cancelled) fontCssRef.current = "";
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { surname, given } = useMemo(() => splitName(name), [name]);

  const mrz = useMemo(
    () => buildMrz(surname, given, wallet),
    [surname, given, wallet]
  );

  const sigText = (signature || name || "Citizen").trim() || "Citizen";

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(typeof reader.result === "string" ? reader.result : null);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function handleIssue(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) setName("Anonymous Hodler");
    if (!dob.trim()) setDob(todayLikeStamp());
    setIssued(true);
    setTimeout(() => {
      passportRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }

  function handleReset() {
    setName("");
    setAlias("");
    setWallet("");
    setDob("");
    setOrigin("");
    setSignature("");
    setCitizenClass(CLASSES[0].value);
    setPhotoUrl(null);
    setPhotoName(null);
    setIssued(false);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  function handleEditAgain() {
    setIssued(false);
    setTimeout(() => {
      nameInputRef.current?.focus();
      nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  }

  async function snapshotPassport(): Promise<Blob> {
    const node = passportRef.current;
    if (!node) throw new Error("Passport not mounted");

    if (document.fonts?.ready) await document.fonts.ready;

    if (fontCssRef.current === null) {
      try {
        fontCssRef.current = await getFontEmbedCSS(node);
      } catch (err) {
        console.warn("Font embed CSS unavailable:", err);
        fontCssRef.current = "";
      }
    }

    const opts: SnapshotOptions = {
      pixelRatio: 2,
      backgroundColor: "#0b2545",
    };
    if (fontCssRef.current) opts.fontEmbedCSS = fontCssRef.current;

    const blob = await toBlob(node, opts);
    if (!blob) throw new Error("Empty image blob");
    return blob;
  }

  async function handleCopy() {
    setCopyState("copying");
    try {
      const blob = await snapshotPassport();
      if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
        throw new Error("Clipboard image API not supported");
      }
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1800);
    } catch (err) {
      console.error("Copy passport failed:", err);
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2400);
    }
  }

  async function handleDownload() {
    setDownloadState("saving");
    try {
      const blob = await snapshotPassport();
      const surname = splitName(name).surname.toUpperCase().replace(/[^A-Z0-9]/g, "") || "CITIZEN";
      const filename = `dogestan-passport-${surname}.png`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDownloadState("idle");
    } catch (err) {
      console.error("Download passport failed:", err);
      setDownloadState("error");
      setTimeout(() => setDownloadState("idle"), 2400);
    }
  }

  return (
    <div className="issue-page">
      <header className="issue-nat-header">
        <div className="issue-nat-header-inner">
          <svg className="seal-small" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <radialGradient id="issueSealG" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#f0d68a" />
                <stop offset="70%" stopColor="#c89a3e" />
                <stop offset="100%" stopColor="#8a6826" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="92" fill="url(#issueSealG)" stroke="#5a3f12" strokeWidth="2" />
            <circle cx="100" cy="100" r="86" fill="none" stroke="#5a3f12" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="66" fill="#0b2545" stroke="#5a3f12" strokeWidth="1" />
            <g fill="#d8b366">
              <path d="M100 70 c -16 0 -26 8 -32 18 c -3 6 -3 14 0 20 c 2 4 6 8 12 11 c 4 2 8 3 8 7 l 0 10 l 24 0 l 0 -10 c 0 -4 4 -5 8 -7 c 6 -3 10 -7 12 -11 c 3 -6 3 -14 0 -20 c -6 -10 -16 -18 -32 -18 z" />
              <path d="M76 78 l -6 -16 l 16 10 z" fill="#b48a3d" />
              <path d="M124 78 l 6 -16 l -16 10 z" fill="#b48a3d" />
              <path d="M90 96 c 5 -6 15 -6 20 0 l -3 22 l -14 0 z" fill="#f0d68a" />
              <circle cx="92" cy="100" r="1.6" fill="#0b2545" />
              <circle cx="108" cy="100" r="1.6" fill="#0b2545" />
              <path d="M96 110 l 8 0 l -4 4 z" fill="#0b2545" />
            </g>
          </svg>

          <div className="title">
            <div className="top">SOVEREIGN REPUBLIC OF</div>
            <div className="name">DOGESTAN</div>
          </div>
          <div className="breadcrumb">
            <a href="#/">National Portal</a>
            <span className="sep">›</span>
            Department of Citizenship
            <span className="sep">›</span>
            <strong>Passport Issuance</strong>
          </div>
        </div>
      </header>

      <main className="issue-main">
        <section className="page-head">
          <p className="eyebrow">Department of Citizenship · Form DG-001</p>
          <h1>
            Issue Your <em>Citizenship Passport</em>
          </h1>
          <p>
            Citizenship in the Republic is conferred at the moment of token receipt. This
            form produces a ceremonial passport in your name &mdash; a personal record of
            your sovereign status, suitable for printing, framing, or posting.
          </p>
        </section>

        <div className="work-grid">
          <form className="form-card" onSubmit={handleIssue} autoComplete="off">
            <div className="form-no">Form DG-001 · Enrolment Particulars</div>
            <h2>BEARER DETAILS</h2>
            <div className="form-sub">
              All fields below are inscribed onto your passport in real time.
            </div>

            <div className="field">
              <label htmlFor="photo">Official Portrait</label>
              <label
                className={"photo-drop" + (photoUrl ? " has" : "")}
                htmlFor="photo"
              >
                <div
                  className="thumb"
                  style={photoUrl ? { backgroundImage: `url(${photoUrl})` } : undefined}
                >
                  {!photoUrl && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#6b6450" strokeWidth="1.2">
                      <circle cx="12" cy="9" r="3.5" />
                      <path d="M5 19 c 0 -4 4 -6 7 -6 s 7 2 7 6" />
                    </svg>
                  )}
                </div>
                <div className="pinfo">
                  <b>Upload Portrait</b>
                  <span>
                    {photoName ||
                      "Choose a file — or omit, and the national mascot shall stand in."}
                  </span>
                  <i>JPG / PNG · stays on your device.</i>
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>

            <div className="field">
              <label htmlFor="name">Full Name (as it shall appear)</label>
              <input
                ref={nameInputRef}
                type="text"
                id="name"
                placeholder="e.g. Aurelia Q. Hodler"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
              />
            </div>

            <div className="field">
              <label htmlFor="alias">Known On-Chain As</label>
              <input
                type="text"
                id="alias"
                placeholder="e.g. diamondhands.eth"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                maxLength={40}
              />
              <div className="hint">
                Your ENS, handle, or chosen citizen alias. Optional.
              </div>
            </div>

            <div className="field">
              <label htmlFor="wallet">Wallet Address (Passport №)</label>
              <input
                type="text"
                id="wallet"
                placeholder="0x4F2A91Bc…1Dc8"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                maxLength={44}
              />
              <div className="hint">
                Used as your unique passport number. Leave blank to receive a ceremonial one.
              </div>
            </div>

            <div className="row-2">
              <div className="field">
                <label htmlFor="dob">Date of Conviction</label>
                <input
                  type="text"
                  id="dob"
                  placeholder="e.g. 04 NOV 2024"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  maxLength={16}
                />
              </div>
              <div className="field">
                <label htmlFor="origin">Place of Origin</label>
                <input
                  type="text"
                  id="origin"
                  placeholder="e.g. CRYPTO TWITTER"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  maxLength={20}
                />
              </div>
            </div>

            <div className="field">
              <label>Citizen Class</label>
              <div className="class-grid">
                {CLASSES.map((c) => (
                  <label
                    key={c.value}
                    className={"opt" + (citizenClass === c.value ? " on" : "")}
                  >
                    <input
                      type="radio"
                      name="cls"
                      value={c.value}
                      checked={citizenClass === c.value}
                      onChange={() => setCitizenClass(c.value)}
                    />
                    <span className="roman">{c.roman}</span> {c.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="signature">Signature</label>
              <input
                type="text"
                id="signature"
                placeholder="Sign your name"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                maxLength={32}
              />
              <div className="hint">Rendered in the President&rsquo;s personal hand.</div>
            </div>

            <div className="actions">
              <button type="button" className="btn ghost" onClick={handleReset}>
                Clear
              </button>
              <button type="submit" className="btn">
                <svg className="seal-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
                Issue Passport
              </button>
            </div>

            <div className="form-foot">
              By submitting, you affirm under no oath whatsoever that the particulars
              above are as true as you feel comfortable making them. The Republic
              neither verifies nor cares.
            </div>
          </form>

          <div className="passport-stage">
            <div className="passport-label">— LIVE PREVIEW · OPEN TO PHOTO PAGE —</div>

            <article
              ref={passportRef}
              className={"passport" + (issued ? " issued" : "")}
              aria-label="Citizenship passport preview"
            >
              {/* LEFT PAGE */}
              <div className="pp-page left">
                <div className="pp-watermark">
                  <svg viewBox="0 0 200 200" aria-hidden="true">
                    <circle cx="100" cy="100" r="92" fill="#0b2545" stroke="#0b2545" strokeWidth="1" />
                    <g fill="#0b2545">
                      <path d="M100 60 c -18 0 -30 10 -36 22 c -3 7 -3 16 0 23 c 2 5 7 9 14 12 c 5 2 9 4 9 8 l 0 12 l 26 0 l 0 -12 c 0 -4 4 -6 9 -8 c 7 -3 12 -7 14 -12 c 3 -7 3 -16 0 -23 c -6 -12 -18 -22 -36 -22 z" />
                    </g>
                  </svg>
                </div>

                <div className="pp-head">
                  <span className="type">
                    TYPE <b style={{ marginLeft: 2 }}>P</b> &nbsp; · &nbsp; CODE{" "}
                    <b style={{ marginLeft: 2 }}>DGS</b>
                  </span>
                  <span className="type">PASSPORT &nbsp;·&nbsp; PASSEPORT</span>
                </div>

                <div className="pp-photo-row">
                  <div
                    className="pp-photo"
                    style={photoUrl ? { backgroundImage: `url(${photoUrl})` } : undefined}
                  >
                    {!photoUrl && (
                      <div className="placeholder">
                        <svg viewBox="0 0 100 130" aria-hidden="true">
                          <g>
                            <path d="M30 60 L 24 36 L 44 52 Z" fill="#b48a3d" stroke="#5a3f12" strokeWidth="0.6" />
                            <path d="M70 60 L 76 36 L 56 52 Z" fill="#b48a3d" stroke="#5a3f12" strokeWidth="0.6" />
                            <path
                              d="M50 48 c -18 0 -28 12 -28 28 c 0 14 8 24 18 28 c 6 2 14 2 20 0 c 10 -4 18 -14 18 -28 c 0 -16 -10 -28 -28 -28 z"
                              fill="#d8b366"
                              stroke="#5a3f12"
                              strokeWidth="0.8"
                            />
                            <path d="M38 82 q12 -14 24 0 l -3 22 l -18 0 z" fill="#f3e1b3" />
                            <ellipse cx="40" cy="86" rx="2" ry="2.4" fill="#0b1a30" />
                            <ellipse cx="60" cy="86" rx="2" ry="2.4" fill="#0b1a30" />
                            <path d="M46 96 l 8 0 l -4 4 z" fill="#0b1a30" />
                            <rect x="32" y="118" width="36" height="8" fill="#0b2545" />
                            <rect x="48" y="122" width="4" height="6" fill="#a8262a" />
                          </g>
                        </svg>
                        <span>PLACEHOLDER</span>
                      </div>
                    )}
                  </div>

                  <div className="pp-fields">
                    <div className="pp-field">
                      <div className="k">Surname / Nom</div>
                      <div className="v">{surname.toUpperCase()}</div>
                    </div>
                    <div className="pp-field">
                      <div className="k">Given names / Prénoms</div>
                      <div className="v">{given.toUpperCase()}</div>
                    </div>
                    <div className="pp-field">
                      <div className="k">Nationality / Nationalité</div>
                      <div className="v">DOGESTANI</div>
                    </div>
                    <div className="pp-field">
                      <div className="k">Known as / Alias</div>
                      <div className="v">
                        {alias.trim() ? alias.toUpperCase() : "—"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pp-row-3">
                  <div className="pp-field">
                    <div className="k">Sex / Sexe</div>
                    <div className="v">X</div>
                  </div>
                  <div className="pp-field">
                    <div className="k">Date of Conv. / Conviction</div>
                    <div className="v">{(dob.trim() || "DATE PENDING").toUpperCase()}</div>
                  </div>
                  <div className="pp-field">
                    <div className="k">Place of Origin</div>
                    <div className="v">{(origin.trim() || "ON-CHAIN").toUpperCase()}</div>
                  </div>
                </div>

                <div className="pp-row-2">
                  <div className="pp-field">
                    <div className="k">Passport № / N° du passeport</div>
                    <div className="v mono">{shortAddr(wallet)}</div>
                  </div>
                  <div className="pp-field">
                    <div className="k">Citizen Class</div>
                    <div className="v">{citizenClass.toUpperCase()}</div>
                  </div>
                </div>

                <div className="issued-stamp">
                  <span className="big">ISSUED</span>
                  <span className="small">ON-CHAIN · MMXXIV</span>
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div className="pp-page right">
                <div className="pp-watermark">
                  <svg viewBox="0 0 200 200" aria-hidden="true">
                    <circle cx="100" cy="100" r="92" fill="#0b2545" />
                    <g fill="#0b2545">
                      <circle cx="100" cy="100" r="60" fill="none" stroke="#0b2545" strokeWidth="6" />
                    </g>
                  </svg>
                </div>

                <div className="pp-head">
                  <div className="title">SOVEREIGN REPUBLIC OF DOGESTAN</div>
                  <div className="sub">
                    Office of the President · Department of Citizenship
                  </div>
                </div>

                <div className="pp-rights">
                  <b>THE BEARER&rsquo;S RIGHTS</b>
                  The Republic of Dogestan requests and requires all whom it may concern
                  to permit the bearer, named overleaf, to pass freely &mdash; without
                  let or hindrance, slippage or sandwich &mdash; and to afford every
                  assistance and protection of which the bearer may stand in need. This
                  document remains the property of the Republic at all times, and is
                  non-transferable; though the underlying citizenship may, like any
                  other holding, be liquidated at market.
                </div>

                <div className="pp-sig-row">
                  <div>
                    <div className="pp-sig">{sigText}</div>
                    <div className="pp-sig-meta">
                      SIGNATURE OF BEARER &nbsp;·&nbsp; SIGNATURE DU TITULAIRE
                    </div>
                  </div>

                  <svg className="pp-mini-seal" viewBox="0 0 200 200" aria-hidden="true">
                    <defs>
                      <radialGradient id="issueSealG3" cx="50%" cy="45%" r="60%">
                        <stop offset="0%" stopColor="#f0d68a" />
                        <stop offset="70%" stopColor="#c89a3e" />
                        <stop offset="100%" stopColor="#8a6826" />
                      </radialGradient>
                      <path id="issueSeal3Top" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0" />
                    </defs>
                    <circle cx="100" cy="100" r="92" fill="url(#issueSealG3)" stroke="#5a3f12" strokeWidth="2" />
                    <circle cx="100" cy="100" r="86" fill="none" stroke="#5a3f12" strokeWidth="0.8" />
                    <text fontFamily="Cinzel, serif" fontSize="10" fontWeight="600" fill="#1a1a14" letterSpacing="2.2">
                      <textPath href="#issueSeal3Top" startOffset="50%" textAnchor="middle">
                        ★ DEPARTMENT OF CITIZENSHIP ★
                      </textPath>
                    </text>
                    <circle cx="100" cy="106" r="60" fill="#0b2545" stroke="#5a3f12" strokeWidth="1" />
                    <g fill="#d8b366">
                      <path d="M100 78 c -14 0 -22 8 -28 16 c -3 6 -3 13 0 18 c 2 4 5 7 10 9 c 4 2 7 3 7 6 l 0 10 l 22 0 l 0 -10 c 0 -3 3 -4 7 -6 c 5 -2 8 -5 10 -9 c 3 -5 3 -12 0 -18 c -6 -8 -14 -16 -28 -16 z" />
                      <path d="M78 86 l -4 -14 l 12 8 z" fill="#b48a3d" />
                      <path d="M122 86 l 4 -14 l -12 8 z" fill="#b48a3d" />
                      <path d="M90 102 c 5 -5 15 -5 20 0 l -3 18 l -14 0 z" fill="#f0d68a" />
                      <circle cx="93" cy="106" r="1.6" fill="#0b2545" />
                      <circle cx="107" cy="106" r="1.6" fill="#0b2545" />
                      <path d="M97 116 l 6 0 l -3 4 z" fill="#0b2545" />
                    </g>
                    <path d="M40 160 q60 22 120 0 l -4 14 q-56 18 -112 0 z" fill="#a8262a" stroke="#5a3f12" strokeWidth="0.8" />
                    <text x="100" y="172" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8" fontWeight="600" fill="#f0d68a" letterSpacing="1.5">
                      AD LUNAM PER FIDEM
                    </text>
                  </svg>
                </div>

                <div className="pp-mrz">
                  <div>{mrz.l1}</div>
                  <div>{mrz.l2}</div>
                </div>

                <div className="issued-stamp alt">
                  <span className="big">CITIZEN</span>
                  <span className="small">REGISTERED &amp; STAMPED</span>
                </div>
              </div>
            </article>

            {issued && (
              <div className="actions actions-after">
                <button type="button" className="btn ghost" onClick={handleEditAgain}>
                  Edit Details
                </button>
                <button
                  type="button"
                  className={"btn ghost" + (copyState === "copied" ? " ok" : copyState === "error" ? " bad" : "")}
                  onClick={handleCopy}
                  disabled={copyState === "copying"}
                  aria-live="polite"
                >
                  <svg className="seal-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <rect x="9" y="3" width="11" height="13" rx="1.2" />
                    <path d="M5 8 V20 a1 1 0 0 0 1 1 H15" />
                  </svg>
                  {copyState === "copying"
                    ? "Copying…"
                    : copyState === "copied"
                    ? "Copied to clipboard"
                    : copyState === "error"
                    ? "Copy failed"
                    : "Copy as Image"}
                </button>
                <button
                  type="button"
                  className={"btn" + (downloadState === "error" ? " bad" : "")}
                  onClick={handleDownload}
                  disabled={downloadState === "saving"}
                >
                  <svg className="seal-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M12 3 V15" />
                    <path d="M7 11 L12 16 L17 11" />
                    <path d="M4 19 H20" />
                  </svg>
                  {downloadState === "saving"
                    ? "Saving…"
                    : downloadState === "error"
                    ? "Save failed"
                    : "Save as PNG"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
