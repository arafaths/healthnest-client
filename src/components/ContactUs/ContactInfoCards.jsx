'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaAmbulance,
} from 'react-icons/fa';

const ContactInfoCards = () => {
  // Array of contact details matching your screenshot
  const contactDetails = [
    {
      id: 1,
      icon: <FaMapMarkerAlt size={20} />,
      title: 'Address',
      line1: '123 Healthcare Avenue',
      line2: 'New York, USA',
      iconColor: 'text-[#10b981]', // Emerald
      iconBg: 'bg-[#10b981]/10',
      iconBorder: 'border-[#10b981]/20',
      isAlert: false,
    },
    {
      id: 2,
      icon: <FaPhoneAlt size={20} />,
      title: 'Phone Number',
      line1: '+1 (555) 123-4567',
      line2: '',
      iconColor: 'text-cyan-400', // Cyan
      iconBg: 'bg-cyan-500/10',
      iconBorder: 'border-cyan-500/20',
      isAlert: false,
    },
    {
      id: 3,
      icon: <FaEnvelope size={20} />,
      title: 'Email Address',
      line1: 'support@healthnest.com',
      line2: '',
      iconColor: 'text-blue-400', // Blue
      iconBg: 'bg-blue-500/10',
      iconBorder: 'border-blue-500/20',
      isAlert: false,
    },
    {
      id: 4,
      icon: <FaAmbulance size={22} />,
      title: 'Emergency Hotline',
      line1: '+1 (800) 911-HELP',
      line2: '',
      iconColor: 'text-red-500', // Red
      iconBg: 'bg-red-500/10',
      iconBorder: 'border-red-500/20',
      isAlert: true, // Specific flag for the red emergency text
    },
  ];

  return (
    <section className="w-full bg-[#030712] py-12 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactDetails.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-start p-6 bg-[#0b1329]/60 backdrop-blur-md border border-gray-800/80 rounded-[1.5rem] shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
          >
            {/* 1. Glowing Icon Box */}
            <div
              className={`p-4 rounded-2xl border ${contact.iconBorder} ${contact.iconBg} ${contact.iconColor} mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
            >
              {contact.icon}
            </div>

            {/* 2. Text Content */}
            <div className="space-y-1.5 w-full text-left">
              <h3 className="text-base font-bold text-white tracking-wide">
                {contact.title}
              </h3>

              <div className="flex flex-col space-y-0.5 mt-2">
                <p
                  className={`text-sm font-medium tracking-wide ${
                    contact.isAlert ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  {contact.line1}
                </p>

                {/* Only render line 2 if it exists (like the Address card) */}
                {contact.line2 && (
                  <p className="text-sm font-medium text-gray-400 tracking-wide">
                    {contact.line2}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfoCards;
