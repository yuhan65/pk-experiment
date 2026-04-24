/* ═══════════════════════════════════════════════════════════════
   PEAKO — You (v2: calmer, Peako-centered, no roast slider)
   ═══════════════════════════════════════════════════════════════ */

function YouScreen({ growthDay = 7 }) {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100 }}>
      <ScreenHeader
        title="You"
        sub="MEMBER SINCE APR 19"
        right={<SettingsButton/>}
      />

      {/* ID CARD */}
      <div style={{ padding: '4px 16px 0' }}>
        <div className="card-outline" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: '1px solid var(--hairline)',
          }}>
            <SoftLabel>ID CARD · #0047</SoftLabel>
            <div style={{ flex: 1 }}/>
            <div style={{
              fontSize: 10.5, padding: '3px 8px', background: 'var(--hi)',
              borderRadius: 6, fontFamily: 'var(--font-mono)', fontWeight: 800,
              letterSpacing: '.1em', color: 'var(--line)',
            }}>PHASE 1</div>
          </div>
          <div style={{ padding: '16px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: 'var(--accent-2)',
              border: '1.5px solid var(--line)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'rotate(-3deg)',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700 }}>M</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-.02em' }}>mia.</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)', marginTop: 2 }}>"likes snacks, hates cardio"</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                <span style={tag()}>🌱 mostly-plant</span>
                <span style={tag()}>🦥 low-energy</span>
              </div>
            </div>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--hairline)',
            background: 'var(--bg-2)',
          }}>
            {[{n:'5',l:'DAY STREAK'},{n:'12',l:'QUESTS'},{n:'150◆',l:'COINS'}].map((x, i) => (
              <div key={i} style={{
                padding: '10px 6px', textAlign: 'center',
                borderRight: i < 2 ? '1px solid var(--hairline)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{x.n}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', letterSpacing: '.1em', marginTop: 4 }}>{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PEAKO'S GROWTH ── long-loop state.
         Lives here (not in Progress) so the short-loop reward (coins) and the
         long-loop state (stage) don't compete on the same screen. Quiet,
         accumulative, big on day 0→7→14→21 transitions, invisible in between. */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <SoftLabel>Peako's growth</SoftLabel>
          <SoftLabel color="var(--ink-3)">{Math.min(growthDay, 21)} / 21 days</SoftLabel>
        </div>
        <GrowthModule growthDay={growthDay}/>
      </div>

      {/* ACHIEVEMENTS */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <SoftLabel>Achievements</SoftLabel>
          <SoftLabel color="var(--ink-3)">4 / 12</SoftLabel>
        </div>
        <div className="card-sm" style={{ padding: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { e: '🌱', t: 'First Day', got: true },
              { e: '🔥', t: '3-Day Fire', got: true },
              { e: '🧘', t: 'Plank Patience', got: true },
              { e: '🌱', t: 'Sprouted', got: true },
              { e: '🌵', t: 'Survived Desert', got: false },
              { e: '🌙', t: 'Night Walker', got: false },
              { e: '🏆', t: 'Graduated', got: false },
              { e: '📜', t: 'Certified', got: false },
              { e: '✨', t: 'Forever Peako', got: false },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: '100%', aspectRatio: '1', borderRadius: 14,
                  border: `1.5px ${a.got ? 'solid' : 'dashed'} var(--line)`,
                  background: a.got ? 'var(--accent-2)' : 'var(--bg-2)',
                  boxShadow: a.got ? '0 2px 0 var(--line)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, opacity: a.got ? 1 : 0.4,
                }}>{a.got ? a.e : '?'}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: a.got ? 'var(--ink-2)' : 'var(--ink-3)', textAlign: 'center', fontWeight: 700, letterSpacing: '.04em' }}>{a.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STICKER BOOK */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <SoftLabel>Sticker book</SoftLabel>
          <SoftLabel color="var(--ink-3)">6 / 24</SoftLabel>
        </div>
        <div className="card-sm" style={{ padding: 12, background: 'var(--bg-2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            <Slot emoji="🔥" label="Day 5" bg="var(--accent-2)" rot={-3}/>
            <Slot emoji="🥗" label="First salad" bg="var(--hi)" rot={3}/>
            <Slot emoji="🧘" label="60s plank" bg="var(--plum)" rot={-2}/>
            <Slot emoji="💧" label="Hydrated" bg="var(--cool)" rot={4}/>
            <Slot emoji="🌅" label="Early bird" bg="var(--accent)" rot={-3}/>
            <Slot emoji="🎯" label="3-in-a-row" bg="var(--accent-2)" rot={3}/>
            <Slot locked/><Slot locked/>
          </div>
        </div>
      </div>

      {/* Saved notes */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <SoftLabel>Saved notes</SoftLabel>
          <SoftLabel color="var(--ink-3)">3 posts</SoftLabel>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }} className="hide-scroll">
          <SavedNote text={`"Four healthy meals, three pizzas. Balance, apparently."`} date="TODAY" bg="var(--hi)" rot={-2}/>
          <SavedNote text={`"Day 3 and you're still showing up. Who are you?"`} date="2D AGO" bg="var(--accent-2)" rot={2}/>
          <SavedNote text={`"Skipped a salad for a bagel. Honest of you."`} date="4D AGO" bg="var(--plum)" color="#fff" rot={-1}/>
        </div>
      </div>

      {/* Settings drawer */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ marginBottom: 8 }}><SoftLabel>Settings</SoftLabel></div>
        <div className="card-sm" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { i: '⚖️', t: 'Difficulty',    s: 'Normal' },
            { i: '☀️', t: 'Rest day',      s: 'Sunday' },
            { i: '🗓', t: 'Phase & goal',  s: 'Phase 1 · 21 days' },
            { i: '🔔', t: 'Notifications', s: 'On · 9am daily' },
            { i: '🌙', t: 'Quiet hours',   s: '10pm – 8am' },
            { i: '↗',  t: 'Invite a friend', s: 'Get a sticker' },
            { i: '🔒', t: 'Privacy',       s: '' },
            { i: '🚪', t: 'Sign out',      s: '' },
          ].map((r, i, a) => (
            <div key={r.t} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px',
              borderBottom: i < a.length - 1 ? '1px solid var(--hairline)' : 'none',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: 'var(--bg-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>{r.i}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{r.t}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)' }}>{r.s}</div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--ink-3)' }}>›</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '.18em' }}>
          peako v0.4 · hi mia
        </div>
      </div>
    </div>
  );
}

