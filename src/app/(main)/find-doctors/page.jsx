'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  RotateCcw,
  UserX,
  ChevronDown,
} from 'lucide-react';
import DoctorCard from '@/components/shared/DoctorCard';
import ProjectLoader from '@/components/shared/ProjectLoader';

export default function DoctorSearchDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchName: '',
    specialty: '',
    sortBy: '',
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (filters.searchName) {
          params.append('search', filters.searchName);
        }

        if (filters.specialty) {
          params.append('specialty', filters.specialty);
        }

        if (filters.sortBy) {
          params.append('sortPrice', filters.sortBy);
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}doctors?${params.toString()}`,
        );

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
  }, [filters]);

  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id],
    );
  };

  // 2. Add these handler functions before your return statement
  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchName: '',
      specialty: '',
      sortBy: '',
    });
  };

  if (loading) {
      return <ProjectLoader text={'Doctors Loading...' } />
    }

  return (
    <div className="w-full bg-[#030712] p-6 min-h-screen text-slate-300 font-sans select-none">
      {/* ================= TOP FILTER BAR ================= */}
      <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        {/* Search by Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wide">
            Search by Doctor Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="searchName"
              value={filters.searchName}
              onChange={handleFilterChange}
              placeholder="Enter doctor name..."
              className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl pl-4 pr-10 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
            <Search
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Specialty Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wide">
            Specialty
          </label>
          <div className="relative">
            <select
              name="specialty"
              value={filters.specialty}
              onChange={handleFilterChange}
              className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
            >
              <option value="" className="bg-[#050b14]">
                Select Specialty
              </option>
              <option value="Cardiologist" className="bg-[#050b14]">
                Cardiologist
              </option>
              <option value="Neurologist" className="bg-[#050b14]">
                Neurologist
              </option>
              <option value="Orthopedic" className="bg-[#050b14]">
                Orthopedic
              </option>
              <option value="Dermatologist" className="bg-[#050b14]">
                Dermatologist
              </option>
              <option value="Pediatrician" className="bg-[#050b14]">
                Pediatrician
              </option>
              <option value="Gynecologist" className="bg-[#050b14]">
                Gynecologist
              </option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wide">
            Sort By
          </label>
          <div className="relative">
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
            >
              <option value="" className="bg-[#050b14]">
                Default
              </option>
              <option value="lowToHigh" className="bg-[#050b14]">
                Fee: Low to High
              </option>
              <option value="highToLow" className="bg-[#050b14]">
                Experience: High to Low
              </option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          type="button"
          onClick={handleClearFilters}
          className="w-full bg-[#0a1220] hover:bg-[#111c30] border border-slate-800 text-slate-300 font-semibold text-xs py-3 rounded-xl inline-flex items-center justify-center gap-1.5 transition-all h-[42px]"
        >
          <RotateCcw size={14} />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* ================= MAIN CONTENT LAYOUT ================= */}
      <div className="flex flex-col gap-6 items-start">
        {doctors.length === 0 ? (
          <div className="w-full bg-[#050b14] border border-slate-900/90 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center shadow-xl self-stretch min-h-[40vh] sm:min-h-[50vh] transition-all duration-300">
            {/* Animated Icon Container */}
            <div className="w-16 h-16 rounded-full bg-[#0a1220] border border-slate-800 flex items-center justify-center mb-5 text-slate-500 relative shrink-0">
              <UserX size={26} strokeWidth={1.5} className="text-slate-400" />

              {/* Notification Badge Dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
              </span>
            </div>

            {/* Main Heading */}
            <h4 className="text-sm sm:text-base font-bold text-white tracking-wide mb-2">
              No doctors found
            </h4>

            {/* Description Text - Adjusted max-w for better readability on smaller screens */}
            <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] sm:max-w-[280px] mb-6 px-2">
              We couldn’t find any doctors matching your filters.
            </p>

            {/* Responsive Action Button */}
            <button
              onClick={handleClearFilters}
              className="w-full sm:w-auto max-w-[160px] sm:max-w-none px-5 py-2.5 sm:py-2 bg-transparent border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-xl inline-flex items-center justify-center gap-1.5 bg-emerald-500/5 transition-all active:scale-95"
            >
              <RotateCcw size={12} strokeWidth={2.5} />
              <span>Clear Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
            {doctors.map(doctor => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
        {/* Left Side: Active Doctor Grid */}

        {/*"No Doctors Found" Custom Status Card Panel */}
      </div>
    </div>
  );
}
