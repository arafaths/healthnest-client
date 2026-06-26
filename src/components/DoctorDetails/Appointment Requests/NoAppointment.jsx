import React from 'react';

const NoAppointment = () => {
  return (
    <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl py-16 px-4 flex flex-col items-center justify-center text-center shadow-xl">
      <div className="relative w-24 h-24 mb-5 flex items-center justify-center text-slate-700">
        {/* Clipboard Icon Design matching Screenshot 2026-06-26 212109.jpg */}
        <div className="w-16 h-20 bg-[#0a1220] border border-slate-800 rounded-xl flex flex-col items-center justify-center relative p-2 shadow-inner">
          <div className="w-6 h-2 bg-slate-800 rounded-md absolute -top-1 left-1/2 -translate-x-1/2" />
          <div className="w-8 h-1 bg-slate-900 rounded mb-1.5 mt-2" />
          <div className="w-10 h-1 bg-slate-900 rounded mb-1.5" />
          <div className="w-6 h-1 bg-slate-900 rounded" />
        </div>
        {/* Center Floating Plus Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 font-bold text-sm shadow-md">
          +
        </div>
      </div>

      <h3 className="text-base font-bold text-white tracking-wide mb-1">
        No Appointment Requests
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
        You dont have any appointment requests yet.
      </p>
    </div>
  );
};

export default NoAppointment;