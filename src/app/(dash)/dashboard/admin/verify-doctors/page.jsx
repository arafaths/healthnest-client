'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  Eye,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  RotateCw,
  User,
  Mail,
  Phone,
  Stethoscope,
  BookOpen,
  Clock,
  Building2,
  Wallet,
  Users,
} from 'lucide-react';
import NoDoctorsFound from '@/components/Dashborde/Admin/NoDoctorsFound';
import toast from 'react-hot-toast';
import ProjectLoader from '@/components/shared/ProjectLoader';


export default function DoctorVerification() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/doctor-verification`,
        );

        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);
  

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}admin/doctor-verification/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success(`Doctor ${status}`);

        setDoctors(prev =>
          prev.map(doc =>
            doc._id === id
              ? {
                  ...doc,
                  verificationStatus: status,
                }
              : doc,
          ),
        );
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };


  const getStatusStyle = status => {
    switch (status) {
      case 'verified':
        return 'text-emerald-400 bg-emerald-950/20';
      case 'rejected':
        return 'text-rose-500 bg-rose-950/20';
      default:
        return 'text-amber-400 bg-amber-950/20';
    }
  };

  if (loading) {
    return <ProjectLoader/>
  }
  return (
    <div className="min-h-screen bg-[#030712] p-8 text-slate-300">
      {/* 🔝 TOP HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Verify Doctor Licenses
          </h1>
          <p className="text-slate-500 text-sm">
            Review and manage doctor verification requests.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-2 bg-[#0a1220] border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-400">
            <Users size={14} className="text-emerald-500" />
            <span>Total Doctors:</span>
            <span className="text-white font-mono">{doctors.length}</span>
          </div>
        </div>
      </div>

      {doctors.length === 0 ? (
        <NoDoctorsFound />
      ) : (
        <div className="bg-[#050b14] border border-slate-900 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-slate-500 border-b border-slate-900">
              <tr>
                {[
                  'Doctor',
                  'Specialization',
                  'Qualifications',
                  'Experience',
                  'Status',
                  'Actions',
                ].map(h => (
                  <th key={h} className="p-4 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {doctors.map(doc => (
                <tr key={doc._id} className="hover:bg-[#0a1220]/50">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-emerald-500">
                      {doc.doctorName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {doc.doctorName}
                      </div>
                      <div className="text-xs text-slate-500">{doc.email}</div>
                    </div>
                  </td>
                  <td className="p-4">{doc.specialty}</td>
                  <td className="p-4">{doc.qualifications}</td>
                  <td className="p-4">{doc.experience}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${getStatusStyle(doc.verificationStatus)}`}
                    >
                      ● {doc.verificationStatus}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {doc.verificationStatus === 'pending' ? (
                      <>
                        <button
                          onClick={() => updateStatus(doc._id, 'verified')}
                          className="px-3 py-1 bg-emerald-950/30 text-emerald-400 border border-emerald-500/30 rounded flex items-center gap-1 hover:bg-emerald-900"
                        >
                          <Check size={14} /> Verify
                        </button>
                        <button
                          onClick={() => updateStatus(doc._id, 'rejected')}
                          className="px-3 py-1 bg-rose-950/30 text-rose-500 border border-rose-500/30 rounded flex items-center gap-1 hover:bg-rose-900"
                        >
                          <X size={14} /> Reject
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => updateStatus(doc._id, 'pending')}
                          className="text-emerald-500 text-xs flex items-center gap-1"
                        >
                          <ShieldCheck size={14} /> Remove Verification
                        </button>
                        <button
                          onClick={() => setSelectedDoctor(doc)}
                          className="text-slate-400 text-xs flex items-center gap-1 ml-4"
                        >
                          <Eye size={14} /> View Details
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🖼️ DETAILS MODAL */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <motion.div className="bg-[#0a1220] border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Doctor Details</h2>
                <X
                  className="cursor-pointer"
                  onClick={() => setSelectedDoctor(null)}
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold text-emerald-500">
                  {selectedDoctor.doctorName.charAt(0)}
                </div>
                <div className="w-full space-y-3 text-sm">
                  {[
                    {
                      icon: User,
                      label: 'Full Name',
                      val: selectedDoctor.doctorName || 'Not provided',
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      val: selectedDoctor.email || 'Not provided',
                    },
                    {
                      icon: Phone,
                      label: 'Phone',
                      val: selectedDoctor.phone || 'Not provided',
                    },
                    {
                      icon: Stethoscope,
                      label: 'Specialization',
                      val: selectedDoctor.specialty || 'Not provided',
                    },
                    {
                      icon: BookOpen,
                      label: 'Qualifications',
                      val: selectedDoctor.qualifications || 'Not provided',
                    },
                    {
                      icon: Clock,
                      label: 'Experience',
                      val: selectedDoctor.experience || 'Not provided',
                    },
                    {
                      icon: Building2,
                      label: 'Hospital',
                      val: selectedDoctor.hospitalName || 'Not provided',
                    },
                    {
                      icon: Wallet,
                      label: 'Fee',
                      val: selectedDoctor.fee || 'Not provided',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between border-b border-slate-900 pb-2"
                    >
                      <div className="flex items-center gap-2 text-slate-500">
                        <item.icon size={15} /> {item.label}
                      </div>
                      <span className="text-white">{item.val}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="w-full py-2 bg-emerald-600 rounded-lg text-white font-bold mt-4 hover:bg-emerald-700"
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
