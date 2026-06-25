import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  // ফেভরিট টগল স্টেট হ্যান্ডলার
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id],
    );
  };

  // সিঙ্গেল কার্ডের এন্ট্রান্স ভ্যারিয়েন্ট
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-[#050b14] border border-slate-900/90 rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative shadow-lg hover:border-slate-800 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] group transition-colors duration-300"
    >
      {/* Top Section: Photo Wrapper */}
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-900 bg-slate-950 relative">
        <Image
          src={doctor.profileImage}
          alt={doctor.doctorName}
          fill
          sizes="(max-w-640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Heart/Favorite Action Button */}
        <button
          onClick={() => toggleFavorite(doctor.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/5 text-slate-300 hover:text-rose-500 hover:bg-slate-950/60 transition-all duration-200 active:scale-90"
        >
          <Heart
            size={18}
            fill={favorites.includes(doctor.id) ? '#f43f5e' : 'transparent'}
            className={favorites.includes(doctor.id) ? 'text-rose-500' : ''}
          />
        </button>
      </div>

      {/* Middle Section: Info Body */}
      <div className="flex flex-col mt-4">
        <h3 className="text-[17px] font-bold text-white tracking-wide truncate group-hover:text-emerald-400 transition-colors duration-200">
          {doctor.doctorName}
        </h3>
        <p className="text-xs font-medium text-slate-500 mt-0.5 tracking-wide">
          {doctor.specialty}
        </p>

        {/* Experience and Rating Data Line */}
        <div className="flex items-center justify-between mt-3 text-xs font-semibold text-slate-400">
          <span>{doctor.experience}</span>
          <div className="flex items-center gap-1 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded-md text-amber-400">
            <Star size={13} fill="currentColor" />
            {/* <span>{doctor.rating}</span> */}
          </div>
        </div>

        {/* Fee Component */}
        <div className="text-lg font-bold text-white mt-4 tracking-wide">
          {doctor.fee}
        </div>
      </div>

      {/* Bottom Section: Primary Action Button with pulse flow */}
      <div className="mt-4">
        <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold tracking-wide shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.25)] transition-all duration-200 transform active:scale-[0.98]">
          Book Appointment
        </button>
      </div>
    </motion.div>
  );
};;;

export default DoctorCard;