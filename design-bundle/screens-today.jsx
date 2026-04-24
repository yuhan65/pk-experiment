// screens-today.jsx — Today variants

function TodayA({ mascot = 'blorb' }) {
  // Default — stacked challenge cards with archetype chips
  return (
    <PhoneFrame label="01 Today / A">
      <TopBar streak={5} coins={150}/>
      <div style={{ padding: '4px 18px 120px' }}>
        {/* Peako greeting */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', margin: '6px 0 18px' }}>
          <PeakoAvatar size={58} variant={mascot} emotion="judging"/>
          <Bubble color="#fff" tail="left" style={{ flex: 1, marginBottom: 6 }}>
            Three challenges. Don't embarrass me.
          </Bubble>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '10px 2px 10px' }}>
          <Label>Today · Tue 23</Label>
          <Label style={{ color: '#8a8276' }}>0/3</Label>
        </div>

        <ChallengeCard
          kind="timer" title="Plank Patience" meta="60 seconds"
          blurb="Sixty seconds. I've held grudges longer."
          color="#ffe4df"
        />
        <ChallengeCard
          kind="counter" title="Squat Therapy" meta="30 reps"
          blurb="Low. Slower than you want to."
          color="#edffc2"
        />
        <ChallengeCard
          kind="guided" title="Unkink Yourself" meta="5 steps · 4 min"
          blurb="You type like you sit. Let's unkink."
          color="#dceeff"
        />

        {/* footer strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 4px 0' }}>
          <Label>↺ Swaps 2/3</Label>
          <Label>⇥ Skips 3/5</Label>
        </div>
      </div>

      {/* + button */}
      <button className="squish" style={{
        position: 'absolute', right: 24, bottom: 110, width: 60, height: 60, borderRadius: 20,
        background: 'var(--hot)', color: '#fff', fontSize: 32, fontWeight: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>+</button>

      <TabBar tab="today"/>
    </PhoneFrame>
  );
}

function ChallengeCard({ kind, title, meta, blurb, color }) {
  const icons = {
    timer: <ArchTimer/>,
    counter: <ArchCounter/>,
    guided: <ArchGuided/>,
  };
  const kindLabel = { timer: 'TIMER', counter: 'COUNTER', guided: 'GUIDED' }[kind];
  return (
    <div style={{
      background: color, borderRadius: 22, border: '2px solid var(--ink)',
      boxShadow: '3px 3px 0 var(--ink)', padding: '14px 14px 12px', marginBottom: 12,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: '#fff',
          border: '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>{icons[kind]}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span className="label">{kindLabel}</span>
            <span className="label" style={{ color: '#8a8276' }}>· {meta}</span>
          </div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, lineHeight: 1.05, marginBottom: 6 }}>{title}</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontStyle: 'italic' }}>"{blurb}"</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <IconBtn glyph="↺"/>
          <IconBtn glyph="⇥"/>
        </div>
        <button className="squish" style={{
          background: 'var(--ink)', color: '#f3efe6', padding: '9px 18px', borderRadius: 999,
          fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
        }}>START →</button>
      </div>
    </div>
  );
}

function IconBtn({ glyph }) {
  return (
    <button style={{
      width: 32, height: 32, borderRadius: 10, border: '2px solid var(--ink)',
      background: 'transparent', fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 14,
    }}>{glyph}</button>
  );
}

function ArchTimer() { return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" stroke="#1a1814" strokeWidth="2.2"/><path d="M12 13 L12 8" stroke="#1a1814" strokeWidth="2.2" strokeLinecap="round"/><rect x="9" y="2" width="6" height="3" rx="1" fill="#1a1814"/></svg>); }
function ArchCounter() { return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="10" width="18" height="4" rx="1" fill="#1a1814"/><rect x="1" y="7" width="3" height="10" rx="1" fill="#1a1814"/><rect x="20" y="7" width="3" height="10" rx="1" fill="#1a1814"/></svg>); }
function ArchGuided() { return (<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="6" r="2" fill="#1a1814"/><circle cx="12" cy="6" r="2" fill="#1a1814"/><circle cx="19" cy="6" r="2" fill="#1a1814"/><path d="M5 12 L12 18 L19 12" stroke="#1a1814" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>); }

