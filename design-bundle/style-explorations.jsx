/* ═══════════════════════════════════════════════════════════════
   PEAKO — Style Explorations
   Six distinct visual languages, each rendering a placeholder
   Progress screen and You screen.
   Content is generic-stand-in; the point is the *style*.
   ═══════════════════════════════════════════════════════════════ */

/* ---------- tiny shared helpers (no shared style objects) ---------- */
const Frame = ({ bg, color, font, children }) => (
  <div style={{
    position: 'absolute', inset: 0, background: bg, color,
    fontFamily: font, overflow: 'hidden',
  }}>
    {children}
  </div>
);

const hideScroll = { scrollbarWidth: 'none', msOverflowStyle: 'none' };

/* Shared trail data — 21 days, fake states */
const TRAIL = Array.from({ length: 21 }, (_, i) => {
  const d = i + 1;
  const pat = ['done','done','partial','done','missed','rest','done'];
  let s;
  if (d < 8) s = pat[(d-1) % 7];
  else if (d === 8) s = 'today';
  else s = 'locked';
  return { d, s };
});

/* ═══════════════════════════════════════════════════════════════
   STYLE 1 — DUOLINGO-STYLE
   Thick borders, chunky offset shadows, saturated green
   ═══════════════════════════════════════════════════════════════ */
const DUO = {
  bg: '#fff', ink: '#1f1f1f', mute: '#777',
  green: '#58cc02', greenDark: '#58a700',
  yellow: '#ffc800', yellowDark: '#e5a700',
  red: '#ff4b4b', blue: '#1cb0f6',
  line: '#e5e5e5',
};

function DuoChunkyBtn({ bg, dark, children, full, size=16 }) {
  return (
    <div style={{
      display: 'inline-block', width: full ? '100%' : 'auto',
      background: bg, color: '#fff', fontWeight: 800,
      textTransform: 'uppercase', letterSpacing: '.06em',
      padding: '14px 20px', borderRadius: 14,
      boxShadow: `0 4px 0 ${dark}`, textAlign: 'center', fontSize: size,
    }}>{children}</div>
  );
}

