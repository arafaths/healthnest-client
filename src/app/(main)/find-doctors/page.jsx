'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Search,
  RotateCcw,
  CheckCircle2,
  Heart,
  Stethoscope,
  GraduationCap,
  Briefcase,
  MapPin,
  Star,
  UserX,
  ChevronDown,
} from 'lucide-react';

export default function DoctorSearchDashboard() {
  // ডাইনামিক ডক্টর ডেটা (Screenshot 2026-06-24 121031.jpg থেকে এক্সট্র্যাক্ট করা)
  const doctorsList = [
    {
      id: 1,
      name: 'Dr. Rahul Verma',
      specialty: 'Cardiologist',
      degree: 'MBBS, MD (Cardiology)',
      experience: '12+ Years Experience',
      hospital: 'Apollo Hospitals, Delhi',
      fee: '$150',
      rating: '4.9',
      reviews: '512 Reviews',
      days: 'Mon, Tue, Wed, Fri, Sat',
      image:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&h=300&q=80',
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Neurologist',
      degree: 'MBBS, DM (Neurology)',
      experience: '10+ Years Experience',
      hospital: 'Fortis Hospital, Mumbai',
      fee: '$120',
      rating: '4.8',
      reviews: '432 Reviews',
      days: 'Mon, Wed, Thu, Fri, Sun',
      image:
        'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&w=300&h=300&q=80',
    },
    {
      id: 3,
      name: 'Dr. Arjun Mehta',
      specialty: 'Orthopedic',
      degree: 'MBBS, MS (Orthopedics)',
      experience: '9+ Years Experience',
      hospital: 'Max Super Speciality, Delhi',
      fee: '$130',
      rating: '4.7',
      reviews: '389 Reviews',
      days: 'Mon, Tue, Thu, Fri, Sat',
      image:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&h=300&q=80',
    },
    {
      id: 4,
      name: 'Dr. Neha Kapoor',
      specialty: 'Dermatologist',
      degree: 'MBBS, MD (Dermatology)',
      experience: '8+ Years Experience',
      hospital: 'AIIMS, New Delhi',
      fee: '$110',
      rating: '4.6',
      reviews: '298 Reviews',
      days: 'Tue, Wed, Thu, Sat, Sun',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=300&q=80',
    },
  ];

  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id],
    );
  };

  return (
    <div className="w-full bg-[#030712] p-6 min-h-screen text-slate-300 font-sans select-none">
      {/* ================= TOP FILTER BAR ================= */}
      <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
        {/* Search by Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wide">
            Search by Doctor Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter doctor name..."
              className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl pl-4 pr-10 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
            <Search
              size={14}
              className="absolute right-3.5 top-3.5 text-slate-500"
            />
          </div>
        </div>

        {/* Search by Specialization */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wide">
            Search by Specialization
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter specialization..."
              className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl pl-4 pr-10 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
            <Search
              size={14}
              className="absolute right-3.5 top-3.5 text-slate-500"
            />
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wide">
            Sort By
          </label>
          <div className="relative">
            <select className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all">
              <option>Highest Rating</option>
              <option>Fee: Low to High</option>
              <option>Experience: High to Low</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3.5 top-3.5 text-slate-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Availability Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wide">
            Availability
          </label>
          <div className="relative">
            <select className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all">
              <option>Any Day</option>
              <option>Today</option>
              <option>Tomorrow</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3.5 top-3.5 text-slate-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Search Primary Button */}
        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-xl inline-flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(16,185,129,0.15)] transition-all active:scale-[0.98]">
          <Search size={14} strokeWidth={2.5} />
          <span>Search</span>
        </button>

        {/* Clear Filters Button */}
        <button className="w-full bg-[#0a1220] hover:bg-[#111c30] border border-slate-800 text-slate-300 font-semibold text-xs py-3 rounded-xl inline-flex items-center justify-center gap-1.5 transition-all">
          <RotateCcw size={14} />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* ================= MAIN CONTENT LAYOUT ================= */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side: Active Doctor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full lg:w-[82%]">
          {doctorsList.map(doc => (
            <div
              key={doc.id}
              className="bg-[#050b14] border border-slate-900 rounded-2xl p-4 flex flex-col justify-between shadow-xl relative group hover:border-slate-800 transition-all duration-300"
            >
              {/* Doctor Avatar Setup */}
              <div className="relative w-28 h-28 mx-auto mt-2 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-800 relative bg-slate-950">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                {/* Available Badge Overlay */}
                <span className="absolute -top-1.5 -right-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                  Available
                </span>
                {/* Verified Tag Bottom Overlay */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#0a1220] border border-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md whitespace-nowrap">
                  <CheckCircle2
                    size={11}
                    className="text-cyan-400"
                    fill="currentColor"
                    stroke="#0a1220"
                  />
                  <span className="text-[10px] font-bold text-slate-300">
                    Verified
                  </span>
                </div>
                {/* Favorite Heart Trigger */}
                <button
                  onClick={() => toggleFavorite(doc.id)}
                  className="absolute bottom-2 -right-4 p-1.5 rounded-full text-slate-500 hover:text-rose-500 transition-colors"
                >
                  <Heart
                    size={16}
                    fill={
                      favorites.includes(doc.id) ? '#f43f5e' : 'transparent'
                    }
                    className={
                      favorites.includes(doc.id) ? 'text-rose-500' : ''
                    }
                  />
                </button>
              </div>

              {/* Doctor Credentials Details */}
              <div className="text-center sm:text-left mt-2 flex flex-col gap-2">
                <h3 className="text-base font-bold text-white tracking-wide truncate group-hover:text-emerald-400 transition-colors duration-200">
                  {doc.name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-cyan-400/90 font-medium">
                  <Stethoscope size={13} />
                  <span className="truncate">{doc.specialty}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <GraduationCap size={13} className="shrink-0" />
                  <span className="truncate">{doc.degree}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Briefcase size={13} className="shrink-0" />
                  <span className="truncate">{doc.experience}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin size={13} className="shrink-0" />
                  <span className="truncate">{doc.hospital}</span>
                </div>
              </div>

              {/* Divider line split */}
              <div className="border-t border-slate-900/60 my-4" />

              {/* Fee & Rating Block */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-base font-bold text-emerald-400">
                    {doc.fee}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                    Consultation Fee
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 justify-end">
                    <Star size={13} fill="currentColor" />
                    <span>{doc.rating}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                    ({doc.reviews})
                  </p>
                </div>
              </div>

              {/* Weekly Availability Context */}
              <div className="text-xs mb-4 text-slate-400 font-medium">
                <span className="text-emerald-500 font-semibold">
                  Available:{' '}
                </span>
                <span className="text-[11px] text-slate-400">{doc.days}</span>
              </div>

              {/* Actions Button Group Bottom */}
              <div className="flex flex-col gap-2 mt-auto">
                <button className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold tracking-wide shadow-sm transition-all">
                  Book Appointment
                </button>
                <button className="w-full py-2.5 rounded-xl bg-transparent border border-slate-800 hover:border-slate-700 hover:bg-slate-900/30 text-slate-300 text-xs font-semibold tracking-wide transition-all">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: "No Doctors Found" Custom Status Card Panel */}
        <div className="w-full lg:w-[18%] bg-[#050b14] border border-slate-900/90 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-xl self-stretch min-h-[450px]">
          <div className="w-16 h-16 rounded-full bg-[#0a1220] border border-slate-800 flex items-center justify-center mb-4 text-slate-500 relative">
            <UserX size={26} strokeWidth={1.5} className="text-slate-400" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
            </span>
          </div>
          <h4 className="text-sm font-bold text-white tracking-wide mb-2">
            No doctors found
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[150px] mb-5">
            We couldn’t find any doctors matching your filters.
          </p>
          <button className="px-4 py-2 bg-transparent border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 bg-emerald-500/5 transition-all active:scale-95">
            <RotateCcw size={12} strokeWidth={2.5} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