// Today B — "ticket" printout vibe; challenges as perforated receipts
function TodayB({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="01 Today / B">
      <TopBar streak={5} coins={150}/>
      <div style={{ padding: '4px 18px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <PeakoAvatar size={64} variant={mascot} emotion="smug"/>
          <div>
            <div className="label">From Peako · 8:03 am</div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, lineHeight: 1, marginTop: 4 }}>Today's docket</div>
          </div>
        </div>

        {/* Receipt */}
        <div style={{ position: 'relative', background: '#fff', borderRadius: 4, padding: '20px 18px 14px', border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)' }}>
          <ReceiptPunch side="top"/>
          <div style={{ textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }}>PEAKO FITNESS CO. · TUE APR 23</div>
          <ReceiptRow n="01" name="PLANK PATIENCE" val="60s" tag="TIMER"/>
          <ReceiptRow n="02" name="SQUAT THERAPY" val="×30" tag="COUNTER"/>
          <ReceiptRow n="03" name="UNKINK YOURSELF" val="5 st" tag="GUIDED"/>
          <div style={{ borderTop: '1.5px dashed var(--ink)', margin: '14px 0 10px' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 700 }}>
            <span>TOTAL</span><span>≈ 11 MIN</span>
          </div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, marginTop: 8, color: 'var(--ink-3)', textAlign: 'center' }}>
            NO REFUNDS · THANK YOU COME AGAIN
          </div>
          <div style={{ textAlign: 'center', marginTop: 10, fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '0.15em' }}>
            |||‖|‖||‖‖||‖|||‖||‖‖|||‖||‖|‖‖||
          </div>
          <ReceiptPunch side="bottom"/>
        </div>

        <button className="squish" style={{
          width: '100%', marginTop: 16, padding: '16px', borderRadius: 18,
          background: 'var(--acid)', fontFamily: 'var(--f-mono)', fontSize: 14, fontWeight: 800,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>Start challenge 01 →</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 4px 0' }}>
          <Label>↺ Swaps 2/3</Label>
          <Label>⇥ Skips 3/5</Label>
        </div>
      </div>

      <button className="squish" style={{
        position: 'absolute', right: 24, bottom: 110, width: 60, height: 60, borderRadius: 20,
        background: 'var(--hot)', color: '#fff', fontSize: 32, fontWeight: 300,
      }}>+</button>
      <TabBar tab="today"/>
    </PhoneFrame>
  );
}

function ReceiptPunch({ side }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, height: 10,
      [side]: -10, display: 'flex', justifyContent: 'space-between',
      padding: '0 4px', pointerEvents: 'none',
    }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--paper)' }}/>
      ))}
    </div>
  );
}
function ReceiptRow({ n, name, val, tag }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 8, fontFamily: 'var(--f-mono)' }}>
      <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{n}</span>
      <span style={{ flex: 1, fontWeight: 700, fontSize: 13 }}>{name}</span>
      <span style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>{tag}</span>
      <span style={{ fontWeight: 700, fontSize: 13, minWidth: 40, textAlign: 'right' }}>{val}</span>
    </div>
  );
}

// Today C — all-done celebration
function TodayDone({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="01 Today / Done">
      <TopBar streak={6} coins={180}/>
      <div style={{ padding: '4px 18px 120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 0px)', position: 'relative' }}>
        {/* confetti */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', top: `${20 + (i * 37) % 60}%`, left: `${(i * 23) % 90 + 5}%`,
            width: 8, height: 14, background: ['#c8ff3c', '#ff5a46', '#8ac7ff', '#ffc94a'][i % 4],
            border: '1.5px solid var(--ink)', transform: `rotate(${i * 40}deg)`,
          }}/>
        ))}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <PeakoAvatar size={150} variant={mascot} emotion="proud"/>
        </div>
        <div style={{
          fontFamily: 'var(--f-display)', fontSize: 44, lineHeight: 1, textAlign: 'center', marginTop: 16,
          textWrap: 'balance',
        }}>
          Fine. <i>Good</i> even.
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 12, marginTop: 14, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>
          3/3 · STREAK → 6 · +30 💎
        </div>
        <div style={{
          marginTop: 18, padding: '10px 14px', background: '#fff',
          border: '2px solid var(--ink)', borderRadius: 14, boxShadow: '3px 3px 0 var(--ink)',
          fontSize: 13.5, maxWidth: 280, textAlign: 'center',
        }}>
          I posted about you. It wasn't mean <span style={{ fontStyle: 'italic' }}>this time.</span>
        </div>
        <button className="squish" style={{
          marginTop: 22, padding: '14px 26px', borderRadius: 999, background: 'var(--acid)',
          fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>See the post →</button>
      </div>
      <TabBar tab="today"/>
    </PhoneFrame>
  );
}

Object.assign(window, { TodayA, TodayB, TodayDone, ChallengeCard });
