'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ChevronRight } from 'lucide-react';

export default function FeaturedDoctors() {
  // ডাইনামিক ডক্টর ডেটা অ্যারে (Screenshot 2026-06-24 104458.jpg অনুযায়ী)
  const doctors = [
    {
      id: 1,
      name: 'Dr. Arjun Mehta',
      specialty: 'Cardiologist',
      experience: '12+ Years Exp.',
      rating: '4.8',
      fee: '₹800',
      image:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=400&q=80',
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Neurologist',
      experience: '10+ Years Exp.',
      rating: '4.7',
      fee: '₹700',
      image:
        'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&w=400&h=400&q=80',
    },
    {
      id: 3,
      name: 'Dr. Rahul Verma',
      specialty: 'Orthopedic',
      experience: '8+ Years Exp.',
      rating: '4.6',
      fee: '₹600',
      image:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&h=400&q=80',
    },
    {
      id: 4,
      name: 'Dr. Ananya Patel',
      specialty: 'Pediatrician',
      experience: '7+ Years Exp.',
      rating: '4.9',
      fee: '₹500',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=400&q=80',
    },
  ];

  // ফেভরিট টগল স্টেট হ্যান্ডলার
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id],
    );
  };

  // ফ্রেমার মোশন কন্টেইনার ভ্যারিয়েন্ট (স্ট্যাগার্ড এনিমেশন)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
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
    <section className="w-full bg-[#030712] p-6 md:p-10 select-none">
      {/* Header Row with View All action */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Featured Doctors
        </h2>
        <Link
          href="/dashboard/patient/doctors"
          className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors duration-200"
        >
          <span>View All</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Grid Container with Motion Stagger */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {doctors.map(doctor => (
          <motion.div
            key={doctor.id}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="bg-[#050b14] border border-slate-900/90 rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative shadow-lg hover:border-slate-800 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] group transition-colors duration-300"
          >
            {/* Top Section: Photo Wrapper */}
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-900 bg-slate-950 relative">
              <Image
                src={doctor.image}
                alt={doctor.name}
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
                  fill={
                    favorites.includes(doctor.id) ? '#f43f5e' : 'transparent'
                  }
                  className={
                    favorites.includes(doctor.id) ? 'text-rose-500' : ''
                  }
                />
              </button>
            </div>

            {/* Middle Section: Info Body */}
            <div className="flex flex-col mt-4">
              <h3 className="text-[17px] font-bold text-white tracking-wide truncate group-hover:text-emerald-400 transition-colors duration-200">
                {doctor.name}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5 tracking-wide">
                {doctor.specialty}
              </p>

              {/* Experience and Rating Data Line */}
              <div className="flex items-center justify-between mt-3 text-xs font-semibold text-slate-400">
                <span>{doctor.experience}</span>
                <div className="flex items-center gap-1 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded-md text-amber-400">
                  <Star size={13} fill="currentColor" />
                  <span>{doctor.rating}</span>
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
        ))}
      </motion.div>
    </section>
  );
}
