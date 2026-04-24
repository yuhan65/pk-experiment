import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Pause, Play, X } from 'lucide-react';
import PeakoMascot, { PeakoStage } from '../components/PeakoMascot.jsx';

function useInterjection(lines, intervalMs = 8000) {
  const [line, setLine] = useState(lines[0]);
  useEffect(() => {
    if (!lines || lines.length < 2) return;
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % lines.length;
      setLine(lines[i]);
    }, intervalMs);
    return () => clearInterval(t);
  }, [lines, intervalMs]);
  return line;
}

function PeakoLine({ text }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 mx-auto max-w-[320px] bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3 text-center text-white/95 text-[14px] leading-snug"
    >
      “{text}”
    </motion.div>
  );
}

function TimerGame({ game, onDone }) {
  const [remaining, setRemaining] = useState(game.duration);
  const [paused, setPaused] = useState(false);
  const line = useInterjection(game.mid, 7000);

  useEffect(() => {
    if (paused) return;
    if (remaining <= 0) {
      onDone();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, paused, onDone]);

  const pct = 1 - remaining / game.duration;
  const circumference = 2 * Math.PI * 120;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[260px] h-[260px]">
        <svg viewBox="0 0 260 260" className="w-full h-full -rotate-90">
          <circle cx="130" cy="130" r="120" stroke="rgba(255,255,255,0.12)" strokeWidth="12" fill="none" />
          <motion.circle
            cx="130"
            cy="130"
            r="120"
            stroke="white"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct)}
            transition={{ duration: 0.4 }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-[72px] font-black tabular-nums text-white leading-none">
              {remaining}
            </div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-white/70">
              seconds
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setPaused((p) => !p)}
        className="mt-6 h-11 px-6 rounded-full bg-white/10 text-white font-semibold flex items-center gap-2 border border-white/15"
      >
        {paused ? <Play className="w-4 h-4" fill="currentColor" /> : <Pause className="w-4 h-4" fill="currentColor" />}
        {paused ? 'Resume' : 'Pause'}
      </button>

      <PeakoLine text={paused ? 'Oh, pausing. Bold.' : line} />
    </div>
  );
}

function CounterGame({ game, onDone }) {
  const [count, setCount] = useState(0);
  const line = useInterjection(game.mid, 9000);

  useEffect(() => {
    if (count >= game.target) {
      const t = setTimeout(onDone, 420);
      return () => clearTimeout(t);
    }
  }, [count, game.target, onDone]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <div className="text-[96px] font-black leading-none text-white tabular-nums">
          {count}
        </div>
        <div className="text-[15px] font-semibold uppercase tracking-widest text-white/70 mt-1">
          of {game.target} {game.unit}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setCount((c) => Math.min(game.target, c + 1))}
        className="mt-8 w-[180px] h-[180px] rounded-full bg-white text-slate-900 text-[32px] font-black shadow-phone active:brightness-95"
      >
        +1
      </motion.button>

      <button
        onClick={onDone}
        className="mt-5 h-10 px-5 rounded-full bg-white/10 text-white font-semibold text-[13px] border border-white/15"
      >
        I’m done
      </button>

      <PeakoLine text={line} />
    </div>
  );
}

