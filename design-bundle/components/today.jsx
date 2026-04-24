/* ═══════════════════════════════════════════════════════════════
   PEAKO — Today tab (v2)
   Peako-centered: giant mascot holding a phone is the hero.
   Tap phone → Peako Feed (posts reacting to user actions).
   Mascot state is contextual based on day progress.
   ═══════════════════════════════════════════════════════════════ */

function TodayScreen({ mood = 'deadpan', dayState = 'fresh', growthDay = 7, idleVariant = 'gorogoro' }) {
  // dayState: 'fresh' (just posted) · 'idle' · 'staring' · 'celebrating'
  // idleVariant: lounging pose when phone is thrown aside
  const [feedOpen, setFeedOpen] = React.useState(false);
  const [diaryOpen, setDiaryOpen] = React.useState(false);

  const ctx = contextByState(dayState, mood);
  const stage = stageForDay(growthDay);

  // Transient bubble: fires only on state change, auto-unmounts after ~2.8s.
  const [bubble, setBubble] = React.useState(null);
  const lastKeyRef = React.useRef(null);
  React.useEffect(() => {
    const key = `${dayState}:${mood}`;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;
    if (!ctx.bubble) { setBubble(null); return; }
    setBubble(ctx.bubble);
    const t = setTimeout(() => setBubble(null), 2800);
    return () => clearTimeout(t);
  }, [dayState, mood]);

  const challenges = [
    { id: 'plank',  emoji: '🧘', title: 'Plank Patience',  sub: '60 sec',   coins: 10, done: true  },
    { id: 'water',  emoji: '💧', title: 'Hydrate',          sub: '3 glasses',coins: 5,  done: false },
    { id: 'walk',   emoji: '🚶', title: 'Afternoon Walk',   sub: '15 min',   coins: 10, done: false },
  ];

  return (
    <>
    <div className="hide-scroll" style={{
      position: 'absolute', inset: 0, overflow: 'auto',
      paddingBottom: 100,
    }}>
      <TopChips streak={5} coins={150} />

      {/* CHALLENGE HERO — compact band, kept from user's original */}
      <div style={{ padding: '10px 16px 0' }}>
        <div className="card-outline" style={{
          background: 'var(--hi)',
          padding: '14px 16px 16px',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 800, letterSpacing: '.14em', color: 'var(--ink-2)' }}>
                TODAY · DAY 5
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, lineHeight: 1.02, marginTop: 4, color: 'var(--line)', letterSpacing: '-.02em' }}>
                Three challenges
              </div>
              <div style={{ marginTop: 3, fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>
                Tap any to start →
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {challenges.map((c, i) => (
                <div key={c.id} style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: c.done ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.85)',
                  border: '1.5px solid var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                  opacity: c.done ? .5 : 1,
                }}>{c.done ? '✓' : c.emoji}</div>
              ))}
            </div>
          </div>
          {/* progress bar */}
          <div style={{ marginTop: 12, height: 6, borderRadius: 999, background: 'rgba(0,0,0,.12)', overflow: 'hidden' }}>
            <div style={{ width: '33%', height: '100%', background: 'var(--line)' }}/>
          </div>
        </div>
      </div>

      {/* PEAKO HERO — giant mascot + phone, the centerpiece */}
      <div style={{
        padding: '18px 16px 8px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative',
      }}>
        {/* Floor disc / stage */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 68,
          height: 1, borderTop: '1px dashed rgba(31,29,27,.12)',
        }}/>

        {/* Transient bubble — 1–4 words, only on state transitions.
            Glyph does the constant-presence work instead. */}
        <div style={{ alignSelf: 'flex-start', marginLeft: 22, marginBottom: 10, minHeight: 44, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          {bubble && <TransientBubble text={bubble}/>}
          {ctx.glyph && <PeakoGlyph kind={ctx.glyph}/>}
        </div>

        {/* The mascot + phone — posting ONLY when Peako just sent something */}
        <SceneKeyframes/>
        {ctx.scene === 'posting' ? (
          <PeakoPosting
            size={230}
            stage={stage}
            draft={ctx.draft || 'posting about you...'}
            unread={ctx.unread}
            phoneLabel="9:41"
            onTapPhone={() => setFeedOpen(true)}
          />
        ) : (
          <PeakoLounging
            size={230}
            stage={stage}
            variant={ctx.loungeVariant || idleVariant}
            mascotState={ctx.mascotState}
            unread={ctx.unread}
            phoneLabel="9:41"
            onTapPhone={() => setFeedOpen(true)}
          />
        )}

        {/* Diary on the desk — always visible, tap to open */}
        <button onClick={() => setDiaryOpen(true)} style={{
          position: 'absolute', right: 20, bottom: 68,
          background: '#3a2f1e', border: '1.5px solid var(--line)',
          borderRadius: '3px 3px 5px 5px', padding: '6px 10px 7px',
          boxShadow: '0 3px 0 var(--line), 0 4px 8px rgba(0,0,0,.2)',
          cursor: 'pointer', transform: 'rotate(-4deg)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 800,
            letterSpacing: '.15em', color: '#f3dca0',
          }}>PEAKO'S</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
            color: '#fff7ea', letterSpacing: '-.01em', lineHeight: 1,
          }}>Diary</div>
          <div style={{
            width: 32, height: 2, background: '#f3dca0', opacity: .6, marginTop: 2,
          }}/>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 7.5, fontWeight: 700,
            letterSpacing: '.1em', color: '#f3dca0', opacity: .7, marginTop: 1,
          }}>TAP TO OPEN</div>
        </button>

        {/* meta line below */}
        <div style={{
          marginTop: 6,
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-mono)', fontSize: 10.5,
          color: 'var(--ink-3)', letterSpacing: '.08em',
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: 999,
            background: ctx.dotColor,
            boxShadow: `0 0 0 3px ${ctx.dotColor}33`,
          }}/>
          {ctx.status}
        </div>

        <button onClick={() => setFeedOpen(true)} style={{
          marginTop: 10,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--line)',
          color: '#fff7ea',
          border: 'none',
          borderRadius: 999,
          padding: '10px 16px',
          fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 13.5,
          cursor: 'pointer',
          boxShadow: 'var(--sh-2)',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: 999,
            background: 'var(--accent)',
          }}/>
          Open Peako's feed
          <span style={{
            background: 'var(--accent)', color: '#fff',
            borderRadius: 999, padding: '1px 7px',
            fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 800,
          }}>{ctx.unread}</span>
        </button>
      </div>

      {/* Quick actions — log meal / move */}
      <div style={{ padding: '18px 16px 0', display: 'flex', gap: 10 }}>
        <button className="squish-btn accent" style={{ flex: 1 }}>＋ Log meal</button>
        <button className="squish-btn ghost"  style={{ flex: 1 }}>＋ Log move</button>
      </div>

      <div style={{ padding: '18px 16px 0', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10.5,
          color: 'var(--ink-3)', letterSpacing: '.16em',
        }}>
          peako is watching · always
        </div>
      </div>
    </div>

    {feedOpen && <PeakoFeed onClose={() => setFeedOpen(false)} />}
    {diaryOpen && <DiaryModal stage={stage} onClose={() => setDiaryOpen(false)} />}
    </>
  );
}

