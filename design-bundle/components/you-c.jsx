/* ═══════════════════════════════════════════════════════════════
   PEAKO — You v3 (YouC): calmer, settings-focused.
   Thesis: You = your side of the ledger. Identity + knobs + data.
   Moved OUT: stickers/achievements → Progress. Saved notes → Feed.
   Moved OUT: relationship meter → expressed through Feed + mascot.
   ═══════════════════════════════════════════════════════════════ */

function YouC() {
  return (
    <div className="hide-scroll" style={{ position: 'absolute', inset: 0, overflow: 'auto', paddingBottom: 100 }}>
      <ScreenHeader
        title="You"
        sub="YOUR SIDE OF THE LEDGER"
      />

      {/* ── IDENTITY ───────────────────────────────────────── */}
      <div style={{ padding: '4px 16px 0' }}>
        <div className="card-outline" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: 'var(--accent-2)',
            border: '1.5px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flex: 'none',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700 }}>M</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1 }}>mia.</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', letterSpacing: '.1em', marginTop: 6 }}>
              MEMBER SINCE APR 19 · 5 DAYS IN
            </div>
            <button style={{
              marginTop: 8, padding: '4px 10px',
              border: '1px solid var(--hairline)', background: 'var(--bg-2)',
              borderRadius: 999, fontFamily: 'var(--font-mono)',
              fontSize: 10.5, fontWeight: 800, letterSpacing: '.08em',
              color: 'var(--ink-2)', cursor: 'pointer',
            }}>EDIT PROFILE</button>
          </div>
          {/* tiny Peako reaction — character stays, dashboard goes */}
          <div style={{ flex: 'none', textAlign: 'center' }}>
            <Mascot state="side-eye" size={48}/>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-3)', letterSpacing: '.08em', marginTop: 2 }}>HI.</div>
          </div>
        </div>
      </div>

      {/* ── PEAKO'S BEHAVIOR ──────────────────────────────── */}
      <SectionTitle>How Peako talks to you</SectionTitle>
      <div style={{ padding: '0 16px' }}>
        <div className="card-sm" style={{ padding: 0, overflow: 'hidden' }}>
          <SettingRow
            glyph="🎚"
            label="Voice intensity"
            value="Classic"
            hint="gentle · classic · savage"
          />
          <SettingRow
            glyph="💬"
            label="Post frequency"
            value="Chatty"
            hint="quiet · normal · chatty"
          />
          <SettingRow
            glyph="🌙"
            label="Quiet hours"
            value="10pm – 8am"
          />
          <SettingRow
            glyph="🔔"
            label="Notifications"
            value="On"
            last
          />
        </div>
        <div style={{
          padding: '8px 4px 0',
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)',
          letterSpacing: '.04em', fontStyle: 'italic',
        }}>
          Peako's mood shifts on her own — these are the knobs you're allowed to touch.
        </div>
      </div>

      {/* ── PROGRAM ──────────────────────────────────────── */}
      <SectionTitle>Program</SectionTitle>
      <div style={{ padding: '0 16px' }}>
        <div className="card-sm" style={{ padding: 0, overflow: 'hidden' }}>
          <SettingRow
            glyph="🗓"
            label="Phase & goal"
            value="Phase 1 · 21 days"
            hint="3 challenges a day"
          />
          <SettingRow
            glyph="⚖️"
            label="Difficulty"
            value="Normal"
          />
          <SettingRow
            glyph="☀️"
            label="Rest day"
            value="Sunday"
            last
          />
        </div>
      </div>

      {/* ── YOUR DATA ───────────────────────────────────── */}
      <SectionTitle>Your data</SectionTitle>
      <div style={{ padding: '0 16px' }}>
        <div className="card-sm" style={{ padding: 0, overflow: 'hidden' }}>
          <SettingRow glyph="↗" label="Invite a friend" value="Get a sticker"/>
          <SettingRow glyph="⬇" label="Export your data" value=""/>
          <SettingRow glyph="🔒" label="Privacy" value=""/>
          <SettingRow glyph="🚪" label="Sign out" value="" last/>
        </div>
      </div>

      {/* ── DANGER ─────────────────────────────────────── */}
      <div style={{ padding: '16px 16px 0' }}>
        <button style={{
          width: '100%', padding: '12px',
          background: 'transparent',
          border: '1px dashed var(--hairline)',
          borderRadius: 14,
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800,
          letterSpacing: '.12em', color: 'var(--ink-3)',
          cursor: 'pointer',
        }}>DELETE ACCOUNT</button>
      </div>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <div style={{ padding: '20px 16px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '.18em' }}>
          peako v0.4 · made loudly
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-3)', letterSpacing: '.12em', marginTop: 4, opacity: 0.7 }}>
          © 2026 PEAKO CO.
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ padding: '22px 20px 8px' }}>
      <SoftLabel>{children}</SoftLabel>
    </div>
  );
}

function SettingRow({ glyph, label, value, hint, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      borderBottom: last ? 'none' : '1px solid var(--hairline)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: 'var(--bg-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, flex: 'none',
      }}>{glyph}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 14 }}>{label}</div>
        {hint && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '.04em', marginTop: 1 }}>{hint}</div>}
      </div>
      {value && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
          color: 'var(--ink-2)', marginRight: 4, textAlign: 'right',
          maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{value}</div>
      )}
      <span style={{ fontSize: 18, color: 'var(--ink-3)' }}>›</span>
    </div>
  );
}

Object.assign(window, { YouC });
