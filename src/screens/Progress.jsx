import { Flame, Gem, Salad, Pizza, NotebookPen } from 'lucide-react';
import PeakoMascot from '../components/PeakoMascot.jsx';
import { Card, SectionTitle } from '../components/ui.jsx';
import { STREAK_CALENDAR, COIN_EVENTS } from '../peakoData.js';

const STATE_STYLES = {
  done: 'bg-emerald-500',
  partial: 'bg-amber-400',
  rest: 'bg-slate-300',
  missed: 'bg-rose-400',
  active: 'bg-emerald-300 ring-2 ring-emerald-500',
  empty: 'bg-slate-100',
};

function Calendar() {
  // Pad to a clean week grid (7 cols). Empty squares at the front to align.
  const padding = 7 - (STREAK_CALENDAR.length % 7 || 7);
  const cells = [
    ...Array.from({ length: padding }, () => ({ state: 'empty' })),
    ...STREAK_CALENDAR,
  ];
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {cells.map((c, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[6px] ${STATE_STYLES[c.state]}`}
          title={c.date ? c.date.toDateString() : ''}
        />
      ))}
    </div>
  );
}

export default function Progress({ state }) {
  const { streak, coins, weekStats, lifetime } = state;

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-5 pt-3 pb-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/70">
        <h1 className="text-[22px] leading-tight font-extrabold tracking-tight text-slate-900">
          Progress
        </h1>
        <p className="text-[13px] text-slate-500">The receipts.</p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-4 pb-28 space-y-4">
        {/* Streak hero */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-orange-600">
                <Flame className="w-4 h-4" fill="currentColor" />
                <span className="text-[11px] uppercase font-bold tracking-wider">
                  Challenge streak
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[44px] font-black leading-none tabular-nums text-slate-900">
                  {streak}
                </span>
                <span className="text-[15px] font-semibold text-slate-500">days</span>
              </div>
              <p className="mt-1 text-[12px] text-slate-500">
                Longest: <span className="tabular-nums font-semibold text-slate-700">18</span> days
              </p>
            </div>
            <PeakoMascot size={56} />
          </div>

          <div className="mt-4">
            <Calendar />
          </div>

          <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
            <LegendDot color="bg-emerald-500" label="3/3" />
            <LegendDot color="bg-amber-400" label="2/3" />
            <LegendDot color="bg-slate-300" label="Rest" />
            <LegendDot color="bg-rose-400" label="Missed" />
          </div>
        </Card>

        {/* This week */}
        <div className="space-y-2">
          <SectionTitle>This week</SectionTitle>
          <Card className="p-4">
            <div className="grid grid-cols-3 gap-3">
              <WeekStat
                icon={Salad}
                value={`${weekStats.healthy}/7`}
                label="Healthy"
                color="emerald"
              />
              <WeekStat
                icon={Pizza}
                value={weekStats.treat}
                label="Treats"
                color="orange"
              />
              <WeekStat
                icon={NotebookPen}
                value={weekStats.total}
                label="Logs"
                color="sky"
              />
            </div>
            <p className="mt-3 text-[12px] text-slate-500 leading-snug">
              Not a streak. Just counting. Peako narrates a recap on Sunday.
            </p>
          </Card>
        </div>

        {/* Coins */}
        <div className="space-y-2">
          <SectionTitle>Coins</SectionTitle>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-sky-500" fill="currentColor" />
                <span className="text-[28px] font-black tabular-nums text-slate-900">
                  {coins}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Spendable in Phase 2
              </span>
            </div>
            <div className="mt-3 divide-y divide-slate-100">
              {COIN_EVENTS.map((e, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 text-[13px]"
                >
                  <span className="text-slate-700 truncate pr-3">{e.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 tabular-nums">
                      {e.when}
                    </span>
                    <span className="font-semibold tabular-nums text-emerald-600">
                      +{e.delta}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Lifetime */}
        <div className="space-y-2">
          <SectionTitle>Lifetime</SectionTitle>
          <Card className="p-4 grid grid-cols-2 gap-3">
            <LifetimeStat label="Challenges done" value={lifetime.challenges} />
            <LifetimeStat label="Meals logged" value={lifetime.logs} />
            <LifetimeStat label="Days active" value={lifetime.daysActive} />
            <LifetimeStat label="Swaps used" value={lifetime.swaps} />
          </Card>
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <span className={`w-2.5 h-2.5 rounded-[3px] ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function WeekStat({ icon: Icon, value, label, color }) {
  const styles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    sky: 'bg-sky-50 text-sky-700 border-sky-100',
  };
  return (
    <div className={`rounded-xl border p-3 ${styles[color]}`}>
      <Icon className="w-4 h-4" strokeWidth={2.2} />
      <div className="mt-1 text-[20px] font-extrabold tabular-nums">{value}</div>
      <div className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
        {label}
      </div>
    </div>
  );
}

function LifetimeStat({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="text-[22px] font-black tabular-nums text-slate-900">{value}</div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
    </div>
  );
}
