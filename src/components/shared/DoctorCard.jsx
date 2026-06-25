import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, CheckCircle2, Award } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  const [favorites, setFavorites] = useState([]);
  const [imageError, setImageError] = useState(false);

  const toggleFavorite = (id, e) => {
    e.preventDefault(); 
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id],
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const getInitial = name => (name ? name.trim().charAt(0).toUpperCase() : 'D');

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-[#050b14] border border-slate-900/90 rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative shadow-lg hover:border-slate-800/80 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] group transition-all duration-300"
    >
      {/* ================= PHOTO WRAPPER SECTION ================= */}
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-900 bg-slate-950 relative select-none">
        {doctor.profileImage && !imageError ? (
          <Image
            src={doctor.profileImage}
            alt={doctor.doctorName}
            fill
            sizes="(max-w-640px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-emerald-400/80 bg-[#0a1220]">
            {getInitial(doctor.doctorName)}
          </div>
        )}

        {/* Available Indicator Badge */}
        <span className="absolute top-3 left-3 bg-emerald-950/60 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          Available
        </span>

        {/* Floating Favorite Action Button */}
        <button
          onClick={e => toggleFavorite(doctor.id, e)}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/5 text-slate-300 hover:text-rose-500 hover:bg-slate-950/60 transition-all duration-200 active:scale-90 z-10"
        >
          <Heart
            size={16}
            fill={favorites.includes(doctor.id) ? '#f43f5e' : 'transparent'}
            className={
              favorites.includes(doctor.id)
                ? 'text-rose-500'
                : 'transition-colors'
            }
          />
        </button>

        {/* Image Floating Verification Stamp */}
        {doctor.status === 'verified' && (
          <div className="absolute bottom-2 left-2 bg-slate-950/70 backdrop-blur-md border border-slate-800 rounded-full pl-1.5 pr-2.5 py-0.5 flex items-center gap-1 shadow-md">
            <CheckCircle2
              size={11}
              fill="currentColor"
              className="text-emerald-500"
              stroke="#050b14"
            />
            <span className="text-[10px] text-white font-bold tracking-wide">
              Verified
            </span>
          </div>
        )}
      </div>

      {/* ================= INFO BODY SECTION ================= */}
      <div className="flex flex-col mt-4 flex-1">
        <h3 className="text-[16px] font-bold text-white tracking-wide truncate group-hover:text-emerald-400 transition-colors duration-200">
          {doctor.doctorName}
        </h3>
        <p className="text-xs font-semibold text-emerald-500/90 mt-0.5 tracking-wide">
          {doctor.specialty}
        </p>

        {/* Better Experience & Rating Badge Layout */}
        <div className="flex items-center justify-between mt-3.5 gap-2">
          {/* Enhanced Experience Badge */}
          <div className="inline-flex items-center gap-1 bg-[#0a1220] border border-slate-800 px-2.5 py-1 rounded-lg text-slate-400 text-[11px] font-bold shadow-inner">
            <Award size={12} className="text-slate-500" />
            <span>{doctor.experience || '10+ Years Exp'}</span>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded-lg text-amber-400 text-[11px] font-bold">
            <Star size={12} fill="currentColor" />
            <span>{doctor.rating || '4.8'}</span>
          </div>
        </div>

        {/* Consultation Fee Section */}
        <div className="mt-4 pt-3 border-t border-slate-900/60 flex items-baseline justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Consultation Fee
          </span>
          <span className="text-base font-extrabold text-white tracking-wide">
            {typeof doctor.fee === 'number' ? `$${doctor.fee}` : doctor.fee}
          </span>
        </div>
      </div>

      {/* ================= LINKED ACTION BUTTON ================= */}
      <div className="mt-4">
        <Link
          href={`/find-doctors/${doctor._id}`}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.25)] transition-all duration-200 active:scale-[0.98]"
        >
          Book Appointment
        </Link>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
