import { ClipboardX, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NoAppointmentsFound = () => {
  return (
    <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl py-16 px-4 flex flex-col items-center justify-center text-center shadow-xl">
                <div className="w-24 h-24 bg-[#0a1220] border border-slate-900 rounded-2xl flex items-center justify-center mb-6 text-slate-600 relative">
                  <ClipboardX
                    size={44}
                    strokeWidth={1.5}
                    className="text-slate-500"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#050b14] flex items-center justify-center text-slate-950 font-bold text-sm">
                    ✕
                  </div>
                </div>
    
                <h3 className="text-lg font-bold text-white tracking-wide mb-2">
                  No appointments found
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mb-6">
                  Looks like you dont have any appointments yet.
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

export default NoAppointmentsFound;