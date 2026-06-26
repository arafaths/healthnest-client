'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UpcomingAppointments() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}patient/upcoming-appointments/${user.email}`,
    )
      .then(res => res.json())
      .then(data => setUpcomingAppointments(data));
  }, [user]);

  const appointments = upcomingAppointments || [];

  const statusStyles = {
    confirmed:
      'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400',
    pending: 'bg-amber-950/40 border border-amber-500/20 text-amber-500',
    cancelled: 'bg-rose-950/40 border border-rose-500/20 text-rose-500',
  };

  return (
    <div className="bg-[#030712] p-4 sm:p-6">
      <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6 gap-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white truncate">
            Upcoming Appointments
          </h2>
          <Link href="/dashboard/patient/appointments">
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-800 text-xs sm:text-sm font-medium text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all duration-200 whitespace-nowrap">
              View All
            </button>
          </Link>
        </div>

        {/* Table Container for Responsiveness */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
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
              {appointments.slice(0, 4).map(appt => (
                <tr
                  key={appt._id}
                  className="group hover:bg-slate-800/10 transition-colors duration-150"
                >
                  {/* Doctor Info */}
                  <td className="py-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-800 bg-slate-900 shrink-0 relative">
                      <Image
                        src={appt.doctorImage}
                        alt={appt.doctorName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[15px] font-bold text-white tracking-wide truncate">
                        {appt.doctorName}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 text-[14px] font-medium text-slate-300 whitespace-nowrap">
                    {appt.appointmentDate}
                  </td>

                  {/* Time */}
                  <td className="py-4 text-[14px] font-medium text-slate-300 whitespace-nowrap">
                    {appt.timeSlot}
                  </td>

                  {/* Status Badges */}
                  <td className="py-4 text-right">
                    <span
                      className={`inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-center min-w-[100px] capitalize transition-all duration-200 whitespace-nowrap ${statusStyles[appt.appointmentStatus?.toLowerCase() || 'pending'] || statusStyles.pending}`}
                    >
                      {appt.appointmentStatus}
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
