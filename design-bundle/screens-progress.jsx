// screens-progress.jsx — 3 non-dashboard rework directions.
// Problem from current: looks like a fitness tracker. No Peako voice.
// Heatmap is generic. Coin list reads like a bank statement. Not screenshottable.

// ─────────────────────────────────────────────────────────────
// A — "WEEKLY REPORT CARD" — Peako grades you. Graphic composition, not a dashboard.
// ─────────────────────────────────────────────────────────────
function ProgressA({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="02 Progress / A Report Card">
      <TopBar streak={12} coins={340}/>
      <div className="no-scrollbar" style={{
        padding: '0 18px 120px', overflowY: 'auto', height: '100%',
        paddingTop: 0,
      }}>
        {/* Title */}
        <div style={{ padding: '4px 0 16px' }}>
          <div className="label">Report card · week 12</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 36, lineHeight: 1, marginTop: 4 }}>
            Peako's notes <i>on you</i>.
          </div>
        </div>

        {/* Hero grade */}
        <div style={{
          position: 'relative',
          background: 'var(--acid)', borderRadius: 28,
          border: '2px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)',
          padding: '18px 20px 20px',
          marginBottom: 16, overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="label" style={{ color: '#3d5a14' }}>Week grade</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 140, lineHeight: 0.85, letterSpacing: '-0.04em' }}>B+</div>
              <div className="label" style={{ color: 'var(--ink)' }}>5 / 7 DAYS · 1 SKIP · 0 MISS</div>
            </div>
            <div style={{ transform: 'rotate(6deg)' }}>
              <PeakoAvatar size={78} variant={mascot} emotion="impressed"/>
            </div>
          </div>
          {/* Stamp */}
          <div style={{
            position: 'absolute', top: 14, right: 100,
            border: '2.5px solid #8a2a1e', color: '#8a2a1e',
            padding: '4px 10px', borderRadius: 6, transform: 'rotate(-12deg)',
            fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 800, letterSpacing: '0.15em',
          }}>PROCESSED</div>
        </div>

        {/* Peako's written note — the character moment */}
        <div style={{
          background: '#fff', borderRadius: 22,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
          padding: '14px 16px 16px', marginBottom: 16, position: 'relative',
        }}>
          <div className="tape" style={{ top: -8, left: 40, transform: 'rotate(-4deg)' }}/>
          <div className="tape" style={{ top: -8, right: 40, transform: 'rotate(3deg)', background: 'rgba(200, 255, 60, 0.6)' }}/>
          <div className="label" style={{ marginBottom: 6 }}>Remarks</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, lineHeight: 1.25, marginBottom: 8 }}>
            "Tuesday was embarrassing. Saturday you showed up with purpose. Someone's growing a spine."
          </div>
          <div className="label" style={{ color: 'var(--ink-4)' }}>— Peako, reluctantly</div>
        </div>

        {/* Streak — huge, graphic, not a heatmap */}
        <div style={{
          background: '#ffe4df', borderRadius: 22,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
          padding: '16px 16px 18px', marginBottom: 16, position: 'relative', overflow: 'hidden',
        }}>
          <div className="label">Current streak</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: 92, lineHeight: 0.85, letterSpacing: '-0.04em' }}>12</span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 14, fontWeight: 700 }}>DAYS</span>
            <span style={{ marginLeft: 'auto', fontSize: 40 }}>🔥</span>
          </div>
          {/* mini week strip */}
          <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => {
              const state = [3,3,2,0,3,3,3][i]; // 0=today empty, 1=miss, 2=2/3, 3=3/3
              const bg = state === 3 ? 'var(--moss)' : state === 2 ? 'var(--yolk)' : state === 0 ? '#fff' : 'var(--hot)';
              const fg = state === 3 ? '#fff' : 'var(--ink)';
              return (
                <div key={i} style={{
                  flex: 1, aspectRatio: '1/1.2', borderRadius: 10,
                  border: '2px solid var(--ink)', background: bg, color: fg,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--f-mono)', fontWeight: 700,
                }}>
                  <span style={{ fontSize: 10, opacity: 0.7 }}>{d}</span>
                  <span style={{ fontSize: 16 }}>{state === 0 ? '·' : state === 1 ? '×' : state === 2 ? '⅔' : '✓'}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span className="label">Longest · 21d</span>
            <span className="label">❄️ Freeze 1/1</span>
          </div>
        </div>

        {/* This week — not stats, vibes */}
        <div style={{
          background: '#dceeff', borderRadius: 22,
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
          padding: '16px', marginBottom: 16,
        }}>
          <div className="label" style={{ marginBottom: 10 }}>This week, you were</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { t: 'mostly healthy', c: '#edffc2' },
              { t: '3 treats', c: '#ffe4df' },
              { t: 'tuesday-avoidant', c: '#fff' },
              { t: 'not late', c: '#ffc94a' },
              { t: 'loud on Saturday', c: '#fff' },
            ].map((x, i) => (
              <span key={i} style={{
                padding: '6px 10px', background: x.c, borderRadius: 999,
                border: '2px solid var(--ink)', fontFamily: 'var(--f-mono)',
                fontSize: 11.5, fontWeight: 700,
              }}>{x.t}</span>
            ))}
          </div>
        </div>

        {/* Coins — coin jar, not a list */}
        <CoinJar/>
      </div>

      <TabBar tab="progress"/>
    </PhoneFrame>
  );
}

