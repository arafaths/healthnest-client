'jsx';
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  DollarSign,
  Star,
  ChevronDown,
  Phone,
  ShieldCheck,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import PaymentModal from '@/components/DoctorDetails/PaymentModal';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import ProjectLoader from '@/components/shared/ProjectLoader';

export default function AppointmentBooking() {
  const { id } = useParams();

  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}doctor/${id}`,
        );
        const data = await res.json();

        setDoctorData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getDoctor();
    }
  }, [id]);
  // Default fallback data if no doctorData is passed
  const doctor = doctorData || {};

  // Booking Form States
  const [bookingDetails, setBookingDetails] = useState({
    appointmentDate: '',
    timeSlot: '',
    symptoms: '',
    contactNumber: '',
  });

  // Form Change Handler
  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'symptoms' && value.length > 500) return; // Character limit guard
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  // Submit Handler
  const handlePaymentSubmit = e => {
    e.preventDefault();
    console.log('Proceeding to payment with details:', {
      doctor_id: doctor._id,
      ...bookingDetails,
    });
    setShowPaymentModal(true);
  };

  // User
  const { data: session, } = authClient.useSession();
  const user = session?.user; console.log(user)
  const transactionId = `TXN-${Date.now()}`;

  // Payment submit
  const onPaySubmit = async () => {
    try {
      const appointmentData = {
        doctorId: doctor._id,
        doctorName: doctor.doctorName,
        doctorImage: doctor.profileImage,
        doctorEmail: doctor.email,
        patientName: user?.name,
        patientImage: user?.image,
        patientEmail: user?.email,
        specialty: doctor.specialty,

        appointmentDate: bookingDetails.appointmentDate,
        timeSlot: bookingDetails.timeSlot,
        symptoms: bookingDetails.symptoms,
        contactNumber: bookingDetails.contactNumber,

        fee: doctor.fee,
        paymentStatus: 'paid',
        appointmentStatus: 'pending',
        transactionId,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}appointments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        },
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success('Appointment booked successfully!');
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  // Initial Avatar Fallback
  const getInitial = name => (name ? name.trim().charAt(0).toUpperCase() : 'D');

  if (loading) {
    return <ProjectLoader />
  }

  if (!doctorData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Doctor not found
      </div>
    );
  }

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-8 text-slate-300 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* ================= 1. DOCTOR HERO PROFILE CARD ================= */}
        <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left w-full">
            {/* Dynamic Avatar */}
            <div className="relative w-24 h-24 shrink-0 select-none">
              <div className="w-full h-full border-2 border-slate-800/80 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
                {doctor?.profileImage ? (
                  <Image
                    src={doctor.profileImage}
                    alt={doctor.doctorName}
                    fill
                    className="object-cover rounded-full"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-emerald-400">
                    {getInitial(doctor.doctorName)}
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Info Lines */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  {doctor.doctorName}
                </h1>
                {doctor.status === 'verified' && (
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2
                      size={10}
                      fill="currentColor"
                      className="text-emerald-500"
                      stroke="#050b14"
                    />{' '}
                    Verified Doctor
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-emerald-400 -mt-1 flex items-center justify-center sm:justify-start gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{' '}
                {doctor.specialty}
              </p>

              {/* Stats Grid */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-6 text-xs text-slate-400 mt-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0a1220] border border-slate-800/80 flex items-center justify-center text-slate-400">
                    <Award size={14} />
                  </div>
                  <div>
                    <p className="font-bold text-white">{doctor.experience}</p>
                    <p className="text-[10px] text-slate-500">Experience</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0a1220] border border-slate-800/80 flex items-center justify-center text-slate-400">
                    <DollarSign size={14} />
                  </div>
                  <div>
                    <p className="font-bold text-white">${doctor.fee}</p>
                    <p className="text-[10px] text-slate-500">
                      Consultation Fee
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0a1220] border border-slate-800/80 flex items-center justify-center text-amber-500">
                    <Star size={14} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{doctor.rating}</p>
                    <p className="text-[10px] text-slate-500">
                      ({doctor.reviews} Reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TWO COLUMN BODY LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT: APPOINTMENT FORM PANEL */}
          <form
            onSubmit={handlePaymentSubmit}
            className="lg:col-span-2 bg-[#050b14] border border-slate-900/80 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1 border-b border-slate-900 pb-3">
              <h2 className="text-base font-bold text-white inline-flex items-center gap-2">
                <Calendar size={18} className="text-emerald-400" /> Appointment
                Details
              </h2>
              <p className="text-xs text-slate-500">
                Fill in the details below to book your appointment.
              </p>
            </div>

            {/* Appointment Date input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">
                Appointment Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="appointmentDate"
                  value={bookingDetails.appointmentDate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer scheme-dark"
                />
              </div>
            </div>

            {/* Time Slot Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">
                Available Time Slot
              </label>
              <div className="relative">
                <select
                  name="timeSlot"
                  value={bookingDetails.timeSlot}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
                >
                  <option value="">Select time slot</option>
                  {doctor?.availableSlots?.map((slot, index) => (
                    <option key={index} value={slot} className="bg-[#050b14]">
                      {slot}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Symptoms Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">
                Symptoms / Reason for Visit
              </label>
              <div className="relative">
                <textarea
                  name="symptoms"
                  value={bookingDetails.symptoms}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Please describe your symptoms or reason for consultation..."
                  className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                />
                <span className="absolute bottom-3 right-3 text-[10px] font-semibold text-slate-600">
                  {bookingDetails.symptoms.length} / 500
                </span>
              </div>
            </div>

            {/* Contact Number Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">
                Contact Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="contactNumber"
                  value={bookingDetails.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  className="w-full bg-[#0a1220] border border-slate-800/60 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
                <Phone
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Submit Action Block */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl inline-flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/20 transition-all active:scale-[0.99]"
              >
                <span>Continue to Payment</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>

              <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
                <Lock size={11} /> Your information is secure and encrypted
              </p>
            </div>
          </form>

          {/* RIGHT: LIVE APPOINTMENT SUMMARY PANEL */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#050b14] border border-slate-900/80 rounded-2xl p-5 shadow-xl flex flex-col gap-5">
              <div className="flex flex-col gap-1 border-b border-slate-900 pb-3">
                <h2 className="text-sm font-bold text-white inline-flex items-center gap-2">
                  <Clock size={16} className="text-emerald-400" /> Appointment
                  Summary
                </h2>
                <p className="text-[11px] text-slate-500">
                  Review your appointment details.
                </p>
              </div>

              {/* Summary Mini Doctor Card */}
              <div className="bg-[#0a1220]/50 border border-slate-900 rounded-xl p-3 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <Image
                    src={doctor.profileImage}
                    alt={doctor.doctorName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">
                    {doctor.doctorName}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              {/* Data Items List */}
              <div className="flex flex-col gap-4 text-xs border-b border-slate-900/60 pb-4">
                {/* Date Row */}
                <div className="flex items-start gap-3">
                  <Calendar
                    size={15}
                    className="text-slate-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      Appointment Date
                    </p>
                    <p className="text-white font-semibold mt-0.5">
                      {bookingDetails.appointmentDate
                        ? new Date(
                            bookingDetails.appointmentDate,
                          ).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'Not selected'}
                    </p>
                  </div>
                </div>

                {/* Time Slot Row */}
                <div className="flex items-start gap-3">
                  <Clock size={15} className="text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      Time Slot
                    </p>
                    <p className="text-white font-semibold mt-0.5">
                      {bookingDetails.timeSlot || 'Not selected'}
                    </p>
                  </div>
                </div>

                {/* Fees Row */}
                <div className="flex items-start gap-3">
                  <DollarSign
                    size={15}
                    className="text-slate-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      Consultation Fee
                    </p>
                    <p className="text-white font-semibold mt-0.5">
                      ${doctor.fee}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Status Footer Row */}
              {/* <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-white">
                  Payment Status
                </span>
                <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-bold px-2.5 py-1 rounded-xl">
                  Pending
                </span>
              </div> */}
            </div>

            {/* Bottom Safe Badge */}
            <div className="bg-[#050b14] border border-slate-900/80 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  Secure & Trusted
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Your appointment is safe with us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <PaymentModal
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          doctor={doctor}
          bookingDetails={bookingDetails}
          onPaySubmit={onPaySubmit}
        />
      )}
    </div>
  );
}
