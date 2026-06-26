'jsx';
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react'; // প্রজেক্টের থিম অনুযায়ী আইকন (যেমন: Paw, Shield, Stethoscope) পরিবর্তন করতে পারেন

export default function ProjectLoader({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#030712] select-none">
      {/* Background Subtle Glow */}
      <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6">
        {/* ================= ANIMATED ICON CONTAINER ================= */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Rotating Loader Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-slate-900 border-t-emerald-500 border-r-emerald-500/30"
          />

          {/* Middle Pulsing Overlay */}
          <motion.div
            animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="absolute w-14 h-14 rounded-full bg-emerald-500/5 border border-emerald-500/20"
          />

          {/* Center Project Icon */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="relative z-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]"
          >
            <Activity size={28} />
          </motion.div>
        </div>

        {/* ================= TEXT & PROGRESS LINE ================= */}
        <div className="flex flex-col items-center gap-2 text-center">
          <motion.h3
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-[11px] font-bold text-white tracking-widest uppercase bg-gradient-to-r from-slate-200 via-white to-slate-400 bg-clip-text text-transparent"
          >
            {text}
          </motion.h3>

          {/* Infinite Top-to-Bottom or Left-to-Right Flow Line */}
          <div className="w-20 h-[1.5px] bg-slate-900 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: 'easeInOut',
              }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
