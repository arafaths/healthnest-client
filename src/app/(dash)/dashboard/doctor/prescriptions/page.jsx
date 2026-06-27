'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Calendar,
  Eye,
  Edit3,
  X,
  Check,
  ChevronDown,
} from 'lucide-react';
import NoPrescriptions from '@/components/DoctorDetails/prescriptions/NoPrescriptions';
import { authClient } from '@/lib/auth-client';

// ================= 👤 SUB-COMPONENT: PATIENT AVATAR FALLBACK =================
const PatientAvatar = ({ src, name }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-950 border border-slate-800 shrink-0 flex items-center justify-center">
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
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-slate-900 text-emerald-400 font-bold text-xs uppercase select-none tracking-wide">
          {name ? name.charAt(0) : 'P'}
        </div>
      )}
    </div>
  );
};

// ================= 📊 MAIN COMPONENT =================
export default function PrescriptionManagement() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState('');
  const [notes, setNotes] = useState('');

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Prescriptions data
  const loadPrescriptions = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}doctor/prescriptions/${user?.email}`,
    );

    const data = await res.json();

    setPrescriptions(data);
  };

  const loadPatients = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}doctor/patients/${user?.email}`,
    );

    const data = await res.json();

    setPatientsList(data);
  };

  useEffect(() => {
    if (!user?.email) return;

    loadPrescriptions();
    loadPatients();
  }, [user?.email]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setEditingPrescription(null);

    setSelectedPatient('');
    setDiagnosis('');
    setMedications('');
    setNotes('');

    setIsModalOpen(false);
  };

  const handleSavePrescription = async e => {
    e.preventDefault();

    if (!selectedPatient || !diagnosis || !medications) return;

    const prescription = {
      doctorEmail: user.email,
      patientEmail: selectedPatient.patientEmail,
      patientName: selectedPatient.patientName,
      patientImage: selectedPatient.patientImage,
      diagnosis,
      medications,
      notes,
    };

    if (editingPrescription) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}prescriptions/${editingPrescription._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prescription),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        handleCloseModal();
        loadPrescriptions();
      }
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}prescriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prescription),
        },
      );

      const data = await res.json();

      if (data.insertedId) {
        handleCloseModal();
        loadPrescriptions();
      }
    }
  };

  const handleEdit = item => {
    setEditingPrescription(item);

    setSelectedPatient({
      patientName: item.patientName,
      patientEmail: item.patientEmail,
      patientImage: item.patientImage,
    });

    setDiagnosis(item.diagnosis);
    setMedications(item.medications);
    setNotes(item.notes || '');

    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-[#030712] min-h-[90vh] p-4 md:p-6 text-slate-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* ================= TOP HEADER HEADER ================= */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              Prescription Management
            </h1>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Create and manage patient prescriptions.
            </p>
          </div>
          {prescriptions.length > 0 && (
            <button
              onClick={handleOpenModal}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow-lg shadow-emerald-950/10 transition-all active:scale-[0.98]"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Create Prescription</span>
            </button>
          )}
        </div>

        {/* ================= CONDITIONAL RENDER ================= */}
        {prescriptions.length === 0 ? (
          <NoPrescriptions handleOpenModal={handleOpenModal} />
        ) : (
          /* 📊 DYNAMIC PRESCRIPTION TABLE GRID */
          <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 text-xs font-semibold tracking-wider">
                    <th className="py-4 px-5">Patient Name</th>
                    <th className="py-4 px-5">Diagnosis</th>
                    <th className="py-4 px-5">Medications</th>
                    <th className="py-4 px-5">Prescription Date</th>
                    <th className="py-4 px-5">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-900/40 text-xs font-medium">
                  {prescriptions.map((item, idx) => (
                    <tr
                      key={item._id || idx}
                      className="hover:bg-[#0a1220]/10 transition-colors group"
                    >
                      {/* Patient Context */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <PatientAvatar
                            src={item.patientImage}
                            name={item.patientName}
                          />
                          <span className="font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                            {item.patientName}
                          </span>
                        </div>
                      </td>

                      {/* Diagnosis Details */}
                      <td
                        className="py-4 px-5 text-slate-300 max-w-[180px] truncate"
                        title={item.diagnosis}
                      >
                        {item.diagnosis}
                      </td>

                      {/* Medications List */}
                      <td
                        className="py-4 px-5 text-slate-400 max-w-[220px] truncate"
                        title={item.medications}
                      >
                        {item.medications}
                      </td>

                      {/* Prescription Generated Date */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar size={14} className="text-slate-600" />
                          <span>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* View & Edit Action Blocks */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          {/* <button className="px-3 py-1.5 rounded-xl border border-slate-900/80 hover:border-emerald-500/20 bg-slate-950/40 hover:bg-emerald-500/5 text-slate-300 hover:text-emerald-400 text-xs font-bold inline-flex items-center gap-1.5 transition-all">
                            <Eye size={13} />
                            <span>View</span>
                          </button> */}
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-3 py-1.5 rounded-xl border border-slate-900/80 hover:border-emerald-500/20 bg-slate-950/40 hover:bg-emerald-500/5 text-slate-300 hover:text-emerald-400 text-xs font-bold inline-flex items-center gap-1.5 transition-all"
                          >
                            <Edit3 size={13} />
                            <span>Edit</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ================= 🟩 INTERACTIVE CREATE PRESCRIPTION MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#050b14] border border-slate-900 rounded-2xl p-6 shadow-2xl z-10 text-slate-300 text-xs"
            >
              {/* Close Button Cross */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <h2 className="text-base font-bold text-white tracking-wide mb-5">
                {editingPrescription
                  ? 'Edit Prescription'
                  : 'Create Prescription'}
              </h2>

              <form
                onSubmit={handleSavePrescription}
                className="flex flex-col gap-4"
              >
                {/* 1. Patient Selection Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">
                    Patient Name
                  </label>
                  <div className="relative">
                    <select
                      disabled={editingPrescription}
                      required
                      value={selectedPatient?.patientEmail || ''}
                      onChange={e => {
                        const patient = patientsList.find(
                          p => p.patientEmail === e.target.value,
                        );

                        setSelectedPatient(patient);
                      }}
                      className="w-full bg-[#0a1220] border border-slate-800 rounded-xl px-3.5 py-3 text-white appearance-none focus:outline-none focus:border-emerald-500/40"
                    >
                      <option value="">Select Patient</option>
                      {patientsList.map((patient, idx) => (
                        <option
                          key={patient.patientEmail}
                          value={patient.patientEmail}
                          className="bg-[#050b14]"
                        >
                          {patient.patientName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>

                {/* 2. Diagnosis Textarea Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">Diagnosis</label>
                  <textarea
                    required
                    rows={2.5}
                    value={diagnosis}
                    onChange={e => setDiagnosis(e.target.value)}
                    placeholder="Enter diagnosis..."
                    className="w-full bg-[#0a1220] border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 resize-none leading-relaxed"
                  />
                </div>

                {/* 3. Medications Textarea Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">
                    Medications
                  </label>
                  <textarea
                    required
                    rows={2.5}
                    value={medications}
                    onChange={e => setMedications(e.target.value)}
                    placeholder="Enter medications..."
                    className="w-full bg-[#0a1220] border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 resize-none leading-relaxed"
                  />
                </div>

                {/* 4. Optional Additional Notes Area */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">
                    Notes{' '}
                    <span className="text-slate-600 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    rows={2.5}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Add any additional notes..."
                    className="w-full bg-[#0a1220] border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 resize-none leading-relaxed"
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-1">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 font-bold text-slate-400 inline-flex items-center gap-1 transition-colors"
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold inline-flex items-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
                  >
                    <Check size={14} strokeWidth={2.5} />
                    <span>
                      {editingPrescription
                        ? 'Update Prescription'
                        : 'Save Prescription'}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
