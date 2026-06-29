import React from 'react';

const NoUsersFound = () => {
  return (
    <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl py-20 px-4 flex flex-col items-center justify-center text-center shadow-xl">
      {/* Clipboard and Magnifying Glass Vector Mockup from Screenshot 2026-06-28 155651.jpg */}
      <div className="relative w-32 h-24 mb-6 flex items-center justify-center">
        <div className="w-16 h-20 bg-[#0a1220] border border-slate-800 rounded-xl flex flex-col p-3 shadow-md relative">
          <div className="w-6 h-1.5 bg-slate-900 rounded mb-2 mt-1" />
          <div className="w-10 h-1 bg-slate-900 rounded mb-1.5" />
          <div className="w-8 h-1 bg-slate-900 rounded mb-1.5" />
          <div className="w-10 h-1 bg-slate-900 rounded" />
        </div>
        <div className="absolute right-4 bottom-2 w-9 h-9 border-2 border-slate-700 bg-[#050b14] rounded-full flex items-center justify-center shadow-lg">
          <div className="w-3 h-3 border-2 border-slate-500 rounded-full" />
          <div className="w-2 h-0.5 bg-slate-500 rotate-45 absolute bottom-1 right-1" />
        </div>
      </div>

      <h3 className="text-base font-bold text-white tracking-wide mb-1">
        No Users Found
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
        There are currently no registered users.
      </p>
    </div>
  );
};

export default NoUsersFound;