function DuoProgress() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100, ...hideScroll }}>
      {/* Top chip bar */}
      <div style={{ display: 'flex', gap: 10, padding: '14px 16px 10px', alignItems: 'center' }}>
        <Pill icon="🔥" n="7" color={DUO.red}/>
        <Pill icon="💎" n="425" color={DUO.blue}/>
        <Pill icon="♥" n="5" color={DUO.red}/>
        <div style={{ flex: 1 }}/>
      </div>

      {/* Unit header */}
      <div style={{ margin: '4px 16px 16px', background: DUO.green, borderRadius: 16, padding: '14px 16px', color: '#fff', boxShadow: `0 4px 0 ${DUO.greenDark}` }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.12em', opacity: .85 }}>SECTION 1 · UNIT 2</div>
        <div style={{ fontSize: 19, fontWeight: 900, marginTop: 2 }}>Form a Habit</div>
      </div>

      {/* Path of circular nodes */}
      <div style={{ padding: '6px 0 16px', position: 'relative' }}>
        {['done','done','done','today','locked','locked','locked'].map((st, i) => {
          const x = [0.5, 0.72, 0.62, 0.40, 0.28, 0.42, 0.60][i];
          const color = st==='done' ? DUO.green : st==='today' ? DUO.yellow : '#e5e5e5';
          const dark = st==='done' ? DUO.greenDark : st==='today' ? DUO.yellowDark : '#cfcfcf';
          const icon = st==='done' ? '⭐' : st==='today' ? '▶' : '🔒';
          return (
            <div key={i} style={{
              position: 'relative', height: 86, marginBottom: 0,
            }}>
              <div style={{
                position: 'absolute', left: `${x*100}%`, transform: 'translateX(-50%)', top: 6,
                width: 80, height: 80, borderRadius: 999, background: color,
                boxShadow: `0 6px 0 ${dark}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 34, color: '#fff', fontWeight: 900,
                border: st==='locked' ? '2px dashed #bbb' : 'none',
              }}>{icon}</div>
              {st === 'today' && (
                <div style={{
                  position: 'absolute', left: `${x*100}%`, transform: 'translateX(-50%)',
                  top: -8, background: '#fff', border: `2px solid ${DUO.yellow}`,
                  borderRadius: 10, padding: '3px 8px', fontSize: 10, fontWeight: 900,
                  color: DUO.yellowDark, letterSpacing: '.1em',
                }}>START</div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '0 16px' }}>
        <DuoChunkyBtn bg={DUO.green} dark={DUO.greenDark} full>▶ Continue lesson</DuoChunkyBtn>
      </div>
    </div>
  );
}

function Pill({ icon, n, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 900, color }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 16 }}>{n}</span>
    </div>
  );
}

function DuoYou() {
  const stats = [['🔥','7','Day streak'],['⭐','1,240','Total XP'],['🏆','Silver','League'],['💎','425','Gems']];
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100, ...hideScroll }}>
      {/* Avatar header */}
      <div style={{ padding: '22px 16px 8px', display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{
          width: 82, height: 82, borderRadius: 999, background: DUO.green, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, fontWeight: 900, boxShadow: `0 5px 0 ${DUO.greenDark}`,
        }}>M</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>mia.</div>
          <div style={{ fontSize: 13, color: DUO.mute, fontWeight: 700 }}>Joined April 2026 · Lv 4</div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '12px 16px 4px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {stats.map(([ic, n, l]) => (
          <div key={l} style={{
            border: `2px solid ${DUO.line}`, borderBottomWidth: 4, borderRadius: 14,
            padding: '11px 12px', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ fontSize: 26 }}>{ic}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 900 }}>{n}</div>
              <div style={{ fontSize: 11, color: DUO.mute, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Friend streak CTA */}
      <div style={{ margin: '14px 16px 10px', background: '#fff1d6', border: `2px solid ${DUO.yellow}`, borderBottomWidth: 4, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 30 }}>🎯</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 900 }}>Daily Quest: 3 of 3</div>
          <div style={{ fontSize: 12, color: DUO.mute, fontWeight: 700 }}>Collect your chest →</div>
        </div>
      </div>

      {/* Rows */}
      <div style={{ padding: '4px 16px' }}>
        {[['👥','Add friends'],['🎒','Inventory'],['⚙','Settings']].map(([ic, l]) => (
          <div key={l} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px',
            border: `2px solid ${DUO.line}`, borderBottomWidth: 4, borderRadius: 14, marginBottom: 8,
          }}>
            <div style={{ fontSize: 22 }}>{ic}</div>
            <div style={{ fontSize: 15, fontWeight: 800 }}>{l}</div>
            <div style={{ flex: 1 }}/>
            <div style={{ color: DUO.mute, fontWeight: 900 }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Style1_Duo({ screen }) {
  return (
    <Frame bg={DUO.bg} color={DUO.ink} font="'Nunito', system-ui, sans-serif">
      {screen === 'progress' ? <DuoProgress/> : <DuoYou/>}
    </Frame>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLE 2 — NEOBRUTALIST POP
   Hard black borders, chunky offset shadows, big color blocks
   ═══════════════════════════════════════════════════════════════ */
const NB = {
  bg: '#f5f0e4', ink: '#0a0a0a',
  tomato: '#ff5a36', lime: '#c7f25d', lilac: '#b8a4ff', sky: '#7cd3ff', sun: '#ffdb4a',
};
const nbCard = { background: '#fff', border: '2.5px solid #0a0a0a', borderRadius: 6, boxShadow: '5px 5px 0 #0a0a0a' };

function NBProgress() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '16px 16px 110px', ...hideScroll }}>
      {/* Title slab */}
      <div style={{ ...nbCard, background: NB.tomato, color: '#fff', padding: '14px 14px', marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.18em' }}>/ PROGRESS</div>
        <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1, marginTop: 4, letterSpacing: '-.02em' }}>DAY 08.</div>
        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>the trail / still going</div>
      </div>

      {/* Mega stat */}
      <div style={{ ...nbCard, background: NB.lime, padding: '16px 14px', marginBottom: 12, display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div style={{ fontSize: 72, fontWeight: 900, lineHeight: .9, letterSpacing: '-.05em' }}>7</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 900 }}>DAYS</div>
          <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em' }}>streak · alive</div>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ fontSize: 32 }}>⚡</div>
      </div>

      {/* Grid of day blocks */}
      <div style={{ ...nbCard, padding: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.18em', marginBottom: 8 }}>/ 21 DAYS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
          {TRAIL.map(({d, s}) => {
            const bg = s==='done' ? NB.lime : s==='partial' ? NB.sun : s==='missed' ? NB.tomato : s==='today' ? NB.lilac : s==='rest' ? '#fff' : '#ededed';
            return (
              <div key={d} style={{
                aspectRatio: '1/1', border: '2px solid #0a0a0a', background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 13, boxShadow: s==='today' ? '2px 2px 0 #0a0a0a' : 'none',
              }}>{d}</div>
            );
          })}
        </div>
      </div>

      {/* Action block */}
      <div style={{ ...nbCard, background: NB.sky, padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 900 }}>LOG TODAY →</div>
          <div style={{ fontSize: 12, fontWeight: 800 }}>don't break the chain.</div>
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ width: 44, height: 44, background: '#0a0a0a', color: NB.sky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, borderRadius: 4 }}>→</div>
      </div>
    </div>
  );
}

function NBYou({}) {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '16px 16px 110px', ...hideScroll }}>
      {/* ID block */}
      <div style={{ ...nbCard, padding: 0, overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ background: NB.sun, padding: '10px 12px', borderBottom: '2.5px solid #0a0a0a', display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.18em' }}>/ ID — 0047</div>
          <div style={{ flex: 1 }}/>
          <div style={{ fontSize: 11, fontWeight: 900 }}>PHASE.01</div>
        </div>
        <div style={{ padding: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 84, height: 84, background: NB.lilac, border: '2.5px solid #0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 900 }}>M</div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-.02em' }}>MIA.</div>
            <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em' }}>snack-core · low-energy</div>
          </div>
        </div>
      </div>

      {/* Stat tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        {[['STREAK','7',NB.tomato,'#fff'],['LOGS','42',NB.lime,'#0a0a0a'],['PHASE','1/3',NB.sky,'#0a0a0a'],['DAYS','8',NB.lilac,'#0a0a0a']].map(([l,n,bg,fg]) => (
          <div key={l} style={{ ...nbCard, background: bg, color: fg, padding: '12px 12px' }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '.18em' }}>{l}</div>
            <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, marginTop: 4, letterSpacing: '-.04em' }}>{n}</div>
          </div>
        ))}
      </div>

      {/* List rows */}
      <div style={{ ...nbCard, padding: 0, overflow: 'hidden' }}>
        {['Notifications','Appearance','Export data','About peako','Sign out'].map((t,i,a) => (
          <div key={t} style={{ padding: '14px 14px', borderBottom: i===a.length-1?'none':'2px solid #0a0a0a', display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>{t}</div>
            <div style={{ flex: 1 }}/>
            <div style={{ fontSize: 18, fontWeight: 900 }}>→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Style2_Brutalist({ screen }) {
  return (
    <Frame bg={NB.bg} color={NB.ink} font="'Space Grotesk', 'Inter', system-ui, sans-serif">
      {screen === 'progress' ? <NBProgress/> : <NBYou/>}
    </Frame>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLE 3 — CLAY / 3D GRADIENT SOFT
   Pillowy shapes, pastel gradients, rounded everything
   ═══════════════════════════════════════════════════════════════ */
const CLAY = {
  bg: 'linear-gradient(170deg, #e4ecff 0%, #f7e7ff 55%, #ffe6eb 100%)',
  ink: '#2b2450', mute: '#8982b8',
  lilac: '#b8a8ff', mint: '#9befd0', peach: '#ffc1a8', yellow: '#ffe68a', pink: '#ffa8c8',
};
const clayShadow = '0 8px 16px rgba(70, 50, 130, .14), inset 0 -5px 0 rgba(0,0,0,.08), inset 0 2px 0 rgba(255,255,255,.6)';

function ClayBubble({ color, size=70, children, rot=0 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size/2,
      background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.8), ${color} 62%)`,
      boxShadow: clayShadow, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size/2.4, fontWeight: 900, color: '#fff', transform: `rotate(${rot}deg)`,
    }}>{children}</div>
  );
}

function ClayProgress() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '18px 18px 110px', ...hideScroll }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.14em', color: CLAY.mute }}>DAY 08 · PHASE 1</div>
      <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.03em', marginTop: 2 }}>Your trail</div>

      {/* Big ring */}
      <div style={{
        margin: '18px auto 14px', width: 220, height: 220, borderRadius: 999,
        background: `conic-gradient(${CLAY.lilac} 0 33%, ${CLAY.mint} 33% 33%, rgba(255,255,255,.35) 33% 100%)`,
        boxShadow: clayShadow,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 172, height: 172, borderRadius: 999,
          background: 'linear-gradient(160deg,#fff,#f3efff)',
          boxShadow: 'inset 0 6px 14px rgba(80,40,120,.1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, letterSpacing: '-.04em' }}>7</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: CLAY.mute, letterSpacing: '.1em' }}>DAY STREAK</div>
        </div>
      </div>

      {/* Bubble node row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'end' }}>
        {[[CLAY.mint,'✓'], [CLAY.mint,'✓'], [CLAY.mint,'✓'], [CLAY.peach,'▶'], [CLAY.pink,'·'], [CLAY.pink,'·'], [CLAY.pink,'·']].map(([c, g], i) => (
          <ClayBubble key={i} color={c} size={i===3 ? 58 : 44}>{g}</ClayBubble>
        ))}
      </div>

      {/* Soft cards */}
      {[['Logged snack', 'oatmeal + berries · 11:04am'], ['Walked a bit', '12 min · "counts"'], ['Posted to peako', 'liked by 3 plants']].map(([t, s]) => (
        <div key={t} style={{
          background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)',
          borderRadius: 24, padding: '14px 16px', marginBottom: 10,
          boxShadow: '0 4px 12px rgba(70, 50, 130, .1), inset 0 1px 0 rgba(255,255,255,.9)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 999, background: `linear-gradient(160deg, ${CLAY.peach}, ${CLAY.pink})`, boxShadow: clayShadow }}/>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{t}</div>
            <div style={{ fontSize: 12, color: CLAY.mute, fontWeight: 600 }}>{s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClayYou() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '22px 18px 110px', ...hideScroll }}>
      {/* Avatar blob */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <ClayBubble color={CLAY.lilac} size={120}>M</ClayBubble>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.02em' }}>mia.</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: CLAY.mute }}>plant-leaning · low-energy · member since apr</div>
      </div>

      {/* Stat bubbles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
        {[['7','streak',CLAY.peach],['42','logs',CLAY.mint],['3','badges',CLAY.yellow]].map(([n,l,c]) => (
          <div key={l} style={{
            background: 'rgba(255,255,255,.7)',
            borderRadius: 24, padding: '14px 8px', textAlign: 'center',
            boxShadow: '0 4px 12px rgba(70, 50, 130, .1)',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: `radial-gradient(circle at 30% 25%, #fff, ${c} 70%)`, boxShadow: clayShadow, margin: '0 auto 6px' }}/>
            <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: CLAY.mute, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Pill rows */}
      {['Your badges','Notifications','Appearance','Peako\'s voice','Sign out'].map((t,i) => (
        <div key={t} style={{
          background: 'rgba(255,255,255,.8)',
          borderRadius: 22, padding: '14px 16px', marginBottom: 8,
          boxShadow: '0 3px 8px rgba(70, 50, 130, .08)',
          display: 'flex', alignItems: 'center',
        }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{t}</div>
          <div style={{ flex: 1 }}/>
          <div style={{ color: CLAY.mute, fontWeight: 800 }}>›</div>
        </div>
      ))}
    </div>
  );
}

function Style3_Clay({ screen }) {
  return (
    <Frame bg={CLAY.bg} color={CLAY.ink} font="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif">
      {screen === 'progress' ? <ClayProgress/> : <ClayYou/>}
    </Frame>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLE 4 — RETRO ARCADE / PIXEL NEON
   CRT dark, neon pink/cyan, pixel font, scanlines
   ═══════════════════════════════════════════════════════════════ */
const ARC = {
  bg: '#0b0118', ink: '#f4e8ff', dim: '#8e7cc2',
  pink: '#ff49c8', cyan: '#49ffe5', yellow: '#ffee4a', purple: '#b24bff',
};

function ArcadeScanlines() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 3px)',
      mixBlendMode: 'overlay',
    }}/>
  );
}

function ArcadeProgress() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '16px 14px 110px', ...hideScroll }}>
      {/* HUD header */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: ARC.cyan, letterSpacing: '.2em' }}>1P ·</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: ARC.pink, textShadow: `0 0 10px ${ARC.pink}` }}>MIA</div>
        <div style={{ flex: 1 }}/>
        <div style={{ fontSize: 10, color: ARC.dim, letterSpacing: '.2em' }}>HI-SCORE</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: ARC.yellow }}>001240</div>
      </div>

      {/* Stage title */}
      <div style={{
        border: `2px solid ${ARC.pink}`, padding: '14px 14px', borderRadius: 0,
        boxShadow: `0 0 18px ${ARC.pink}44, inset 0 0 20px ${ARC.pink}22`,
        marginBottom: 14,
      }}>
        <div style={{ fontSize: 10, color: ARC.cyan, letterSpacing: '.2em' }}>STAGE 1-8</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: ARC.pink, textShadow: `0 0 14px ${ARC.pink}`, letterSpacing: '.05em' }}>THE · TRAIL</div>
        <div style={{ fontSize: 11, color: ARC.dim, letterSpacing: '.14em', marginTop: 4 }}>DAY 08 OF 21 // STREAK +07</div>
      </div>

      {/* Pixel grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 16 }}>
        {TRAIL.map(({d,s}) => {
          const c = s==='done' ? ARC.cyan : s==='partial' ? ARC.yellow : s==='missed' ? ARC.pink : s==='today' ? ARC.purple : '#261a3d';
          const glow = s !== 'locked' ? `0 0 10px ${c}` : 'none';
          return (
            <div key={d} style={{
              aspectRatio: '1/1', background: c, color: '#0b0118',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 900, boxShadow: glow,
            }}>{d}</div>
          );
        })}
      </div>

      {/* Lives bar */}
      <div style={{ border: `1.5px solid ${ARC.cyan}`, padding: '10px 12px', marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: ARC.cyan, letterSpacing: '.2em', marginBottom: 6 }}>POWER ·</div>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({length: 20}, (_, i) => (
            <div key={i} style={{ flex: 1, height: 10, background: i < 14 ? ARC.cyan : '#261a3d', boxShadow: i < 14 ? `0 0 6px ${ARC.cyan}` : 'none' }}/>
          ))}
        </div>
      </div>

      {/* Insert coin */}
      <div style={{ textAlign: 'center', padding: '14px 0', fontSize: 14, fontWeight: 900, color: ARC.yellow, textShadow: `0 0 10px ${ARC.yellow}`, letterSpacing: '.2em', animation: 'none' }}>
        ▶ CONTINUE? ◂
      </div>

      <ArcadeScanlines/>
    </div>
  );
}

