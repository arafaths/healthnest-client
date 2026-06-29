'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  User,
  ShieldAlert,
  CheckCircle,
  Edit3,
  X,
  Check,
  Image as ImageIcon,
  ChevronDown,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import ProjectLoader from '@/components/shared/ProjectLoader';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    image: '',
    phone: '',
    gender: '',
    dobRaw: '',
    address: '',
    role: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    phone: '',
    gender: '',
    dobRaw: '',
    address: '',
    role: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        if (user) {
          const userData = {
            name: user.name || '',
            email: user.email || '',
            image: user.image || '',
            phone: user.phone || '',
            gender: user.gender || '',
            dobRaw: user.dobRaw || '',
            address: user.address || '',
            role: user.role || '',
          };

          setProfile(userData);
          setFormData(userData);
          setImageError(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const currentImage = isModalOpen ? formData.image : profile.image;

  const handleOpenModal = () => {
    setImageError(false);
    setFormData({ ...profile });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'image') {
      setImageError(false);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}users/${user.email}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success('Profile updated');

        setProfile(formData);
        setIsModalOpen(false);

        await authClient.getSession({
          query: {
            disableCookieCache: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  if (loading) {
    return <ProjectLoader />;
  }

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-12 flex items-center justify-center text-slate-300 font-sans antialiased">
      {/* ================= 👤 MAIN PROFILE CARD ================= */}
      <div className="w-full max-w-md bg-[#050b14] border border-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col items-center">
        {/* Avatar Area */}
        <div className="relative w-28 h-28 mb-4">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-800 bg-slate-950 relative">
            {currentImage && !imageError ? (
              <Image
                src={currentImage}
                alt={profile.name}
                fill
                className="object-cover"
                unoptimized
                onError={() => setImageError(true)} // ইউআরএল নষ্ট বা ভুল হলে এই ট্রিগারটি ফায়ার হবে
              />
            ) : (
              /* 👤 ইমেজ না থাকলে বা লিঙ্ক ব্রোকেন হলে নামের প্রথম অক্ষর দেখাবে */
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-slate-900 text-emerald-400 font-bold text-2xl uppercase select-none tracking-wider">
                {profile.name ? profile.name.charAt(0) : 'U'}
              </div>
            )}
          </div>
        </div>

        {/* Name & Active Badge */}
        <h2 className="text-xl font-bold text-white tracking-wide mb-1.5">
          {profile.name}
        </h2>
        <span className="inline-flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </span>

        {/* Info Fields Grid */}
        <div className="w-full flex flex-col divide-y divide-slate-900/60 mb-8 text-xs font-medium">
          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-500">
              <Mail size={14} />
              <span>Email Address</span>
            </div>
            <span className="text-slate-300 select-all truncate max-w-[200px]">
              {profile.email || 'Not provided'}
            </span>
          </div>

          {/* <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-500">
              <Phone size={14} />
              <span>Phone Number</span>
            </div>
            <span className="text-slate-300">
              {profile.phone || 'Not provided'}
            </span>
          </div> */}

          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-500">
              <User size={14} />
              <span>Gender</span>
            </div>
            <span className="text-slate-300">
              {profile.gender || 'Not provided'}
            </span>
          </div>

          {/* <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-500">
              <Calendar size={14} />
              <span>Date of Birth</span>
            </div>
            <span className="text-slate-300">
              {profile.dob || 'Not provided'}
            </span>
          </div> */}

          {/* <div className="py-3 flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-500 pt-0.5 shrink-0">
              <MapPin size={14} />
              <span>Address</span>
            </div>
            <span className="text-slate-300 text-right max-w-[220px] leading-relaxed">
              {profile.address || 'Not provided'}
            </span>
          </div> */}

          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-500">
              <ShieldAlert size={14} />
              <span>Account Role</span>
            </div>
            <span className="text-emerald-400 font-bold tracking-wide">
              {profile.role}
            </span>
          </div>

          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-500">
              <CheckCircle size={14} />
              <span>Account Status</span>
            </div>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              Active
            </span>
          </div>
        </div>

        {/* CTA: Open Modal Button */}
        <button
          onClick={handleOpenModal}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all active:scale-[0.99]"
        >
          <Edit3 size={14} strokeWidth={2.5} />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* ================= 🟩 ANIMATED UPDATE PROFILE MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Box Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#050b14] border border-slate-900 rounded-2xl p-6 md:p-7 shadow-2xl z-10 text-slate-300 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button X */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
                type="button"
              >
                <X size={16} />
              </button>

              <h2 className="text-base font-bold text-white tracking-wide mb-6">
                Update Profile
              </h2>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-xs"
              >
                {/* 1. Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">Full Name</label>
                  <div className="relative">
                    <User
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="w-full bg-[#0a1220] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                {/* 2. Phone Number */}
                {/* <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      className="w-full bg-[#0a1220] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div> */}

                {/* 3. Gender Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">Gender</label>
                  <div className="relative">
                    <User
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <select
                      name="gender"
                      value={formData.gender || ''}
                      onChange={handleChange}
                      className="w-full bg-[#0a1220] border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-white appearance-none focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="Male" className="bg-[#050b14]">
                        Male
                      </option>
                      <option value="Female" className="bg-[#050b14]">
                        Female
                      </option>
                      <option value="Other" className="bg-[#050b14]">
                        Other
                      </option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>

                {/* 4. Date of Birth */}
                {/* <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="date"
                      name="dobRaw"
                      value={formData.dobRaw || ''}
                      onChange={handleChange}
                      className="w-full bg-[#0a1220] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 shelf-date-input"
                    />
                  </div>
                </div> */}

                {/* 5. Address Textarea */}
                {/* <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">Address</label>
                  <div className="relative">
                    <MapPin
                      size={14}
                      className="absolute left-3.5 top-4 text-slate-500"
                    />
                    <textarea
                      rows={3}
                      name="address"
                      value={formData.address || ''}
                      onChange={handleChange}
                      className="w-full bg-[#0a1220] border border-slate-800 rounded-xl pl-10 pr-4 p-3.5 text-white focus:outline-none focus:border-emerald-500/50 resize-none leading-relaxed"
                    />
                  </div>
                </div> */}

                {/* 6. Profile Photo URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-400">
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <ImageIcon
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="url"
                      name="image"
                      value={formData.image || ''}
                      onChange={handleChange}
                      className="w-full bg-[#0a1220] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 font-mono text-[11px]"
                      placeholder="https://example.com/profile.jpg"
                    />
                  </div>
                </div>

                {/* Form Action CTAs */}
                <div className="flex items-center justify-end gap-3 mt-5 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 font-bold text-slate-400 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold inline-flex items-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
                  >
                    <Check size={14} strokeWidth={2.5} />
                    <span>Save Changes</span>
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
