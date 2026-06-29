'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt, FaSearch } from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { MdOutlineSecurity, MdSupportAgent } from 'react-icons/md';
import Link from 'next/link';

const HeroBanner = () => {
  const Doctor = '/Doctor2.png';

  // Framer Motion Variants for Staggered Animation
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-[#020613] overflow-hidden flex items-center justify-center px-6 md:px-16 lg:px-24 py-12">
      {/* Background Radial Glow/Ambient Lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#10b981]/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-[#059669]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Futuristic Abstract Curves (Using Tailwind Borders as vector lines) */}
      <div className="absolute right-[5%] top-[15%] w-[550px] h-[550px] border border-dashed border-emerald-500/20 rounded-full pointer-events-none hidden lg:block animate-[spin_120s_linear_infinite]"></div>
      <div className="absolute right-[12%] top-[22%] w-[400px] h-[400px] border border-emerald-500/10 rounded-full pointer-events-none hidden lg:block"></div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* ================= LEFT SIDE: CONTENT ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-7"
        >
          {/* Top Mini Badge */}
          <motion.div
            variants={fadeInUpVariants}
            className="inline-flex items-center gap-2 w-fit bg-[#091424]/80 border border-gray-800 px-4 py-2 rounded-full text-[13px] text-gray-400"
          >
            <span className="text-[#10b981] flex items-center gap-1">
              <HiOutlineBadgeCheck className="text-base" /> Trusted Healthcare
              Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Your Trusted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#10b981] to-[#34d399]">
              Healthcare
            </span>{' '}
            Companion
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            variants={fadeInUpVariants}
            className="text-gray-400 max-w-xl text-sm md:text-base font-normal leading-relaxed"
          >
            Book appointments with verified doctors, manage healthcare records,
            and receive quality medical care anytime, anywhere.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href={'/find-doctors'}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-95 transition-all text-sm shadow-lg shadow-[#10b981]/20"
            >
              <FaRegCalendarAlt className="text-base" />
              Book Appointment &rarr;
            </Link>

            <Link
              href={'/find-doctors'}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-gray-400 hover:text-white border border-gray-800 bg-[#091424]/40 hover:bg-[#091424]/80 transition-all text-sm"
            >
              <FaSearch className="text-gray-500 text-xs" />
              Find Doctors
            </Link>
          </motion.div>

          {/* Small Checkmarks Features */}
          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-gray-400 pt-2"
          >
            <div className="flex items-center gap-1.5">
              <HiOutlineBadgeCheck className="text-[#10b981] text-lg" />{' '}
              Verified Doctors
            </div>
            <div className="flex items-center gap-1.5">
              <MdOutlineSecurity className="text-[#10b981] text-lg" /> Secure
              Payments
            </div>
            <div className="flex items-center gap-1.5">
              <MdSupportAgent className="text-[#10b981] text-lg" /> 24/7 Support
            </div>
          </motion.div>

          {/* Bottom Trust/Stats Badges */}
          <motion.div
            variants={fadeInUpVariants}
            className="grid grid-cols-4 gap-4 pt-8 border-t border-gray-900/60 max-w-lg"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                50K+
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Patients</p>
            </div>
            <div className="border-l border-gray-900 pl-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                1K+
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Doctors</p>
            </div>
            <div className="border-l border-gray-900 pl-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#10b981] tracking-tight">
                24/7
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Support</p>
            </div>
            <div className="border-l border-gray-900 pl-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#10b981] tracking-tight">
                100%
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Support</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT SIDE: DOCTOR & GLOWING BADGES ================= */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-10 lg:mt-0">
          {/* Main Doctor Frame Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative w-[340px] sm:w-[420px] aspect-[4/5] overflow-visible"
          >
            {/* Doctor Image */}
            <Image
              src={Doctor}
              width={400}
              height={500}
              alt="Main Doctor Companion"
              className="w-full h-full object-cover object-top rounded-[2.5rem] relative z-10"
              style={{
                maskImage:
                  'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
              }}
            />

            {/* Glowing Dot Grid Layer */}
            <div className="absolute top-[-20px] left-[-20px] w-20 h-20 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-40 z-0"></div>

            {/* 1. Floating Badge: Heart (Top Left) */}
            <div className="absolute top-12 left-[-25px] z-20 bg-[#091424]/80 backdrop-blur-md border border-gray-800 p-3.5 rounded-full text-[#10b981] shadow-xl shadow-black/50 animate-[bounce_4s_infinite]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            {/* 2. Floating Badge: Shield (Right Center) */}
            <div className="absolute top-[28%] right-[-20px] z-20 bg-[#091424]/80 backdrop-blur-md border border-gray-800 p-3.5 rounded-full text-blue-400 shadow-xl shadow-black/50 animate-[bounce_5s_infinite]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            {/* 3. Floating Badge: Secure Plus (Bottom Left/Mid) */}
            <div className="absolute bottom-[22%] left-[-15px] z-20 bg-[#091424]/80 backdrop-blur-md border border-gray-800 p-3.5 rounded-full text-emerald-400 shadow-xl shadow-black/50 animate-[bounce_4.5s_infinite]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* 4. Floating Badge: Eye Pulse (Bottom Right) */}
            <div className="absolute bottom-[8%] right-[10px] z-20 bg-[#091424]/80 backdrop-blur-md border border-gray-800 p-3.5 rounded-full text-purple-400 shadow-xl shadow-black/50 animate-[bounce_6s_infinite]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
