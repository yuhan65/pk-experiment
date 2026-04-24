import { useMemo } from 'react';
import {
  BatteryFull,
  Flame,
  Gem,
  Home,
  BarChart3,
  User,
  Signal,
  Smartphone,
  Wifi,
} from 'lucide-react';

function currentClock() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${((h + 11) % 12) + 1}:${m}`;
}

export function StatusBar({ dark = false }) {
  const time = useMemo(currentClock, []);
  const color = dark ? 'text-white' : 'text-black';
  return (
    <div
      className={`relative h-11 flex items-center justify-between px-7 text-[15px] font-semibold select-none ${color}`}
    >
      <span className="tabular-nums">{time}</span>
      <div className="absolute left-1/2 top-1.5 -translate-x-1/2 h-[30px] w-[110px] rounded-full bg-black" />
      <div className="flex items-center gap-1.5">
        <Signal className="w-4 h-4" strokeWidth={2.5} />
        <Wifi className="w-4 h-4" strokeWidth={2.5} />
        <BatteryFull className="w-5 h-5" strokeWidth={2.5} />
      </div>
    </div>
  );
}

export function PhoneFrame({ children }) {
  return (
    <div
      className="relative bg-black rounded-[3rem] shadow-phone p-[10px]"
      style={{ width: 393 + 20, height: 852 + 20 }}
    >
      <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-neutral-800 rounded-l" />
      <div className="absolute -left-[3px] top-40 w-[3px] h-14 bg-neutral-800 rounded-l" />
      <div className="absolute -left-[3px] top-60 w-[3px] h-14 bg-neutral-800 rounded-l" />
      <div className="absolute -right-[3px] top-44 w-[3px] h-20 bg-neutral-800 rounded-r" />

      <div
        className="relative bg-slate-50 rounded-[2.5rem] overflow-hidden"
        style={{ width: 393, height: 852 }}
      >
        {children}
      </div>
    </div>
  );
}

export function HomeIndicator({ dark = false }) {
  return (
    <div
      className={`mx-auto h-[5px] w-[134px] rounded-full ${
        dark ? 'bg-white/80' : 'bg-black/80'
      }`}
    />
  );
}

export function StatChip({ icon: Icon, value, suffix, color = 'orange' }) {
  const palettes = {
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
    sky: 'bg-sky-50 border-sky-100 text-sky-600',
  };
  const iconColor = color === 'sky' ? 'text-sky-500' : 'text-orange-500';
  return (
    <div
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${palettes[color]}`}
    >
      <Icon className={`w-4 h-4 ${iconColor}`} fill="currentColor" />
      <span className="text-sm font-semibold tabular-nums">
        {value}
        {suffix ? ` ${suffix}` : ''}
      </span>
    </div>
  );
}

// The signature "phone icon" — Peako's personal phone you check to see what
// they said. Placeholder UI for now: a rounded iOS-app-tile with a cartoon
// phone glyph + unread badge.
export function PhoneIconButton({ unread = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 rounded-[12px] bg-gradient-to-br from-slate-900 to-slate-700 grid place-items-center shadow-card active:scale-95 transition-transform"
      aria-label="Open Peako's feed"
    >
      <Smartphone className="w-5 h-5 text-white" strokeWidth={2.2} />
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[11px] font-bold grid place-items-center ring-2 ring-white">
          {unread > 9 ? '9+' : unread}
        </span>
      )}
    </button>
  );
}

export function TopStats({ streak, coins, unread, onOpenFeed }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <StatChip icon={Flame} value={streak} suffix="Days" color="orange" />
        <StatChip icon={Gem} value={coins} suffix="Coins" color="sky" />
      </div>
      <PhoneIconButton unread={unread} onClick={onOpenFeed} />
    </div>
  );
}

export function TabBar({ tab, onChange }) {
  const tabs = [
    { id: 'today', label: 'Today', icon: Home },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'you', label: 'You', icon: User },
  ];
  return (
    <div className="absolute bottom-0 inset-x-0 pt-2 pb-6 bg-white/90 backdrop-blur-xl border-t border-slate-200/70">
      <div className="flex items-stretch justify-around px-4">
        {tabs.map((t) => {
          const active = tab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className="flex-1 flex flex-col items-center gap-0.5 py-1.5 active:scale-95 transition-transform"
            >
              <Icon
                className={`w-[22px] h-[22px] ${active ? 'text-slate-900' : 'text-slate-400'}`}
                strokeWidth={active ? 2.4 : 2}
              />
              <span
                className={`text-[11px] font-semibold ${active ? 'text-slate-900' : 'text-slate-400'}`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-1.5">
        <HomeIndicator />
      </div>
    </div>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between px-1">
      <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card border border-slate-100 ${className}`}
    >
      {children}
    </div>
  );
}
