/* ═══════════════════════════════════════════════════════════════
   PEAKO — Progress (Trail only)
   Single purpose: the user's record / the journey.
   Two zoom levels: DAY (default) and WEEK (overview).
   Streak lives in the header, not in a card.
   No Dashboard. No Peako commentary (that's in Today).
   ═══════════════════════════════════════════════════════════════ */

// ── Trail data: 21 days, 3 biomes, state derived from growthDay ──
function buildTrailDays(growthDay) {
  const realizedPattern = [
    'done','done','partial','done','missed','rest','done',
    'done','done','partial','done','done','rest','done',
    'done','partial','done','done','done','rest',
  ];
  const milestones = { 7: 'Phase 1 clear', 14: 'Phase 2 clear', 21: 'You made it' };
  const out = [];
  for (let d = 1; d <= 21; d++) {
    let state;
    if (d < growthDay) state = realizedPattern[d - 1] || 'done';
    else if (d === growthDay) state = 'today';
    else state = 'locked';
    if (growthDay > 21 && d === 21) state = 'done';
    out.push({ d, state, milestone: milestones[d] });
  }
  return out;
}

const X_PATTERN = [0.50, 0.72, 0.62, 0.38, 0.28, 0.42, 0.58];

const BIOMES = {
  meadow: { bg: '#eef6e4', ink: 'var(--ink)', accent: 'var(--hi)',     label: 'PHASE 1 · MEADOW', emoji: '🌱' },
  desert: { bg: '#ffe8d6', ink: 'var(--ink)', accent: 'var(--accent)', label: 'PHASE 2 · DESERT', emoji: '🌵' },
  night:  { bg: '#201b33', ink: '#fff7ea',    accent: 'var(--plum)',   label: 'PHASE 3 · NIGHT',  emoji: '🌙' },
};

// ═══════════════════════════════════════════════════════════════
// PROGRESS SCREEN — header with streak + zoom, then trail view
// ═══════════════════════════════════════════════════════════════
function ProgressScreen({ growthDay = 7 }) {
  const [zoom, setZoom] = React.useState('day'); // 'day' | 'week'
  const [selected, setSelected] = React.useState(null);
  const stage = stageForDay(growthDay);
  const days = buildTrailDays(growthDay);
  const todayIdx = Math.min(growthDay, 21);
  const streak = Math.min(growthDay, 21);
  const coins = growthDay * 25;
  const graduated = growthDay >= 21;

  return (
    <div className="hide-scroll" style={{
      position: 'absolute', inset: 0, overflow: 'auto',
      paddingBottom: 100, background: 'var(--bg)',
    }}>
      {/* ── Header: title · streak · zoom toggle ── */}
      <div style={{
        padding: '10px 20px 12px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1 }}>
            The Trail
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', letterSpacing: '.1em', marginTop: 4 }}>
            {graduated
              ? 'JOURNEY COMPLETE · 21/21'
              : <>DAY {todayIdx} OF 21 · <b style={{ color: 'var(--ink)' }}>{stage.toUpperCase()}</b></>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          {/* Streak header — inline, not a card */}
          <div style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 4,
            fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-.02em',
          }}>
            <span style={{ fontSize: 18 }}>🔥</span>
            <span style={{ fontSize: 28, lineHeight: 1 }}>{streak}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '.1em' }}>DAYS</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '.08em' }}>
            ◆ {coins} · LONGEST {Math.max(streak, 12)}
          </div>
        </div>
      </div>

      {/* ── Zoom toggle ── */}
      <div style={{ padding: '0 16px 10px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'inline-flex', background: 'var(--paper)',
          border: '1.5px solid var(--line)', borderRadius: 999,
          boxShadow: '0 2px 0 var(--line)',
          padding: 3, gap: 2,
        }}>
          <ZoomTab active={zoom === 'day'}  onClick={() => setZoom('day')}  label="Day" icon="⊙"/>
          <ZoomTab active={zoom === 'week'} onClick={() => setZoom('week')} label="Week" icon="▦"/>
        </div>
      </div>

      {/* Growth meter removed — moved to You tab.
         Coins = short-loop reward (lives in Today header chip).
         Growth = long-loop state (lives in You, quiet accumulator).
         On The Trail, the header line "DAY 7 OF 21 · SPROUT" is enough. */}

      {/* ── The trail: day view or week view ── */}
      {zoom === 'day' ? (
        <TrailDayView
          days={days}
          growthDay={growthDay}
          onSelect={setSelected}
        />
      ) : (
        <TrailWeekView
          days={days}
          growthDay={growthDay}
          onZoomToDay={() => setZoom('day')}
        />
      )}

      {/* ── Footer: small stats + reflections ── */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <MiniStat emoji="🥬" num={growthDay * 2} label="HEALTHY"/>
          <MiniStat emoji="🎯" num={growthDay * 3} label="QUESTS"/>
          <MiniStat emoji="◆"  num={coins} label="COINS"/>
        </div>
      </div>

      {selected != null && <DaySheet day={selected} stage={stage} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ZoomTab({ active, onClick, label, icon }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 14px', borderRadius: 999, border: 'none',
      fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 11,
      letterSpacing: '.08em',
      background: active ? 'var(--line)' : 'transparent',
      color: active ? '#fff7ea' : 'var(--ink-2)',
      cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ fontSize: 12 }}>{icon}</span>
      {label.toUpperCase()}
    </button>
  );
}

