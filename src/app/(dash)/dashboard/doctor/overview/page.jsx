'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import {
  Users,
  Calendar,
  Star,
  Pill,
  DollarSign,
  TrendingUp,
  MessageSquareX,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function DoctorDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [imageError, setImageError] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/doctor/overview/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
        setReviews(data.recentReviews);
      });
  }, [user]);


  // Fallback stats matching Screenshot 2026-06-25 153210.jpg
  const stats = [
    {
      id: 1,
      label: 'Total Patients',
      value: dashboardData?.totalPatients ?? 0,
      icon: Users,
    },
    {
      id: 2,
      label: "Today's Appointments",
      value: dashboardData?.todayAppointments ?? 0,
      icon: Calendar,
    },
    {
      id: 3,
      label: 'Total Reviews',
      value: dashboardData?.totalReviews ?? 0,
      icon: Star,
    },
    {
      id: 4,
      label: 'Total Prescriptions',
      value: dashboardData?.totalPrescriptions ?? 0,
      icon: Pill,
    },
    {
      id: 5,
      label: 'Total Earnings',
      value: `$${dashboardData?.totalEarnings ?? 0}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-8 text-slate-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* ================= 1. TOP STATS CARDS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-[#050b14] border border-slate-900/90 rounded-2xl p-5 flex flex-col justify-between shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Icon
                    size={18}
                    fill={
                      stat.label === 'Total Reviews' ? 'currentColor' : 'none'
                    }
                    className={
                      stat.label === 'Total Reviews' ? 'text-emerald-400' : ''
                    }
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= 2. RECENT PATIENT REVIEWS CONTAINER ================= */}
        <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
          {/* Header section inside wrapper */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-900/80 pb-4">
            <h2 className="text-base font-bold text-white tracking-wide">
              Recent Patient Reviews
            </h2>
            {reviews.length > 0 && (
              <button className="text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all">
                View All Reviews
              </button>
            )}
          </div>

          {/* Conditional Rendering Logic */}
          {reviews.length === 0 ? (
            /* ================= ❌ FALLBACK: NO REVIEWS STATE ================= */
            <div className="w-full py-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0a1220] border border-slate-800 flex items-center justify-center mb-4 text-slate-600 relative">
                <MessageSquareX size={26} strokeWidth={1.5} />
                <span className="absolute top-0 right-0 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-600"></span>
                </span>
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide mb-1">
                No Reviews Yet
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[260px]">
                Patients havent left any feedback or ratings on your profile
                yet.
              </p>
            </div>
          ) : (
            /* ================= 👥 CONDITIONAL: REVIEWS LIST ================= */
            <div className="flex flex-col divide-y divide-slate-900/60">
              {reviews.map((review, index) => (
                <div
                  key={review._id || index}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#0a1220]/20 rounded-xl transition-all duration-200 px-2 -mx-2"
                >
                  {/* Left Info Group */}
                  <div className="flex items-start gap-4 sm:max-w-[30%] w-full">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                      {review.patientImage && !imageError ? (
                        <Image
                          src={review.patientImage || '/fallback-avatar.png'}
                          alt={review.patientName}
                          fill
                          className="object-cover"
                          unoptimized
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-slate-900 text-emerald-400 font-bold text-2xl uppercase select-none tracking-wider">
                          {review.patientName
                            ? review.patientName.charAt(0)
                            : 'U'}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-bold text-white tracking-wide truncate group-hover:text-emerald-400 transition-colors">
                        {review.patientName}
                      </h4>
                      {/* Interactive Stars Row */}
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            fill={i < review.rating ? '#f59e0b' : 'transparent'}
                            className={
                              i < review.rating
                                ? 'text-amber-500'
                                : 'text-slate-700'
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle Feedback Text */}
                  <div className="flex-1 text-xs text-slate-400 font-medium sm:px-4 leading-relaxed">
                    {review.comment}
                  </div>

                  {/* Right Dynamic Time Stamp */}
                  <div className="text-[11px] text-slate-500 font-semibold tracking-wide whitespace-nowrap text-right sm:min-w-[80px]">
                    {formatDistanceToNow(new Date(review.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
