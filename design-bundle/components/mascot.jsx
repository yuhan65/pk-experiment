/* ═══════════════════════════════════════════════════════════════
   PEAKO — mascot (blob only, 腹黑 personality)
   Cute rounded silhouette, subtly side-eyed / smug smirk.
   Supports contextual states: idle, on-phone, staring, typing, napping.
   ═══════════════════════════════════════════════════════════════ */

// Core blob drawing. Accepts an `expression` slot so callers can replace the face.
// `stage` controls growth: seed → sprout → teen → grown.
// Same silhouette backbone across stages — only the scale, crown, and accessories evolve.
function BlobBody({ size = 120, color = 'var(--hi)', line = 'var(--line)', tilt = 0, stage = 'grown', children }) {
  const S = STAGE_CONFIG[stage] || STAGE_CONFIG.grown;
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 120 132" style={{ display: 'block', transform: `rotate(${tilt}deg)` }}>
      {/* soft shadow under — smaller for seed */}
      <ellipse cx="60" cy="124" rx={38 * S.shadowScale} ry={4 * S.shadowScale} fill="rgba(0,0,0,.14)" />

      {/* Stage crown: seed has leaf-sprout-tuft, sprout has pair of leaves, teen has antenna, grown has antenna + little bob */}
      {stage === 'seed' && (
        <g>
          {/* tiny sprout shoot */}
          <path d="M60 32 Q56 22 58 14" stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M58 14 Q52 10 48 14 Q54 18 58 14 Z" fill="var(--hi-deep, #8bd48f)" stroke={line} strokeWidth="1.8"/>
        </g>
      )}
      {stage === 'sprout' && (
        <g>
          {/* two little leaves */}
          <path d="M60 28 Q56 18 58 10" stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M58 10 Q50 6 46 12 Q54 16 58 10 Z" fill="var(--hi-deep, #8bd48f)" stroke={line} strokeWidth="1.8"/>
          <path d="M58 14 Q66 10 70 16 Q62 20 58 14 Z" fill="var(--hi-deep, #8bd48f)" stroke={line} strokeWidth="1.8"/>
        </g>
      )}
      {stage === 'teen' && (
        <g>
          {/* single antenna, a little more dignified */}
          <line x1="60" y1="16" x2="60" y2="30" stroke={line} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="13" r="3.5" fill={color} stroke={line} strokeWidth="2" />
        </g>
      )}
      {stage === 'grown' && (
        <g>
          {/* antenna with tiny sparkle crown — earned */}
          <line x1="60" y1="16" x2="60" y2="30" stroke={line} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="13" r="3.5" fill="var(--accent-2, #ffd86b)" stroke={line} strokeWidth="2" />
          <path d="M54 8 L56 4 L58 8 M62 8 L64 4 L66 8" stroke={line} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity=".7"/>
        </g>
      )}

      {/* body — stage controls the vertical scale + curvature */}
      <g transform={`translate(60 ${S.bodyCy}) scale(${S.bodyW} ${S.bodyH}) translate(-60 -70)`}>
        <path d="M 28 70
                 C 22 46, 42 28, 60 28
                 C 80 28, 96 44, 94 68
                 C 92 90, 80 108, 60 110
                 C 40 110, 32 94, 28 70 Z"
              fill={color} stroke={line} strokeWidth={2.5 / Math.max(S.bodyW, S.bodyH)} strokeLinejoin="round" />
        <ellipse cx="52" cy="86" rx="20" ry="7" fill="rgba(255,255,255,.35)" />
      </g>

      {/* face area — scaled & repositioned by stage */}
      <g transform={`translate(${60 - 60 * S.faceScale} ${S.faceCy - 60 * S.faceScale}) scale(${S.faceScale})`}>
        {children}
      </g>

      {/* Grown only: cheeks slightly more defined (tiny glasses? no — just stage marker: a little scarf) */}
      {stage === 'grown' && (
        <g>
          {/* tiny scarf around "neck" */}
          <path d="M 36 102 Q 60 108 84 102 L 82 108 Q 60 113 38 108 Z"
                fill="var(--accent, #ff6068)" stroke={line} strokeWidth="2" strokeLinejoin="round"/>
        </g>
      )}
      {stage === 'teen' && (
        <g>
          {/* little headband-ish line at top */}
          <path d="M 36 42 Q 60 36 84 42" fill="none" stroke={line} strokeWidth="1.8" strokeLinecap="round" opacity=".5"/>
        </g>
      )}
    </svg>
  );
}

// Per-stage geometry + labels
const STAGE_CONFIG = {
  seed:   { bodyCy: 90, bodyW: 0.55, bodyH: 0.55, faceCy: 82, faceScale: 0.55, shadowScale: 0.55, label: 'SEED' },
  sprout: { bodyCy: 82, bodyW: 0.72, bodyH: 0.72, faceCy: 76, faceScale: 0.72, shadowScale: 0.72, label: 'SPROUT' },
  teen:   { bodyCy: 75, bodyW: 0.88, bodyH: 0.88, faceCy: 70, faceScale: 0.88, shadowScale: 0.88, label: 'TEEN' },
  grown:  { bodyCy: 70, bodyW: 1.0,  bodyH: 1.0,  faceCy: 60, faceScale: 1.0,  shadowScale: 1.0,  label: 'GROWN' },
};

// ── Expressions ────────────────────────────────────────────────
// All faces centered roughly around (60, 60) with eyes ~y=60

function FaceSly({ eye = '#1f1d1b' }) {
  return (
    <g>
      {/* eyes — squinty smug arcs */}
      <path d="M42 60 q4 -5 8 0" stroke={eye} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M70 60 q4 -5 8 0" stroke={eye} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      {/* smirk — asymmetric */}
      <path d="M52 76 Q 60 82, 70 74" stroke={eye} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      {/* cheeks */}
      <circle cx="38" cy="72" r="3.2" fill="rgba(255,96,104,.55)" />
      <circle cx="82" cy="72" r="3.2" fill="rgba(255,96,104,.55)" />
    </g>
  );
}

function FaceStaring({ eye = '#1f1d1b', dir = 'user' }) {
  // eyes look straight-at or side-eye
  const pupilOffset = dir === 'side' ? 2 : 0;
  return (
    <g>
      <ellipse cx="46" cy="60" rx="5.5" ry="6" fill="#fff" stroke={eye} strokeWidth="2"/>
      <ellipse cx="74" cy="60" rx="5.5" ry="6" fill="#fff" stroke={eye} strokeWidth="2"/>
      <circle cx={46 + pupilOffset} cy="61" r="2.4" fill={eye} />
      <circle cx={74 + pupilOffset} cy="61" r="2.4" fill={eye} />
      {/* tight little line — unimpressed */}
      <path d="M54 78 L 66 78" stroke={eye} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <circle cx="36" cy="72" r="3" fill="rgba(255,96,104,.55)" />
      <circle cx="84" cy="72" r="3" fill="rgba(255,96,104,.55)" />
    </g>
  );
}

function FaceSleepy({ eye = '#1f1d1b' }) {
  return (
    <g>
      <path d="M42 62 q4 0 8 0" stroke={eye} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <path d="M70 62 q4 0 8 0" stroke={eye} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <path d="M54 78 q 6 3, 12 0" stroke={eye} strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      <circle cx="38" cy="74" r="3" fill="rgba(255,96,104,.5)" />
      <circle cx="82" cy="74" r="3" fill="rgba(255,96,104,.5)" />
      <text x="92" y="36" fontSize="10" fontFamily="Fraunces, serif" fill={eye} opacity=".7">z</text>
      <text x="96" y="28" fontSize="8" fontFamily="Fraunces, serif" fill={eye} opacity=".5">z</text>
    </g>
  );
}

// Down-cast, looking-at-phone face (eyes aimed downward)
function FaceOnPhone({ eye = '#1f1d1b' }) {
  return (
    <g>
      <ellipse cx="46" cy="62" rx="5" ry="5.5" fill="#fff" stroke={eye} strokeWidth="2"/>
      <ellipse cx="74" cy="62" rx="5" ry="5.5" fill="#fff" stroke={eye} strokeWidth="2"/>
      <circle cx="46" cy="65" r="2.2" fill={eye} />
      <circle cx="74" cy="65" r="2.2" fill={eye} />
      {/* slight smirk — typing something smug */}
      <path d="M54 78 Q 60 82, 67 77" stroke={eye} strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      <circle cx="36" cy="74" r="3" fill="rgba(255,96,104,.55)" />
      <circle cx="84" cy="74" r="3" fill="rgba(255,96,104,.55)" />
    </g>
  );
}

// Tiny mascot (24–60px) — simple happy-blob for inline use. Respects stage for avatars.
function MascotTiny({ size = 32, color = 'var(--hi)', stage = 'grown' }) {
  const S = STAGE_CONFIG[stage] || STAGE_CONFIG.grown;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block' }}>
      {/* stage-specific top */}
      {stage === 'seed' && (
        <g>
          <path d="M60 38 Q58 26 60 18" stroke="var(--line)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M60 18 Q54 14 50 20 Q56 22 60 18 Z" fill="var(--hi-deep, #8bd48f)" stroke="var(--line)" strokeWidth="1.8"/>
        </g>
      )}
      {stage === 'sprout' && (
        <g>
          <path d="M60 32 Q56 20 58 12" stroke="var(--line)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M58 12 Q50 8 46 14 Q54 18 58 12 Z" fill="var(--hi-deep, #8bd48f)" stroke="var(--line)" strokeWidth="1.8"/>
        </g>
      )}
      {(stage === 'teen' || stage === 'grown') && (
        <>
          <line x1="60" y1="16" x2="60" y2="30" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="13" r="4" fill={stage === 'grown' ? 'var(--accent-2, #ffd86b)' : color} stroke="var(--line)" strokeWidth="2.5" />
        </>
      )}
      {/* body (scaled per stage) */}
      <g transform={`translate(60 ${68 * S.bodyH + 16}) scale(${S.bodyW} ${S.bodyH}) translate(-60 -66)`}>
        <path d="M 28 68 C 22 44, 42 28, 60 28 C 80 28, 96 42, 94 66 C 92 88, 80 104, 60 104 C 40 104, 32 92, 28 68 Z"
              fill={color} stroke="var(--line)" strokeWidth={3 / Math.max(S.bodyW, S.bodyH)}/>
      </g>
      {/* face — positioned relative to body */}
      <g transform={`translate(${60 - 60 * S.faceScale} ${(68 * S.bodyH + 16) - 66 * S.faceScale - 6}) scale(${S.faceScale})`}>
        <path d="M44 60 q4 -4 7 0" stroke="var(--line)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M69 60 q4 -4 7 0" stroke="var(--line)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M52 74 Q 60 80, 68 74" stroke="var(--line)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </g>
      {/* grown scarf */}
      {stage === 'grown' && (
        <path d="M 38 100 Q 60 106 82 100 L 80 106 Q 60 110 40 106 Z"
              fill="var(--accent, #ff6068)" stroke="var(--line)" strokeWidth="2" strokeLinejoin="round"/>
      )}
    </svg>
  );
}

