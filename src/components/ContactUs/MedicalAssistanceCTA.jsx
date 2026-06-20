'use client';

import React from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaStethoscope,
  FaHeart,
} from 'react-icons/fa';

const MedicalAssistanceCTA = () => {
  return (
    <section className="w-full py-10 px-4 md:px-8 lg:px-16 bg-[#030712] flex justify-center">
      <div className="w-full max-w-7xl">
        {/* Banner Container */}
        <div className="w-full relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#021b16] via-[#032e24] to-[#01140f] border border-emerald-800/40 p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-900/20">
          {/* ================= LEFT SECTION: Icon & Text ================= */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 lg:gap-6 z-10 w-full lg:w-auto">
            {/* Glassmorphism Icon Circle */}
            <div className="w-20 h-20 shrink-0 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner">
              <FaStethoscope className="text-4xl text-cyan-400" />
            </div>

            {/* Text Content */}
            <div className="space-y-2 mt-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                Need Medical Assistance?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
                Connect with trusted doctors and experience seamless healthcare
                services with HealthNest.
              </p>
            </div>
          </div>

          {/* ================= RIGHT SECTION: Buttons ================= */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 z-10 shrink-0">
            {/* Primary Button */}
            <button className="flex items-center gap-2 px-6 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all">
              <FaSearch size={14} /> Find Doctors
            </button>

            {/* Secondary Button */}
            <button className="flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/5 border border-gray-400/60 text-white font-semibold rounded-xl transition-all">
              <FaCalendarAlt size={14} /> Book Appointment
            </button>
          </div>

          {/* ================= BACKGROUND GRAPHIC: ECG & Heart ================= */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 md:w-1/2 pointer-events-none flex items-center justify-end overflow-hidden opacity-30 lg:opacity-60 z-0">
            {/* ECG Line (SVG) */}
            <svg
              className="w-[250px] md:w-[400px] h-24 mr-[-20px] text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              viewBox="0 0 400 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 50H150L170 20L200 90L220 40L230 50H400"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Glowing Heart Graphic */}
            <div className="relative flex items-center justify-center mr-8 lg:mr-16">
              {/* Outer Glow */}
              <div className="absolute w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
              {/* Heart Icon Wrapper */}
              <div className="relative z-10 w-24 h-24 rounded-full border border-emerald-500/30 bg-emerald-900/20 flex items-center justify-center backdrop-blur-sm">
                <FaHeart className="text-5xl text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
              </div>
              {/* Decorative dots around heart */}
              <div className="absolute w-1 h-1 bg-emerald-400 rounded-full top-2 right-4 shadow-[0_0_5px_#34d399]" />
              <div className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full bottom-4 left-2 shadow-[0_0_5px_#22d3ee]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalAssistanceCTA;
