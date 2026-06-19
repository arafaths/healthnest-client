'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaHeart } from 'react-icons/fa';

const CTABanner = () => {
  return (
    <section className="w-full bg-[#020613] text-white py-12 px-6 md:px-16 lg:px-24 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl">
        {/* ================= MAIN BANNER CONTAINER ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full rounded-[2rem] p-8 md:p-12 lg:p-16 border border-emerald-500/20 bg-gradient-to-r from-[#041324]/60 to-[#020b14]/90 backdrop-blur-md shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden group"
        >
          {/* Background Ambient Glows */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-700"></div>
          <div className="absolute left-10 top-[-20%] w-40 h-40 bg-teal-500/5 rounded-full blur-[60px] pointer-events-none"></div>

          {/* Left Side: Content Area */}
          <div className="flex flex-col items-start space-y-4 md:space-y-5 max-w-2xl relative z-10 text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Take Control of Your Health Today
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-normal leading-relaxed tracking-wide">
              Book appointments, consult doctors, and manage your health with
              ease.
            </p>

            {/* CTA Button with Hover Motion */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 flex items-center gap-2 py-3 px-6 sm:px-7 rounded-xl font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-95 transition-all text-sm sm:text-base shadow-lg shadow-emerald-950/40"
            >
              <span>Book Appointment Now</span>
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Right Side: Glowing Heartbeat Graphics Area */}
          <div className="relative flex items-center justify-center w-full lg:w-auto min-h-[120px] lg:min-h-0 select-none relative z-10">
            {/* SVG Wave Line + Glowing Pulse Effect */}
            <div className="flex items-center justify-center relative w-64 h-24 md:w-80">
              <svg
                className="w-full h-full text-emerald-500/30"
                viewBox="0 0 300 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 50H120L130 20L140 80L150 40L155 60L160 50H300"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Animated Glowing Dot along the path */}
                <motion.path
                  d="M0 50H120L130 20L140 80L150 40L155 60L160 50H300"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: 'linear',
                  }}
                />
              </svg>

              {/* Glowing Interactive Heart Icon */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
                className="absolute right-4 md:right-8 p-4 bg-emerald-950/20 border-2 border-emerald-500/40 rounded-full text-[#10b981] text-2xl md:text-3xl shadow-[0_0_30px_rgba(16,185,129,0.25)] flex items-center justify-center backdrop-blur-sm"
              >
                <FaHeart className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
