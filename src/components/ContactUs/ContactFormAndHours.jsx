'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaRegCommentDots,
  FaRegClock,
  FaLock,
  FaPaperPlane,
  FaChevronDown,
} from 'react-icons/fa';

const ContactFormAndHours = () => {
  // Office hours data
  const schedule = [
    { day: 'Monday - Friday', time: '08:00 AM - 08:00 PM', isAlert: false },
    { day: 'Saturday', time: '09:00 AM - 05:00 PM', isAlert: false },
    { day: 'Sunday', time: 'Emergency Support Only', isAlert: true },
  ];

  return (
    <section className="w-full bg-[#030712] py-16 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* ================= LEFT: CONTACT FORM CARD ================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-[#0b1329]/60 backdrop-blur-md border border-gray-800/80 rounded-[2rem] p-6 sm:p-8 shadow-xl flex flex-col h-full"
        >
          {/* Header */}
          <div className="space-y-2 mb-8 text-left">
            <div className="flex items-center gap-3 text-white">
              <FaRegCommentDots className="text-xl text-gray-300" />
              <h2 className="text-2xl font-bold tracking-wide">
                Send Us a Message
              </h2>
            </div>
            <p className="text-sm text-gray-400">
              Fill out the form below and our team will get back to you soon.
            </p>
          </div>

          {/* Form Fields */}
          <form className="space-y-5 flex-grow flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-gray-300 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-[#030712]/50 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-gray-300 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#030712]/50 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-gray-300 ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full bg-[#030712]/50 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-1.5 text-left relative">
                <label className="text-xs font-medium text-gray-300 ml-1">
                  Subject
                </label>
                <div className="relative">
                  {/* Fixed: Added defaultValue here instead of selected on option */}
                  <select
                    defaultValue=""
                    className="w-full bg-[#030712]/50 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-500 appearance-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="appointment">Book Appointment</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <FaChevronDown size={12} />
                  </div>
                </div>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-1.5 text-left flex-grow">
              <label className="text-xs font-medium text-gray-300 ml-1">
                Message
              </label>
              <textarea
                placeholder="Type your message here..."
                rows="4"
                className="w-full h-[120px] resize-none bg-[#030712]/50 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3.5 font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl hover:opacity-90 shadow-lg shadow-emerald-900/20 transition-all"
              >
                Send Message <FaPaperPlane size={14} />
              </button>
            </div>

            {/* Secure Footer Note */}
            <div className="flex items-center justify-center gap-1.5 mt-4 text-gray-500 text-xs font-medium">
              <FaLock size={10} />
              <p>Your information is secure with us</p>
            </div>
          </form>
        </motion.div>

        {/* ================= RIGHT: OFFICE HOURS CARD ================= */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="bg-[#0b1329]/60 backdrop-blur-md border border-gray-800/80 rounded-[2rem] p-6 sm:p-8 shadow-xl flex flex-col h-full relative overflow-hidden"
        >
          {/* Header */}
          <div className="space-y-2 mb-8 text-left relative z-10">
            <div className="flex items-center gap-3 text-white">
              <FaRegClock className="text-xl text-gray-300" />
              <h2 className="text-2xl font-bold tracking-wide">Office Hours</h2>
            </div>
            <p className="text-sm text-gray-400">Were available to help you</p>
          </div>

          {/* Schedule Table Box */}
          <div className="border border-gray-800/80 bg-[#030712]/40 rounded-2xl p-5 space-y-4 relative z-10">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pb-4 border-b border-gray-800/50 last:border-0 last:pb-0"
              >
                <span className="text-sm font-medium text-gray-300">
                  {item.day}
                </span>
                <span
                  className={`text-sm font-semibold tracking-wide ${item.isAlert ? 'text-red-500' : 'text-gray-300'}`}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>

          {/* ================= GLOWING CLOCK & WAVES GRAPHIC ================= */}
          <div className="mt-auto pt-12 pb-4 relative w-full h-[200px] flex items-center justify-center pointer-events-none">
            {/* Ambient Glow Orbs */}
            <div className="absolute w-[180px] h-[180px] bg-emerald-500/20 rounded-full blur-[60px]" />
            <div className="absolute w-[250px] h-[120px] bg-cyan-500/10 rounded-full blur-[70px] translate-y-10" />

            {/* Abstract Wavy SVG Lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 C100,150 150,50 250,100 C350,150 400,100 400,100"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="1.5"
              />
              <path
                d="M0,130 C120,80 180,160 280,110 C360,70 400,130 400,130"
                fill="none"
                stroke="url(#grad2)"
                strokeWidth="1"
                opacity="0.5"
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing Clock UI */}
            <div className="relative w-28 h-28 rounded-full border-[3px] border-emerald-500/40 bg-[#030712]/80 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center z-10">
              <div className="absolute inset-2 rounded-full border border-cyan-400/20 bg-gradient-to-br from-emerald-500/10 to-transparent" />
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full z-20 shadow-[0_0_10px_#34d399]" />

              {/* Hour Hand */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 43200,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute w-1 h-7 bg-emerald-500 rounded-full origin-bottom bottom-1/2 left-[calc(50%-2px)] shadow-[0_0_8px_#10b981]"
                style={{ transform: 'rotate(45deg)' }}
              />

              {/* Minute Hand */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3600,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute w-0.5 h-10 bg-cyan-400 rounded-full origin-bottom bottom-1/2 left-[calc(50%-1px)] shadow-[0_0_8px_#22d3ee]"
                style={{ transform: 'rotate(120deg)' }}
              />

              {/* Tick Marks */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-1.5 bg-emerald-500/50 rounded-full"
                  style={{
                    transform: `rotate(${i * 90}deg) translateY(-11px)`,
                    top: i === 0 ? '6px' : 'auto',
                    bottom: i === 2 ? '6px' : 'auto',
                    left: i === 3 ? '6px' : 'auto',
                    right: i === 1 ? '6px' : 'auto',
                  }}
                />
              ))}
            </div>

            {/* Floating Sparkles */}
            <motion.div
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-1 h-1 bg-emerald-300 rounded-full right-1/4 top-10"
            />
            <motion.div
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full left-1/3 bottom-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormAndHours;
