import { Plus } from 'lucide-react';
import React from 'react';

const NoPrescriptions = ({ handleOpenModal }) => {
  return (
    <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl py-20 px-4 flex flex-col items-center justify-center text-center shadow-xl">
      <div className="relative w-28 h-24 mb-6 flex items-center justify-center gap-2">
        {/* Prescription Document */}
        <div className="w-14 h-18 bg-[#0a1220] border border-slate-800 rounded-xl flex flex-col items-start p-2.5 shadow-md relative">
          <span className="text-emerald-500 font-bold text-sm leading-none mb-1.5 font-serif">
            Rx
          </span>
          <div className="w-full h-[2px] bg-slate-900 rounded mb-1" />
          <div className="w-2/3 h-[2px] bg-slate-900 rounded" />
        </div>
        {/* Medicine Bottle */}
        <div className="w-9 h-13 bg-emerald-950/30 border border-emerald-500/20 rounded-lg flex flex-col items-center justify-center relative p-1 mt-4 shadow-sm">
          <div className="w-6 h-2 bg-emerald-950 border border-emerald-500/20 rounded absolute -top-2" />
          <div className="w-4 h-4 bg-emerald-500/10 rounded border border-emerald-500/20 flex items-center justify-center text-[8px] text-emerald-400">
            ✚
          </div>
        </div>
      </div>

      <h3 className="text-base font-bold text-white tracking-wide mb-1">
        No Prescriptions Yet
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed max-w-sm mb-6">
        Create a prescription after completing a patients appointment.
      </p>

      <button
        onClick={handleOpenModal}
        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow-lg shadow-emerald-950/10 transition-all active:scale-[0.98]"
      >
        <Plus size={14} strokeWidth={2.5} />
        <span>Create Prescription</span>
      </button>
    </div>
  );
};

export default NoPrescriptions;