'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  Eye,
  User,
  Stethoscope,
  Activity,
  DollarSign,
  ShieldAlert,
  CalendarDays,
} from 'lucide-react';
import NoAppointment from '@/components/DoctorDetails/Appointment Requests/NoAppointment';
import ProjectLoader from '@/components/shared/ProjectLoader';

export default function ClinicalAppointmentsRegistry() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/appointments`,
        );

        const data = await res.json();

        setAppointments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusStyle = status => {
    switch ((status || '').toLowerCase()) {
      case 'accepted':
        return 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/20';
      case 'completed':
        return 'text-blue-400 bg-blue-950/30 border border-blue-500/20';
      case 'rejected':
        return 'text-rose-400 bg-rose-950/30 border border-rose-500/20';
      default:
        return 'text-amber-400 bg-amber-950/30 border border-amber-500/20'; // Pending
    }
  };

  if (loading) {
    return <ProjectLoader />;
  }

  return (
    <div className="min-h-screen bg-[#030712] p-4 md:p-6 text-slate-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* ================= 🔝 TOP BAR (Screenshot 2026-06-29 120301.jpg) ================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900/40 pb-5">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Clinical Appointments Registry
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Monitor all appointments across the platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="px-3.5 py-2 bg-[#050b14] border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-400">
              <CalendarDays size={14} className="text-emerald-500" />
              <span>Total Appointments:</span>
              <span className="text-white font-mono text-sm">
                {appointments.length}
              </span>
            </div>
          </div>
        </div>

        {/* ================= 📊 CONDITIONAL LAYOUT ================= */}
        {appointments.length === 0 ? (
          <NoAppointment />
        ) : (
          /* 📊 APPOINTMENTS TABLE DATA */
          <div className="bg-[#050b14] border border-slate-900/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 text-xs font-semibold tracking-wider">
                    <th className="py-4 px-5">Patient Name</th>
                    <th className="py-4 px-5">Doctor Name</th>
                    <th className="py-4 px-5">Specialization</th>
                    <th className="py-4 px-5">Appointment Date</th>
                    <th className="py-4 px-5">Time Slot</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-900/40 text-xs font-medium">
                  {appointments.map(appt => (
                    <tr
                      key={appt._id}
                      className="hover:bg-[#0a1220]/10 transition-colors group"
                    >
                      {/* Patient column */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                            {appt.patientName?.charAt(0) || 'U'}
                          </div>
                          <span className="text-white font-bold group-hover:text-emerald-400 transition-colors">
                            {appt.patientName}
                          </span>
                        </div>
                      </td>

                      {/* Doctor column */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                            {appt.doctorName?.charAt(0) || 'U'}
                          </div>
                          <span className="text-white font-bold group-hover:text-emerald-400 transition-colors">
                            {appt.doctorName}
                          </span>
                        </div>
                      </td>

                      {/* Specialization */}
                      <td className="py-4 px-5 text-slate-400 font-normal">
                        {appt.specialty}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2 text-slate-400 font-normal">
                          <Calendar size={13} className="text-slate-600" />
                          <span>{appt.appointmentDate}</span>
                        </div>
                      </td>

                      {/* Time */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2 text-slate-400 font-normal">
                          <Clock size={13} className="text-slate-600" />
                          <span>{appt.timeSlot}</span>
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide capitalize ${getStatusStyle(appt.appointmentStatus)}`}
                        >
                          <span className="w-1 h-1 rounded-full bg-current" />
                          {appt.appointmentStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => setSelectedAppt(appt)}
                          className="px-3 py-1.5 rounded-xl border border-slate-900/80 bg-slate-950/40 hover:bg-[#0a1220] text-slate-400 hover:text-white font-bold inline-flex items-center gap-1 transition-all"
                        >
                          <Eye size={12} />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ================= 🟩 APPOINTMENT DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedAppt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppt(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-[#050b14] border border-slate-900 rounded-2xl p-6 shadow-2xl z-10 text-slate-300 text-xs"
            >
              <button
                onClick={() => setSelectedAppt(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <h2 className="text-base font-bold text-white tracking-wide mb-5">
                Appointment Details
              </h2>

              <div className="flex flex-col gap-3.5 font-medium">
                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User size={13} />
                    <span>Patient Name</span>
                  </div>
                  <span className="text-white font-bold">
                    {selectedAppt.patientName}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User size={13} />
                    <span>Doctor Name</span>
                  </div>
                  <span className="text-slate-200">
                    {selectedAppt.doctorName}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Stethoscope size={13} />
                    <span>Specialization</span>
                  </div>
                  <span className="text-slate-300">
                    {selectedAppt.specialty}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={13} />
                    <span>Appointment Date</span>
                  </div>
                  <span className="text-slate-300">
                    {selectedAppt.appointmentDate}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={13} />
                    <span>Time Slot</span>
                  </div>
                  <span className="text-slate-300 font-mono">
                    {selectedAppt.timeSlot}
                  </span>
                </div>

                <div className="flex justify-between items-start py-2 border-b border-slate-900/40 gap-4">
                  <div className="flex items-center gap-2 text-slate-500 shrink-0">
                    <Activity size={13} />
                    <span>Symptoms</span>
                  </div>
                  <span className="text-slate-400 text-right max-w-[180px] leading-relaxed break-words">
                    {selectedAppt.symptoms}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <DollarSign size={13} />
                    <span>Consultation Fee</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">
                    {selectedAppt.fee}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <ShieldAlert size={13} />
                    <span>Appointment Status</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold tracking-wide uppercase ${getStatusStyle(selectedAppt.appointmentStatus)}`}
                  >
                    {selectedAppt.appointmentStatus}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedAppt(null)}
                  className="w-full mt-4 py-2.5 bg-[#0a1220] hover:bg-slate-900 border border-slate-800 text-white font-bold rounded-xl text-center transition-all active:scale-[0.98]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
