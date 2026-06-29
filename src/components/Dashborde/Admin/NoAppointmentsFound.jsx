import { Calendar } from 'lucide-react';
import React from 'react';

const NoAppointmentsFound = () => {
  return (
    <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl py-20 px-4 flex flex-col items-center justify-center text-center shadow-xl">
      <div className="relative w-32 h-24 mb-6 flex items-center justify-center">
        {/* Medical Clipboard UI Illustration */}
        <div className="w-16 h-20 bg-[#0a1220] border border-slate-800 rounded-xl flex flex-col p-3 shadow-md relative">
          <div className="w-6 h-1.5 bg-slate-900 rounded mb-2.5 mt-1 self-center" />
          <div className="w-10 h-1 bg-slate-900 rounded mb-1.5" />
          <div className="w-8 h-1 bg-slate-900 rounded mb-1.5" />
          <div className="w-10 h-1 bg-slate-900 rounded" />
        </div>
        {/* Small Calendar Plus Badge */}
        <div className="absolute right-4 bottom-1 w-9 h-9 border border-slate-800 bg-[#030712] rounded-full flex items-center justify-center shadow-lg text-emerald-400">
          <Calendar size={14} />
        </div>
      </div>

      <h3 className="text-base font-bold text-white tracking-wide mb-1">
        No Appointments Found
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
        {searchQuery
          ? 'No appointment records match your search query.'
          : 'There are currently no appointment records.'}
      </p>
    </div>
  );
};

export default NoAppointmentsFound;