function GuidedGame({ game, onDone }) {
  const [stepIdx, setStepIdx] = useState(0);
  const step = game.steps[stepIdx];
  const [remaining, setRemaining] = useState(step.duration);

  useEffect(() => {
    setRemaining(game.steps[stepIdx].duration);
  }, [stepIdx, game.steps]);

  useEffect(() => {
    if (remaining <= 0) {
      if (stepIdx < game.steps.length - 1) {
        setStepIdx((s) => s + 1);
      } else {
        onDone();
      }
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, stepIdx, game.steps.length, onDone]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[320px]">
        <div className="flex items-center justify-between text-[12px] font-semibold text-white/70 uppercase tracking-widest">
          <span>Step {stepIdx + 1} of {game.steps.length}</span>
          <span>{remaining}s</span>
        </div>
        <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white"
            animate={{ width: `${((step.duration - remaining) / step.duration) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="mt-8 w-[240px] h-[240px] rounded-[32px] bg-white/10 border border-white/15 grid place-items-center text-center px-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-white/60 font-bold">
            Placeholder illustration
          </div>
          <div className="mt-2 text-[28px] font-black text-white leading-tight">
            {step.name}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          if (stepIdx < game.steps.length - 1) setStepIdx((s) => s + 1);
          else onDone();
        }}
        className="mt-6 h-11 px-6 rounded-full bg-white text-slate-900 font-bold text-[14px] flex items-center gap-2"
      >
        Next <ArrowRight className="w-4 h-4" />
      </button>

      <PeakoLine text={step.cue} />
    </div>
  );
}

export default function ChallengeModal({ game, challengeIdx, totalChallenges, onClose, onComplete }) {
  const [phase, setPhase] = useState('intro'); // intro | active | complete
  const [confirmQuit, setConfirmQuit] = useState(false);

  const handleDone = () => setPhase('complete');
  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const tryClose = () => {
    if (phase === 'complete') {
      handleComplete();
      return;
    }
    setConfirmQuit(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col"
    >
      {/* Top bar */}
      <div className="px-4 pt-3 pb-2 flex items-center">
        <button
          onClick={tryClose}
          className="h-9 w-9 grid place-items-center rounded-full bg-white/10 text-white active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
            Challenge {challengeIdx + 1} of {totalChallenges}
          </div>
          <div className="text-[15px] font-bold text-white">{game.name}</div>
        </div>
        <div className="w-9" />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden grid place-items-center px-5">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center w-full"
          >
            <PeakoStage size={140} className="mx-auto" />
            <div className="mt-6 text-[12px] uppercase font-bold tracking-widest text-white/60">
              {game.difficulty} · {game.type}
            </div>
            <h2 className="mt-1 text-[30px] font-black leading-tight text-white">
              {game.name}
            </h2>
            <p className="mt-3 text-[15px] text-white/80 max-w-[320px] mx-auto">
              “{game.hook}”
            </p>
            <button
              onClick={() => setPhase('active')}
              className="mt-8 h-14 px-8 rounded-full bg-white text-slate-900 font-black text-[16px] inline-flex items-center gap-2 shadow-phone"
            >
              Begin <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {phase === 'active' && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            {game.type === 'timer' && <TimerGame game={game} onDone={handleDone} />}
            {game.type === 'counter' && <CounterGame game={game} onDone={handleDone} />}
            {game.type === 'guided' && <GuidedGame game={game} onDone={handleDone} />}
          </motion.div>
        )}

        {phase === 'complete' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="text-center w-full"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-400 grid place-items-center shadow-phone">
              <Check className="w-9 h-9 text-slate-900" strokeWidth={3} />
            </div>
            <h2 className="mt-5 text-[28px] font-black text-white">Done.</h2>
            <p className="mt-2 text-[15px] text-white/80 max-w-[300px] mx-auto">
              “{game.done}”
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-white">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-white/70">
                Earned
              </span>
              <span className="text-[22px] font-black tabular-nums">+10</span>
              <span className="text-[13px] font-semibold text-white/70">coins</span>
            </div>
            <div className="mt-8 flex flex-col gap-2 max-w-[280px] mx-auto">
              <button
                onClick={handleComplete}
                className="h-12 rounded-xl bg-white text-slate-900 font-bold text-[15px]"
              >
                {challengeIdx + 1 < totalChallenges ? 'Back to Today' : 'Finish'}
              </button>
              <p className="text-[11px] text-white/50">
                Share card art TBD — placeholder for now.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quit confirm */}
      {confirmQuit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 grid place-items-center px-6"
        >
          <motion.div
            initial={{ y: 12, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            className="bg-white rounded-2xl p-5 w-full max-w-[320px]"
          >
            <div className="flex items-center gap-3">
              <PeakoMascot size={40} />
              <div>
                <h3 className="text-[16px] font-extrabold text-slate-900">
                  Leaving mid-set?
                </h3>
                <p className="text-[12px] text-slate-500">
                  No streak penalty. Just disappointment.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setConfirmQuit(false)}
                className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-800 font-semibold"
              >
                Keep going
              </button>
              <button
                onClick={onClose}
                className="flex-1 h-11 rounded-xl bg-rose-500 text-white font-semibold"
              >
                Quit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
