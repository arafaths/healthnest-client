import { Plus, Star } from 'lucide-react';
import React from 'react';

const NOReviews = ({ handleOpenModal }) => {
  return (
    <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl py-16 px-4 flex flex-col items-center justify-center text-center shadow-xl">
      <div className="relative w-28 h-24 mb-6 flex items-center justify-center text-slate-700">
        <div className="w-16 h-20 bg-[#0a1220] border border-slate-800 rounded-xl flex flex-col items-center justify-center relative p-2 shadow-inner">
          <div className="w-8 h-1 bg-slate-800 rounded mb-1.5" />
          <div className="w-10 h-1 bg-slate-800 rounded mb-1.5" />
          <Star size={16} className="text-slate-800 mt-1" fill="currentColor" />
        </div>
        <div className="absolute top-2 right-2 w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-xs font-bold">
          💬
        </div>
      </div>

      <h3 className="text-base font-bold text-white tracking-wide mb-1">
        No Reviews Yet
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed max-w-sm mb-5">
        Share your experience with doctors after your appointments.
      </p>

      <button
        onClick={handleOpenModal}
        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow-lg shadow-emerald-950/10 transition-all active:scale-[0.98]"
      >
        <Plus size={14} strokeWidth={2.5} />
        <span>Add First Review</span>
      </button>
    </div>
  );
};

export default NOReviews;