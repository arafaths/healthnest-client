import { Check } from 'lucide-react';
import React from 'react';

const NoDoctorsFound = () => {
  return (
    <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl py-20 px-4 flex flex-col items-center justify-center text-center shadow-xl">
      {/* Clipboard with Guard Shield Vector Mockup */}
      <div className="relative w-32 h-24 mb-6 flex items-center justify-center">
        {/* Medical Clipboard */}
        <div className="w-16 h-20 bg-[#0a1220] border border-slate-800 rounded-xl flex flex-col p-3 shadow-md relative">
          <div className="w-6 h-1.5 bg-slate-900 rounded mb-2 mt-1 self-center" />
          <div className="w-10 h-1 bg-slate-900 rounded mb-1.5" />
          <div className="w-8 h-1 bg-slate-900 rounded mb-1.5" />
          <div className="w-10 h-1 bg-slate-900 rounded" />
        </div>
        {/* Emerald Verification Shield Indicator */}
        <div className="absolute right-4 bottom-1 w-9 h-10 border border-emerald-500/30 bg-[#030712] rounded-xl flex items-center justify-center shadow-lg text-emerald-400 shadow-emerald-950/20 animate-pulse">
          <Check size={16} strokeWidth={3} />
        </div>
      </div>

      <h3 className="text-base font-bold text-white tracking-wide mb-1">
        No Verification Requests
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
         There are currently no doctor verification requests.
      </p>
    </div>
  );
};

export default NoDoctorsFound;