// ── High-level mascot component with a `state` prop ───────────
// states: 'idle' · 'on-phone' · 'staring' · 'sleepy' · 'side-eye'
function Mascot({ state = 'idle', size = 120, color = 'var(--hi)', tilt = 0, stage = 'grown' }) {
  const FaceMap = {
    'idle':     <FaceSly/>,
    'on-phone': <FaceOnPhone/>,
    'staring':  <FaceStaring dir="user" />,
    'side-eye': <FaceStaring dir="side" />,
    'sleepy':   <FaceSleepy/>,
  };
  return <BlobBody size={size} color={color} tilt={tilt} stage={stage}>{FaceMap[state] || FaceMap.idle}</BlobBody>;
}

// ── Peako + Phone — the hero scene ─────────────────────────────
// Giant Peako holding / hunched over a phone, which the user taps
// to open the Feed. The phone shows a live notification badge.
function PeakoHoldingPhone({ size = 280, state = 'on-phone', unread = 3, onTapPhone, phoneLabel = '9:41', glow = false }) {
  // Layout: mascot big, phone overlaps lower-right of mascot
  // Using a wrapper so we can absolutely position the phone
  return (
    <div style={{ position: 'relative', width: size, height: size * 1.15 }}>
      {/* subtle aura when Peako just posted */}
      {glow && (
        <div style={{
          position: 'absolute',
          left: '50%', top: '55%',
          width: size * 1.3, height: size * 1.3,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139,212,143,.35), rgba(139,212,143,0) 60%)',
          pointerEvents: 'none',
          animation: 'breathe 3s ease-in-out infinite',
        }}/>
      )}

      {/* Mascot (big) */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Mascot state={state} size={size} />
      </div>

      {/* Little arms reaching forward to hold phone */}
      <svg width={size} height={size * 1.15} viewBox={`0 0 ${size} ${size * 1.15}`}
           style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* left arm */}
        <path d={`M ${size*0.32} ${size*0.68} Q ${size*0.42} ${size*0.82}, ${size*0.5} ${size*0.78}`}
              fill="none" stroke="var(--line)" strokeWidth={Math.max(3, size*0.018)} strokeLinecap="round"/>
        {/* right arm */}
        <path d={`M ${size*0.68} ${size*0.68} Q ${size*0.6} ${size*0.82}, ${size*0.52} ${size*0.78}`}
              fill="none" stroke="var(--line)" strokeWidth={Math.max(3, size*0.018)} strokeLinecap="round"/>
      </svg>

      {/* Phone — tappable */}
      <button onClick={onTapPhone}
        aria-label="Open Peako's feed"
        style={{
          position: 'absolute',
          left: '50%', top: '62%',
          width: size * 0.34, height: size * 0.52,
          transform: 'translate(-50%, 0) rotate(-4deg)',
          background: '#1a1822',
          border: '2.5px solid var(--line)',
          borderRadius: size * 0.06,
          boxShadow: '0 8px 20px rgba(0,0,0,.25), inset 0 0 0 3px #2a2834',
          padding: 0, cursor: 'pointer',
          overflow: 'hidden',
        }}>
        {/* screen */}
        <div style={{
          position: 'absolute', inset: 6,
          borderRadius: size * 0.04,
          background: 'linear-gradient(180deg, #20202c 0%, #1a1822 100%)',
          display: 'flex', flexDirection: 'column',
          padding: `${size*0.025}px ${size*0.02}px`,
          color: '#fff',
        }}>
          {/* tiny status */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: size * 0.028,
            color: 'rgba(255,255,255,.5)', letterSpacing: '.1em',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>peako</span><span>{phoneLabel}</span>
          </div>
          {/* headline bubble */}
          <div style={{
            marginTop: size * 0.04,
            background: 'var(--hi)',
            color: 'var(--line)',
            borderRadius: size * 0.025,
            padding: `${size*0.018}px ${size*0.024}px`,
            fontWeight: 800,
            fontSize: size * 0.042,
            lineHeight: 1.1,
            border: '1px solid rgba(0,0,0,.3)',
          }}>
            new post
          </div>
          <div style={{ flex: 1 }}/>
          {/* unread count */}
          <div style={{
            alignSelf: 'flex-end',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: 999,
            padding: `${size*0.008}px ${size*0.022}px`,
            fontSize: size * 0.034,
            fontWeight: 800,
            border: '1.5px solid var(--line)',
          }}>{unread} new</div>
        </div>
      </button>

      {/* Notification ping */}
      {unread > 0 && (
        <div style={{
          position: 'absolute',
          right: size * 0.22, top: size * 0.58,
          width: 16, height: 16, borderRadius: 999,
          background: 'var(--accent)',
          border: '2px solid var(--paper)',
          boxShadow: '0 0 0 2px var(--line)',
          animation: 'pop .35s cubic-bezier(.2,.8,.3,1.3) both, breathe 2.4s ease-in-out infinite',
        }}/>
      )}
    </div>
  );
}

