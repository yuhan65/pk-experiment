import { ChevronRight, Bell, LogOut, Info, Lock, Shirt } from 'lucide-react';
import PeakoMascot from '../components/PeakoMascot.jsx';
import { Card, SectionTitle } from '../components/ui.jsx';

const ROAST_LEVELS = [
  { id: 'gentle', label: 'Gentle', sub: "Peako bites their tongue" },
  { id: 'classic', label: 'Classic', sub: 'The default frenemy' },
  { id: 'savage', label: 'Savage', sub: 'No survivors' },
];

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy' },
  { id: 'normal', label: 'Normal' },
  { id: 'hard', label: 'Hard' },
];

const REST_OPTIONS = [
  { id: 'auto', label: 'Auto' },
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: 'Tue' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: 'Sat' },
  { id: 'sun', label: 'Sun' },
  { id: 'none', label: 'None' },
];

function ChipGroup({ value, onChange, options, compact = false }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${compact ? '' : 'mt-2'}`}>
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`px-3 h-9 rounded-full text-[13px] font-semibold border transition-colors ${
              active
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Row({ icon: Icon, label, right, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 h-12 border-b border-slate-100 last:border-0 ${
        danger ? 'text-rose-600' : 'text-slate-800'
      } active:bg-slate-50`}
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
      <span className="flex-1 text-left text-[14px] font-medium">{label}</span>
      {right ?? <ChevronRight className="w-4 h-4 text-slate-400" />}
    </button>
  );
}

export default function You({ state, onChange }) {
  const { roastLevel, difficulty, restDayPref, notifications } = state;
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-5 pt-3 pb-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/70">
        <h1 className="text-[22px] leading-tight font-extrabold tracking-tight text-slate-900">
          You
        </h1>
        <p className="text-[13px] text-slate-500">The settings Peako begrudgingly allows.</p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-4 pb-28 space-y-4">
        {/* Profile */}
        <Card className="p-4 flex items-center gap-3">
          <PeakoMascot size={56} />
          <div className="min-w-0 flex-1">
            <h2 className="text-[17px] font-extrabold text-slate-900 truncate">
              Alex
            </h2>
            <p className="text-[12px] text-slate-500">Member since April 2026</p>
            <p className="text-[12px] text-slate-500">
              🔥 {state.streak}-day streak
            </p>
          </div>
          <button className="text-[13px] text-slate-500 font-semibold underline">
            Edit
          </button>
        </Card>

        {/* Roast level */}
        <div className="space-y-2">
          <SectionTitle>Roast level</SectionTitle>
          <Card className="p-4">
            <ChipGroup
              value={roastLevel}
              onChange={(v) => onChange({ roastLevel: v })}
              options={ROAST_LEVELS}
              compact
            />
            <p className="mt-2 text-[12px] text-slate-500">
              {ROAST_LEVELS.find((r) => r.id === roastLevel)?.sub}. Applies to new
              content only.
            </p>
          </Card>
        </div>

        {/* Challenge difficulty */}
        <div className="space-y-2">
          <SectionTitle>Challenge difficulty</SectionTitle>
          <Card className="p-4">
            <ChipGroup
              value={difficulty}
              onChange={(v) => onChange({ difficulty: v })}
              options={DIFFICULTIES}
              compact
            />
            <p className="mt-2 text-[12px] text-slate-500">
              Biases which games Peako assigns you.
            </p>
          </Card>
        </div>

        {/* Rest day */}
        <div className="space-y-2">
          <SectionTitle>Rest day preference</SectionTitle>
          <Card className="p-4">
            <ChipGroup
              value={restDayPref}
              onChange={(v) => onChange({ restDayPref: v })}
              options={REST_OPTIONS}
              compact
            />
            <p className="mt-2 text-[12px] text-slate-500">
              Pick “None” and Peako overrides you anyway. Minimum 1 rest / 10 days.
            </p>
          </Card>
        </div>

        {/* Phase 2 teaser */}
        <div className="space-y-2">
          <SectionTitle>Customization</SectionTitle>
          <Card className="p-4 opacity-70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 grid place-items-center">
                <Shirt className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-slate-700">
                  Outfits & voice modes
                </div>
                <div className="text-[12px] text-slate-500">
                  Arriving in Phase 2
                </div>
              </div>
              <Lock className="w-4 h-4 text-slate-400" />
            </div>
          </Card>
        </div>

        {/* Settings list */}
        <div className="space-y-2">
          <SectionTitle>Settings</SectionTitle>
          <Card className="overflow-hidden">
            <Row
              icon={Bell}
              label="Notifications"
              right={
                <Toggle
                  value={notifications}
                  onChange={(v) => onChange({ notifications: v })}
                />
              }
              onClick={() => onChange({ notifications: !notifications })}
            />
            <Row icon={Info} label="About & legal" />
            <Row icon={LogOut} label="Sign out" danger />
          </Card>
          <p className="text-center text-[11px] text-slate-400 pt-1">
            Peako prototype · v0.2
          </p>
        </div>
      </div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange(!value);
      }}
      className={`w-11 h-[26px] rounded-full transition-colors relative ${
        value ? 'bg-emerald-500' : 'bg-slate-200'
      }`}
      aria-pressed={value}
    >
      <span
        className={`absolute top-0.5 h-[22px] w-[22px] rounded-full bg-white shadow transition-all ${
          value ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}