function ArcadeYou() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '16px 14px 110px', ...hideScroll }}>
      {/* Player card */}
      <div style={{
        border: `2px solid ${ARC.cyan}`, padding: 14,
        boxShadow: `0 0 18px ${ARC.cyan}44, inset 0 0 20px ${ARC.cyan}22`,
        marginBottom: 14, display: 'flex', gap: 14, alignItems: 'center',
      }}>
        <div style={{
          width: 72, height: 72, background: ARC.purple, color: '#0b0118',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, fontWeight: 900, boxShadow: `0 0 14px ${ARC.purple}`,
        }}>M</div>
        <div>
          <div style={{ fontSize: 10, color: ARC.dim, letterSpacing: '.2em' }}>PLAYER</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: ARC.pink, letterSpacing: '.08em', textShadow: `0 0 10px ${ARC.pink}` }}>MIA_0047</div>
          <div style={{ fontSize: 11, color: ARC.cyan, letterSpacing: '.15em', marginTop: 2 }}>LV. 04 · PHASE 1</div>
        </div>
      </div>

      {/* Stat rows */}
      <div style={{ border: `1.5px solid ${ARC.dim}`, padding: 10, marginBottom: 14 }}>
        {[['STREAK','007'],['LOGS','042'],['COINS','0200'],['BADGES','03/12']].map(([l,n]) => (
          <div key={l} style={{ display: 'flex', padding: '6px 0', borderBottom: `1px dashed ${ARC.dim}44` }}>
            <div style={{ fontSize: 12, color: ARC.dim, letterSpacing: '.2em' }}>{l}</div>
            <div style={{ flex: 1 }}/>
            <div style={{ fontSize: 14, fontWeight: 900, color: ARC.yellow }}>{n}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      {['▶ BADGES','▶ FRIENDS','▶ SETTINGS','▶ SIGN OUT'].map(t => (
        <div key={t} style={{
          padding: '12px 12px', marginBottom: 6,
          border: `1.5px solid ${ARC.pink}44`, color: ARC.ink,
          fontSize: 13, fontWeight: 800, letterSpacing: '.15em',
        }}>{t}</div>
      ))}

      <ArcadeScanlines/>
    </div>
  );
}

function Style4_Arcade({ screen }) {
  return (
    <Frame bg={ARC.bg} color={ARC.ink} font="'VT323', 'Press Start 2P', monospace">
      {screen === 'progress' ? <ArcadeProgress/> : <ArcadeYou/>}
    </Frame>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLE 5 — ZINE / RISOGRAPH
   Cream paper, 2 risograph inks, grain, slight misregister
   ═══════════════════════════════════════════════════════════════ */
const RISO = {
  paper: '#f3ead5', ink: '#1a1410',
  pink: '#ff5a8c', blue: '#2b5fd9', highlight: '#ffd84a',
};

function RisoGrain() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .35,
      backgroundImage: 'radial-gradient(rgba(0,0,0,.4) 1px, transparent 1px)',
      backgroundSize: '3px 3px', mixBlendMode: 'multiply',
    }}/>
  );
}