// Simple speech bubble (above mascot)
function SpeechBubble({ children, tail = 'bottom-left', bg = 'var(--paper)', style = {} }) {
  return (
    <div style={{
      position: 'relative',
      background: bg,
      border: '1.5px solid var(--line)',
      borderRadius: 18,
      padding: '11px 14px',
      boxShadow: '0 3px 0 var(--line)',
      fontWeight: 700,
      fontSize: 14.5,
      lineHeight: 1.3,
      color: 'var(--ink)',
      maxWidth: 260,
      ...style,
    }}>
      {children}
      <div style={{
        position: 'absolute',
        ...(tail === 'bottom-left'
          ? { left: 22, bottom: -8 }
          : { right: 22, bottom: -8 }),
        width: 14, height: 14,
        background: bg,
        borderRight: '1.5px solid var(--line)',
        borderBottom: '1.5px solid var(--line)',
        transform: 'rotate(45deg)',
      }}/>
    </div>
  );
}

// Stage derivation: based on day of 21-day arc. Milestone-gated.
// seed: day 0 (pre-start) · sprout: after day 7 · teen: after day 14 · grown: after day 21.
function stageForDay(day) {
  if (day >= 21) return 'grown';
  if (day >= 14) return 'teen';
  if (day >= 7)  return 'sprout';
  return 'seed';
}

