// screens-you.jsx — You tab rework
// Brief: user shouldn't adjust roast level; not just a settings panel.
// Direction: "Peako's dossier on you" — a file/page the character keeps.
// Contains: relationship meter, sticker collection earned, archived Peako posts,
// "Peako's running notes" diary, and only a TINY settings drawer at the bottom.

function YouA({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="03 You / A Dossier">
      <TopBar streak={12} coins={340}/>
      <div className="no-scrollbar" style={{
        padding: '0 18px 120px', overflowY: 'auto', height: '100%',
      }}>
        {/* Header — manila folder tab */}
        <div style={{ padding: '4px 0 14px' }}>
          <div className="label">Subject file · 003421</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 36, lineHeight: 1, marginTop: 4 }}>
            What Peako knows about you.
          </div>
        </div>

        {/* ID card */}
        <div style={{
          background: '#fff', borderRadius: 22, padding: 16, marginBottom: 16,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
          display: 'flex', gap: 14, alignItems: 'center',
        }}>
          <div style={{
            width: 78, height: 78, borderRadius: 16, background: 'var(--acid)',
            border: '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PeakoAvatar size={68} variant={mascot} emotion="sus"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 26, lineHeight: 1 }}>Alex M.</div>
            <div className="label" style={{ marginTop: 3 }}>Joined Feb 14, 2026 · 68 days</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <Chip icon="🔥" label="12d" tone="hot"/>
              <Chip icon="🏅" label="8" tone="acid"/>
            </div>
          </div>
        </div>

        {/* Relationship meter — Peako's opinion of you */}
        <div style={{
          background: 'linear-gradient(135deg, #ff5a46, #ffc94a)', borderRadius: 22, padding: 16,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
          marginBottom: 16, position: 'relative', overflow: 'hidden',
        }}>
          <div className="label" style={{ color: 'rgba(26,24,20,0.8)' }}>Peako's opinion of you</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, lineHeight: 1.05, marginTop: 4, marginBottom: 14 }}>
            "Tolerating. <i>Barely.</i>"
          </div>
          {/* slider */}
          <div style={{ position: 'relative', height: 14, background: '#fff', borderRadius: 10, border: '2px solid var(--ink)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '62%', background: 'var(--moss)', borderRadius: 8, borderRight: '2px solid var(--ink)' }}/>
            <div style={{
              position: 'absolute', left: '62%', top: '50%', transform: 'translate(-50%, -50%)',
              width: 24, height: 24, borderRadius: '50%', background: 'var(--ink)', border: '2px solid #fff',
            }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 700 }}>DISAPPOINTED</span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 700 }}>PROUD (HYPOTHETICALLY)</span>
          </div>
        </div>

        {/* Sticker collection */}
        <div style={{
          background: '#fff', borderRadius: 22, padding: 16, marginBottom: 16,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div className="label">Stickers · 8 of 32</div>
            <button style={{
              background: 'transparent', border: 'none', fontFamily: 'var(--f-mono)',
              fontSize: 11, fontWeight: 700, textDecoration: 'underline',
            }}>SEE ALL →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { e: '🏅', n: '7-Day', c: 'var(--yolk)', got: true },
              { e: '🔥', n: '14-Day', c: 'var(--hot)', got: true },
              { e: '💎', n: '100 Coin', c: 'var(--sky)', got: true },
              { e: '🥬', n: 'Salad Girl', c: '#edffc2', got: true },
              { e: '🍕', n: 'Unapologetic', c: '#ffe4df', got: true },
              { e: '🐌', n: 'Slow Start', c: 'var(--paper-2)', got: true },
              { e: '👀', n: 'Lurker', c: '#dceeff', got: true },
              { e: '⚡', n: 'Morning P.', c: 'var(--acid)', got: true },
              { e: '?', n: '30-Day', c: 'var(--paper)', got: false },
              { e: '?', n: '50 Plank', c: 'var(--paper)', got: false },
              { e: '?', n: '???', c: 'var(--paper)', got: false },
              { e: '?', n: '???', c: 'var(--paper)', got: false },
            ].map((s, i) => (
              <div key={i} style={{
                aspectRatio: '1/1', background: s.got ? s.c : 'transparent',
                border: '2px solid var(--ink)', borderRadius: 14,
                borderStyle: s.got ? 'solid' : 'dashed',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                opacity: s.got ? 1 : 0.35,
                transform: s.got ? `rotate(${(i * 37) % 7 - 3}deg)` : 'none',
              }}>
                <div style={{ fontSize: 22, lineHeight: 1 }}>{s.e}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 8, fontWeight: 700, marginTop: 4, letterSpacing: '0.05em' }}>
                  {s.n.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diary — Peako's running notes */}
        <div style={{
          background: '#fef4a8', borderRadius: 22, padding: '16px 16px 14px', marginBottom: 16,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
          position: 'relative',
        }}>
          <div className="tape" style={{ top: -9, right: 30, transform: 'rotate(4deg)' }}/>
          <div className="label" style={{ marginBottom: 8 }}>Peako's notes — last 3 entries</div>
          {[
            { d: 'TUE', t: "Showed up. Didn't complain. Growth." },
            { d: 'MON', t: "Ate the salad. I saw. I won't clap." },
            { d: 'SAT', t: "Loud. Confident. Unearned but cute." },
          ].map((n, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i ? '1px dashed var(--ink-3)' : 'none' }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 800, color: 'var(--ink-3)', paddingTop: 2 }}>{n.d}</span>
              <span style={{ flex: 1, fontFamily: 'var(--f-display)', fontSize: 17, lineHeight: 1.2 }}>{n.t}</span>
            </div>
          ))}
        </div>

        {/* Screenshot archive */}
        <div style={{
          background: '#fff', borderRadius: 22, padding: 16, marginBottom: 16,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div className="label">Saved posts · 14</div>
            <button style={{
              background: 'transparent', border: 'none', fontFamily: 'var(--f-mono)',
              fontSize: 11, fontWeight: 700, textDecoration: 'underline',
            }}>OPEN →</button>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }} className="no-scrollbar">
            {[
              { c: 'var(--hot)', t: "I've seen toddlers fold laundry with more care." },
              { c: 'var(--acid)', t: "Fine. Good, even. Don't get used to it." },
              { c: 'var(--sky)', t: "Salad twice. Suspicious." },
              { c: 'var(--yolk)', t: "You've held plank longer than any of my exes." },
            ].map((p, i) => (
              <div key={i} style={{
                minWidth: 150, height: 110, borderRadius: 14, padding: 10,
                background: p.c, border: '2px solid var(--ink)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', border: '1.5px solid var(--ink)' }}/>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 13, lineHeight: 1.15, color: 'var(--ink)' }}>
                  "{p.t}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tiny settings drawer */}
        <div style={{
          background: '#f3efe6', border: '2px solid var(--ink)',
          borderRadius: 22, padding: '4px 6px', marginBottom: 6,
        }}>
          {[
            { t: 'Difficulty', v: 'Normal', glyph: '◐' },
            { t: 'Rest day', v: 'Sunday', glyph: '☾' },
            { t: 'Notifications', v: 'On, chatty', glyph: '✱' },
            { t: 'Account · privacy · about', v: '', glyph: '⚙', last: true },
          ].map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '11px 10px',
              borderBottom: s.last ? 'none' : '1px solid var(--ink-3)',
              fontFamily: 'var(--f-sans)',
            }}>
              <span style={{ fontSize: 16, width: 24, color: 'var(--ink-3)' }}>{s.glyph}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{s.t}</span>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', marginRight: 8 }}>{s.v}</span>
              <span style={{ color: 'var(--ink-3)' }}>›</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', padding: '0 0 10px' }}>
          Peako v 1.0 · made loudly
        </div>
      </div>
      <TabBar tab="you"/>
    </PhoneFrame>
  );
}

