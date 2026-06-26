'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Check,
  X,
  FileText,
  ClipboardPlus,
} from 'lucide-react';
import NoAppointment from '@/components/DoctorDetails/Appointment Requests/NoAppointment';
import { authClient } from '@/lib/auth-client';

// ================= 👤 SUB-COMPONENT: AVATAR WITH FALLBACK INITIAL =================
const PatientAvatar = ({ src, name }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-950 border border-slate-800 shrink-0 flex items-center justify-center">
      {src && !imgError ? (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-slate-900 text-emerald-400 font-bold text-sm uppercase select-none tracking-wide">
          {name ? name.charAt(0) : 'P'}
        </div>
      )}
    </div>
  );
};

// ================= 📊 MAIN COMPONENT =================
export default function AppointmentRequests() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}doctor/appointments/${user.email}`)
      .then(res => res.json())
      .then(data => setRequests(data));
  }, [user]);
  // স্ট্যাটাস ব্যাজের কন্ডিশনাল স্টাইল ডিকশনারি (ইমেজের কালার স্কিম অনুযায়ী)
  const statusStyles = {
    pending: 'bg-amber-950/30 border border-amber-500/20 text-amber-500',
    accepted: 'bg-emerald-950/30 border border-emerald-500/20 text-emerald-400',
    rejected: 'bg-rose-950/30 border border-rose-500/20 text-rose-500',
    completed: 'bg-blue-950/30 border border-blue-500/20 text-blue-400',
  };

  // Accept
  const handleAccept = async id => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}appointments/accept/${id}`,
      {
        method: 'PATCH',
      },
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      setRequests(prev =>
        prev.map(item =>
          item._id === id ? { ...item, appointmentStatus: 'accepted' } : item,
        ),
      );
    }
  };

  // Reject
  const handleReject = async id => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}appointments/reject/${id}`,
      {
        method: 'PATCH',
      },
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      setRequests(prev =>
        prev.map(item =>
          item._id === id ? { ...item, appointmentStatus: 'rejected' } : item,
        ),
      );
    }
  };

  // Complet
  const handleComplete = async id => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}appointments/complete/${id}`,
      {
        method: 'PATCH',
      },
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      setRequests(prev =>
        prev.map(item =>
          item._id === id ? { ...item, appointmentStatus: 'completed' } : item,
        ),
      );
    }
  };

  // Create Prescription
  const handleCreatePrescription = request => {
    console.log(request);

    // modal open
    // অথবা
    // router.push(`/doctor/prescription/${request._id}`)
  };

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-6 text-slate-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {requests.length === 0 ? (
          <NoAppointment />
        ) : (
          /* ================= 📊 DYNAMIC REQUESTS TABLE ================= */
          <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 text-xs font-semibold tracking-wider">
                    <th className="py-4 px-5">Patient Name</th>
                    <th className="py-4 px-5">Appointment Date</th>
                    <th className="py-4 px-5">Time Slot</th>
                    <th className="py-4 px-5">Symptoms</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-900/40 text-xs font-medium">
                  {requests.map((request, idx) => {
                    const currentStatus =
                      request.appointmentStatus?.toLowerCase() || 'pending';

                    return (
                      <tr
                        key={request._id || idx}
                        className="hover:bg-[#0a1220]/10 transition-colors group"
                      >
                        {/* 1. Patient Profile Info */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <PatientAvatar
                              src={request.patientImage}
                              name={request.patientName}
                            />
                            <div className="flex flex-col gap-0.5">
                              <span className="font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                                {request.patientName}
                              </span>
                              <span className="text-[11px] text-slate-500 select-all font-normal">
                                {request.patientEmail}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Appointment Date */}
                        <td className="py-4 px-5">
                          <div className="flex items-start gap-2.5 text-slate-300">
                            <Calendar
                              size={14}
                              className="text-emerald-500 mt-0.5 shrink-0"
                            />
                            <div className="flex flex-col">
                              <span className="font-bold">{request.date}</span>
                              <span className="text-[10px] text-slate-500 mt-0.5">
                                {request.appointmentDate}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 3. Time Slot */}
                        <td className="py-4 px-5">
                          <div className="flex items-start gap-2.5 text-slate-300">
                            <Clock
                              size={14}
                              className="text-emerald-500 mt-0.5 shrink-0"
                            />
                            <div className="flex flex-col font-mono tracking-wide">
                              <span>{request.timeSlot}</span>
                            </div>
                          </div>
                        </td>

                        {/* 4. Symptoms */}
                        <td
                          className="py-4 px-5 text-slate-400 leading-relaxed max-w-[200px] truncate"
                          title={request.symptoms}
                        >
                          {request.symptoms}
                        </td>

                        {/* 5. Conditional Status Badge */}
                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide capitalize min-w-[95px] justify-center ${statusStyles[currentStatus] || statusStyles.pending}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-90" />
                            {request.appointmentStatus}
                          </span>
                        </td>

                        {/* 6. Dynamic Actions Cell based on Status */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            {/* PENDING ACTIONS */}
                            {currentStatus === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleAccept(request._id)}
                                  className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-xs font-bold inline-flex items-center gap-1 transition-all"
                                >
                                  <Check size={12} strokeWidth={2.5} />
                                  <span>Accept</span>
                                </button>
                                <button
                                  onClick={() => handleReject(request._id)}
                                  className="px-3 py-1.5 rounded-xl bg-rose-950/20 border border-rose-500/10 hover:border-rose-500/30 text-rose-500 text-xs font-bold inline-flex items-center gap-1 transition-all"
                                >
                                  <X size={12} strokeWidth={2.5} />
                                  <span>Reject</span>
                                </button>
                              </>
                            )}

                            {/* ACCEPTED ACTIONS */}
                            {currentStatus === 'accepted' && (
                              <button
                                onClick={() => handleComplete(request._id)}
                                className="px-3 py-1.5 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/5 text-emerald-400 text-xs font-bold inline-flex items-center gap-1 transition-all"
                              >
                                <Check size={12} strokeWidth={2.5} />
                                <span>Mark as Completed</span>
                              </button>
                            )}

                            {/* REJECTED STATE */}
                            {currentStatus === 'rejected' && (
                              <span className="text-slate-600 text-xs font-bold tracking-widest px-2">
                                —
                              </span>
                            )}

                            {/* COMPLETED ACTIONS */}
                            {currentStatus === 'completed' && (
                              <button
                                onClick={() =>
                                  handleCreatePrescription(request)
                                }
                                className="px-3 py-1.5 rounded-xl border border-slate-800 hover:border-emerald-500/20 text-slate-300 hover:text-emerald-400 text-xs font-bold inline-flex items-center gap-1.5 transition-all bg-slate-950/40"
                              >
                                <FileText size={12} />
                                <span>Create Prescription</span>
                              </button>
                            )}
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