// ── Peako scenes: posting vs lounging ─────────────────────────
// Posting: Peako actively using phone (tapping keys, visible speech/draft)
// Lounging: phone tossed aside — Peako does NOT touch it. Multiple poses.

// The "posting" scene — only used when Peako just sent a post.
function PeakoPosting({ size = 280, stage = 'grown', draft = 'posting about you...', unread = 3, onTapPhone, phoneLabel = '9:41' }) {
  // Peako sits upright holding phone at chest height, visibly tapping it.
  // Tiny "tap" indicators above the screen + speech bubble showing what they're typing.
  const phoneW = size * 0.48;
  const phoneH = size * 0.62;
  return (
    <div style={{ position: 'relative', width: size, height: size * 1.15 }}>
      {/* glow when just posted */}
      <div style={{
        position: 'absolute', left: '50%', top: '55%',
        width: size * 1.3, height: size * 1.3,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(139,212,143,.35), rgba(139,212,143,0) 60%)',
        pointerEvents: 'none',
        animation: 'breathe 3s ease-in-out infinite',
      }}/>

      {/* Mascot, looking down at phone */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Mascot state="on-phone" size={size} stage={stage}/>
      </div>

      {/* Typing indicator bubble above */}
      <div style={{
        position: 'absolute', left: size * 0.58, top: size * 0.2,
        background: 'var(--paper)',
        border: '1.5px solid var(--line)',
        borderRadius: 18,
        padding: '6px 11px',
        display: 'flex', alignItems: 'center', gap: 4,
        boxShadow: '0 3px 0 var(--line)',
        animation: 'bob 2s ease-in-out infinite',
      }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: 999, background: 'var(--ink)',
            animation: `typingDot 1.2s ${i*0.15}s ease-in-out infinite`,
          }}/>
        ))}
      </div>

      {/* Arms reaching down to phone — tapping pose */}
      <svg width={size} height={size * 1.15} viewBox={`0 0 ${size} ${size * 1.15}`}
           style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* left arm curving inward */}
        <path d={`M ${size*0.30} ${size*0.70} Q ${size*0.36} ${size*0.86}, ${size*0.46} ${size*0.82}`}
              fill="none" stroke="var(--line)" strokeWidth={Math.max(3, size*0.018)} strokeLinecap="round"/>
        {/* right arm */}
        <path d={`M ${size*0.70} ${size*0.70} Q ${size*0.64} ${size*0.86}, ${size*0.54} ${size*0.82}`}
              fill="none" stroke="var(--line)" strokeWidth={Math.max(3, size*0.018)} strokeLinecap="round"/>
        {/* finger tap accent */}
        <circle cx={size*0.50} cy={size*0.82} r={3} fill="var(--accent)" stroke="var(--line)" strokeWidth="1.5">
          <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
        </circle>
      </svg>

      {/* The phone — held in both hands, visible screen */}
      <button onClick={onTapPhone}
        aria-label="Open Peako's feed"
        style={{
          position: 'absolute',
          left: '50%', top: '60%',
          width: phoneW, height: phoneH,
          transform: 'translate(-50%, 0) rotate(-3deg)',
          background: '#1a1822',
          border: '2.5px solid var(--line)',
          borderRadius: size * 0.05,
          boxShadow: '0 8px 20px rgba(0,0,0,.25), inset 0 0 0 3px #2a2834',
          padding: 0, cursor: 'pointer',
          overflow: 'hidden',
        }}>
        <PhoneScreen size={size} draft={draft} unread={unread} phoneLabel={phoneLabel} typing/>
      </button>

      {/* Ping notification */}
      {unread > 0 && (
        <div style={{
          position: 'absolute',
          right: size * 0.20, top: size * 0.54,
          width: 16, height: 16, borderRadius: 999,
          background: 'var(--accent)',
          border: '2px solid var(--paper)',
          boxShadow: '0 0 0 2px var(--line)',
          animation: 'pop .35s cubic-bezier(.2,.8,.3,1.3) both, breathe 2.4s ease-in-out infinite',
        }}/>
      )}
    </div>
  );
}

