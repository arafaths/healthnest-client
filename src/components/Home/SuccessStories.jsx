'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const SuccessStories = () => {
  // Testimonials Data Array based on your image text
  const reviews = [
    {
      id: 1,
      name: 'Riya Patel',
      role: 'Verified Patient',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      comment:
        'HealthNest made booking appointments so easy. The doctors are very professional and caring.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Amit Shah',
      role: 'Verified Patient',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      comment:
        'I consulted a specialist within minutes. Great platform for quality healthcare.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Pooja Mehta',
      role: 'Verified Patient',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      comment:
        'The interface is smooth and payments are secure. Highly recommended!',
      rating: 5,
    },
  ];

  // Framer Motion Variants for Staggered Fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full bg-[#020613] text-white py-16 px-6 md:px-16 lg:px-24 flex flex-col space-y-10 items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl space-y-8">
        {/* ================= HEADER BAR ================= */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Patient Success Stories
          </h2>
          
        </div>

        {/* ================= TESTIMONIAL CARDS GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {reviews.map(review => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#091424]/30 border border-gray-900 rounded-[1.5rem] p-6 sm:p-8 flex flex-col justify-between space-y-8 hover:border-gray-800/80 transition-all cursor-pointer backdrop-blur-sm relative"
            >
              {/* Quote Icon & Review Text */}
              <div className="space-y-4">
                <div className="text-gray-700 text-3xl opacity-40">
                  <FaQuoteLeft />
                </div>
                <p className="text-gray-400 text-sm sm:text-base font-normal leading-relaxed tracking-wide">
                  {review.comment}
                </p>
              </div>

              {/* Patient Profile Info & Ratings */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-900/40 w-full">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border border-gray-800 shadow-inner"
                  />
                  {/* Name & Role */}
                  <div>
                    <h4 className="font-semibold text-sm text-gray-200 tracking-wide">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
