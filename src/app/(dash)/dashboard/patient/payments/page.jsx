'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Eye, CheckCircle2, XCircle, CreditCard } from 'lucide-react';
import NoPaymentFound from '@/components/Dashborde/Patient/Payments History/NoPaymentFound';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function PaymentHistoryTable({ onViewDetails }) {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/patient/upcoming-appointments/${user.email}`)
      .then(res => res.json())
      .then(data => setUpcomingAppointments(data));
  }, [user]);

  const payments = upcomingAppointments || [];

  const statusStyles = {
    paid: 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400',
    refunded: 'bg-rose-950/40 border border-rose-500/20 text-rose-500',
    failed: 'bg-amber-950/40 border border-amber-500/20 text-amber-500',
  };

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-6 text-slate-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex items-center gap-2.5 pb-2">
          <CreditCard size={20} className="text-slate-400" />
          <h2 className="text-base font-bold text-white tracking-wide">
            Payment History
          </h2>
        </div>

        {payments.length === 0 ? (
          <NoPaymentFound />
        ) : (
          <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 text-xs font-semibold tracking-wider">
                    <th className="py-4 px-5">Transaction ID</th>
                    <th className="py-4 px-5">Doctor Name</th>
                    <th className="py-4 px-5">Payment Date</th>
                    <th className="py-4 px-5">Amount</th>
                    <th className="py-4 px-5">Payment Status</th>
                    <th className="py-4 px-5 text-right">Action</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-900/50 text-xs font-medium">
                  {payments.map((payment, idx) => {
                    const currentStatus =
                      payment.paymentStatus?.toLowerCase() || 'paid';

                    return (
                      <tr
                        key={payment._id || payment.transactionId || idx}
                        className="hover:bg-[#0a1220]/20 transition-colors group"
                      >
                        {/* 1. Transaction ID */}
                        <td className="py-4 px-5 text-slate-400 font-mono tracking-wide">
                          {payment.transactionId}
                        </td>

                        {/* 2. Doctor Name & Speciality */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                              <Image
                                src={
                                  payment.doctorImage || '/fallback-avatar.png'
                                }
                                alt={payment.doctorName}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                                {payment.doctorName}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 3. Payment Date & Time */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2.5 text-slate-300">
                            <Calendar size={14} className="text-slate-600" />
                            <div className="flex flex-col">
                              <span>{payment.appointmentDate}</span>
                              <span className="text-[10px] text-slate-500 mt-0.5">
                                {new Date(
                                  payment?.createdAt,
                                ).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 4. Amount */}
                        <td className="py-4 px-5 text-white font-semibold text-sm tracking-wide">
                          ${payment.fee}.00
                        </td>

                        {/* 5. Conditional Payment Status Badge */}
                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide min-w-[85px] justify-center ${statusStyles[currentStatus] || statusStyles.paid}`}
                          >
                            {currentStatus === 'paid' ? (
                              <CheckCircle2
                                size={10}
                                fill="currentColor"
                                className="text-emerald-500 shrink-0"
                                stroke="#050b14"
                              />
                            ) : (
                              <XCircle
                                size={10}
                                fill="currentColor"
                                className="text-rose-500 shrink-0"
                                stroke="#050b14"
                              />
                            )}
                            <span className="capitalize">
                              {payment.paymentStatus}
                            </span>
                          </span>
                        </td>

                        {/* 6. View Details Action Button */}
                        <td className="py-4 px-5 text-right">
                          <Link
                            href={`/find-doctors/${payment.doctorId}`}
                            className="p-2 rounded-xl bg-slate-950/40 border border-slate-900 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 transition-all"
                            title="View Transaction Details"
                          >
                            <Eye size={13} />
                          </Link>
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
