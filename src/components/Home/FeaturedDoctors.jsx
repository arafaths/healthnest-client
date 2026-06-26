'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import DoctorCard from '../shared/DoctorCard';
import { useEffect, useState } from 'react';

export default function FeaturedDoctors() {
  // ডাইনামিক ডক্টর ডেটা অ্যারে (Screenshot 2026-06-24 104458.jpg অনুযায়ী)
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}doctors`);

        if (!res.ok) {
          throw new Error('Failed to fetch doctors');
        }

        const data = await res.json();

        setDoctors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);



  // ফ্রেমার মোশন কন্টেইনার ভ্যারিয়েন্ট (স্ট্যাগার্ড এনিমেশন)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };



  return (
    <section className="w-full bg-[#030712] px-6 md:px-16 lg:px-24 py-12 select-none">
      {/* Header Row with View All action */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Featured Doctors
        </h2>
        <Link
          href="/find-doctors"
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
        {doctors.slice(0, 4).map(doctor => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </motion.div>
    </section>
  );
}
