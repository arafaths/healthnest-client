'jsx';
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  X,
  CreditCard,
  Calendar,
  Clock,
  DollarSign,
  Lock,
  CreditCard as StripeIcon,
} from 'lucide-react';

export default function PaymentModal({
  showPaymentModal,
  setShowPaymentModal,
  bookingDetails,
  doctor,
  onPaySubmit,
}) {
  // Fallback fallback data matching the image if props are missing
  const activeDoctor = doctor || {
    doctorName: 'Dr. Rahul Verma',
    profileImage: '/doctor-avatar.png',
  };

  const activeBooking = bookingDetails || {
    appointmentDate: 'May 20, 2025',
    timeSlot: '10:30 AM - 11:00 AM',
    fee: '150.00',
  };

  if (!showPaymentModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* ================= BACKDROP OVERLAY ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* ================= MODAL CONTAINER ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-lg bg-[#050b14] border border-slate-900/90 rounded-3xl p-6 md:p-7 shadow-2xl z-10 text-slate-300 font-sans"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CreditCard
                  size={22}
                  fill="currentColor"
                  className="text-emerald-500/10"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Complete Payment
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm your appointment by completing the payment.
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="p-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* ================= 1. APPOINTMENT SUMMARY CARD ================= */}
          <div className="w-full bg-[#0a1220]/40 border border-slate-900/80 rounded-2xl p-4 mb-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-white tracking-wide">
              Appointment Summary
            </h3>

            {/* Doctor Info */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-900/60">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-950 border border-slate-800/80 shrink-0">
                <Image
                  src={activeDoctor.profileImage}
                  alt={activeDoctor.doctorName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wide">
                  Doctor
                </p>
                <h4 className="text-xs font-bold text-white mt-0.5">
                  {activeDoctor.doctorName}
                </h4>
              </div>
            </div>

            {/* Meta Rows */}
            <div className="flex flex-col gap-3.5 text-xs">
              {/* Date Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <Calendar size={14} className="text-slate-500" />
                  <span>Appointment Date</span>
                </div>
                <span className="text-white font-medium">
                  {activeBooking.appointmentDate}
                </span>
              </div>

              {/* Time Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <Clock size={14} className="text-slate-500" />
                  <span>Appointment Time</span>
                </div>
                <span className="text-white font-medium">
                  {activeBooking.timeSlot}
                </span>
              </div>

              {/* Fee Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <DollarSign size={14} className="text-slate-500" />
                  <span>Consultation Fee</span>
                </div>
                <span className="text-white font-semibold">
                  ${activeDoctor.fee}
                </span>
              </div>
            </div>
          </div>

          {/* ================= 2. AMOUNT & PAYMENT METHOD SECTION ================= */}
          <div className="w-full bg-[#0a1220]/40 border border-slate-900/80 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-4 items-center">
            {/* Amount Side */}
            <div className="flex flex-col gap-1 border-r border-slate-900/80 pr-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Amount to Pay
              </span>
              <span className="text-2xl font-black text-emerald-400 tracking-wide">
                ${activeDoctor.fee}
              </span>
              <span className="text-[10px] text-slate-500 inline-flex items-center gap-1 mt-1">
                <Lock size={10} className="text-emerald-500" /> Secure Payment
              </span>
            </div>

            {/* Payment Method Side */}
            <div className="flex flex-col gap-2 pl-2">
              <span className="text-[11px] font-semibold text-slate-500 tracking-wide">
                Payment Method
              </span>
              <div className="bg-[#050b14] border border-slate-900 rounded-xl px-3 py-2.5 flex items-center gap-2 max-w-[150px]">
                <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-[10px]">
                  S
                </div>
                <span className="text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  Stripe Payment
                </span>
              </div>
            </div>
          </div>

          {/* ================= 3. ACTION BUTTONS ================= */}
          <div className="grid grid-cols-2 gap-4">
            {/* Cancel */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full py-3 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 font-bold text-xs tracking-wide transition-colors active:scale-[0.99]"
            >
              Cancel
            </button>

            {/* Pay Now */}
            <button
              onClick={onPaySubmit}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide inline-flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/20 transition-all active:scale-[0.99]"
            >
              <Lock size={12} strokeWidth={2.5} />
              <span>Pay Now</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
