'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function UpcomingAppointments() {
  // ডাইনামিক অ্যাপয়েন্টমেন্ট ডেটা
  const appointments = [
    {
      id: 1,
      doctor: {
        name: 'Dr. Rahul Verma',
        specialty: 'Cardiologist',
        image:
          'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&h=150&q=80', // ডামি ইমেজ সোর্স
      },
      date: 'May 16, 2025',
      time: '10:30 AM',
      status: 'Confirmed',
      statusStyles:
        'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)]',
    },
    {
      id: 2,
      doctor: {
        name: 'Dr. Priya Sharma',
        specialty: 'Neurologist',
        image:
          'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&w=150&h=150&q=80',
      },
      date: 'May 18, 2025',
      time: '02:00 PM',
      status: 'Pending',
      statusStyles:
        'text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.05)]',
    },
    {
      id: 3,
      doctor: {
        name: 'Dr. Arjun Mehta',
        specialty: 'Orthopedic',
        image:
          'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&h=150&q=80',
      },
      date: 'May 20, 2025',
      time: '11:00 AM',
      status: 'Cancelled',
      statusStyles:
        'text-rose-500 bg-rose-500/10 border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.05)]',
    },
  ];

  return (
    <div className="bg-[#030712] p-6">
      <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl p-6 shadow-xl">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Upcoming Appointments
          </h2>
          <Link href="/dashboard/patient/appointments">
            <button className="px-4 py-2 rounded-xl border border-slate-800 text-sm font-medium text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all duration-200">
              View All
            </button>
          </Link>
        </div>

        {/* Table Container for Responsiveness */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-slate-900/60">
                <th className="pb-4 text-sm font-semibold text-slate-400 w-[40%]">
                  Doctor Name
                </th>
                <th className="pb-4 text-sm font-semibold text-slate-400 w-[20%]">
                  Date
                </th>
                <th className="pb-4 text-sm font-semibold text-slate-400 w-[20%]">
                  Time
                </th>
                <th className="pb-4 text-sm font-semibold text-slate-400 text-right w-[20%]">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-900/40">
              {appointments.map(appt => (
                <tr
                  key={appt.id}
                  className="group hover:bg-slate-800/10 transition-colors duration-150"
                >
                  {/* Doctor Info */}
                  <td className="py-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-800 bg-slate-900 shrink-0 relative">
                      <Image
                        src={appt.doctor.image}
                        alt={appt.doctor.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[15px] font-bold text-white tracking-wide truncate">
                        {appt.doctor.name}
                      </span>
                      <span className="text-xs text-slate-500 mt-0.5 truncate">
                        {appt.doctor.specialty}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 text-[14px] font-medium text-slate-300">
                    {appt.date}
                  </td>

                  {/* Time */}
                  <td className="py-4 text-[14px] font-medium text-slate-300">
                    {appt.time}
                  </td>

                  {/* Status Badges */}
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-semibold border tracking-wide select-none min-w-[100px] ${appt.statusStyles}`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
