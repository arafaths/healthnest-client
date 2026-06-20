'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiShield,
  FiCalendar,
  FiUsers,
  FiUserCheck,
  FiCheckCircle,
} from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';

export default function CoreValuesAndAchievements() {
  // Variants for staggered container entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 18 },
    },
  };

  // Values Section Data
  const values = [
    {
      title: 'Compassion',
      desc: 'Putting patients first with empathy and care.',
      icon: <FiHeart className="w-6 h-6 text-emerald-400" />,
      glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      lineBg: 'bg-emerald-500',
    },
    {
      title: 'Integrity',
      desc: 'Providing trusted and transparent healthcare services.',
      icon: <FiShield className="w-6 h-6 text-sky-400" />,
      glowClass: 'shadow-[0_0_20px_rgba(56,189,248,0.15)]',
      lineBg: 'bg-sky-500',
    },
    {
      title: 'Innovation',
      desc: 'Using technology to create better healthcare experiences.',
      icon: <IoRocketOutline className="w-6 h-6 text-purple-400" />,
      glowClass: 'shadow-[0_0_20px_rgba(192,132,252,0.15)]',
      lineBg: 'bg-purple-500',
    },
  ];

  // Achievements/Timeline Data
  const achievements = [
    {
      year: '2022',
      title: 'Founded HealthNest',
      desc: 'Started our journey with a vision to transform digital healthcare.',
      icon: <FiCalendar className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500 to-teal-400',
      glowColor: 'bg-emerald-400',
    },
    {
      year: '2023',
      title: 'Reached 5,000+ Patients',
      desc: 'Trusted by thousands of patients who believe in our care.',
      icon: <FiUsers className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500 to-blue-400',
      glowColor: 'bg-cyan-400',
    },
    {
      year: '2024',
      title: 'Expanded Doctor Network',
      desc: 'Grew our network of specialists to provide better care.',
      icon: <FiUserCheck className="w-5 h-5 text-sky-400" />,
      color: 'from-sky-500 to-indigo-400',
      glowColor: 'bg-sky-400',
    },
    {
      year: '2025',
      title: '25,000+ Appointments Completed',
      desc: 'Milestone achieved with the trust and support of our community.',
      icon: <FiCheckCircle className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500 to-pink-400',
      glowColor: 'bg-purple-400',
    },
  ];

  return (
    <section className="w-full bg-[#040812] py-20 px-6 md:px-16 lg:px-24 text-white overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl w-full space-y-24">
        {/* ================== SECTION 1: CORE VALUES ================== */}
        <div className="space-y-8">
          {/* Badge Head */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-400 uppercase">
              <span className="w-4 h-[2px] bg-emerald-400 block"></span>
              Our Core Values
              <span className="w-4 h-[2px] bg-emerald-400 block"></span>
            </div>
          </div>

          {/* Core Values Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-[#0b1324]/60 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between relative group overflow-hidden backdrop-blur-sm"
              >
                <div className="flex items-start gap-5">
                  {/* Glowing Floating Icon Ring */}
                  <div
                    className={`w-14 h-14 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center shrink-0 relative z-10 ${item.glowClass}`}
                  >
                    {item.icon}
                    {/* Inner soft blur overlay */}
                    <div className="absolute inset-0 bg-current opacity-5 rounded-full blur-sm" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom colored bar asset inside image */}
                <div
                  className={`w-10 h-[3px] ${item.lineBg} rounded-full mt-6 ml-[76px] opacity-80`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================== SECTION 2: ACHIEVEMENTS TIMELINE ================== */}
        <div className="space-y-12">
          {/* Badge Head */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-400 uppercase">
              <span className="w-4 h-[2px] bg-emerald-400 block"></span>
              Our Achievements
              <span className="w-4 h-[2px] bg-emerald-400 block"></span>
            </div>
          </div>

          {/* Timeline Node Wrapper */}
          <div className="relative w-full pt-6">
            {/* DESKTOP VIEW: Horizontal Connected Timeline */}
            <div className="hidden lg:block relative w-full">
              {/* Horizontal Center Axis Line */}
              <div className="absolute top-[14px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-purple-500/30" />

              {/* 4 Items Horizontal Flex Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-4 gap-6 w-full relative z-10"
              >
                {achievements.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="flex flex-col items-center space-y-6"
                  >
                    {/* Timeline Node Ring & Glow */}
                    <div className="relative flex items-center justify-center">
                      {/* Pulsing Back Glow */}
                      <div
                        className={`absolute w-7 h-7 rounded-full ${item.glowColor} opacity-25 blur-sm animate-ping`}
                      />
                      {/* Center Node Dot */}
                      <div
                        className={`w-4 h-4 rounded-full ${item.glowColor} border-4 border-[#040812] shadow-[0_0_12px_currentColor]`}
                      />
                    </div>

                    {/* Timeline Info Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-[#0b1324]/50 border border-slate-800/80 rounded-2xl p-5 space-y-3 text-left w-full relative"
                    >
                      {/* Top color indicator capsule wrapper */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-center mb-1`}
                      >
                        {item.icon}
                      </div>
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                      >
                        {item.year}
                      </div>
                      <h4 className="text-slate-100 font-bold text-sm tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* MOBILE & TABLET VIEW: Smart Vertical Timeline */}
            <div className="block lg:hidden relative pl-8 sm:pl-12 max-w-md mx-auto">
              {/* Vertical Side Axis Line */}
              <div className="absolute top-0 bottom-0 left-[15px] w-[2px] bg-gradient-to-b from-emerald-500/40 via-cyan-500/40 to-purple-500/40" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {achievements.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="relative flex flex-col items-start text-left"
                  >
                    {/* Vertical Axis Node Pin */}
                    <div className="absolute left-[-24px] sm:left-[-36px] top-6 flex items-center justify-center">
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${item.glowColor} border-2 border-[#040812]`}
                      />
                    </div>

                    {/* Card Container */}
                    <div className="bg-[#0b1324]/60 border border-slate-800/80 rounded-2xl p-5 space-y-2 w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div
                          className={`text-xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                        >
                          {item.year}
                        </div>
                      </div>
                      <h4 className="text-slate-100 font-semibold text-sm pt-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
