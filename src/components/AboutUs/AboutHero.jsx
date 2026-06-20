'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiArrowRight,
  FiPlay,
  FiHeart,
  FiShield,
  FiPlus,
} from 'react-icons/fi';

export default function AboutHero() {
  // Doctors Image
  const Doctors = '/DoctorsTeam.png';

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  // Floating variants for glass cards
  const floatingVariants = (duration = 4, yOffset = 10) => ({
    animate: {
      y: [0, -yOffset, 0],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  });

  return (
    <section className="relative w-full bg-[#040812] overflow-hidden flex items-center py-16 px-6 md:px-16 lg:px-24">
      {/* Background Glowing Circles */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none hidden md:block" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none hidden md:block" />

      {/* Decorative Tech Rings on Background */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-slate-800/30 rounded-full pointer-events-none hidden lg:block" />
      <div className="absolute right-[50px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-emerald-500/5 rounded-full pointer-events-none hidden lg:block" />

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side Content - Text & Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:col-span-6 flex flex-col items-start space-y-6"
        >
          {/* Top Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-slate-200 text-sm font-medium"
          >
            <FiUsers className="text-emerald-400 w-4 h-4" />
            <span>About HealthNest</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]"
          >
            Transforming <br />
            Healthcare Through <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Innovation
            </span>{' '}
            and{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Trust
            </span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed"
          >
            HealthNest is a modern healthcare platform dedicated to connecting
            patients with trusted doctors and providing seamless healthcare
            experiences through smart digital solutions.
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto"
          >
            {/* Primary Action Button */}
            <button className="flex items-center justify-center gap-2 bg-[#00c885] hover:bg-[#00b074] text-[#040812] font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-emerald-500/10 group">
              Our Story
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Watch Video Button */}
            <button className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border border-slate-800 text-slate-200 font-medium px-5 py-3.5 rounded-xl transition-all duration-200 text-sm">
              <div className="w-6 h-6 rounded-full border border-slate-700 bg-[#040812] flex items-center justify-center text-slate-300">
                <FiPlay className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              Watch Video
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side Content - Imagery & Floating Icons */}
        <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[400px] sm:min-h-[500px]">
          {/* Main Doctors Group Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full max-w-[520px] aspect-[1.1] md:aspect-square flex items-end justify-center rounded-2xl overflow-visible"
          >
            <Image
              src={Doctors}
              width={400}
              height={500}
              alt="HealthNest Medical Professionals"
              className="w-full h-[95%] object-cover rounded-3xl object-top border border-slate-800/40 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 shadow-2xl"
              priority
            />
            {/* Soft shadow layer directly over the bottom of image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040812] via-transparent to-transparent rounded-3xl" />
          </motion.div>

          {/* FLOATING GLASS CONTAINERS */}

          {/* 1. Heartbeat Icon (Top Left) */}
          <motion.div
            variants={floatingVariants(4, 12)}
            animate="animate"
            className="absolute top-12 left-4 sm:left-12 bg-slate-900/60 border border-slate-700/40 backdrop-blur-md p-3 rounded-xl shadow-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FiHeart className="w-4 h-4" />
            </div>
          </motion.div>

          {/* 2. Shield/Security Icon (Top Right) */}
          <motion.div
            variants={floatingVariants(5, 15)}
            animate="animate"
            className="absolute top-20 right-2 sm:right-6 bg-slate-900/60 border border-slate-700/40 backdrop-blur-md p-3 rounded-xl shadow-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FiShield className="w-4 h-4" />
            </div>
          </motion.div>

          {/* 3. Plus Icon (Middle Left) */}
          <motion.div
            variants={floatingVariants(4.5, 10)}
            animate="animate"
            className="absolute bottom-1/3 left-0 bg-slate-900/60 border border-slate-700/40 backdrop-blur-md p-3 rounded-xl shadow-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <FiPlus className="w-4 h-4 stroke-[3]" />
            </div>
          </motion.div>

          {/* 4. Users Icon (Bottom Right) */}
          <motion.div
            variants={floatingVariants(3.5, 8)}
            animate="animate"
            className="absolute bottom-12 right-4 sm:right-10 bg-slate-900/60 border border-slate-700/40 backdrop-blur-md p-3 rounded-xl shadow-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-200">
              <FiUsers className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
