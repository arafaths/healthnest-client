'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { TbMedicalCross } from 'react-icons/tb';

const NotFound = () => {
  return (
    <section className="w-full min-h-screen bg-[#020613] text-white py-16 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] left-[15%] w-40 h-40 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-2xl w-full text-center flex flex-col items-center space-y-8 relative z-10">
        {/* ================= ANIMATED 404 & MEDICAL ICON ================= */}
        <div className="relative flex items-center justify-center">
          {/* Big Neon 404 Text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-[100px] sm:text-[140px] md:text-[170px] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-950 select-none leading-none opacity-40"
          >
            404
          </motion.h1>

          {/* Floating Floating/Heartbeat Medical Icon right in the center */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
            className="absolute p-6 bg-emerald-950/20 border-2 border-emerald-500/30 rounded-[2rem] text-[#10b981] text-4xl sm:text-5xl shadow-[0_0_50px_rgba(16,185,129,0.2)] backdrop-blur-md"
          >
            <TbMedicalCross className="animate-pulse" />
          </motion.div>
        </div>

        {/* ================= TEXT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed tracking-wide">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* ================= BUTTONS AREA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
        >
          {/* Back to Home Button */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-95 transition-all text-sm shadow-lg shadow-emerald-950/40"
          >
            <HiOutlineArrowNarrowLeft size={16} />
            <span>Back to Home</span>
          </motion.a>


        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
