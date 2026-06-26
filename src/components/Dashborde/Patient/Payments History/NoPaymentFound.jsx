import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NoPaymentFound = () => {
  return (
    <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl py-16 px-4 flex flex-col items-center justify-center text-center shadow-xl">
      <div className="relative w-28 h-24 mb-6 text-slate-600 flex items-center justify-center">
        {/* Wallet Illustration Icon Box */}
        <div className="w-20 h-16 bg-[#0a1220] border border-slate-800 rounded-xl flex items-center justify-center relative shadow-inner">
          <div className="w-6 h-3 bg-emerald-500/10 border border-emerald-500/30 rounded absolute top-2 left-2 flex items-center justify-center text-[8px] text-emerald-400 font-bold">
            $
          </div>
          <div className="w-10 h-1.5 bg-slate-900 rounded absolute bottom-3 right-2" />
        </div>
        {/* Error Badge Overlay */}
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#050b14] flex items-center justify-center text-slate-950 font-bold text-xs shadow-md">
          ✕
        </div>
      </div>

      <h3 className="text-lg font-bold text-white tracking-wide mb-2">
        No Payment Records Found
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed max-w-sm mb-6">
        You dont have any payment history yet.
      </p>

      <Link
        href="/find-doctors"
        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-emerald-950/10 transition-all active:scale-[0.98]"
      >
        <Search size={14} strokeWidth={2.5} />
        <span>Find Doctors</span>
      </Link>
    </div>
  );
};

export default NoPaymentFound;