// Shared phone screen contents
function PhoneScreen({ size, draft, unread, phoneLabel, typing = false, dim = false }) {
  return (
    <div style={{
      position: 'absolute', inset: 6,
      borderRadius: size * 0.04,
      background: dim
        ? 'linear-gradient(180deg, #15131c 0%, #0e0c14 100%)'
        : 'linear-gradient(180deg, #20202c 0%, #1a1822 100%)',
      display: 'flex', flexDirection: 'column',
      padding: `${size*0.025}px ${size*0.02}px`,
      color: '#fff',
      opacity: dim ? 0.8 : 1,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: size * 0.028,
        color: 'rgba(255,255,255,.5)', letterSpacing: '.1em',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>peako</span><span>{phoneLabel}</span>
      </div>
      {typing ? (
        <div style={{
          marginTop: size * 0.04,
          background: 'var(--hi)',
          color: 'var(--line)',
          borderRadius: size * 0.025,
          padding: `${size*0.018}px ${size*0.024}px`,
          fontWeight: 800,
          fontSize: size * 0.038,
          lineHeight: 1.2,
          border: '1px solid rgba(0,0,0,.3)',
        }}>{draft}<span style={{ opacity: .5 }}>|</span></div>
      ) : (
        <div style={{ marginTop: size * 0.04, display: 'flex', flexDirection: 'column', gap: size*0.014 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              height: size * 0.05, borderRadius: size * 0.014,
              background: 'rgba(255,255,255,.1)',
              width: `${90 - i*18}%`,
            }}/>
          ))}
        </div>
      )}
      <div style={{ flex: 1 }}/>
      <div style={{
        alignSelf: 'flex-end',
        background: unread > 0 ? 'var(--accent)' : 'rgba(255,255,255,.15)',
        color: '#fff',
        borderRadius: 999,
        padding: `${size*0.008}px ${size*0.022}px`,
        fontSize: size * 0.032,
        fontWeight: 800,
        border: '1.5px solid var(--line)',
      }}>{unread} {unread > 0 ? 'new' : 'seen'}</div>
    </div>
  );
}

