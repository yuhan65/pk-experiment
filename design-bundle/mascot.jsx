// mascot.jsx — 3 silhouette directions for Peako
// All designed to work at 40px avatar AND hero scale.
// Shared: big eyes, tiny mouth, strong silhouette, no bird.

// Direction A — "BLORB": a deflated-gummy-candy blob with limbs that aren't quite limbs.
// Gen-Z sticker energy. Thinks it's the smartest thing in the room.
function MascotBlorb({ size = 120, emotion = 'deadpan', color = '#c8ff3c', stroke = '#1a1814' }) {
  const eyes = EYES[emotion] || EYES.deadpan;
  const mouth = MOUTHS[emotion] || MOUTHS.deadpan;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block' }}>
      {/* squishy blob body */}
      <path
        d="M60 12 C92 10, 108 34, 106 62 C104 92, 86 110, 58 108 C28 106, 14 86, 16 58 C18 28, 34 14, 60 12 Z"
        fill={color} stroke={stroke} strokeWidth="3"
      />
      {/* shine */}
      <ellipse cx="38" cy="34" rx="10" ry="6" fill="#fff" opacity="0.45"/>
      {/* tiny stubby feet */}
      <ellipse cx="42" cy="110" rx="7" ry="3" fill={stroke}/>
      <ellipse cx="76" cy="110" rx="7" ry="3" fill={stroke}/>
      {/* face */}
      <g transform="translate(60 60)">{eyes({ stroke })}{mouth({ stroke })}</g>
    </svg>
  );
}

// Direction B — "SPUD": an anthropomorphic potato. Lumpy, weirdly dignified.
function MascotSpud({ size = 120, emotion = 'deadpan', color = '#d8b688', stroke = '#1a1814' }) {
  const eyes = EYES[emotion] || EYES.deadpan;
  const mouth = MOUTHS[emotion] || MOUTHS.deadpan;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block' }}>
      <path
        d="M36 20 C58 8, 94 14, 102 38 C110 60, 104 92, 80 104 C54 116, 22 106, 14 80 C6 54, 18 32, 36 20 Z"
        fill={color} stroke={stroke} strokeWidth="3"
      />
      {/* eyes (the potato kind) */}
      <circle cx="36" cy="50" r="2" fill={stroke} opacity="0.5"/>
      <circle cx="92" cy="78" r="1.6" fill={stroke} opacity="0.5"/>
      <circle cx="78" cy="28" r="1.8" fill={stroke} opacity="0.5"/>
      {/* face */}
      <g transform="translate(58 60)">{eyes({ stroke })}{mouth({ stroke })}</g>
    </svg>
  );
}

