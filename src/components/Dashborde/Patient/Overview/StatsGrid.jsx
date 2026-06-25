'use client';

import { authClient } from '@/lib/auth-client';
import {
  Calendar,
  BookOpen,
  CreditCard,
  Heart,
  ArrowUpRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StatsGrid() {
  const [dashboardData, setDashboardData] = useState(null);
  const { data: session, } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/patient/overview/${user.email}`)
      .then(res => res.json())
      .then(data => setDashboardData(data));
  }, [user]);

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: dashboardData?.upcomingAppointments || 0,
      icon: Calendar,
      iconStyles:
        'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    },
    {
      title: 'Appointment History',
      value: dashboardData?.appointmentHistory || 0,
      icon: BookOpen,
      iconStyles:
        'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]',
    },
    {
      title: 'Total Payments',
      value: `$${dashboardData?.totalPayments || 0}`,
      icon: CreditCard,
      iconStyles:
        'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    },
    // {
    //   title: 'Favorite Doctors',
    //   value: '5',
    //   icon: Heart,
    //   iconStyles:
    //     'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]',
    // },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6 bg-[#030712] min-h-28">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="bg-[#050b14] border border-slate-900/80 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-slate-800 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] group"
          >
            {/* Top Row: Icon & Info */}
            <div className="flex items-start gap-4">
              {/* Icon Container with Custom Glowing Borders */}
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${stat.iconStyles}`}
              >
                <Icon size={22} strokeWidth={1.8} />
              </div>

              {/* Value & Title */}
              <div className="flex flex-col min-w-0">
                <span className="text-2xl font-bold text-white tracking-tight leading-none mb-1.5">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-slate-400 tracking-wide line-clamp-2 leading-snug">
                  {stat.title}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
