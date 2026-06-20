'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiTarget, FiCompass, FiArrowUpRight, FiPlus } from 'react-icons/fi';
import { FaUserMd, FaUsers } from 'react-icons/fa';

export default function AboutStorySection() {
  // Doctors Team Image
  const Doctors = '/DoctorsTeam2.png';

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 },
    },
  };

  const hoverEffect = {
    hover: {
      y: -6,
      borderColor: 'rgba(16, 185, 129, 0.3)',
      boxShadow: '0 20px 40px -15px rgba(0, 200, 133, 0.15)',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <section className="w-full bg-[#040812] py-10 px-6 md:px-16 lg:px-24 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl w-full space-y-6"
      >
        {/* UPPER ROW: Our Story & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Story Box (8 Cols on Desktop) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-8 bg-[#0a1120]/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center"
          >
            {/* Team Image Section */}
            <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-800/40">
              <Image
                src={Doctors}
                alt="HealthNest Medical Team Teamwork"
                fill
                className="object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
            </div>

            {/* Content Text Section */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                <span className="w-4 h-[2px] bg-emerald-400 block"></span>
                Our Story
              </div>
              <h2 className="text-white text-3xl font-bold tracking-tight">
                Our Story
              </h2>
              <div className="text-slate-400 text-sm md:text-base space-y-3 font-normal leading-relaxed">
                <p>
                  HealthNest was founded with a simple belief - healthcare
                  should be accessible, reliable, and stress-free for everyone.
                </p>
                <p>
                  We bring together trusted doctors, advanced technology, and
                  patient-centric care to simplify the way people connect with
                  healthcare services.
                </p>
                <p className="text-xs md:text-sm text-slate-500">
                  From booking appointments to consultations and follow-ups,
                  were here to make healthcare better, smarter, and more human.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Box Container (4 Cols on Desktop) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-4 bg-[#0a1120]/40 border border-slate-800/50 rounded-3xl p-6 flex flex-col justify-center gap-6 relative overflow-hidden backdrop-blur-sm"
          >
            {/* Subtle top reflection overlay */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

            {/* Stat 1: Doctors */}
            <div className="flex items-center gap-4 bg-[#0e1726]/40 border border-slate-800/60 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl shadow-inner shadow-emerald-500/5">
                <FaUserMd />
              </div>
              <div>
                <div className="text-white text-2xl font-bold tracking-tight flex items-center">
                  500
                  <span className="text-emerald-400 text-xl font-semibold">
                    <FiPlus className="inline w-4 h-4 mb-1" />
                  </span>
                </div>
                <div className="text-slate-400 text-xs font-medium">
                  Doctors
                </div>
              </div>
            </div>

            {/* Separator line inside Stats container */}
            <div className="w-full border-t border-slate-800/80 dashed" />

            {/* Stat 2: Patients */}
            <div className="flex items-center gap-4 bg-[#0e1726]/40 border border-slate-800/60 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl shadow-inner shadow-cyan-500/5">
                <FaUsers />
              </div>
              <div>
                <div className="text-white text-2xl font-bold tracking-tight flex items-center">
                  10K
                  <span className="text-cyan-400 text-xl font-semibold">
                    <FiPlus className="inline w-4 h-4 mb-1" />
                  </span>
                </div>
                <div className="text-slate-400 text-xs font-medium">
                  Patients
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* LOWER ROW: Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Our Mission Box (Emerald Theme) */}
          <motion.div
            whileHover="hover"
            variants={hoverEffect}
            className="bg-gradient-to-br from-[#071317] to-[#050b14] border border-emerald-500/10 rounded-3xl p-6 md:p-8 flex items-center justify-between relative overflow-hidden group cursor-pointer"
          >
            {/* Custom Background Radial Glow */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

            <div className="flex items-start gap-5 z-10">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl shrink-0 shadow-lg shadow-emerald-500/5">
                <FiTarget />
              </div>
              <div className="space-y-2">
                <div className="text-emerald-400 text-xs font-bold tracking-wider uppercase">
                  Our Mission
                </div>
                <h3 className="text-white text-2xl font-bold">Our Mission</h3>
                <p className="text-slate-400 text-sm max-w-sm font-normal leading-relaxed">
                  Provide accessible, secure, and reliable healthcare services
                  for everyone.
                </p>
              </div>
            </div>

            {/* Circular Go-to Arrow */}
            <div className="w-10 h-10 rounded-full border border-slate-800 bg-[#040812] flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all self-end shrink-0 shadow-md">
              <FiArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </motion.div>

          {/* Our Vision Box (Cyan Theme) */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -6,
              borderColor: 'rgba(34, 211, 238, 0.3)',
              boxShadow: '0 20px 40px -15px rgba(6, 182, 212, 0.15)',
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            className="bg-gradient-to-br from-[#06111f] to-[#050b14] border border-cyan-500/10 rounded-3xl p-6 md:p-8 flex items-center justify-between relative overflow-hidden group cursor-pointer"
          >
            {/* Custom Background Radial Glow */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

            <div className="flex items-start gap-5 z-10">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl shrink-0 shadow-lg shadow-cyan-500/5">
                <FiCompass />
              </div>
              <div className="space-y-2">
                <div className="text-cyan-400 text-xs font-bold tracking-wider uppercase">
                  Our Vision
                </div>
                <h3 className="text-white text-2xl font-bold">Our Vision</h3>
                <p className="text-slate-400 text-sm max-w-sm font-normal leading-relaxed">
                  Build a smarter and more connected healthcare ecosystem for
                  the future.
                </p>
              </div>
            </div>

            {/* Circular Go-to Arrow */}
            <div className="w-10 h-10 rounded-full border border-slate-800 bg-[#040812] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all self-end shrink-0 shadow-md">
              <FiArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