// ── Lounging scenes — Peako does NOT touch the phone. ─────────
// Phone is tossed to the side; it buzzes/glows with notifications.
// variants: 'gorogoro' | 'loaf' | 'popcorn' | 'plotting'

function PeakoLounging({ size = 280, stage = 'grown', variant = 'gorogoro', mascotState = 'idle', unread = 3, onTapPhone, phoneLabel = '9:41' }) {
  const scene = LOUNGE_SCENES[variant] || LOUNGE_SCENES.gorogoro;
  const phoneW = size * 0.26;
  const phoneH = size * 0.38;
  return (
    <div style={{ position: 'relative', width: size, height: size * 1.15 }}>
      {/* Floor mat / rug accent — only sometimes */}
      {scene.rug && (
        <div style={{
          position: 'absolute',
          left: '50%', top: '70%', transform: 'translate(-50%, 0)',
          width: size * 0.95, height: size * 0.25,
          borderRadius: '50%',
          background: 'rgba(255,96,104,.08)',
          border: '1.5px dashed rgba(31,29,27,.14)',
        }}/>
      )}

      {/* The phone — OFF TO THE SIDE, dim, with notif pings */}
      <button onClick={onTapPhone}
        aria-label="Open Peako's feed"
        style={{
          position: 'absolute',
          left: `${scene.phone.x * 100}%`,
          top: `${scene.phone.y * 100}%`,
          width: phoneW, height: phoneH,
          transform: `translate(-50%, -50%) rotate(${scene.phone.rot}deg)`,
          background: '#1a1822',
          border: '2px solid var(--line)',
          borderRadius: size * 0.04,
          boxShadow: '0 4px 10px rgba(0,0,0,.2)',
          padding: 0, cursor: 'pointer',
          overflow: 'hidden',
        }}>
        <PhoneScreen size={size * 0.6} draft="" unread={unread} phoneLabel={phoneLabel} dim/>
      </button>

      {/* Notification pings rising from the phone */}
      {unread > 0 && [0,1].map(i => (
        <div key={i} style={{
          position: 'absolute',
          left: `calc(${scene.phone.x * 100}% + ${6 + i*4}px)`,
          top: `calc(${scene.phone.y * 100}% - ${20 + i*6}px)`,
          background: 'var(--accent)', color: '#fff',
          border: '1.5px solid var(--line)',
          borderRadius: 999,
          padding: '2px 7px',
          fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800,
          transform: 'translate(-50%, 0)',
          animation: `floatUp 2.2s ${i*0.7}s ease-in-out infinite`,
          opacity: 0,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          {i === 0 ? `+${unread}` : 'ping'}
        </div>
      ))}

      {/* Peako pose — custom SVG per variant */}
      <div style={{
        position: 'absolute',
        left: `${scene.peako.x * 100}%`, top: `${scene.peako.y * 100}%`,
        transform: `translate(-50%, -50%) rotate(${scene.peako.rot}deg) scaleX(${scene.peako.flip ? -1 : 1})`,
        width: size * scene.peako.scale,
      }}>
        <PeakoPose variant={variant} size={size * scene.peako.scale} stage={stage} mascotState={mascotState}/>
      </div>

      {/* Zzz or speech accent for some variants */}
      {scene.accent && (
        <div style={{
          position: 'absolute',
          left: `${scene.accent.x * 100}%`, top: `${scene.accent.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)', fontSize: scene.accent.size || 18,
          fontWeight: 700, color: 'var(--ink-3)', opacity: .7,
          fontStyle: 'italic',
        }}>{scene.accent.text}</div>
      )}
    </div>
  );
}

// Positions of Peako + phone per lounge variant. All fractions of the container.
const LOUNGE_SCENES = {
  // gorogoro = Peako sprawled, rolling on the floor, phone thrown away
  gorogoro: {
    rug: true,
    peako: { x: 0.42, y: 0.58, rot: -82, scale: 0.72, flip: false },
    phone: { x: 0.80, y: 0.72, rot: 22 },
    accent: { text: 'gorogoro', x: 0.28, y: 0.32, size: 16 },
  },
  // loaf = Peako in compact bread loaf pose
  loaf: {
    rug: false,
    peako: { x: 0.48, y: 0.64, rot: 0, scale: 0.78, flip: false },
    phone: { x: 0.82, y: 0.80, rot: -18 },
    accent: { text: '...', x: 0.48, y: 0.28, size: 22 },
  },
  // popcorn = Peako propped up, watching something in the air (show)
  popcorn: {
    rug: true,
    peako: { x: 0.44, y: 0.62, rot: -8, scale: 0.76, flip: false },
    phone: { x: 0.15, y: 0.78, rot: -40 },
    accent: { text: '🍿', x: 0.72, y: 0.42, size: 28 },
  },
  // plotting = curled up, side-eyeing, phone just out of reach
  plotting: {
    rug: false,
    peako: { x: 0.44, y: 0.6, rot: 0, scale: 0.78, flip: false },
    phone: { x: 0.82, y: 0.66, rot: 12 },
    accent: { text: '…', x: 0.70, y: 0.48, size: 20 },
  },
};

// The actual Peako pose rendering — one SVG per variant, with face expression swap
function PeakoPose({ variant, size, stage = 'grown', mascotState = 'idle' }) {
  if (variant === 'gorogoro') return <PoseGorogoro size={size} stage={stage} mascotState={mascotState}/>;
  if (variant === 'loaf')     return <PoseLoaf size={size} stage={stage} mascotState={mascotState}/>;
  if (variant === 'popcorn')  return <PosePopcorn size={size} stage={stage} mascotState={mascotState}/>;
  if (variant === 'plotting') return <PosePlotting size={size} stage={stage} mascotState={mascotState}/>;
  return <Mascot state={mascotState} size={size} stage={stage}/>;
}

// Umaru-style sprawl: Peako on floor, limbs kicked out, bored face up
function PoseGorogoro({ size = 200, stage, mascotState }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 200 180" style={{ display: 'block' }}>
      {/* shadow */}
      <ellipse cx="100" cy="158" rx="78" ry="8" fill="rgba(0,0,0,.14)"/>
      {/* body — elongated horizontal blob (lying down) */}
      <path d="M 30 100
               C 24 70, 60 58, 100 58
               C 140 58, 178 72, 174 104
               C 170 134, 140 148, 100 150
               C 60 152, 36 130, 30 100 Z"
            fill="var(--hi)" stroke="var(--line)" strokeWidth="2.5"/>
      {/* belly highlight */}
      <ellipse cx="80" cy="120" rx="34" ry="10" fill="rgba(255,255,255,.35)"/>
      {/* stubby limbs kicking */}
      <path d="M 50 140 Q 40 164, 60 170" fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 140 138 Q 158 150, 148 172" fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 46 82  Q 24 68, 30 50"   fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 152 78 Q 176 62, 172 42" fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round"/>
      {/* face — eyes closed content / bored */}
      <g transform="translate(100 100)">
        {mascotState === 'sleepy' ? (
          <>
            <path d="M-22 -6 q4 0 8 0" stroke="var(--line)" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
            <path d="M 14 -6 q4 0 8 0" stroke="var(--line)" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
          </>
        ) : (
          <>
            <path d="M-22 -4 q4 -5 8 0" stroke="var(--line)" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
            <path d="M 14 -4 q4 -5 8 0" stroke="var(--line)" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
          </>
        )}
        <path d="M-8 14 q 8 4, 16 0" stroke="var(--line)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <circle cx="-28" cy="6" r="3" fill="rgba(255,96,104,.55)"/>
        <circle cx="28"  cy="6" r="3" fill="rgba(255,96,104,.55)"/>
      </g>
      {/* crown per stage */}
      {stage === 'grown' && (
        <circle cx="100" cy="54" r="4" fill="var(--accent-2, #ffd86b)" stroke="var(--line)" strokeWidth="2"/>
      )}
    </svg>
  );
}

// Loaf pose — compact, paws tucked
function PoseLoaf({ size = 200, stage, mascotState }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 200 180" style={{ display: 'block' }}>
      <ellipse cx="100" cy="160" rx="70" ry="6" fill="rgba(0,0,0,.14)"/>
      {/* rounded loaf body */}
      <path d="M 40 150
               C 38 100, 60 70, 100 70
               C 140 70, 162 100, 160 150
               L 40 150 Z"
            fill="var(--hi)" stroke="var(--line)" strokeWidth="2.5"/>
      <ellipse cx="88" cy="128" rx="30" ry="8" fill="rgba(255,255,255,.35)"/>
      {/* face — contented squint */}
      <g transform="translate(100 110)">
        <path d="M-22 -2 q4 -4 8 0" stroke="var(--line)" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M 14 -2 q4 -4 8 0" stroke="var(--line)" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M -6 14 q 6 3, 12 0" stroke="var(--line)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <circle cx="-26" cy="6" r="3" fill="rgba(255,96,104,.55)"/>
        <circle cx="26"  cy="6" r="3" fill="rgba(255,96,104,.55)"/>
      </g>
      {/* antenna per stage */}
      {(stage === 'teen' || stage === 'grown') && (
        <>
          <line x1="100" y1="70" x2="100" y2="56" stroke="var(--line)" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="100" cy="53" r="3.5" fill={stage === 'grown' ? 'var(--accent-2, #ffd86b)' : 'var(--hi)'} stroke="var(--line)" strokeWidth="2"/>
        </>
      )}
      {/* scarf for grown */}
      {stage === 'grown' && (
        <path d="M 56 140 Q 100 148 144 140 L 142 150 Q 100 156 58 150 Z"
              fill="var(--accent)" stroke="var(--line)" strokeWidth="2" strokeLinejoin="round"/>
      )}
    </svg>
  );
}

// Popcorn pose — propped on elbow, watching something
function PosePopcorn({ size = 200, stage, mascotState }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 200 180" style={{ display: 'block' }}>
      <ellipse cx="100" cy="160" rx="78" ry="7" fill="rgba(0,0,0,.14)"/>
      {/* body — oblong, tilted up on one side */}
      <path d="M 26 120
               C 22 78, 70 60, 110 66
               C 158 72, 180 100, 170 132
               C 160 160, 100 164, 62 158
               C 30 152, 28 140, 26 120 Z"
            fill="var(--hi)" stroke="var(--line)" strokeWidth="2.5"/>
      <ellipse cx="90" cy="130" rx="30" ry="8" fill="rgba(255,255,255,.35)"/>
      {/* propping arm */}
      <path d="M 40 120 Q 26 100, 36 80" fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round"/>
      {/* free arm gesture */}
      <path d="M 140 96 Q 156 88, 160 76" fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round"/>
      {/* face — wide attentive eyes */}
      <g transform="translate(100 104)">
        <ellipse cx="-18" cy="0" rx="5" ry="5.5" fill="#fff" stroke="var(--line)" strokeWidth="2"/>
        <ellipse cx="18"  cy="0" rx="5" ry="5.5" fill="#fff" stroke="var(--line)" strokeWidth="2"/>
        <circle cx="-17" cy="1" r="2.2" fill="var(--line)"/>
        <circle cx="19"  cy="1" r="2.2" fill="var(--line)"/>
        <path d="M -6 14 q 6 2, 12 0" stroke="var(--line)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      </g>
      {stage === 'grown' && (
        <circle cx="110" cy="60" r="4" fill="var(--accent-2, #ffd86b)" stroke="var(--line)" strokeWidth="2"/>
      )}
    </svg>
  );
}

// Plotting pose — curled side, smug side-eye
function PosePlotting({ size = 200, stage, mascotState }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 200 180" style={{ display: 'block' }}>
      <ellipse cx="100" cy="160" rx="66" ry="6" fill="rgba(0,0,0,.14)"/>
      {/* body — curled oval */}
      <path d="M 44 80
               C 40 40, 100 40, 140 60
               C 170 76, 176 130, 140 150
               C 100 164, 50 150, 40 120
               C 36 100, 44 96, 44 80 Z"
            fill="var(--hi)" stroke="var(--line)" strokeWidth="2.5"/>
      <ellipse cx="100" cy="130" rx="36" ry="9" fill="rgba(255,255,255,.35)"/>
      {/* tail-like curl */}
      <path d="M 44 130 Q 28 140 36 154" fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round"/>
      {/* face — side-eye smug */}
      <g transform="translate(108 92)">
        <path d="M-22 -2 q4 -5 8 0" stroke="var(--line)" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <ellipse cx="18" cy="0" rx="4.5" ry="5" fill="#fff" stroke="var(--line)" strokeWidth="2"/>
        <circle cx="20" cy="1" r="2" fill="var(--line)"/>
        {/* smirk */}
        <path d="M -6 14 Q 2 18, 10 12" stroke="var(--line)" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <circle cx="-26" cy="8" r="3" fill="rgba(255,96,104,.55)"/>
      </g>
      {stage === 'grown' && (
        <circle cx="100" cy="46" r="4" fill="var(--accent-2, #ffd86b)" stroke="var(--line)" strokeWidth="2"/>
      )}
    </svg>
  );
}

// Keyframes used by scenes
const SceneKeyframes = () => (
  <style>{`
    @keyframes typingDot { 0%, 100% { opacity: .2; transform: translateY(0) } 40% { opacity: 1; transform: translateY(-2px) } }
    @keyframes floatUp { 0% { opacity: 0; transform: translate(-50%, 6px) } 15% { opacity: 1 } 100% { opacity: 0; transform: translate(-50%, -28px) } }
    @keyframes bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
  `}</style>
);

Object.assign(window, { PeakoPosting, PeakoLounging, LOUNGE_SCENES, SceneKeyframes });
