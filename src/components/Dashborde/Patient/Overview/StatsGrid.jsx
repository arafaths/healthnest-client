'use client';

import {
  Calendar,
  BookOpen,
  CreditCard,
  Heart,
  ArrowUpRight,
} from 'lucide-react';

export default function StatsGrid() {
  // ডাইনামিক কার্ড ডেটা অ্যারে
  const stats = [
    {
      title: 'Upcoming Appointments',
      value: '3',
      percentage: '12%',
      icon: Calendar,
      // গ্রিন গ্লো ও বর্ডার
      iconStyles:
        'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    },
    {
      title: 'Appointment History',
      value: '12',
      percentage: '8%',
      icon: BookOpen,
      // সায়ান/ব্লু-গ্রিন গ্লো ও বর্ডার
      iconStyles:
        'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]',
    },
    {
      title: 'Total Payments',
      value: '$1,250',
      percentage: '15%',
      icon: CreditCard,
      // ব্রাইট এমারেল্ড গ্লো ও বর্ডার
      iconStyles:
        'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    },
    {
      title: 'Favorite Doctors',
      value: '5',
      percentage: '5%',
      icon: Heart,
      // সফট রেড/রোজ গ্লো ও বর্ডার
      iconStyles:
        'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-6 bg-[#030712] min-h-28">
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

            {/* Bottom Row: Percentage & Context */}
            <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-900/40">
              <div className="flex items-center text-emerald-400 text-xs font-semibold bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10">
                <ArrowUpRight size={14} className="mr-0.5" />
                <span>{stat.percentage}</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                vs last month
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
