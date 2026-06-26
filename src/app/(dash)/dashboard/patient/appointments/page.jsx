'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, Eye, Edit2, Trash2 } from 'lucide-react';
import NoAppointmentsFound from '@/components/Dashborde/Patient/Appointments/NoAppointmentsFound';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function AppointmentsTable() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/patient/upcoming-appointments/${user.email}`)
      .then(res => res.json())
      .then(data => setUpcomingAppointments(data));
  }, [user]);

  const appointments = upcomingAppointments || [];

  const statusStyles = {
    pending: 'bg-amber-950/40 border border-amber-500/20 text-amber-500',
    confirmed:
      'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400',
    completed: 'bg-blue-950/40 border border-blue-500/20 text-blue-400',
    cancelled: 'bg-rose-950/40 border border-rose-500/20 text-rose-500',
  };

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-6 text-slate-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex items-center gap-2.5 pb-2">
          <Calendar size={20} className="text-slate-400" />
          <h2 className="text-base font-bold text-white tracking-wide">
            My Appointments
          </h2>
        </div>
        {appointments.length === 0 ? (
          <NoAppointmentsFound />
        ) : (
          <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 text-xs font-semibold tracking-wider">
                    <th className="py-4 px-5">Doctor</th>
                    <th className="py-4 px-5">Date</th>
                    <th className="py-4 px-5">Time</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-900/50 text-xs font-medium">
                  {appointments.map((appt, idx) => {
                    const currentStatus =
                      appt.appointmentStatus?.toLowerCase() || 'pending';

                    return (
                      <tr
                        key={appt._id || idx}
                        className="hover:bg-[#0a1220]/20 transition-colors group"
                      >
                        {/* 1. Doctor Profile Info */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                              <Image
                                src={appt.doctorImage || '/fallback-avatar.png'}
                                alt={appt.doctorName}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                                {appt.doctorName}
                              </span>
                              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                                {appt.degrees || 'MBBS, MD'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 3. Date with Day Info */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2.5 text-slate-300">
                            <Calendar size={14} className="text-slate-600" />
                            <div className="flex flex-col">
                              <span>{appt.appointmentDate}</span>
                              <span className="text-[10px] text-slate-500 mt-0.5">
                                {new Date(
                                  appt?.createdAt,
                                ).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 4. Time */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2.5 text-slate-300">
                            <Clock size={14} className="text-slate-600" />
                            <span>{appt.timeSlot}</span>
                          </div>
                        </td>

                        {/* 5. Conditional Status Badge */}
                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide capitalize min-w-[95px] justify-center ${statusStyles[currentStatus] || statusStyles.pending}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                            {appt.appointmentStatus}
                          </span>
                        </td>

                        {/* 6. Action Custom Buttons */}
                        <td className="py-4 px-5 text-right">
                          <div className="inline-flex items-center gap-2">
                            {/* View Action */}
                            <Link
                              href={`/find-doctors/${appt.doctorId}`}
                              className="p-2 rounded-xl bg-slate-950/40 border border-slate-900 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 transition-all"
                              title="View Details"
                            >
                              <Eye size={13} />
                            </Link>

                            {/* Edit Action */}
                            {/* <button
                              onClick={() => onEdit && onEdit(appt)}
                              className="p-2 rounded-xl bg-slate-950/40 border border-slate-900 text-slate-400 hover:text-blue-400 hover:border-blue-500/20 transition-all"
                              title="Edit Appointment"
                            >
                              <Edit2 size={13} />
                            </button> */}

                            {/* Delete Action */}
                            {/* <button
                              onClick={() => onDelete && onDelete(appt.id)}
                              className="p-2 rounded-xl bg-slate-950/40 border border-slate-900 text-slate-500 hover:text-rose-500 hover:border-rose-500/20 transition-all"
                              title="Cancel / Delete"
                            >
                              <Trash2 size={13} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
