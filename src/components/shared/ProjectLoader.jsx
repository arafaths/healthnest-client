'jsx';
'use client';

import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

export default function ProjectLoader() {
  return (

    <div className="w-full h-[calc(100vh-160px)] min-h-[90vh] flex flex-col items-center justify-center bg-[#030712] text-slate-300 font-sans antialiased">
      <div className="relative flex items-center justify-center">
        
        <div className="absolute w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 animate-ping duration-1000" />

        
        <div className="w-14 h-14 rounded-full border-2 border-slate-900 border-t-emerald-400 animate-spin" />

        
        <div className="absolute flex items-center justify-center w-9 h-9 bg-[#050b14] border border-slate-800 rounded-full text-emerald-400 shadow-lg shadow-emerald-950/40">
          <FaHeartbeat size={18} className="animate-pulse" strokeWidth={2.5} />
        </div>
      </div>

      
      <div className="mt-4 flex flex-col items-center gap-1">
        <span className="text-xs font-bold text-white tracking-widest uppercase animate-pulse">
          Loading
        </span>
        <span className="text-[10px] text-slate-500 font-medium tracking-wide">
          Please wait a moment...
        </span>
      </div>
    </div>
  );
}
