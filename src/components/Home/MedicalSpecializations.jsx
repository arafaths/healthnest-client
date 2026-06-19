'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaStethoscope,
  FaStar,
} from 'react-icons/fa';
import { GiTooth } from 'react-icons/gi';
import { IoUsersOutline, IoCalendarOutline } from 'react-icons/io5';
import { FiUsers } from 'react-icons/fi';

const MedicalSpecializations = () => {
  const specializations = [
    {
      id: 1,
      title: 'Cardiology',
      sub: 'Heart Care',
      icon: <FaHeartbeat />,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    },
    {
      id: 2,
      title: 'Neurology',
      sub: 'Brain & Nerves',
      icon: <FaBrain />,
      color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    },
    {
      id: 3,
      title: 'Orthopedics',
      sub: 'Bone & Joint',
      icon: <FaBone />,
      color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    },
    {
      id: 4,
      title: 'Pediatrics',
      sub: 'Child Care',
      icon: <FaBaby />,
      color: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    },
    {
      id: 5,
      title: 'Dermatology',
      sub: 'Skin Care',
      icon: <FaStethoscope />,
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    },
    {
      id: 6,
      title: 'Dental Care',
      sub: 'Oral Health',
      icon: <GiTooth />,
      color: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    },
  ];

  const stats = [
    { id: 1, count: '1,250+', label: 'Total Doctors', icon: <FaStethoscope /> },
    {
      id: 2,
      count: '50,000+',
      label: 'Total Patients',
      icon: <FiUsers />,
    },
    {
      id: 3,
      count: '75,000+',
      label: 'Appointments',
      icon: <IoCalendarOutline />,
    },
    { id: 4, count: '25,000+', label: 'Reviews', icon: <FaStar /> },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full bg-[#020613] text-white py-16 px-6 md:px-16 lg:px-24 flex flex-col space-y-12 items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl space-y-10">
        {/* Header Bar */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Medical Specializations
          </h2>
         
        </div>

        {/* Specialization Cards Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full"
        >
          {specializations.map(item => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#091424]/40 border border-gray-900 rounded-2xl p-5 flex flex-col items-start space-y-4 hover:border-gray-800 transition-all group cursor-pointer"
            >
              <div
                className={`p-3.5 rounded-xl border text-xl group-hover:scale-105 transition-transform ${item.color}`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base text-gray-200 tracking-wide group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] md:text-xs text-gray-500 mt-0.5">
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats Container with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="relative w-full rounded-[2rem] p-8 md:p-10 border border-emerald-500/20 bg-gradient-to-b from-[#06192e]/40 to-[#030d1a]/60 backdrop-blur-md shadow-2xl shadow-black/80 overflow-hidden"
        >
          <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute left-[-5%] top-[-20%] w-48 h-48 bg-teal-500/5 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {stats.map((stat, idx) => (
              <div
                key={stat.id}
                className={`flex flex-col items-center text-center space-y-3 ${
                  idx !== 0 ? 'lg:border-l lg:border-gray-900/60 lg:pl-4' : ''
                }`}
              >
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/10 rounded-full text-[#10b981] text-lg shadow-inner shadow-black">
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#34d399] tracking-tight">
                    {stat.count}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MedicalSpecializations;
