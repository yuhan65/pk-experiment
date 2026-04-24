import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Heart, MessageCircle, Send, ChevronLeft, RefreshCw } from 'lucide-react';
import PeakoMascot from '../components/PeakoMascot.jsx';

function timeAgo(ts) {
  const diff = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: -16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.7 }}
      className="bg-white rounded-2xl shadow-card border border-slate-100 p-4"
    >
      <div className="flex items-start gap-3">
        <PeakoMascot size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[15px]">
            <span className="font-bold text-slate-900">Peako</span>
            <BadgeCheck
              className="w-[18px] h-[18px] text-sky-500"
              fill="currentColor"
              stroke="white"
              strokeWidth={2}
            />
            <span className="text-slate-500 truncate">
              @peako_observer · {timeAgo(post.createdAt)}
            </span>
          </div>
          <p className="mt-1 text-[15px] leading-snug text-slate-800">{post.text}</p>

          <div
            className={`mt-3 h-40 w-full rounded-xl ${post.imageClass} grid place-items-center text-white font-bold text-lg shadow-inner overflow-hidden relative`}
          >
            <span className="drop-shadow-sm">{post.imageLabel}</span>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.35),transparent_50%)]" />
            <span className="absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-widest text-white/70">
              placeholder
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-slate-500 text-[13px] pr-1">
            <button
              onClick={() => setLiked((v) => !v)}
              className="flex items-center gap-1.5 group active:scale-95 transition-transform"
            >
              <Heart
                className={`w-[18px] h-[18px] transition-colors ${
                  liked ? 'text-rose-500' : 'group-hover:text-rose-400'
                }`}
                fill={liked ? 'currentColor' : 'none'}
                strokeWidth={2}
              />
              <span
                className={`tabular-nums ${liked ? 'text-rose-500 font-semibold' : ''}`}
              >
                {post.likes + (liked ? 1 : 0)}
              </span>
            </button>
            <button className="flex items-center gap-1.5 active:scale-95 transition-transform">
              <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
              <span className="tabular-nums">0</span>
            </button>
            <button className="flex items-center gap-1.5 active:scale-95 transition-transform">
              <Send className="w-[18px] h-[18px]" strokeWidth={2} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Feed({ posts, onBack, onPullRefresh }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 700));
    onPullRefresh?.();
    setRefreshing(false);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      className="absolute inset-0 bg-slate-50 flex flex-col"
    >
      {/* Nav bar */}
      <div className="px-2 pt-3 pb-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 flex items-center">
        <button
          onClick={onBack}
          className="h-10 pl-2 pr-3 rounded-full flex items-center gap-1 text-slate-700 font-semibold active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-[15px]">Today</span>
        </button>
        <div className="flex-1 text-center">
          <div className="text-[15px] font-bold text-slate-900">Peako</div>
          <div className="text-[11px] text-slate-500 -mt-0.5">@peako_observer</div>
        </div>
        <button
          onClick={handleRefresh}
          className="h-10 w-10 rounded-full grid place-items-center text-slate-700 active:scale-95"
          aria-label="Refresh"
        >
          <RefreshCw
            className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`}
            strokeWidth={2.2}
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-6 space-y-3">
        <AnimatePresence initial={false}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </AnimatePresence>
        {posts.length === 0 && (
          <div className="mt-20 text-center">
            <PeakoMascot size={64} className="mx-auto" />
            <p className="mt-3 text-[15px] font-semibold text-slate-700">
              Peako has nothing to say.
            </p>
            <p className="text-[12px] text-slate-500">Suspicious.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
