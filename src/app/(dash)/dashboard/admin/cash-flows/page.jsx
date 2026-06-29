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
  DollarSign,
  Hash,
  CreditCard,
  TrendingUp,
  CreditCard as StripeIcon,
} from 'lucide-react';
import NoPaymentFound from '@/components/Dashborde/Patient/Payments History/NoPaymentFound';
import ProjectLoader from '@/components/shared/ProjectLoader';

export default function StripeCashFlows() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/payments`,
        );

        const data = await res.json();

        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);


  const getStatusStyle = status => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/20';
      case 'refunded':
        return 'text-rose-400 bg-rose-950/30 border border-rose-500/20';
      default:
        return 'text-amber-400 bg-amber-950/30 border border-amber-500/20'; // Pending
    }
  };

  if (loading) {
    return <ProjectLoader/>
  }

  return (
    <div className="min-h-screen bg-[#030712] p-4 md:p-6 text-slate-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900/40 pb-5">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Stripe Cash Flows
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Monitor all payment transactions made through Stripe.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="px-3.5 py-2 bg-[#050b14] border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-400">
              <TrendingUp size={14} className="text-emerald-500" />
              <span>Total Cash Flows:</span>
              <span className="text-white font-mono text-sm">
                {transactions.length}
              </span>
            </div>
          </div>
        </div>

        {/* ================= 📊 CONDITIONAL LAYOUT ================= */}
        {transactions.length === 0 ? (
          <NoPaymentFound />
        ) : (
          /* 📊 TRANSACTIONS TABLE DATA */
          <div className="bg-[#050b14] border border-slate-900/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 text-xs font-semibold tracking-wider">
                    <th className="py-4 px-5">Transaction ID</th>
                    <th className="py-4 px-5">Patient Name</th>
                    <th className="py-4 px-5">Doctor Name</th>
                    <th className="py-4 px-5">Amount</th>
                    <th className="py-4 px-5">Payment Date</th>
                    <th className="py-4 px-5">Payment Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-900/40 text-xs font-medium">
                  {transactions.map(tx => (
                    <tr
                      key={tx._id}
                      className="hover:bg-[#0a1220]/10 transition-colors group"
                    >
                      {/* Transaction ID */}
                      <td className="py-4 px-5 font-mono text-slate-400 select-all">
                        {`TXN-${tx._id.slice(-8).toUpperCase()}`}
                      </td>

                      {/* Patient Name */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                            {tx.patientName?.charAt(0) || 'U'}
                          </div>
                          <span className="text-white font-bold group-hover:text-emerald-400 transition-colors">
                            {tx.patientName}
                          </span>
                        </div>
                      </td>

                      {/* Doctor Name */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                            {tx.doctorName?.charAt(0) || 'U'}
                          </div>
                          <span className="text-white font-bold group-hover:text-emerald-400 transition-colors">
                            {tx.doctorName}
                          </span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-5 text-white font-bold font-mono">
                        ${tx.fee}.00
                      </td>

                      {/* Payment Date & Time */}
                      <td className="py-4 px-5">
                        <div className="flex flex-col gap-0.5 text-slate-400 font-normal">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-slate-600" />
                            <span>
                              {new Date(tx.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pl-3.5">
                            <Clock size={10} />
                            <span>
                              {new Date(tx.createdAt).toLocaleTimeString(
                                'en-US',
                                {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide capitalize ${getStatusStyle(tx.paymentStatus)}`}
                        >
                          <span className="w-1 h-1 rounded-full bg-current" />
                          {tx.paymentStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => setSelectedTx(tx)}
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

      {/* ================= 🟩 STRIPE PAYMENT DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-[#050b14] border border-slate-900 rounded-2xl p-6 shadow-2xl z-10 text-slate-300 text-xs"
            >
              <button
                onClick={() => setSelectedTx(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <h2 className="text-base font-bold text-white tracking-wide mb-5">
                Payment Details
              </h2>

              <div className="flex flex-col gap-3.5 font-medium">
                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Hash size={13} />
                    <span>Transaction ID</span>
                  </div>
                  <span className="text-slate-400 font-mono select-all">
                    {`TXN-${selectedTx._id.slice(-8).toUpperCase()}`}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User size={13} />
                    <span>Patient Name</span>
                  </div>
                  <span className="text-white font-bold">
                    {selectedTx.patientName}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User size={13} />
                    <span>Doctor Name</span>
                  </div>
                  <span className="text-slate-200">
                    {selectedTx.doctorName}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <DollarSign size={13} />
                    <span>Payment Amount</span>
                  </div>
                  <span className="text-white font-bold font-mono text-sm">
                    {selectedTx.fee}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={13} />
                    <span>Payment Date</span>
                  </div>
                  <span className="text-slate-300">
                    {new Date(selectedTx.createdAt).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}{' '}
                    {new Date(selectedTx.createdAt).toLocaleTimeString(
                      'en-US',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-900/40">
                  <div className="flex items-center gap-2 text-slate-500">
                    <CreditCard size={13} />
                    <span>Payment Method</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold">
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                    {selectedTx.method || 'PayPal'}
                  </div>
                </div>

                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    <CreditCard size={13} />
                    <span>Payment Status</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold tracking-wide uppercase ${getStatusStyle(selectedTx.paymentStatus)}`}
                  >
                    {selectedTx.paymentStatus}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedTx(null)}
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
