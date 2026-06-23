'use client';

import Link from 'next/link';
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  ClipboardList,
} from 'lucide-react';

export default function StayHealthyBanner() {
  return (
    <div className="bg-[#030712] p-6">
      <div className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#014122] via-[#02522b] to-[#01381e] p-6 sm:p-8 lg:p-10 border border-emerald-500/10 shadow-[0_10px_40px_rgba(2,82,43,0.15)] flex flex-col md:flex-row items-center justify-between gap-6 select-none group">
        {/* Background Subtle Sparkle/Light Effects */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-emerald-400/10 rounded-full blur-[50px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Left Content Section: 3D-Like Icons Combo & Texts */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left w-full md:w-auto">
          {/* Composition of Glowing Icons representing the image graphic */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            {/* Glowing Shield on Background Left */}
            <div className="absolute -left-2 top-2 text-emerald-400/80 filter drop-shadow-[0_0_12px_rgba(52,211,153,0.4)] animate-pulse">
              <ShieldCheck size={44} strokeWidth={1.5} />
            </div>

            {/* Main Clipboard in Middle */}
            <div className="absolute text-slate-100 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] bg-emerald-950/40 p-2.5 rounded-2xl border border-emerald-500/20 transform -rotate-6 transition-transform group-hover:rotate-0 duration-300">
              <ClipboardList size={38} strokeWidth={1.8} />
            </div>

            {/* Heart Pulse Emblem Bottom Right */}
            <div className="absolute -right-1 bottom-1 text-rose-500 filter drop-shadow-[0_0_10px_rgba(244,63,94,0.5)] transform rotate-12 transition-transform group-hover:scale-110 duration-300">
              <HeartPulse size={30} fill="currentColor" strokeWidth={1} />
            </div>

            {/* Sparkle effects decorators */}
            <span className="absolute top-1 right-2 text-emerald-300/40 text-lg font-bold">
              +
            </span>
            <span className="absolute bottom-2 left-1 text-emerald-300/40 text-xl font-bold">
              +
            </span>
          </div>

          {/* Banner Headers & Paragraph */}
          <div className="flex flex-col min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 filter drop-shadow-sm">
              Stay Healthy
            </h2>
            <p className="text-sm sm:text-[15px] font-medium text-emerald-100/80 leading-relaxed max-w-md tracking-wide">
              Keep track of your appointments and maintain regular health
              checkups.
            </p>
          </div>
        </div>

        {/* Right Content Section: White Glossy Button */}
        <div className="shrink-0 w-full md:w-auto flex justify-center md:justify-end">
          <Link
            href="/dashboard/patient/appointments"
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-50 hover:bg-white text-slate-900 text-[14px] font-bold tracking-wide shadow-[0_4px_14px_rgba(255,255,255,0.1)] transition-all duration-200 active:scale-[0.98]">
              <span>View Appointments</span>
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="text-slate-800 transition-transform group-hover:translate-x-1 duration-200"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