// ── Growth meter: 4 stages with Peako evolving ──
function GrowthMeter({ growthDay, stage }) {
  const stages = [
    { key: 'seed',   day: 0,  label: 'Seed' },
    { key: 'sprout', day: 7,  label: 'Sprout' },
    { key: 'teen',   day: 14, label: 'Teen' },
    { key: 'grown',  day: 21, label: 'Grown' },
  ];
  const pct = Math.min(growthDay / 21, 1) * 100;
  return (
    <div style={{
      margin: '0 16px 4px', padding: '12px 14px 10px',
      background: 'var(--paper)', borderRadius: 16,
      border: '1.5px solid var(--line)', boxShadow: '0 2px 0 var(--line)',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 800, letterSpacing: '.12em', color: 'var(--ink-3)' }}>
          PEAKO'S GROWTH
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 800, color: 'var(--hi-deep, #4f8a52)' }}>
          {Math.round(pct)}%
        </div>
      </div>

      <div style={{ position: 'relative', height: 64, margin: '0 4px' }}>
        <div style={{
          position: 'absolute', left: 8, right: 8, top: 34, height: 4,
          background: 'var(--bg-2)', borderRadius: 2,
        }}/>
        <div style={{
          position: 'absolute', left: 8, top: 34, height: 4,
          width: `calc(${pct}% - 16px * ${pct/100})`,
          background: 'var(--hi-deep, #4f8a52)', borderRadius: 2,
          transition: 'width .4s',
        }}/>
        {stages.map((s, i) => {
          const x = (i / (stages.length - 1)) * 100;
          const reached = growthDay >= s.day;
          const isCurrent = stage === s.key;
          return (
            <div key={s.key} style={{
              position: 'absolute', left: `${x}%`,
              top: 0, transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 2,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: reached ? 'var(--hi)' : 'var(--bg-2)',
                border: `2px ${isCurrent ? 'solid' : reached ? 'solid' : 'dashed'} var(--line)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isCurrent ? '0 0 0 4px rgba(139,212,143,.35), 0 2px 0 var(--line)' : reached ? '0 2px 0 var(--line)' : 'none',
                opacity: reached ? 1 : 0.55,
              }}>
                <MascotTiny size={28} stage={s.key} color={reached ? 'var(--hi)' : '#d9d4c8'}/>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                fontWeight: 800, letterSpacing: '.08em',
                color: isCurrent ? 'var(--ink)' : 'var(--ink-3)',
                marginTop: 4,
              }}>{s.label.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DAY VIEW — big nodes, biomes, Peako walking
// ═══════════════════════════════════════════════════════════════
function TrailDayView({ days, growthDay, onSelect }) {
  const groups = [
    { key: 'meadow', start: 0,  end: 7  },
    { key: 'desert', start: 7,  end: 14 },
    { key: 'night',  start: 14, end: 21 },
  ];
  return (
    <div>
      {groups.map((g, gi) => (
        <Biome
          key={g.key}
          biomeKey={g.key}
          days={days.slice(g.start, g.end)}
          offset={g.start}
          onSelect={onSelect}
          growthDay={growthDay}
          isFirst={gi === 0}
          isLast={gi === groups.length - 1}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WEEK VIEW — 3 compact week rows, tap to drill in
// ═══════════════════════════════════════════════════════════════
function TrailWeekView({ days, growthDay, onZoomToDay }) {
  const weeks = [
    { key: 'meadow', start: 0,  end: 7,  label: 'Week 1', sub: 'Meadow'},
    { key: 'desert', start: 7,  end: 14, label: 'Week 2', sub: 'Desert'},
    { key: 'night',  start: 14, end: 21, label: 'Week 3', sub: 'Night' },
  ];
  return (
    <div style={{ padding: '4px 16px 0' }}>
      {weeks.map((w, i) => {
        const slice = days.slice(w.start, w.end);
        const done = slice.filter(d => d.state === 'done').length;
        const partial = slice.filter(d => d.state === 'partial').length;
        const rest = slice.filter(d => d.state === 'rest').length;
        const missed = slice.filter(d => d.state === 'missed').length;
        const locked = slice.filter(d => d.state === 'locked').length;
        const hasToday = slice.some(d => d.state === 'today');
        const clean = missed === 0 && locked === 0;
        const completed = locked === 0;
        const B = BIOMES[w.key];

        return (
          <button
            key={w.key}
            onClick={onZoomToDay}
            style={{
              width: '100%', textAlign: 'left', cursor: 'pointer',
              background: B.bg, border: '1.5px solid var(--line)', borderRadius: 18,
              padding: '14px 16px', marginBottom: 10, boxShadow: '0 2px 0 var(--line)',
              color: B.ink, position: 'relative', overflow: 'hidden',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: B.accent,
                border: '1.5px solid var(--line)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>{B.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-.01em' }}>
                    {w.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: B.ink === '#fff7ea' ? 'rgba(255,247,234,.6)' : 'var(--ink-3)', letterSpacing: '.12em', fontWeight: 800 }}>
                    {w.sub.toUpperCase()}
                  </div>
                  {clean && completed && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800,
                      letterSpacing: '.1em', padding: '2px 7px', borderRadius: 999,
                      background: 'var(--accent-2)', border: '1.5px solid var(--line)',
                      color: 'var(--line)',
                    }}>🔥 CLEAN</span>
                  )}
                  {hasToday && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800,
                      letterSpacing: '.1em', padding: '2px 7px', borderRadius: 999,
                      background: '#fff', border: '1.5px solid var(--line)',
                      color: 'var(--line)',
                    }}>YOU ARE HERE</span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: B.ink === '#fff7ea' ? 'rgba(255,247,234,.7)' : 'var(--ink-3)', marginTop: 2, fontWeight: 700, letterSpacing: '.05em' }}>
                  {locked === 7
                    ? 'LOCKED · not yet'
                    : <>{done + partial}/{7 - rest} DAYS · {rest} REST{missed > 0 ? ` · ${missed} MISS` : ''}</>}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: B.ink === '#fff7ea' ? 'rgba(255,247,234,.5)' : 'var(--ink-3)', fontWeight: 800 }}>›</div>
            </div>

            {/* Week strip — 7 tiny nodes */}
            <div style={{ display: 'flex', gap: 5 }}>
              {slice.map(day => {
                const dot = dotForState(day.state, w.key === 'night');
                return (
                  <div key={day.d} style={{
                    flex: 1, aspectRatio: '1/1.25', borderRadius: 10,
                    background: dot.bg, border: `${day.state === 'today' ? 2.5 : 1.5}px ${day.state === 'locked' ? 'dashed' : 'solid'} ${dot.border}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontWeight: 800,
                    color: dot.color,
                    boxShadow: day.state === 'today' ? '0 2px 0 var(--line)' : 'none',
                    position: 'relative',
                  }}>
                    <span style={{ fontSize: 9, opacity: .7 }}>D{day.d}</span>
                    <span style={{ fontSize: 14, marginTop: 1 }}>{dot.icon}</span>
                    {day.milestone && day.state !== 'locked' && (
                      <span style={{
                        position: 'absolute', top: -5, right: -5,
                        fontSize: 10,
                      }}>⭐</span>
                    )}
                  </div>
                );
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function dotForState(state, isNight) {
  switch (state) {
    case 'done':    return { bg: 'var(--hi)',       border: 'var(--line)', color: 'var(--line)', icon: '✓' };
    case 'partial': return { bg: 'var(--accent-2)', border: 'var(--line)', color: 'var(--line)', icon: '~' };
    case 'missed':  return { bg: 'var(--accent)',   border: 'var(--line)', color: '#fff',        icon: '✗' };
    case 'rest':    return { bg: 'var(--rest)',     border: 'var(--line)', color: 'var(--ink-3)',icon: 'z' };
    case 'today':   return { bg: '#fff',            border: 'var(--line)', color: 'var(--line)', icon: '●' };
    case 'locked':
    default:
      return {
        bg: isNight ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)',
        border: isNight ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.18)',
        color: isNight ? 'rgba(255,247,234,.5)' : 'var(--ink-3)',
        icon: '·',
      };
  }
}

// ── Biome band (day view) ────────────────────────────────────────
function Biome({ biomeKey, days, offset, onSelect, growthDay, isFirst, isLast }) {
  const B = BIOMES[biomeKey];
  const nodeSize = 56;
  const rowH = 88;
  const bandH = rowH * days.length + 40;

  return (
    <div style={{ position: 'relative', background: B.bg, color: B.ink, overflow: 'hidden' }}>
      <div style={{
        padding: '10px 20px 4px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8, background: B.accent,
          border: '1.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13,
        }}>{B.emoji}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 800,
          letterSpacing: '.14em', color: B.ink, opacity: .7,
        }}>{B.label}</div>
      </div>

      <Scenery biome={biomeKey} />

      <div style={{ position: 'relative', height: bandH, margin: '0 10px' }}>
        <svg viewBox={`0 0 100 ${bandH}`} preserveAspectRatio="none"
             width="100%" height={bandH}
             style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {days.map((day, i) => {
            if (i === days.length - 1) return null;
            const x1 = X_PATTERN[i % X_PATTERN.length] * 100;
            const x2 = X_PATTERN[(i+1) % X_PATTERN.length] * 100;
            const y1 = 20 + i * rowH + nodeSize/2;
            const y2 = 20 + (i+1) * rowH + nodeSize/2;
            return (
              <path key={i}
                d={`M ${x1} ${y1} C ${x1} ${(y1+y2)/2}, ${x2} ${(y1+y2)/2}, ${x2} ${y2}`}
                stroke={day.state === 'locked' ? 'rgba(0,0,0,.18)' : 'var(--line)'}
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
                strokeDasharray={day.state === 'locked' ? '4 6' : '0'}
                fill="none"
                opacity={biomeKey === 'night' ? .6 : 1}
              />
            );
          })}
        </svg>

        {days.map((day, i) => {
          const xPct = X_PATTERN[i % X_PATTERN.length] * 100;
          const y = 20 + i * rowH;
          return (
            <TrailNode
              key={day.d}
              day={day}
              x={xPct}
              y={y}
              size={nodeSize}
              biome={biomeKey}
              onClick={() => onSelect(day)}
              isPeako={day.state === 'today'}
              peakoStage={stageForDay(growthDay)}
              rightTitle={day.milestone}
            />
          );
        })}
      </div>

      {days[days.length - 1].milestone && (
        <MilestoneBadge label={days[days.length - 1].milestone} biome={biomeKey} reached={growthDay >= days[days.length - 1].d}/>
      )}
    </div>
  );
}

