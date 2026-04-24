/* ═══════════════════════════════════════════════════════════════
   PEAKO — Feed (opens when user taps the phone)
   A full-screen feed of posts that Peako made reacting to user actions.
   Each user action → one post. Tone: cute-but-snarky (腹黑).
   ═══════════════════════════════════════════════════════════════ */

const FEED_POSTS = [
  {
    id: 'p1',
    t: '2m',
    kind: 'reaction',
    trigger: '+ Logged Afternoon Walk · 15 min',
    body: "oh?? we\u2019re walking now??? who is she.",
    reactions: { '👀': 3, '💅': 2, '🔥': 1 },
    pinned: true,
  },
  {
    id: 'p2',
    t: '1h',
    kind: 'milestone',
    trigger: 'Quest complete: Plank Patience',
    body: "60 seconds. held a plank. held a whole grudge in that time too.",
    sticker: '🧘',
    reactions: { '🏆': 4, '😤': 2 },
  },
  {
    id: 'p3',
    t: '3h',
    kind: 'rant',
    trigger: '+ Logged meal: bagel w/ cream cheese',
    body: "a bagel is a salad with extra steps. i accept this.",
    reactions: { '🥯': 6, '🥲': 3 },
  },
  {
    id: 'p4',
    t: '6h',
    kind: 'encouragement',
    trigger: 'Day 5 morning check-in',
    body: "you opened the app before noon. proud. terrified.",
    reactions: { '🫡': 5 },
  },
  {
    id: 'p5',
    t: 'yesterday',
    kind: 'recap',
    trigger: 'Day 4 wrap-up',
    body: "day 4: all three quests. a little insufferable about it too.",
    reactions: { '⭐': 9, '🙃': 4 },
  },
  {
    id: 'p6',
    t: '2d',
    kind: 'reaction',
    trigger: '+ Skipped: Morning run',
    body: "i saw that. we don\u2019t have to talk about it. unless you want to.",
    reactions: { '👀': 11 },
  },
];

function PeakoFeed({ onClose }) {
  const [tab, setTab] = React.useState('all');

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#13121a',
      color: '#fff7ea',
      fontFamily: 'var(--font-ui)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      animation: 'feedIn .3s cubic-bezier(.2,.8,.3,1) both',
    }}>
      <style>{`
        @keyframes feedIn {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Header — looks like a phone-app header because we're "inside Peako's phone" */}
      <div style={{
        padding: '14px 16px 10px',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        display: 'flex', alignItems: 'center', gap: 10,
        position: 'relative',
      }}>
        <button onClick={onClose} aria-label="close"
          style={{
            width: 34, height: 34, borderRadius: 999,
            background: 'rgba(255,255,255,.08)',
            border: '1px solid rgba(255,255,255,.15)',
            color: '#fff7ea', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2 L 12 12 M 12 2 L 2 12"/>
          </svg>
        </button>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: 'var(--hi)', border: '1.5px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <MascotTiny size={30} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', gap: 5 }}>
            peako
            <span style={{ fontSize: 11, padding: '2px 5px', background: 'var(--hi)', color: 'var(--line)', borderRadius: 4, fontWeight: 800 }}>POSTING</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'rgba(255,255,255,.5)', letterSpacing: '.06em', marginTop: 1 }}>
            @peako · day 5 · {FEED_POSTS.length} posts
          </div>
        </div>
        <button aria-label="more" style={{
          width: 34, height: 34, borderRadius: 999,
          background: 'transparent', border: 'none',
          color: 'rgba(255,255,255,.6)', cursor: 'pointer',
          fontSize: 20, fontWeight: 700,
        }}>⋯</button>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex', gap: 4,
        padding: '10px 12px 8px',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        overflowX: 'auto',
      }} className="hide-scroll">
        {[
          { id: 'all', l: 'all' },
          { id: 'reaction', l: 'reactions' },
          { id: 'milestone', l: 'milestones' },
          { id: 'rant', l: 'rants' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '7px 13px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,.15)',
            background: tab === t.id ? 'var(--hi)' : 'transparent',
            color: tab === t.id ? 'var(--line)' : 'rgba(255,255,255,.8)',
            fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 12.5,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{t.l}</button>
        ))}
      </div>

      {/* Feed scroll */}
      <div className="hide-scroll" style={{ flex: 1, overflowY: 'auto', padding: '8px 0 40px' }}>
        {FEED_POSTS
          .filter(p => tab === 'all' || p.kind === tab)
          .map(p => <FeedPost key={p.id} post={p} />)}

        <div style={{ textAlign: 'center', padding: '20px 0 10px',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '.1em' }}>
          — JOINED APR 19 —
        </div>
      </div>
    </div>
  );
}

function FeedPost({ post }) {
  return (
    <article style={{
      padding: '14px 16px',
      borderBottom: '1px solid rgba(255,255,255,.08)',
      display: 'flex', gap: 12,
    }}>
      {/* avatar */}
      <div style={{ flex: 'none', paddingTop: 2 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 999,
          background: 'var(--hi)', border: '1.5px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <MascotTiny size={32} />
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* header line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
          <span style={{ fontWeight: 800 }}>peako</span>
          <span style={{ color: 'rgba(255,255,255,.45)', fontSize: 12 }}>@peako</span>
          <span style={{ color: 'rgba(255,255,255,.35)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,.5)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{post.t}</span>
          {post.pinned && (
            <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--hi)', fontFamily: 'var(--font-mono)', letterSpacing: '.08em' }}>📌 PINNED</span>
          )}
        </div>

        {/* trigger chip — what the user did */}
        <div style={{
          marginTop: 6,
          fontFamily: 'var(--font-mono)', fontSize: 10.5,
          color: 'rgba(255,255,255,.55)', letterSpacing: '.04em',
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 8px',
          background: 'rgba(255,255,255,.06)',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,.1)',
        }}>
          <span style={{ color: 'var(--hi)' }}>↳</span>
          {post.trigger}
        </div>

        {/* body */}
        <div style={{
          marginTop: 8,
          fontSize: 15.5, lineHeight: 1.35, fontWeight: 600,
          textWrap: 'pretty',
          color: '#fff7ea',
        }}>
          {post.body}
        </div>

        {post.sticker && (
          <div style={{
            marginTop: 10,
            width: 72, height: 72,
            borderRadius: 14,
            background: 'rgba(139,212,143,.15)',
            border: '1.5px solid rgba(255,255,255,.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 34,
          }}>{post.sticker}</div>
        )}

        {/* reactions bar */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {Object.entries(post.reactions || {}).map(([e, n]) => (
            <button key={e} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 9px', borderRadius: 999,
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.12)',
              color: '#fff7ea',
              cursor: 'pointer',
              fontSize: 12, fontWeight: 700,
            }}>
              <span>{e}</span>
              <span style={{ color: 'rgba(255,255,255,.6)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{n}</span>
            </button>
          ))}
          <button aria-label="add reaction" style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'transparent',
            border: '1px dashed rgba(255,255,255,.2)',
            color: 'rgba(255,255,255,.5)',
            cursor: 'pointer', fontSize: 12,
          }}>＋</button>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { PeakoFeed, FEED_POSTS });