// Expression-first. Bubble is optional (and max 4 words); glyph is primary.
// Mood swaps glyph + rare bubble wording — not verbosity.
const BASE_BY_STATE = {
  fresh: {
    scene: 'posting',
    mascotState: 'on-phone',
    draft: 'posted.',
    status: 'JUST POSTED',
    dotColor: 'var(--hi-deep)',
    unread: 3,
    glow: true,
  },
  idle: {
    scene: 'lounging',
    loungeVariant: 'gorogoro',
    mascotState: 'idle',
    status: 'IDLE',
    dotColor: 'var(--accent-2)',
    unread: 2,
    glow: false,
  },
  staring: {
    scene: 'lounging',
    loungeVariant: 'plotting',
    mascotState: 'side-eye',
    status: 'WATCHING',
    dotColor: 'var(--accent)',
    unread: 1,
    glow: false,
  },
  celebrating: {
    scene: 'lounging',
    loungeVariant: 'popcorn',
    mascotState: 'idle',
    status: 'DONE',
    dotColor: 'var(--hi-deep)',
    unread: 5,
    glow: true,
  },
};

// Per-mood glyph + (rare) bubble. Bubble only fires on state transition,
// and only for states where it earns its place.
const MOOD_OVERLAY = {
  sweet: {
    fresh:       { glyph: '♡',   bubble: 'yay.' },
    idle:        { glyph: '...', bubble: null },
    staring:     { glyph: '👀',  bubble: null },
    celebrating: { glyph: '✨',  bubble: 'nice!' },
  },
  deadpan: {
    fresh:       { glyph: '·',   bubble: 'posted.' },
    idle:        { glyph: '...', bubble: null },
    staring:     { glyph: '👀',  bubble: null },
    celebrating: { glyph: '✦',   bubble: 'fine.' },
  },
  gremlin: {
    fresh:       { glyph: '💢',  bubble: 'seen.' },
    idle:        { glyph: '...', bubble: null },
    staring:     { glyph: '👀',  bubble: null },
    celebrating: { glyph: '💢',  bubble: 'finally.' },
  },
};

