'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import ProjectLoader from '@/components/shared/ProjectLoader';

export default function EcosystemAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/ecosystem-analytics`,
        );

        const data = await res.json();

        setAnalytics(data);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const stats = {
    totalDoctors: {
      value: analytics?.stats?.totalDoctors ?? 0,
    },
    totalPatients: {
      value: analytics?.stats?.totalPatients ?? 0,
    },
    totalAppointments: {
      value: analytics?.stats?.totalAppointments ?? 0,
    },
    totalRevenue: {
      value: `$${analytics?.stats?.totalRevenue ?? 0}`,
    },
  };

  if (loading) {
    return <ProjectLoader/>
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a1220] border border-slate-800 p-2.5 rounded-xl shadow-xl text-[11px]">
          <p className="text-slate-400 font-medium">
            {payload[0].name || 'Value'}
          </p>
          <p className="text-emerald-400 font-bold mt-0.5">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-6 text-slate-300 font-sans antialiased flex flex-col gap-6">
      {/* ================= 📊 TOP ANALYTICS CARDS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Doctors */}
        <div className="bg-[#050b14] border border-slate-900 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-500 font-medium">
              Total Doctors
            </span>
            <span className="text-xl font-bold text-white tracking-wide">
              {stats.totalDoctors.value}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1">
              <TrendingUp size={12} />
              <span>{stats.totalDoctors.growth}</span>
              <span className="text-slate-600 font-normal ml-0.5">
                vs last month
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
            <UserCheck size={18} />
          </div>
        </div>

        {/* Card 2: Total Patients */}
        <div className="bg-[#050b14] border border-slate-900 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-500 font-medium">
              Total Patients
            </span>
            <span className="text-xl font-bold text-white tracking-wide">
              {stats.totalPatients.value}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1">
              <TrendingUp size={12} />
              <span>{stats.totalPatients.growth}</span>
              <span className="text-slate-600 font-normal ml-0.5">
                vs last month
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
            <Users size={18} />
          </div>
        </div>

        {/* Card 3: Total Appointments */}
        <div className="bg-[#050b14] border border-slate-900 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-500 font-medium">
              Total Appointments
            </span>
            <span className="text-xl font-bold text-white tracking-wide">
              {stats.totalAppointments.value}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1">
              <TrendingUp size={12} />
              <span>{stats.totalAppointments.growth}</span>
              <span className="text-slate-600 font-normal ml-0.5">
                vs last month
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
            <Calendar size={18} />
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="bg-[#050b14] border border-slate-900 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-500 font-medium">
              Total Revenue
            </span>
            <span className="text-xl font-bold text-white tracking-wide">
              {stats.totalRevenue.value}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1">
              <TrendingUp size={12} />
              <span>{stats.totalRevenue.growth}</span>
              <span className="text-slate-600 font-normal ml-0.5">
                vs last month
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
            <DollarSign size={18} />
          </div>
        </div>
      </div>

      {/* ================= 📈 CHARTS VISUALIZATION SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 🟢 LEFT CHART: Doctor Performance (Bar Chart) */}
        <div className="bg-[#050b14] border border-slate-900 rounded-2xl p-5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Doctor Performance
            </h3>
            <button className="px-3 py-1.5 bg-[#0a1220] border border-slate-800 rounded-xl text-[11px] font-bold text-slate-400 inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <span>Top Rated</span>
              <ChevronDown size={12} />
            </button>
          </div>

          <div className="w-full h-72 text-[10px] font-medium font-sans">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.doctorPerformance || []}
                margin={{ top: 15, right: 10, left: -25, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#0f172a/40"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#475569"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  stroke="#475569"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(16, 185, 129, 0.03)' }}
                />
                <Bar
                  dataKey="rating"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                  label={{
                    position: 'top',
                    fill: '#cbd5e1',
                    fontSize: 11,
                    fontWeight: 'bold',
                    offset: 8,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#059669"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Custom Legend */}
          <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-bold text-slate-400">
            <span className="w-3 h-3 rounded-md bg-emerald-500" />
            <span>Average Rating</span>
          </div>
        </div>

        {/* 🟢 RIGHT CHART: Platform Overview (Area Chart) */}
        <div className="bg-[#050b14] border border-slate-900 rounded-2xl p-5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Platform Overview
            </h3>
            <button className="px-3 py-1.5 bg-[#0a1220] border border-slate-800 rounded-xl text-[11px] font-bold text-slate-400 inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <span>Monthly</span>
              <ChevronDown size={12} />
            </button>
          </div>

          <div className="w-full h-72 text-[10px] font-medium font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics?.platformOverview || []}
                margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#0f172a/40"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#475569"
                  tickLine={false}
                  axisLine={false}
                  className="font-sans"
                />
                <YAxis
                  stroke="#475569"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={val => (val >= 1000 ? `${val / 1000}K` : val)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#areaGradient)"
                  dot={{
                    r: 4,
                    fill: '#fff',
                    stroke: '#10b981',
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: '#10b981',
                    stroke: '#fff',
                    strokeWidth: 2,
                  }}
                  label={{
                    position: 'top',
                    fill: '#cbd5e1',
                    fontSize: 10,
                    fontWeight: '600',
                    offset: 10,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Custom Legend */}
          <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-bold text-slate-400">
            <div className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-emerald-500 inline-block relative -top-0.5" />
              <span className="w-1.5 h-1.5 rounded-full bg-white border border-emerald-500 inline-block relative -left-2.5" />
            </div>
            <span className="font-sans -ml-1">Appointments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