function RisoProgress() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '22px 20px 110px', ...hideScroll }}>
      {/* Masthead */}
      <div style={{ borderBottom: `2px solid ${RISO.ink}`, paddingBottom: 10, marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.3em' }}>VOL.8 · ISSUE APR.26</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-.04em', fontFamily: "'Fraunces', serif", fontStyle: 'italic' }}>trail.</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: RISO.pink }}>— a small record</div>
        </div>
      </div>

      {/* Big mis-registered callout */}
      <div style={{ position: 'relative', marginBottom: 18 }}>
        <div style={{
          position: 'absolute', inset: 0, background: RISO.pink, transform: 'translate(3px, 3px)',
          mixBlendMode: 'multiply', opacity: .85,
        }}/>
        <div style={{
          position: 'relative', background: RISO.blue, color: RISO.paper,
          padding: '18px 16px', mixBlendMode: 'multiply',
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.2em' }}>/ DAY 08</div>
          <div style={{ fontSize: 32, fontFamily: "'Fraunces', serif", fontWeight: 800, fontStyle: 'italic', lineHeight: 1.05, marginTop: 4 }}>
            seven days in a row, somehow.
          </div>
        </div>
      </div>

      {/* Numbered editorial list */}
      {[['01','done.', 'seven days in a row'],
        ['02','partial.', 'three half-attempts'],
        ['03','missed.', 'only one — fine'],
        ['04','rest.', 'two, by design']].map(([n,t,s]) => (
        <div key={n} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${RISO.ink}33` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 28, color: RISO.pink, fontStyle: 'italic', minWidth: 36 }}>{n}</div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 18, fontStyle: 'italic' }}>{t}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{s}</div>
          </div>
        </div>
      ))}

      {/* Grid of days as bars */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.2em', marginBottom: 8 }}>— 21 DAY LEDGER —</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {TRAIL.map(({d, s}) => {
            const c = s === 'done' ? RISO.blue : s === 'partial' ? RISO.highlight : s === 'missed' ? RISO.pink : s === 'today' ? RISO.ink : 'transparent';
            return (
              <div key={d} style={{
                aspectRatio: '1/1.1', border: `1.5px solid ${RISO.ink}`, background: c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 14,
                color: s === 'done' || s === 'missed' || s === 'today' ? RISO.paper : RISO.ink,
                mixBlendMode: 'multiply',
              }}>{d}</div>
            );
          })}
        </div>
      </div>

      <RisoGrain/>
    </div>
  );
}

function RisoYou() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '22px 20px 110px', ...hideScroll }}>
      {/* Masthead */}
      <div style={{ borderBottom: `2px solid ${RISO.ink}`, paddingBottom: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.3em' }}>PROFILE · NO. 0047</div>
        <div style={{ fontSize: 54, fontFamily: "'Fraunces', serif", fontWeight: 800, fontStyle: 'italic', letterSpacing: '-.04em', lineHeight: 1 }}>mia.</div>
      </div>

      {/* Editorial two-col */}
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 14, marginBottom: 18 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: RISO.pink, transform: 'translate(2px,2px)', mixBlendMode: 'multiply' }}/>
          <div style={{
            position: 'relative', height: 104, background: RISO.blue, color: RISO.paper,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48, fontFamily: "'Fraunces', serif", fontWeight: 800, fontStyle: 'italic',
            mixBlendMode: 'multiply',
          }}>M</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.15em' }}>— ON</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 16, lineHeight: 1.4, marginTop: 2 }}>
            "likes snacks, hates cardio, keeps showing up anyway."
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', marginTop: 8 }}>MEMBER SINCE APR.19 · PHASE 1</div>
        </div>
      </div>

      {/* Stats run-in */}
      <div style={{ display: 'flex', gap: 16, padding: '14px 0', borderTop: `1px solid ${RISO.ink}`, borderBottom: `1px solid ${RISO.ink}`, marginBottom: 16 }}>
        {[['7','streak'],['42','logs'],['8','days'],['3','badges']].map(([n,l]) => (
          <div key={l} style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontStyle: 'italic', fontSize: 32, lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.18em', marginTop: 2 }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* List */}
      {['Badges & stickers','Notifications','Appearance','Peako\'s voice','Export data','Sign out'].map((t,i,a) => (
        <div key={t} style={{ padding: '13px 0', borderBottom: i===a.length-1 ? 'none' : `1px dashed ${RISO.ink}55`, display: 'flex' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600 }}>{t}</div>
          <div style={{ flex: 1 }}/>
          <div style={{ color: RISO.pink, fontFamily: "'Fraunces', serif", fontWeight: 800, fontStyle: 'italic' }}>→</div>
        </div>
      ))}

      <RisoGrain/>
    </div>
  );
}

function Style5_Riso({ screen }) {
  return (
    <Frame bg={RISO.paper} color={RISO.ink} font="'Inter', system-ui, sans-serif">
      {screen === 'progress' ? <RisoProgress/> : <RisoYou/>}
    </Frame>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLE 6 — KAWAII BUBBLEGUM
   Very sweet. Bubblegum pink + mint, bouncy fonts, stickers,
   dashed borders, hearts. Still readable.
   ═══════════════════════════════════════════════════════════════ */
const KW = {
  bg: '#fff4f8', ink: '#5a2a4a', mute: '#b17aa0',
  pink: '#ff8fb7', mint: '#9eeac7', lilac: '#cdb4ff', yellow: '#ffec8a', cream: '#fff9ec',
};

function KwBadge({ color, children, rot=-4 }) {
  return (
    <div style={{
      display: 'inline-block', padding: '5px 10px',
      background: color, color: '#fff', borderRadius: 999,
      fontSize: 11, fontWeight: 900, letterSpacing: '.08em',
      boxShadow: `0 3px 0 rgba(90,42,74,.2)`, transform: `rotate(${rot}deg)`,
    }}>{children}</div>
  );
}

function KwProgress() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '16px 16px 110px', ...hideScroll }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-.02em', color: KW.ink }}>My trail ♡</div>
        <div style={{ flex: 1 }}/>
        <KwBadge color={KW.pink} rot={4}>DAY 8 ✿</KwBadge>
      </div>
      <div style={{ fontSize: 12, color: KW.mute, fontWeight: 700, marginTop: 4 }}>tiny wins, stacked up &lt;3</div>

      {/* Big hero card */}
      <div style={{
        marginTop: 14, background: KW.cream,
        border: `2.5px dashed ${KW.pink}`, borderRadius: 28,
        padding: '16px 16px', position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 78, height: 78, borderRadius: 999,
            background: `radial-gradient(circle at 30% 30%, #fff, ${KW.pink} 70%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 38, color: '#fff',
          }}>🌸</div>
          <div>
            <div style={{ fontSize: 38, fontWeight: 900, lineHeight: 1, color: KW.ink }}>7 <span style={{ fontSize: 16 }}>days ♡</span></div>
            <div style={{ fontSize: 12, fontWeight: 700, color: KW.mute, marginTop: 4 }}>you're doing amazing, sweetie</div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: -6, top: -10, fontSize: 26, transform: 'rotate(14deg)' }}>✨</div>
        <div style={{ position: 'absolute', left: 10, bottom: -10, fontSize: 22, transform: 'rotate(-18deg)' }}>♡</div>
      </div>

      {/* Sticker day grid */}
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {TRAIL.map(({d,s}, i) => {
          const g = s==='done' ? '🌸' : s==='partial' ? '🍡' : s==='missed' ? '·' : s==='today' ? '✨' : '·';
          const bg = s==='done' ? KW.mint : s==='partial' ? KW.yellow : s==='today' ? KW.lilac : s==='missed' ? '#ffd6e0' : '#fff';
          return (
            <div key={d} style={{
              aspectRatio: '1/1', background: bg, borderRadius: 14,
              border: `1.5px dashed rgba(90,42,74,.3)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 800, color: KW.ink,
              transform: `rotate(${(i%3-1)*2}deg)`,
            }}>
              <div style={{ fontSize: 16, lineHeight: 1 }}>{g}</div>
              <div style={{ fontSize: 10, marginTop: 2 }}>{d}</div>
            </div>
          );
        })}
      </div>

      {/* Cute CTA */}
      <div style={{
        marginTop: 18, background: KW.pink, color: '#fff',
        borderRadius: 22, padding: '14px 16px', textAlign: 'center',
        fontSize: 15, fontWeight: 900,
        boxShadow: `0 5px 0 #e0709e`,
      }}>log today ♡</div>
    </div>
  );
}

function KwYou() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: '16px 16px 110px', ...hideScroll }}>
      {/* Hero */}
      <div style={{
        background: KW.cream, border: `2.5px dashed ${KW.lilac}`, borderRadius: 28,
        padding: '16px 16px', position: 'relative', marginBottom: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 999,
            background: `radial-gradient(circle at 30% 30%, #fff, ${KW.lilac} 70%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42, color: '#fff', fontWeight: 900,
          }}>M</div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-.02em' }}>mia ♡</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: KW.mute }}>plant-leaning · low-energy bb</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              <KwBadge color={KW.pink} rot={-3}>🌱 soft</KwBadge>
              <KwBadge color={KW.mint} rot={3}>♡ lv 4</KwBadge>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: -8, top: -10, fontSize: 28, transform: 'rotate(16deg)' }}>✿</div>
      </div>

      {/* Stat candies */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[['7','streak',KW.pink],['42','logs',KW.mint],['3','badges',KW.lilac]].map(([n,l,c],i) => (
          <div key={l} style={{
            background: '#fff', borderRadius: 20,
            border: `2px dashed ${c}`, padding: '10px 6px', textAlign: 'center',
            transform: `rotate(${(i-1)*2}deg)`,
          }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: KW.ink, lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 10, fontWeight: 800, color: KW.mute, letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Sticker book row */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '.1em', color: KW.mute, marginBottom: 8 }}>♡ STICKER BOOK</div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          {['🌸','🌷','⭐','🍡','🫧','☁','✨'].map((e,i) => (
            <div key={i} style={{
              minWidth: 52, height: 52, borderRadius: 14, background: i<3 ? KW.yellow : '#fff',
              border: `1.5px dashed rgba(90,42,74,.25)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              opacity: i<3 ? 1 : .4, transform: `rotate(${(i%3-1)*3}deg)`,
            }}>{e}</div>
          ))}
        </div>
      </div>

      {/* Menu */}
      {[['♡','Friends'],['✿','Notifications'],['☾','Appearance'],['☁','Peako\'s voice'],['✎','Export'],['◌','Sign out']].map(([g,t]) => (
        <div key={t} style={{
          background: '#fff', borderRadius: 18, padding: '12px 14px', marginBottom: 6,
          border: `1.5px dashed rgba(90,42,74,.18)`, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: KW.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: KW.ink }}>{g}</div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{t}</div>
          <div style={{ flex: 1 }}/>
          <div style={{ color: KW.mute, fontWeight: 900 }}>›</div>
        </div>
      ))}
    </div>
  );
}