function CoinJar() {
  return (
    <div style={{
      background: '#fff', borderRadius: 22,
      border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
      padding: '16px 16px 14px', marginBottom: 16, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="label">Coin jar</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 56, lineHeight: 0.9, marginTop: 2 }}>340 💎</div>
          <div className="label" style={{ color: 'var(--ink-4)' }}>+45 this week · spendable in Phase 2</div>
        </div>
        <div style={{ fontSize: 50 }}>🫙</div>
      </div>
      {/* coin pile graphic */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 12, maxHeight: 58, overflow: 'hidden' }}>
        {Array.from({ length: 34 }).map((_, i) => (
          <div key={i} style={{
            width: 20, height: 20, borderRadius: '50%', background: '#8ac7ff',
            border: '1.5px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 800, color: '#1d4a7a',
          }}>◈</div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// B — "PEAKO'S FRIDGE" — stickers/polaroids/magnets aesthetic
// ─────────────────────────────────────────────────────────────
function ProgressB({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="02 Progress / B Fridge">
      <TopBar streak={12} coins={340}/>
      <div className="no-scrollbar" style={{
        padding: '4px 18px 120px', overflowY: 'auto', height: '100%',
      }}>
        <div style={{ padding: '4px 0 12px' }}>
          <div className="label">The fridge · week 12</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 34, lineHeight: 1, marginTop: 4 }}>
            Things I've taped up about you.
          </div>
        </div>

        {/* Big polaroid — streak */}
        <div style={{
          background: '#fff', padding: 10, paddingBottom: 38, position: 'relative',
          border: '2px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)',
          marginBottom: 18, transform: 'rotate(-1.5deg)',
        }}>
          <div className="tape" style={{ top: -10, left: 100, transform: 'rotate(3deg)' }}/>
          <div style={{
            background: 'linear-gradient(180deg, #ff5a46, #ffc94a)', aspectRatio: '4/3',
            borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--f-display)', fontSize: 130, color: '#fff', fontWeight: 400, lineHeight: 1,
          }}>12</div>
          <div style={{
            position: 'absolute', bottom: 10, left: 10, right: 10, textAlign: 'center',
            fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.1em',
          }}>DAY STREAK · LONGEST 21</div>
        </div>

        {/* Grid of stuck things */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {/* Week calendar as sticker */}
          <div style={{
            gridColumn: 'span 2',
            background: '#edffc2', padding: 14, borderRadius: 16,
            border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
            transform: 'rotate(0.6deg)', position: 'relative',
          }}>
            <div className="tape" style={{ top: -10, right: 30, transform: 'rotate(-6deg)' }}/>
            <div className="label" style={{ marginBottom: 8 }}>This week</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['M','T','W','T','F','S','S'].map((d, i) => {
                const state = [3,3,2,0,3,3,3][i];
                const bg = state === 3 ? 'var(--moss)' : state === 2 ? 'var(--yolk)' : state === 0 ? '#fff' : 'var(--hot)';
                const fg = state === 3 ? '#fff' : 'var(--ink)';
                return (
                  <div key={i} style={{
                    flex: 1, aspectRatio: '1/1.1', borderRadius: 8,
                    border: '2px solid var(--ink)', background: bg, color: fg,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 10,
                  }}>
                    <span style={{ opacity: 0.7 }}>{d}</span>
                    <span style={{ fontSize: 14 }}>{state === 0 ? '·' : state === 1 ? '×' : state === 2 ? '⅔' : '✓'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badge sticker */}
          <div style={{
            background: 'var(--bruise)', color: '#fff', padding: 14,
            borderRadius: 16, border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
            transform: 'rotate(-2deg)', aspectRatio: '1/1',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 36 }}>🏅</div>
            <div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, opacity: 0.7 }}>EARNED APR 19</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, lineHeight: 1 }}>2-WEEK WARRIOR</div>
            </div>
          </div>

          {/* Coin magnet */}
          <div style={{
            background: 'var(--yolk)', padding: 14, borderRadius: 16,
            border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
            transform: 'rotate(1.5deg)', aspectRatio: '1/1',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 36 }}>💎</div>
            <div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 36, lineHeight: 1 }}>340</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 700 }}>COINS · +45/WK</div>
            </div>
          </div>

          {/* Post-it note */}
          <div style={{
            gridColumn: 'span 2',
            background: '#fef4a8', padding: 16, border: '2px solid var(--ink)',
            boxShadow: '3px 3px 0 var(--ink)', transform: 'rotate(-0.5deg)', position: 'relative',
          }}>
            <div className="tape" style={{ top: -9, left: '50%', marginLeft: -28, transform: 'rotate(2deg)' }}/>
            <div className="label" style={{ color: '#8a6b14' }}>Note to self — from Peako</div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, lineHeight: 1.2, marginTop: 4, color: '#3d2a0a' }}>
              Tuesday. We don't talk about Tuesday. But if I had to: get up earlier, stretch longer, eat something that isn't toast.
            </div>
          </div>

          {/* This week tags */}
          <div style={{
            gridColumn: 'span 2',
            background: '#fff', padding: 14, borderRadius: 16,
            border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
          }}>
            <div className="label" style={{ marginBottom: 8 }}>Food log — tagged by you</div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Metric label="Healthy" value="12" color="#edffc2"/>
              <Metric label="Treats" value="5" color="#ffe4df"/>
              <Metric label="Whatever" value="3" color="#dceeff"/>
            </div>
          </div>
        </div>
      </div>
      <TabBar tab="progress"/>
    </PhoneFrame>
  );
}

