'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHeadset,
  FaUserMd,
  FaShieldAlt,
  FaPlus,
  FaCalendarAlt,
} from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { HiLightningBolt } from 'react-icons/hi';
import Image from 'next/image';

const SupportHero = () => {
  // Doctor Image
  const Doctor = '/Doctor3.png';

  // Animation configuration for floating cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
  };

  const features = [
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      desc: "We're always here to help",
      color: 'text-cyan-400',
      pos: 'top-4 left-0 lg:-left-12',
    },
    {
      icon: <FaUserMd />,
      title: 'Expert Team',
      desc: 'Professional doctors & staff',
      color: 'text-emerald-400',
      pos: 'top-20 right-0 lg:-right-6',
    },
    {
      icon: <HiLightningBolt />,
      title: 'Quick Response',
      desc: 'We respond as fast as possible',
      color: 'text-amber-400',
      pos: 'bottom-32 left-0 lg:-left-6',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Trusted Care',
      desc: 'Your health is our priority',
      color: 'text-teal-400',
      pos: 'bottom-12 right-0 lg:-right-12',
    },
  ];

  return (
    <section className="w-full min-h-[90vh] bg-[#030712] text-white py-8 px-4 md:px-8 lg:px-16 flex items-center justify-center overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* ================= LEFT CONTENT COLUMN ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/40 border border-gray-800 rounded-full backdrop-blur-sm text-xs md:text-sm font-medium text-gray-300">
            <span className="text-emerald-400">
              <FaHeadset />
            </span>{' '}
            Get In Touch
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Were Here To <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-emerald-400">
              Help You
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
            Have questions about appointments, doctors, or healthcare services?
            Our team is always ready to assist you and provide the support you
            need.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl hover:opacity-95 shadow-lg shadow-emerald-950/30 transition-all text-sm">
              <FiSearch size={16} /> Find Doctors
            </button>
            <button className="flex items-center gap-2 px-6 py-3 font-semibold text-gray-300 hover:text-white border border-gray-800 bg-[#0b1329]/40 backdrop-blur-sm rounded-xl hover:bg-gray-800/40 transition-all text-sm">
              <FaCalendarAlt size={14} /> Book Appointment
            </button>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE & FLOATING CARDS COLUMN ================= */}
        <div className="relative w-full flex items-center justify-center min-h-[500px]">
          {/* Animated Green Circle Radar */}
          <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] border border-emerald-500/20 rounded-full animate-ping opacity-25" />
          <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] border border-teal-500/10 rounded-full opacity-40" />

          {/* Center Doctor Image Wrapper */}
          <div className="w-[260px] h-[340px] sm:w-[320px] sm:h-[420px] rounded-[3rem] overflow-hidden border-2 border-emerald-500/20 shadow-2xl relative">
            <Image
              src={Doctor}
              width={400}
              height={500}
              alt="Doctor Specialist"
              className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Plus Sign Ambient Elements */}
          <div className="absolute top-12 right-1/4 text-emerald-500/40 text-xl animate-pulse">
            <FaPlus />
          </div>
          <div className="absolute bottom-6 left-1/4 text-teal-500/40 text-lg animate-bounce">
            <FaPlus />
          </div>

          {/* Mapping Floating Glassmorphic Cards */}
          {features.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`absolute ${item.pos} hidden sm:flex items-center gap-3 p-3 bg-[#0d1527]/75 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl max-w-[210px] z-20 cursor-default`}
            >
              <div
                className={`p-2.5 bg-gray-900/80 rounded-xl border border-gray-800 text-lg ${item.color}`}
              >
                {item.icon}
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white tracking-wide">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportHero;