function TrailNode({ day, x, y, size, biome, onClick, isPeako, peakoStage, rightTitle }) {
  const styles = {
    done:    { bg: 'var(--hi)',       border: 'var(--line)', icon: '✓', color: 'var(--line)' },
    partial: { bg: 'var(--accent-2)', border: 'var(--line)', icon: '~', color: 'var(--line)' },
    missed:  { bg: 'var(--accent)',   border: 'var(--line)', icon: '✗', color: '#fff' },
    rest:    { bg: 'var(--rest)',     border: 'var(--line)', icon: 'z', color: 'var(--ink-3)' },
    today:   { bg: '#fff',            border: 'var(--line)', icon: '',  color: 'var(--line)' },
    locked:  { bg: biome === 'night' ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)',
               border: biome === 'night' ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.18)',
               icon: '🔒', color: 'var(--ink-3)' },
  }[day.state];

  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`, top: y,
      transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
    }}>
      {isPeako && (
        <div style={{ marginBottom: 4, position: 'relative' }}>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 'calc(100% + 4px)' }}>
            <div style={{
              background: 'var(--line)', color: '#fff7ea',
              borderRadius: 12, padding: '5px 9px',
              fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap',
              boxShadow: '0 3px 0 rgba(0,0,0,.15)',
            }}>
              you are here
            </div>
          </div>
          <div className="breathe"><Mascot state="idle" size={54} stage={peakoStage}/></div>
        </div>
      )}

      <button onClick={onClick}
        disabled={day.state === 'locked'}
        style={{
          width: isPeako ? size + 10 : size,
          height: isPeako ? size + 10 : size,
          borderRadius: '50%',
          background: styles.bg,
          border: `2.5px ${day.state === 'locked' ? 'dashed' : 'solid'} ${styles.border}`,
          boxShadow: day.state === 'locked' ? 'none' : '0 3px 0 var(--line)',
          color: styles.color,
          fontFamily: 'var(--font-display)',
          fontSize: isPeako ? 24 : 20,
          fontWeight: 700,
          cursor: day.state === 'locked' ? 'default' : 'pointer',
          padding: 0,
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          outline: isPeako ? `3px solid ${BIOMES[biome].accent}` : 'none',
          outlineOffset: isPeako ? 3 : 0,
        }}>
        {styles.icon || day.d}
        {isPeako && (
          <span style={{
            position: 'absolute', bottom: -4, right: -4,
            fontSize: 12,
            background: BIOMES[biome].accent,
            border: '1.5px solid var(--line)',
            borderRadius: 999,
            padding: '1px 6px',
            fontFamily: 'var(--font-mono)', fontWeight: 800,
            color: 'var(--line)',
          }}>d{day.d}</span>
        )}
      </button>

      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9.5,
        color: biome === 'night' ? 'rgba(255,255,255,.5)' : 'var(--ink-3)',
        letterSpacing: '.08em',
      }}>
        DAY {day.d}
      </div>

      {rightTitle && day.state !== 'locked' && (
        <div style={{
          position: 'absolute', left: `calc(50% + ${size/2 + 12}px)`,
          top: 8, transform: 'rotate(3deg)',
          background: '#fff2a8', border: '1.5px solid var(--line)',
          borderRadius: 6, padding: '4px 8px', fontSize: 11, fontWeight: 800,
          boxShadow: '0 2px 0 var(--line)', whiteSpace: 'nowrap',
          color: 'var(--line)',
        }}>{rightTitle} ⭐</div>
      )}
    </div>
  );
}

function MilestoneBadge({ label, biome, reached }) {
  return (
    <div style={{
      textAlign: 'center', padding: '4px 0 18px',
      color: biome === 'night' ? '#fff7ea' : 'var(--ink)',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 999,
        background: reached ? 'var(--accent-2)' : 'rgba(255,255,255,.15)',
        border: '1.5px solid var(--line)',
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800,
        letterSpacing: '.08em', boxShadow: '0 2px 0 var(--line)',
        color: 'var(--line)',
        opacity: reached ? 1 : 0.6,
      }}>{reached ? '⭐' : '🔒'} {label.toUpperCase()}</div>
    </div>
  );
}

function Scenery({ biome }) {
  if (biome === 'meadow') return (
    <svg width="100%" height="30" style={{ display: 'block', opacity: .6 }}>
      {[...Array(20)].map((_, i) => (
        <g key={i} transform={`translate(${i*22}, ${12 + (i%3)*4})`}>
          <path d="M 0 8 L 4 0 L 8 8 Z" fill="var(--hi-deep)" opacity=".35"/>
        </g>
      ))}
    </svg>
  );
  if (biome === 'desert') return (
    <svg width="100%" height="30" style={{ display: 'block', opacity: .55 }}>
      {[...Array(10)].map((_, i) => (
        <g key={i} transform={`translate(${i*40 + (i%2?15:0)}, ${8})`}>
          <rect x="2" y="4" width="3" height="16" fill="#ff9463" opacity=".5"/>
          <rect x="-1" y="9" width="2" height="6" fill="#ff9463" opacity=".5"/>
          <rect x="5" y="9" width="2" height="6" fill="#ff9463" opacity=".5"/>
        </g>
      ))}
    </svg>
  );
  return (
    <svg width="100%" height="30" style={{ display: 'block' }}>
      {[...Array(18)].map((_, i) => (
        <circle key={i} cx={i*22 + (i%4)*3} cy={8 + (i%3)*5} r={1.2} fill="#fff7ea" opacity=".6"/>
      ))}
    </svg>
  );
}

function DaySheet({ day, stage, onClose }) {
  const copy = {
    done:    { title: `Day ${day.d} · 3 / 3`,    vibe: 'solid.' },
    partial: { title: `Day ${day.d} · 2 / 3`,    vibe: 'partial credit' },
    missed:  { title: `Day ${day.d} · missed`,   vibe: 'a moment.' },
    rest:    { title: `Day ${day.d} · rest`,     vibe: 'on purpose.' },
    today:   { title: `Day ${day.d} · today`,    vibe: 'in progress.' },
  }[day.state] || { title: `Day ${day.d}`, vibe: '' };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,.4)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn .2s',
    }}>
      <style>{`@keyframes fadeIn {from{opacity:0} to{opacity:1}} @keyframes sheetUp {from{transform:translateY(100%)} to{transform:translateY(0)}}`}</style>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--paper)',
        width: '100%',
        borderRadius: '22px 22px 0 0',
        border: '1.5px solid var(--line)', borderBottom: 'none',
        padding: '18px 18px 28px',
        animation: 'sheetUp .25s cubic-bezier(.2,.8,.3,1) both',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-3)', margin: '0 auto 14px', opacity: .4 }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-.02em' }}>{copy.title}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.1em' }}>{copy.vibe}</div>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <MiniStat emoji="🎯" num={day.state === 'done' ? '3' : day.state === 'partial' ? '2' : day.state === 'missed' ? '0' : '—'} label="QUESTS"/>
          <MiniStat emoji="🥬" num={day.state === 'done' ? '2' : '1'} label="MEALS"/>
          <MiniStat emoji="◆"  num={day.state === 'done' ? '25' : day.state === 'partial' ? '15' : '0'} label="COINS"/>
        </div>

        <button onClick={onClose} style={{
          marginTop: 16, width: '100%',
          border: '1.5px solid var(--line)', background: 'var(--line)', color: '#fff7ea',
          borderRadius: 14, padding: '12px', fontWeight: 800, fontSize: 14.5, cursor: 'pointer',
        }}>close</button>
      </div>
    </div>
  );
}

function MiniStat({ emoji, num, label }) {
  return (
    <div className="card-sm" style={{ padding: '10px 10px 8px' }}>
      <div style={{ fontSize: 16 }}>{emoji}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>{num}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', letterSpacing: '.1em', marginTop: 3, fontWeight: 800 }}>{label}</div>
    </div>
  );
}

Object.assign(window, { ProgressScreen });