function Metric({ label, value, color }) {
  return (
    <div style={{
      flex: 1, background: color, border: '2px solid var(--ink)',
      borderRadius: 12, padding: '8px 10px',
    }}>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, lineHeight: 1 }}>{value}</div>
      <div className="label" style={{ marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// C — "STREAK JAR / MEMORY" — single emotional composition
// Giant streak number is the page. Everything else floats around it.
// ─────────────────────────────────────────────────────────────
function ProgressC({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="02 Progress / C Jar" dark>
      <TopBar streak={12} coins={340} dark/>
      <div className="no-scrollbar" style={{
        padding: '0 18px 120px', overflowY: 'auto', height: '100%', color: '#f3efe6',
      }}>
        <div style={{ padding: '4px 0 8px' }}>
          <div className="label" style={{ color: '#8a8276' }}>Progress · receipts</div>
        </div>

        {/* Giant streak */}
        <div style={{ position: 'relative', padding: '10px 0 16px', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--f-display)', fontSize: 260, lineHeight: 0.78, letterSpacing: '-0.06em',
            color: 'var(--acid)',
          }}>12</div>
          <div style={{
            position: 'absolute', bottom: 30, right: 10, transform: 'rotate(8deg)',
          }}>
            <PeakoAvatar size={72} variant={mascot} emotion="proud"/>
          </div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.2em', fontWeight: 700, marginTop: -6, color: '#f3efe6' }}>
            DAY STREAK — AND COUNTING
          </div>
        </div>

        {/* Milestone track */}
        <div style={{ margin: '10px 0 20px' }}>
          <div className="label" style={{ color: '#8a8276', marginBottom: 10 }}>Next milestone in 2 days</div>
          <div style={{ position: 'relative', height: 48 }}>
            <div style={{ position: 'absolute', top: 22, left: 0, right: 0, height: 4, background: '#2a2620', borderRadius: 2 }}/>
            <div style={{ position: 'absolute', top: 22, left: 0, width: '60%', height: 4, background: 'var(--acid)', borderRadius: 2 }}/>
            {[
              { p: 0, l: '0' }, { p: 25, l: '7' }, { p: 60, l: '14', now: true }, { p: 85, l: '30' }, { p: 100, l: '60' },
            ].map((m, i) => (
              <div key={i} style={{ position: 'absolute', top: 14, left: `${m.p}%`, transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{
                  width: m.now ? 20 : 14, height: m.now ? 20 : 14, borderRadius: '50%',
                  background: m.p <= 60 ? 'var(--acid)' : '#2a2620',
                  border: '2px solid #f3efe6', margin: '0 auto',
                }}/>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, marginTop: 4, color: m.now ? 'var(--acid)' : '#8a8276' }}>{m.l}d</div>
              </div>
            ))}
          </div>
        </div>

        {/* Freeze card */}
        <div style={{
          background: '#1f1c18', borderRadius: 20, padding: 16, marginBottom: 14,
          border: '2px solid #3a362e', display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <div style={{ fontSize: 40 }}>❄️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, lineHeight: 1 }}>Streak freeze</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: '#8a8276', marginTop: 4 }}>1/1 this month · 100 💎</div>
          </div>
          <button style={{
            background: 'var(--acid)', color: '#1a1814',
            border: '2px solid #f3efe6', borderRadius: 999,
            padding: '8px 14px', fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
          }}>USE</button>
        </div>

        {/* Week strip */}
        <div style={{
          background: '#1f1c18', borderRadius: 20, padding: 16, marginBottom: 14,
          border: '2px solid #3a362e',
        }}>
          <div className="label" style={{ color: '#8a8276', marginBottom: 8 }}>This week</div>
          <div style={{ display: 'flex', gap: 5 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => {
              const state = [3,3,2,0,3,3,3][i];
              const bg = state === 3 ? 'var(--acid)' : state === 2 ? 'var(--yolk)' : state === 0 ? '#2a2620' : 'var(--hot)';
              const fg = state === 0 ? '#8a8276' : '#1a1814';
              return (
                <div key={i} style={{
                  flex: 1, aspectRatio: '1/1.15', borderRadius: 8,
                  background: bg, color: fg,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--f-mono)', fontWeight: 700,
                }}>
                  <span style={{ fontSize: 10, opacity: 0.8 }}>{d}</span>
                  <span style={{ fontSize: 15 }}>{state === 0 ? '·' : state === 1 ? '×' : state === 2 ? '⅔' : '✓'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coin bar */}
        <div style={{
          background: '#1f1c18', borderRadius: 20, padding: 16,
          border: '2px solid #3a362e', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div className="label" style={{ color: '#8a8276' }}>Coin balance</div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 34, lineHeight: 1 }}>💎 340</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="label" style={{ color: '#8a8276' }}>This week</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 14, fontWeight: 700, color: 'var(--acid)' }}>+45</div>
          </div>
        </div>

      </div>
      <TabBar tab="progress" dark/>
    </PhoneFrame>
  );
}

Object.assign(window, { ProgressA, ProgressB, ProgressC });
