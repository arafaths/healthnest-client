'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserMd,
  FaRegCreditCard,
  FaFilePrescription,
  FaRegCalendarAlt,
  FaClock,
} from 'react-icons/fa';

const WhyChooseUs = () => {
  // Features Data Array matching the provided image
  const features = [
    {
      id: 1,
      title: 'Verified Doctors',
      sub: 'Expert & Verified',
      icon: <FaUserMd />,
    },
    {
      id: 2,
      title: 'Secure Payments',
      sub: '100% Safe & Secure',
      icon: <FaRegCreditCard />,
    },
    {
      id: 3,
      title: 'Online Prescriptions',
      sub: 'Digital & Easy',
      icon: <FaFilePrescription />,
    },
    {
      id: 4,
      title: '24/7 Booking',
      sub: 'Book Anytime',
      icon: <FaRegCalendarAlt />,
    },
    {
      id: 5,
      title: 'Fast Consultation',
      sub: 'Connect Quickly',
      icon: <FaClock />,
    },
  ];

  // Framer Motion Variants for smooth entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full bg-[#020613] text-white py-16 px-6 md:px-16 lg:px-24 flex flex-col space-y-10 items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl space-y-8">
        {/* ================= HEADER TITLE ================= */}
        <div className="w-full text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Why Choose HealthNest
          </h2>
        </div>

        {/* ================= FEATURES GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 w-full"
        >
          {features.map(feature => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#091424]/30 border border-gray-900/80 rounded-[1.8rem] p-6 flex flex-col items-center text-center justify-center space-y-5 hover:border-gray-800 transition-all cursor-pointer backdrop-blur-sm"
            >
              {/* Circular Glowing Icon Wrapper */}
              <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-full text-[#10b981] text-xl shadow-md shadow-emerald-950/30">
                {feature.icon}
              </div>

              {/* Info Text */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm sm:text-base text-gray-200 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  {feature.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