function Style6_Kawaii({ screen }) {
  return (
    <Frame bg={KW.bg} color={KW.ink} font="'Quicksand', 'Nunito', system-ui, sans-serif">
      {screen === 'progress' ? <KwProgress/> : <KwYou/>}
    </Frame>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Placeholder tab bar — each style uses the same shape but its colors
   ═══════════════════════════════════════════════════════════════ */
function TabBar({ active, bg, fg, accent, border }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: bg, borderTop: border ? `1.5px solid ${border}` : 'none',
      padding: '10px 16px 30px', display: 'flex', justifyContent: 'space-around',
    }}>
      {[['today','Today'],['progress','Progress'],['you','You']].map(([k,l]) => (
        <div key={k} style={{
          fontSize: 11, fontWeight: 900, letterSpacing: '.12em',
          color: active===k ? accent : fg, padding: '6px 12px',
          borderRadius: 10, background: active===k ? `${accent}22` : 'transparent',
          textTransform: 'uppercase',
        }}>{l}</div>
      ))}
    </div>
  );
}

/* Each style rendered with matching tab bar */
function ScreenWithTabs({ StyleCmp, screen, tabBg, tabFg, tabAccent, tabBorder }) {
  return (
    <>
      <StyleCmp screen={screen}/>
      <TabBar active={screen} bg={tabBg} fg={tabFg} accent={tabAccent} border={tabBorder}/>
    </>
  );
}