function SettingsButton() {
  return (
    <button style={{
      width: 38, height: 38, borderRadius: 12,
      border: '1px solid var(--hairline)', background: 'var(--paper)',
      boxShadow: 'var(--sh-1)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="var(--line)" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="10" cy="10" r="2.5"/>
        <path d="M10 2 V5 M10 15 V18 M2 10 H5 M15 10 H18 M4.2 4.2 L6.3 6.3 M13.7 13.7 L15.8 15.8 M4.2 15.8 L6.3 13.7 M13.7 6.3 L15.8 4.2"/>
      </svg>
    </button>
  );
}

function tag() {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 8px', borderRadius: 999,
    background: 'var(--paper)', border: '1px solid var(--hairline)',
    fontFamily: 'var(--font-ui)', fontSize: 11.5, fontWeight: 700,
  };
}

function Slot({ emoji, label, bg, rot = 0, locked = false }) {
  if (locked) return (
    <div style={{ aspectRatio: '1', borderRadius: 14, border: '1.5px dashed rgba(0,0,0,.2)',
      background: 'rgba(0,0,0,.03)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, color: 'var(--ink-3)' }}>?</div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: 14,
        border: '1.5px solid var(--line)', background: bg,
        boxShadow: '0 2px 0 var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, transform: `rotate(${rot}deg)`,
      }}>{emoji}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-2)', textAlign: 'center' }}>{label}</div>
    </div>
  );
}