function contextByState(state, mood) {
  const base = BASE_BY_STATE[state] || BASE_BY_STATE.fresh;
  const overlay = (MOOD_OVERLAY[mood] || MOOD_OVERLAY.deadpan)[state] || {};
  return { ...base, ...overlay };
}

// Transient 1–4 word bubble. Fades in, holds ~2s, fades out.
function TransientBubble({ text }) {
  return (
    <div style={{
      animation: 'bubbleIn .18s ease-out, bubbleOut .22s ease-in 2.58s both',
    }}>
      <style>{`
        @keyframes bubbleIn  { from { opacity: 0; transform: translateY(4px) scale(.96) } to { opacity: 1; transform: none } }
        @keyframes bubbleOut { from { opacity: 1 } to { opacity: 0; transform: translateY(-2px) } }
      `}</style>
      <div style={{
        background: 'var(--paper)', border: '1.5px solid var(--line)',
        borderRadius: 14, padding: '6px 12px',
        boxShadow: '0 2px 0 var(--line)',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
        color: 'var(--ink)', whiteSpace: 'nowrap',
      }}>{text}</div>
    </div>
  );
}

// Tiny cartoon glyph above Peako's head. Primary non-verbal channel.
function PeakoGlyph({ kind }) {
  if (!kind) return null;
  return (
    <div style={{
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20,
      color: 'var(--ink-2)', letterSpacing: '.04em',
      animation: 'glyphBob 2.4s ease-in-out infinite',
    }}>
      <style>{`
        @keyframes glyphBob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
      `}</style>
      {kind}
    </div>
  );
}

// Top chips — simplified look
function TopChips({ streak = 5, coins = 150 }) {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '8px 16px 2px' }}>
      <div className="chip" style={{ background: '#ffe9d2' }}>
        <span style={{ fontSize: 13 }}>🔥</span>
        <span>{streak} days</span>
      </div>
      <div className="chip" style={{ background: '#deecff' }}>
        <span style={{ fontSize: 13, color: 'var(--cool)' }}>◆</span>
        <span>{coins}</span>
      </div>
    </div>
  );
}

// ── Diary modal — Peako's running notes ──
function DiaryModal({ stage, onClose }) {
  const entries = [
    { d: 'TUE', t: "Showed up. Didn't complain. Growth." },
    { d: 'MON', t: "Ate the salad. I saw. I won't clap." },
    { d: 'SUN', t: "Rested. Properly. I approve, reluctantly." },
    { d: 'SAT', t: "Loud. Confident. Unearned but cute." },
    { d: 'FRI', t: "Skipped the walk. I noticed. We're moving on." },
    { d: 'THU', t: "Two glasses of water is not 'hydrating'." },
  ];
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 80,
      background: 'rgba(0,0,0,.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'fadeIn .2s',
    }}>
      <style>{`
        @keyframes fadeIn {from{opacity:0} to{opacity:1}}
        @keyframes flipUp {from{opacity:0; transform: rotate(-2deg) scale(.9)} to{opacity:1; transform: rotate(-1deg) scale(1)}}
      `}</style>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fef4d6', color: 'var(--ink)',
        border: '1.5px solid var(--line)', borderRadius: 14,
        boxShadow: '0 8px 0 var(--line), 0 20px 40px rgba(0,0,0,.3)',
        padding: '18px 18px 16px', maxWidth: 320, width: '100%',
        transform: 'rotate(-1deg)',
        animation: 'flipUp .3s cubic-bezier(.2,.8,.3,1) both',
        position: 'relative',
      }}>
        {/* Binding holes */}
        <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,.1)', border: '1px solid rgba(0,0,0,.15)' }}/>
          ))}
        </div>
        <div style={{ paddingLeft: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 999, background: 'var(--hi)',
              border: '1.5px solid var(--line)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}><MascotTiny size={28} stage={stage}/></div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 800, letterSpacing: '.12em', color: 'var(--ink-3)' }}>PEAKO'S DIARY</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-.01em' }}>running notes</div>
            </div>
            <div style={{ flex: 1 }}/>
            <button onClick={onClose} style={{
              width: 26, height: 26, borderRadius: 8, border: '1.5px solid var(--line)',
              background: 'transparent', cursor: 'pointer', fontWeight: 800,
            }}>×</button>
          </div>
          <div style={{ maxHeight: 340, overflowY: 'auto' }} className="hide-scroll">
            {entries.map((n, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, padding: '10px 0',
                borderTop: i ? '1px dashed rgba(0,0,0,.15)' : 'none',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--ink-3)', paddingTop: 4, minWidth: 26, letterSpacing: '.08em' }}>{n.d}</span>
                <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontSize: 15, lineHeight: 1.25, fontWeight: 600 }}>{n.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TodayScreen, BASE_BY_STATE, MOOD_OVERLAY, contextByState, DiaryModal, TransientBubble, PeakoGlyph });