// Direction B — zine / magazine cover layout
function YouB({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="03 You / B Zine">
      <TopBar streak={12} coins={340}/>
      <div className="no-scrollbar" style={{
        padding: '0 18px 120px', overflowY: 'auto', height: '100%',
      }}>
        {/* Cover */}
        <div style={{
          background: 'var(--acid)', borderRadius: 22, padding: 18, marginBottom: 14,
          border: '2px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)', position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', fontWeight: 800 }}>
            ISSUE #12 · WEEK OF APR 23 · PEAKO ZINE
          </div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 72, lineHeight: 0.9, marginTop: 8, marginBottom: 10 }}>
            ALEX.<br/><i>The profile.</i>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
            <div style={{ flex: 1, fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>
              — Tuesday-avoidant<br/>
              — Does dishes for cardio<br/>
              — Peaks on Saturday<br/>
              — Has opinions about oat milk
            </div>
            <div style={{ transform: 'rotate(-6deg)' }}>
              <PeakoAvatar size={88} variant={mascot} emotion="smug"/>
            </div>
          </div>
        </div>

        {/* Spread: stats at a glance */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <BigStat label="DAY STREAK" value="12" color="#ffe4df"/>
          <BigStat label="STICKERS" value="8/32" color="var(--sky)"/>
          <BigStat label="TOTAL DAYS IN" value="68" color="var(--yolk)"/>
          <BigStat label="COINS IN JAR" value="340" color="#edffc2"/>
        </div>

        {/* Relationship header */}
        <div style={{
          background: '#fff', borderRadius: 22, padding: 16, marginBottom: 14,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
        }}>
          <div className="label">Where we stand</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 24, lineHeight: 1.1, marginTop: 6, marginBottom: 10 }}>
            "I'd vouch for you. <i>Under oath? I'd think about it.</i>"
          </div>
          {/* vibe bar */}
          <div style={{ position: 'relative', height: 12, background: 'var(--paper-2)', borderRadius: 8, border: '2px solid var(--ink)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '62%', background: 'var(--moss)', borderRadius: 6, borderRight: '2px solid var(--ink)' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span className="label" style={{ color: 'var(--ink-4)' }}>STRANGER</span>
            <span className="label">LVL 3 · ACQUAINTANCE</span>
            <span className="label" style={{ color: 'var(--ink-4)' }}>RIDE-OR-DIE</span>
          </div>
        </div>

        {/* Collection teaser row */}
        <div style={{
          background: 'var(--bruise)', color: '#f3efe6', borderRadius: 22, padding: 16, marginBottom: 14,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div className="label" style={{ color: 'rgba(255,255,255,0.7)' }}>Sticker collection</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 30, lineHeight: 1, marginTop: 4 }}>8 of 32</div>
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 700 }}>OPEN →</div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            {['🏅','🔥','💎','🥬','🍕','🐌','👀','⚡'].map((e, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: 8, background: '#f3efe6',
                border: '1.5px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transform: `rotate(${(i * 23) % 8 - 4}deg)`,
              }}>{e}</div>
            ))}
          </div>
        </div>

        {/* Settings row minimal */}
        <div style={{
          background: 'var(--paper)', border: '2px solid var(--ink)',
          borderRadius: 22, padding: '12px 14px', display: 'flex', gap: 10,
          alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
          boxShadow: '3px 3px 0 var(--ink)',
        }}>
          <div style={{ flex: 1, fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>
            SETTINGS · DIFFICULTY · REST DAY · NOTIFICATIONS · ACCOUNT
          </div>
          <span style={{ fontSize: 20 }}>›</span>
        </div>
      </div>
      <TabBar tab="you"/>
    </PhoneFrame>
  );
}

function BigStat({ label, value, color }) {
  return (
    <div style={{
      background: color, borderRadius: 18, padding: 14,
      border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
    }}>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 40, lineHeight: 0.95 }}>{value}</div>
      <div className="label" style={{ marginTop: 4 }}>{label}</div>
    </div>
  );
}

Object.assign(window, { YouA, YouB });
