import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, ChevronLeft, ImagePlus, NotebookPen, Utensils, X } from 'lucide-react';
import PeakoMascot from '../components/PeakoMascot.jsx';
import { MEAL_TAGS } from '../peakoData.js';

/* Steps:
   0  category picker (Meal / Other)
   1  meal entry (photo placeholder + caption)
   2  tag picker (Healthy / Treat / Whatever)
   3  other entry (free text)
   4  submitting (Peako thinking)
   5  sent confirmation
*/

export default function LogSheet({ onClose, onSubmit }) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState(null);
  const [caption, setCaption] = useState('');
  const [other, setOther] = useState('');
  const [tag, setTag] = useState(null);

  const canClose = step !== 4;

  const chooseCategory = (c) => {
    setCategory(c);
    setStep(c === 'meal' ? 1 : 3);
  };

  const submitMeal = (tagId) => {
    setTag(tagId);
    setStep(4);
    setTimeout(() => {
      onSubmit({ kind: 'meal', tag: tagId, caption });
      setStep(5);
    }, 1400);
  };

  const submitOther = () => {
    if (!other.trim()) return;
    setStep(4);
    setTimeout(() => {
      onSubmit({ kind: 'other', text: other });
      setStep(5);
    }, 1400);
  };

  const back = () => {
    if (step === 1 || step === 3) setStep(0);
    else if (step === 2) setStep(1);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={canClose ? onClose : undefined}
        className="absolute inset-0 bg-black/40"
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 360, damping: 36 }}
        className="absolute left-0 right-0 bottom-0 bg-white rounded-t-[28px] shadow-phone overflow-hidden max-h-[82%] flex flex-col"
      >
        {/* Grabber */}
        <div className="pt-2 pb-1 grid place-items-center">
          <span className="w-10 h-1.5 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="px-4 pt-1 pb-2 flex items-center">
          {step > 0 && step < 4 ? (
            <button onClick={back} className="h-9 w-9 grid place-items-center -ml-2 text-slate-600 active:scale-95">
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9" />
          )}
          <h2 className="flex-1 text-center text-[16px] font-bold text-slate-900">
            {step === 0 && 'Log something'}
            {step === 1 && 'New meal'}
            {step === 2 && 'How do you tag this?'}
            {step === 3 && 'Other'}
            {step === 4 && 'Sending…'}
            {step === 5 && 'Sent'}
          </h2>
          {canClose ? (
            <button onClick={onClose} className="h-9 w-9 grid place-items-center -mr-2 text-slate-500 active:scale-95">
              <X className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9" />
          )}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="cat"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="pt-2 pb-2 space-y-3"
              >
                <p className="text-[13px] text-slate-500 px-1">
                  Peako is waiting. What are we confessing?
                </p>
                <button
                  onClick={() => chooseCategory('meal')}
                  className="w-full p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-100 flex items-center gap-4 active:scale-[0.99]"
                >
                  <div className="w-12 h-12 rounded-xl bg-white grid place-items-center text-2xl">
                    🍽️
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                      <Utensils className="w-4 h-4" /> Meal
                    </div>
                    <div className="text-[12px] text-slate-500">
                      Photo + tag. Earn coins. Get judged.
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => chooseCategory('other')}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 active:scale-[0.99]"
                >
                  <div className="w-12 h-12 rounded-xl bg-white grid place-items-center text-2xl">
                    📝
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                      <NotebookPen className="w-4 h-4" /> Other
                    </div>
                    <div className="text-[12px] text-slate-500">
                      "Drank 4 espressos." "Skipped breakfast." Free text.
                    </div>
                  </div>
                </button>
                <p className="text-[11px] text-slate-400 text-center pt-2">
                  Workouts aren’t logged here — those are challenges Peako assigns.
                </p>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="meal"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="pt-2 pb-2 space-y-3"
              >
                <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 grid place-items-center">
                  <div className="text-center">
                    <ImagePlus className="w-7 h-7 mx-auto text-slate-400" />
                    <p className="mt-1 text-[13px] font-semibold text-slate-600">
                      Photo placeholder
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Camera roll in Phase 1
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold text-[13px] flex items-center justify-center gap-1.5 active:scale-95">
                    <Camera className="w-4 h-4" /> Camera
                  </button>
                  <button className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold text-[13px] flex items-center justify-center gap-1.5 active:scale-95">
                    <ImagePlus className="w-4 h-4" /> Library
                  </button>
                </div>
                <label className="block">
                  <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
                    Caption (optional)
                  </span>
                  <input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Say something before Peako does…"
                    className="mt-1 w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-[14px] outline-none focus:border-slate-400"
                  />
                </label>
                <button
                  onClick={() => setStep(2)}
                  className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold text-[15px] active:scale-[0.99]"
                >
                  Pick a tag →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="tag"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="pt-2 pb-2 space-y-2"
              >
                <p className="text-[13px] text-slate-500 px-1">
                  Tell the truth. Peako reacts accordingly.
                </p>
                {Object.values(MEAL_TAGS).map((t) => (
                  <motion.button
                    key={t.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => submitMeal(t.id)}
                    className={`w-full p-4 rounded-2xl text-white text-left shadow-card bg-gradient-to-br ${t.color} flex items-center gap-4`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/20 grid place-items-center text-2xl">
                      {t.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="text-[17px] font-extrabold">{t.label}</div>
                      <div className="text-[12px] opacity-90">{t.sub}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase font-bold tracking-wider opacity-80">
                        Coins
                      </div>
                      <div className="text-[18px] font-black tabular-nums">
                        +{t.coins}
                      </div>
                    </div>
                  </motion.button>
                ))}
                <p className="text-[11px] text-slate-400 text-center pt-1">
                  All tags earn coins. None of them are wrong.
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="other"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="pt-2 pb-2 space-y-3"
              >
                <label className="block">
                  <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
                    Confession
                  </span>
                  <textarea
                    rows={4}
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    placeholder="Drank 4 espressos. Skipped breakfast. You know what you did."
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[14px] outline-none focus:border-slate-400 resize-none"
                  />
                </label>
                <button
                  onClick={submitOther}
                  disabled={!other.trim()}
                  className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold text-[15px] disabled:opacity-40 active:scale-[0.99]"
                >
                  Send to Peako
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="send"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.06, 1], rotate: [0, -4, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                >
                  <PeakoMascot size={76} className="mx-auto" />
                </motion.div>
                <p className="mt-4 text-[15px] font-bold text-slate-800">
                  Peako is thinking…
                </p>
                <p className="text-[12px] text-slate-500">
                  (choosing violence, probably)
                </p>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center space-y-3"
              >
                <PeakoMascot size={64} className="mx-auto" />
                <p className="text-[17px] font-extrabold text-slate-900">Sent.</p>
                <p className="text-[13px] text-slate-500 px-4">
                  Peako posted about {category === 'meal' && tag ? MEAL_TAGS[tag].label.toLowerCase() : 'it'}. Check your phone.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 w-full h-12 rounded-xl bg-slate-900 text-white font-bold text-[15px] active:scale-[0.99]"
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