/* Export all styles + their tab bar palette */
window.STYLES = [
  {
    id: 'duo',   name: 'Duolingo-style',    Cmp: Style1_Duo,
    desc: 'Thick borders, chunky offset shadows, saturated greens. Friendly & gamey.',
    tab: { bg: '#fff', fg: '#777', accent: '#58cc02', border: '#e5e5e5' },
  },
  {
    id: 'brut',  name: 'Neobrutalist pop',  Cmp: Style2_Brutalist,
    desc: 'Hard black borders, color blocks, offset shadows. Loud & direct.',
    tab: { bg: '#fff', fg: '#0a0a0a', accent: '#ff5a36', border: '#0a0a0a' },
  },
  {
    id: 'clay',  name: 'Clay / 3D soft',    Cmp: Style3_Clay,
    desc: 'Pillowy pastel gradients, rounded everything, glassmorphism. Dreamy.',
    tab: { bg: 'rgba(255,255,255,.7)', fg: '#8982b8', accent: '#b8a8ff', border: null },
  },
  {
    id: 'arc',   name: 'Retro arcade',      Cmp: Style4_Arcade,
    desc: 'CRT dark, neon cyan/pink, pixel fonts, scanlines. Nostalgic & playful.',
    tab: { bg: '#0b0118', fg: '#8e7cc2', accent: '#49ffe5', border: '#49ffe522' },
  },
  {
    id: 'riso',  name: 'Zine / risograph',  Cmp: Style5_Riso,
    desc: 'Cream paper, 2-ink riso, grain, serif italics. Editorial & tender.',
    tab: { bg: '#f3ead5', fg: '#1a1410', accent: '#ff5a8c', border: '#1a1410' },
  },
  {
    id: 'kw',    name: 'Kawaii bubblegum',  Cmp: Style6_Kawaii,
    desc: 'Pastel pinks, dashed borders, stickers & sparkles. Very sweet.',
    tab: { bg: '#fff4f8', fg: '#b17aa0', accent: '#ff8fb7', border: '#ffd6e0' },
  },
];

window.ScreenWithTabs = ScreenWithTabs;