function SavedNote({ text, date, bg, color = 'var(--line)', rot = 0 }) {
  return (
    <div style={{
      flex: '0 0 220px', background: bg, color,
      border: '1.5px solid var(--line)', borderRadius: 16,
      padding: '12px 14px', boxShadow: '0 3px 0 var(--line)',
      transform: `rotate(${rot}deg)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <MascotTiny size={20}/>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, letterSpacing: '.1em' }}>@PEAKO</div>
        <div style={{ flex: 1 }}/>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, opacity: .7 }}>{date}</div>
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }}>{text}</div>
    </div>
  );
}

/* ── GROWTH MODULE ─────────────────────────────────────────────────
   Long-loop state. Lives ONLY on You tab.
   Design principle: quiet accumulator, loud transitions.
   - Hero: current Peako form (big), stage name, tiny "days to next".
   - Below: 4-stage timeline — reached stages in color, upcoming as "?".
   - No percentage, no coins, no daily deltas. This is a state, not a meter.
   ───────────────────────────────────────────────────────────────── */
function GrowthModule({ growthDay = 7 }) {
  const stage = stageForDay(growthDay);
  const stages = [
    { key: 'seed',   label: 'Seed',   day: 0,  note: 'barely here' },
    { key: 'sprout', label: 'Sprout', day: 7,  note: 'small wins' },
    { key: 'teen',   label: 'Teen',   day: 14, note: 'forming a spine' },
    { key: 'grown',  label: 'Grown',  day: 21, note: 'unbothered' },
  ];
  const currentIdx = stages.findIndex(s => s.key === stage);
  const nextStage = stages[Math.min(currentIdx + 1, stages.length - 1)];
  const daysToNext = Math.max(0, nextStage.day - growthDay);
  const current = stages[currentIdx] || stages[0];
  const isMax = growthDay >= 21;

  return (
    <div className="card-outline" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Hero: Peako on display */}
      <div style={{
        display: 'flex', gap: 14, padding: '18px 16px 14px',
        alignItems: 'center',
        background: 'linear-gradient(180deg, var(--hi) 0%, var(--paper) 100%)',
      }}>
        <div style={{
          width: 96, height: 96, borderRadius: 20,
          background: 'var(--paper)',
          border: '1.5px solid var(--line)',
          boxShadow: '0 2px 0 var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <MascotTiny size={70} stage={stage}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 800,
            letterSpacing: '.14em', color: 'var(--ink-3)',
          }}>
            PEAKO IS A
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700,
            letterSpacing: '-.02em', lineHeight: 1, marginTop: 2,
            textTransform: 'capitalize',
          }}>
            {current.label}.
          </div>
          <div style={{
            fontSize: 12.5, fontStyle: 'italic', color: 'var(--ink-2)',
            marginTop: 6, fontFamily: 'var(--font-display)', fontWeight: 500,
          }}>
            "{current.note}"
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: 'var(--ink-3)', letterSpacing: '.1em', marginTop: 8,
          }}>
            {isMax
              ? 'FULLY GROWN · NEW JOURNEY UNLOCKED'
              : daysToNext === 0
                ? <>READY TO EVOLVE · TAP TO WITNESS</>
                : <>{daysToNext} DAY{daysToNext === 1 ? '' : 'S'} TO <b style={{ color: 'var(--ink)' }}>{nextStage.label.toUpperCase()}</b></>}
          </div>
        </div>
      </div>

      {/* 4-stage timeline — reached = mascot, future = ? */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid var(--hairline)',
        background: 'var(--bg-2)',
      }}>
        {stages.map((s, i) => {
          const reached = growthDay >= s.day;
          const isCurrent = s.key === stage;
          return (
            <div key={s.key} style={{
              padding: '12px 6px 10px',
              textAlign: 'center',
              borderRight: i < stages.length - 1 ? '1px solid var(--hairline)' : 'none',
              background: isCurrent ? 'var(--paper)' : 'transparent',
              opacity: reached ? 1 : 0.55,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 12, margin: '0 auto',
                background: reached ? 'var(--hi)' : 'transparent',
                border: `1.5px ${reached ? 'solid' : 'dashed'} var(--line)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {reached
                  ? <MascotTiny size={24} stage={s.key}/>
                  : <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-3)', fontSize: 14 }}>?</span>}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800,
                letterSpacing: '.08em', marginTop: 6,
                color: isCurrent ? 'var(--ink)' : 'var(--ink-3)',
              }}>
                {s.label.toUpperCase()}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                color: 'var(--ink-3)', marginTop: 2,
              }}>
                d{s.day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GrowthCollection() {
  const stages = [
    { key: 'seed',   label: 'Seed',   day: 'd0',  got: true,  note: 'barely here' },
    { key: 'sprout', label: 'Sprout', day: 'd7',  got: true,  note: 'small wins' },
    { key: 'teen',   label: 'Teen',   day: 'd14', got: false, note: '?' },
    { key: 'grown',  label: 'Grown',  day: 'd21', got: false, note: '?' },
  ];
  return (
    <div className="card-sm" style={{ padding: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {stages.map((s, i) => (
          <div key={s.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{
              width: '100%', aspectRatio: '1', borderRadius: 14,
              background: s.got ? 'var(--hi)' : 'var(--bg-2)',
              border: `1.5px ${s.got ? 'solid' : 'dashed'} var(--line)`,
              boxShadow: s.got ? '0 2px 0 var(--line)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: s.got ? 1 : .45,
            }}>
              {s.got
                ? <MascotTiny size={40} stage={s.key}/>
                : <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--ink-3)', fontWeight: 800 }}>?</div>}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 800, letterSpacing: '.08em', color: s.got ? 'var(--ink)' : 'var(--ink-3)', marginTop: 3 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-3)' }}>{s.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { YouScreen, GrowthCollection, GrowthModule });