// Direction C — "CASSETTE": a desk-object character. A chunky mini cassette-recorder with a face.
// Fits the "screenshot-to-group-chat" vibe. Retro, weirdly specific, ownable.
function MascotCassette({ size = 120, emotion = 'deadpan', color = '#ff5a46', stroke = '#1a1814' }) {
  const eyes = EYES[emotion] || EYES.deadpan;
  const mouth = MOUTHS[emotion] || MOUTHS.deadpan;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block' }}>
      {/* body */}
      <rect x="14" y="20" width="92" height="82" rx="14" fill={color} stroke={stroke} strokeWidth="3"/>
      {/* screen */}
      <rect x="24" y="30" width="72" height="30" rx="6" fill="#f3efe6" stroke={stroke} strokeWidth="2.5"/>
      {/* face inside screen */}
      <g transform="translate(60 45)">{eyes({ stroke, compact: true })}{mouth({ stroke, compact: true })}</g>
      {/* reels */}
      <circle cx="40" cy="80" r="9" fill={stroke}/>
      <circle cx="40" cy="80" r="3" fill={color}/>
      <circle cx="80" cy="80" r="9" fill={stroke}/>
      <circle cx="80" cy="80" r="3" fill={color}/>
      {/* antenna */}
      <line x1="60" y1="20" x2="60" y2="8" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="60" cy="6" r="3" fill={stroke}/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Emotion library — big eyes + tiny mouths
// Centered at (0,0); called inside a translate to the face origin.
// ─────────────────────────────────────────────────────────────
const eye = (x, stroke, kind = 'dot') => {
  if (kind === 'dot') return <circle cx={x} cy="0" r="4" fill={stroke}/>;
  if (kind === 'line') return <line x1={x-5} y1="0" x2={x+5} y2="0" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>;
  if (kind === 'squint') return <path d={`M${x-5} 2 Q${x} -3 ${x+5} 2`} stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>;
  if (kind === 'side') return <circle cx={x+2} cy="0" r="4" fill={stroke}/>;
  if (kind === 'wide') return <circle cx={x} cy="0" r="6" fill="#fff" stroke={stroke} strokeWidth="2.5"/>;
  if (kind === 'heart') return <path d={`M${x} 4 l-4 -4 a2.5 2.5 0 1 1 4 -2 a2.5 2.5 0 1 1 4 2 Z`} fill={stroke}/>;
  if (kind === 'starry') return <path d={`M${x} -5 l1.3 3 3 0 -2.4 2 1 3 -2.9 -2 -2.9 2 1 -3 -2.4 -2 3 0 Z`} fill={stroke}/>;
  if (kind === 'closed') return <path d={`M${x-5} 0 Q${x} 4 ${x+5} 0`} stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>;
  if (kind === 'angry') return <path d={`M${x-6} -3 L${x+6} 3 M${x-6} 3 L${x+6} -3`} stroke={stroke} strokeWidth="3" strokeLinecap="round"/>;
  return <circle cx={x} cy="0" r="4" fill={stroke}/>;
};

const EYES = {
  deadpan:   ({ stroke }) => <g>{eye(-12, stroke)}{eye(12, stroke)}</g>,
  judging:   ({ stroke }) => <g>{eye(-12, stroke, 'squint')}{eye(12, stroke, 'squint')}</g>,
  impressed: ({ stroke }) => <g>{eye(-12, stroke, 'wide')}{eye(12, stroke, 'wide')}</g>,
  smug:      ({ stroke }) => <g>{eye(-12, stroke, 'closed')}{eye(12, stroke, 'closed')}</g>,
  bored:     ({ stroke }) => <g>{eye(-12, stroke, 'line')}{eye(12, stroke, 'line')}</g>,
  dontest:   ({ stroke }) => <g>{eye(-12, stroke, 'angry')}{eye(12, stroke, 'angry')}</g>,
  surprised: ({ stroke }) => <g>{eye(-13, stroke, 'wide')}{eye(13, stroke, 'wide')}</g>,
  sleepy:    ({ stroke }) => <g>{eye(-12, stroke, 'closed')}{eye(12, stroke, 'closed')}</g>,
  sus:       ({ stroke }) => <g>{eye(-12, stroke, 'squint')}{eye(12, stroke)}</g>,
  thinking:  ({ stroke }) => <g>{eye(-12, stroke, 'side')}{eye(12, stroke, 'side')}</g>,
  proud:     ({ stroke }) => <g>{eye(-12, stroke, 'closed')}{eye(12, stroke, 'closed')}</g>,
  unimpressed:({ stroke }) => <g>{eye(-12, stroke, 'line')}{eye(12, stroke)}</g>,
  love:      ({ stroke }) => <g>{eye(-12, stroke, 'starry')}{eye(12, stroke, 'starry')}</g>,
};

const MOUTHS = {
  deadpan:   ({ stroke, compact }) => <line x1="-5" y1={compact?12:16} x2="5" y2={compact?12:16} stroke={stroke} strokeWidth="3" strokeLinecap="round"/>,
  judging:   ({ stroke, compact }) => <line x1="-4" y1={compact?12:16} x2="4" y2={compact?12:16} stroke={stroke} strokeWidth="3" strokeLinecap="round" transform="rotate(-10)"/>,
  impressed: ({ stroke, compact }) => <path d={`M-5 ${compact?11:15} Q0 ${compact?17:21} 5 ${compact?11:15}`} stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>,
  smug:      ({ stroke, compact }) => <path d={`M-6 ${compact?11:15} Q-2 ${compact?15:19} 0 ${compact?12:16} Q3 ${compact?8:12} 7 ${compact?11:15}`} stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>,
  bored:     ({ stroke, compact }) => <line x1="-6" y1={compact?13:17} x2="6" y2={compact?13:17} stroke={stroke} strokeWidth="3" strokeLinecap="round"/>,
  dontest:   ({ stroke, compact }) => <path d={`M-6 ${compact?14:18} Q0 ${compact?9:13} 6 ${compact?14:18}`} stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>,
  surprised: ({ stroke, compact }) => <ellipse cx="0" cy={compact?13:17} rx="3" ry="4" fill={stroke}/>,
  sleepy:    ({ stroke, compact }) => <line x1="-3" y1={compact?13:17} x2="3" y2={compact?13:17} stroke={stroke} strokeWidth="3" strokeLinecap="round"/>,
  sus:       ({ stroke, compact }) => <path d={`M-5 ${compact?13:17} Q0 ${compact?11:15} 5 ${compact?14:18}`} stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>,
  thinking:  ({ stroke, compact }) => <line x1="-4" y1={compact?13:17} x2="4" y2={compact?13:17} stroke={stroke} strokeWidth="3" strokeLinecap="round"/>,
  proud:     ({ stroke, compact }) => <path d={`M-7 ${compact?11:15} Q0 ${compact?18:22} 7 ${compact?11:15}`} stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>,
  unimpressed:({ stroke, compact }) => <line x1="-6" y1={compact?13:17} x2="6" y2={compact?13:17} stroke={stroke} strokeWidth="3" strokeLinecap="round"/>,
  love:      ({ stroke, compact }) => <path d={`M-5 ${compact?11:15} Q0 ${compact?17:21} 5 ${compact?11:15}`} stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>,
};

// Universal avatar — picks whichever direction is currently "the one"
function PeakoAvatar({ size = 40, emotion = 'deadpan', variant = 'blorb' }) {
  if (variant === 'spud') return <MascotSpud size={size} emotion={emotion}/>;
  if (variant === 'cassette') return <MascotCassette size={size} emotion={emotion}/>;
  return <MascotBlorb size={size} emotion={emotion}/>;
}

Object.assign(window, { MascotBlorb, MascotSpud, MascotCassette, PeakoAvatar });
