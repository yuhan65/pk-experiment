// shared.jsx — primitives: phone frame, tab bar, top bar, chips, typography helpers

function PhoneFrame({ children, dark = false, label, noNav = false, noTop = false, time = '9:41' }) {
  const W = 390, H = 844;
  const bg = dark ? '#141210' : '#f3efe6';
  const ink = dark ? '#f3efe6' : '#1a1814';
  return (
    <div data-screen-label={label} style={{
      width: W, height: H, borderRadius: 46, position: 'relative',
      background: bg, color: ink, overflow: 'hidden',
      border: `3px solid #0a0908`,
      boxShadow: '0 30px 60px -20px rgba(0,0,0,.35), 0 0 0 10px #0a0908, 0 0 0 11px #2a2620',
      fontFamily: 'var(--f-sans)',
    }}>
      {/* status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 32px 0', fontFamily: 'var(--f-mono)', fontSize: 15, fontWeight: 700, zIndex: 50,
      }}>
        <span>{time}</span>
        <div style={{ width: 110, height: 28, borderRadius: 20, background: '#0a0908' }}/>
        <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
          <Signal ink={ink}/>
          <Battery ink={ink}/>
        </span>
      </div>
      {/* content */}
      <div className="no-scrollbar" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        overflow: 'hidden',
      }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 134, height: 5, borderRadius: 3, background: dark ? '#f3efe6' : '#1a1814',
        opacity: 0.7, zIndex: 50,
      }}/>
    </div>
  );
}

function Signal({ ink }) {
  return (<svg width="16" height="10" viewBox="0 0 16 10"><rect x="0" y="7" width="3" height="3" rx="1" fill={ink}/><rect x="4.5" y="5" width="3" height="5" rx="1" fill={ink}/><rect x="9" y="2.5" width="3" height="7.5" rx="1" fill={ink}/><rect x="13.5" y="0" width="3" height="10" rx="1" fill={ink}/></svg>);
}
function Battery({ ink }) {
  return (<svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke={ink} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="19" height="8" rx="1.5" fill={ink}/><rect x="23.5" y="4" width="2" height="4" rx="0.5" fill={ink} fillOpacity="0.4"/></svg>);
}

// Top bar — streak, coins, feed
function TopBar({ streak = 5, coins = 150, feedUnread = true, dark = false, onFeed }) {
  const chipBorder = dark ? '#f3efe6' : '#1a1814';
  const chipBg = dark ? '#1f1c18' : '#f3efe6';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '58px 18px 12px', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Chip icon="🔥" label={`${streak}d`} tone="hot" dark={dark}/>
        <Chip icon="💎" label={coins} tone="sky" dark={dark}/>
      </div>
      <button onClick={onFeed} aria-label="Peako's feed" className="squish" style={{
        position: 'relative', width: 44, height: 44, borderRadius: 14,
        background: dark ? '#1f1c18' : '#fff', padding: 0, border: `2px solid ${chipBorder}`,
      }}>
        <PhoneGlyph/>
        {feedUnread && <span style={{
          position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderRadius: 9,
          background: 'var(--hot)', border: `2px solid ${chipBg}`,
        }}/>}
      </button>
    </div>
  );
}

function Chip({ icon, label, tone = 'paper', dark = false }) {
  const map = {
    hot: { bg: '#ffe4df', fg: '#8a2a1e' },
    sky: { bg: '#dceeff', fg: '#1d4a7a' },
    acid: { bg: '#edffc2', fg: '#3d5a14' },
    paper: { bg: '#fff', fg: '#1a1814' },
  };
  const c = map[tone];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 11px 7px 9px',
      borderRadius: 999, background: c.bg, color: c.fg,
      border: '2px solid var(--ink)', boxShadow: '2px 2px 0 var(--ink)',
      fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.02em',
    }}>
      <span style={{ fontSize: 13 }}>{icon}</span><span>{label}</span>
    </div>
  );
}

function PhoneGlyph() {
  return (<svg width="22" height="22" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2.5" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);
}

// Bottom tab bar
function TabBar({ tab, onTab, dark = false }) {
  const tabs = [
    { id: 'today', label: 'Today', glyph: <TabHome/> },
    { id: 'progress', label: 'Progress', glyph: <TabChart/> },
    { id: 'you', label: 'You', glyph: <TabYou/> },
  ];
  const bg = dark ? '#1f1c18' : '#fff';
  return (
    <div style={{
      position: 'absolute', left: 14, right: 14, bottom: 22, height: 70,
      background: bg, borderRadius: 26, display: 'flex',
      border: '2px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)',
      overflow: 'hidden',
    }}>
      {tabs.map(t => {
        const active = t.id === tab;
        return (
          <button key={t.id} onClick={() => onTab && onTab(t.id)} style={{
            flex: 1, border: 'none', background: active ? 'var(--acid)' : 'transparent',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 2, color: dark && !active ? '#f3efe6' : '#1a1814',
            fontFamily: 'var(--f-mono)', fontSize: 10.5, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            borderRight: t.id !== 'you' ? '2px solid var(--ink)' : 'none',
          }}>
            <span style={{ lineHeight: 0 }}>{t.glyph}</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
function TabHome() { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 11 L12 4 L20 11 V20 H4 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg>); }
function TabChart() { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="13" width="4" height="7" stroke="currentColor" strokeWidth="2.2"/><rect x="10" y="8" width="4" height="12" stroke="currentColor" strokeWidth="2.2"/><rect x="16" y="4" width="4" height="16" stroke="currentColor" strokeWidth="2.2"/></svg>); }
function TabYou() { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2.2"/><path d="M4 21 C4 15 8 13 12 13 C16 13 20 15 20 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>); }

// Section label — mono all-caps
function Label({ children, style }) {
  return <div className="label" style={style}>{children}</div>;
}

// Card — sticker-outlined container
function Card({ children, color = '#fff', style = {}, outline = true, flat = false }) {
  return (
    <div style={{
      background: color, borderRadius: 22,
      border: outline ? '2px solid var(--ink)' : 'none',
      boxShadow: outline && !flat ? '3px 3px 0 var(--ink)' : 'none',
      ...style,
    }}>{children}</div>
  );
}

// Speech bubble — Peako voice
function Bubble({ children, tail = 'left', color = '#fff', style = {} }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <div style={{
        background: color, borderRadius: 18,
        border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
        padding: '12px 14px', fontFamily: 'var(--f-sans)', fontSize: 14, fontWeight: 500,
        lineHeight: 1.35,
      }}>{children}</div>
      {tail && (
        <svg width="22" height="20" viewBox="0 0 22 20" style={{
          position: 'absolute', bottom: -10, [tail]: 20,
        }}>
          <path d="M2 2 L20 2 L6 18 Z" fill={color} stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

Object.assign(window, { PhoneFrame, TopBar, TabBar, Label, Card, Bubble, Chip });
