'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Octagon,
  Trash2,
  X,
  Calendar,
  User,
  Mail,
  Phone,
  Shield,
  Users,
  Clock,
  HeartPulse,
} from 'lucide-react';
import NoUsersFound from '@/components/Dashborde/Admin/NoUsersFound';
import toast from 'react-hot-toast';
import ProjectLoader from '@/components/shared/ProjectLoader';

// ================= 👤 SUB-COMPONENT: USER AVATAR WITH FALLBACK =================
const UserAvatar = ({ src, name, sizeClassName = 'w-9 h-9' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative ${sizeClassName} rounded-full overflow-hidden bg-slate-950 border border-slate-800 shrink-0 flex items-center justify-center`}
    >
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
          {name ? name.charAt(0) : 'U'}
        </div>
      )}
    </div>
  );
};

// ================= 📊 MAIN COMPONENT =================
export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}admin/users`,
        );

        const data = await res.json();

        setUsers(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Delete user
  const handleDeleteUser = async id => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}admin/users/${id}`,
        {
          method: 'DELETE',
        },
      );

      const data = await res.json();

      if (data.success) {
        setUsers(prev => prev.filter(user => user._id !== id));

        toast.success('User deleted successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    }
  };

  // User Suspen\Acitve status togel
  const handleToggleSuspend = async id => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}admin/users/${id}/suspend`,
        {
          method: 'PATCH',
        },
      );

      const data = await res.json();

      if (data.success) {
        setUsers(prev =>
          prev.map(user =>
            user._id === id ? { ...user, status: data.status } : user,
          ),
        );

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to update status');
    }
  };

  // রোল ব্যাজের ডাইনামিক স্টাইল
  const roleStyles = {
    patient: 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400',
    doctor: 'bg-blue-950/40 border border-blue-500/20 text-blue-400',
    admin: 'bg-purple-950/40 border border-purple-500/20 text-purple-400',
  };

  // অ্যাকাউন্ট স্ট্যাটাস ব্যাজের ডাইনামিক স্টাইল
  const statusStyles = {
    active: 'text-emerald-400',
    suspended: 'text-amber-500',
    blocked: 'text-rose-500',
  };

  if (loading) {
    return <ProjectLoader />;
  }

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-6 text-slate-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Title and Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900/40 pb-5">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Manage User Accounts
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              View and manage all registered users.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-2 bg-[#0a1220] border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-400">
              <Users size={14} className="text-emerald-500" />
              <span>Total Users:</span>
              <span className="text-white font-mono">{users.length}</span>
            </div>
          </div>
        </div>
        {/* ================= CONDITIONAL RENDER ================= */}
        {users.length === 0 ? (
          <NoUsersFound />
        ) : (
          /* 📊 DYNAMIC USERS TABLE GRID */
          <div className="w-full bg-[#050b14] border border-slate-900/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 text-xs font-semibold tracking-wider">
                    <th className="py-4 px-5">User</th>
                    <th className="py-4 px-5">Email</th>
                    <th className="py-4 px-5">Role</th>
                    <th className="py-4 px-5">Joined Date</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-900/40 text-xs font-medium">
                  {users.map((user, idx) => {
                    const currentRole = user.role?.toLowerCase() || 'patient';
                    const currentStatus =
                      user.status?.toLowerCase() || 'active';

                    return (
                      <tr
                        key={user.id || idx}
                        className="hover:bg-[#0a1220]/10 transition-colors group"
                      >
                        {/* 1. User Name & Profile */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <UserAvatar src={user.image} name={user.name} />
                            <span className="font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                              {user.name}
                            </span>
                          </div>
                        </td>

                        {/* 2. Email Address */}
                        <td className="py-4 px-5 text-slate-400 select-all font-normal">
                          {user.email}
                        </td>

                        {/* 3. Role Badge */}
                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold tracking-wide capitalize ${roleStyles[currentRole] || roleStyles.patient}`}
                          >
                            {currentRole === 'doctor' && (
                              <HeartPulse size={11} />
                            )}
                            {currentRole === 'patient' && <User size={11} />}
                            {currentRole === 'admin' && <Shield size={11} />}
                            {user.role}
                          </span>
                        </td>

                        {/* 4. Joined Date */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Calendar size={13} className="text-slate-600" />
                            <span>
                              {new Date(user.createdAt).toLocaleDateString(
                                'en-GB',
                                {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                },
                              )}
                            </span>
                          </div>
                        </td>

                        {/* 5. Account Status Dot */}
                        <td className="py-4 px-5">
                          <div
                            className={`flex items-center gap-2 font-bold ${statusStyles[currentStatus] || statusStyles.active}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current shadow-sm animate-pulse" />
                            <span>{user.status || 'Active'}</span>
                          </div>
                        </td>

                        {/* 6. Dynamic Actions Row */}
                        <td className="py-4 px-5">
                          {user.role === 'admin' ? (
                            ''
                          ) : (
                            <div className="flex items-center gap-2">
                              {/* View Details Action */}
                              {/* <button
                              onClick={() => setSelectedUser(user)}
                              className="px-2.5 py-1.5 rounded-xl border border-slate-900/80 bg-slate-950/40 hover:bg-emerald-500/5 text-slate-300 hover:text-emerald-400 text-[11px] font-bold inline-flex items-center gap-1 transition-all"
                            >
                              <Eye size={12} />
                              <span>View</span>
                            </button> */}

                              {/* Suspend Toggle Action */}
                              <button
                                onClick={() => handleToggleSuspend(user._id)}
                                className={`px-2.5 py-1.5 rounded-xl border border-slate-900/80 bg-slate-950/40 text-[11px] font-bold inline-flex items-center gap-1 transition-all ${
                                  currentStatus === 'suspended'
                                    ? 'hover:bg-emerald-500/5 hover:text-emerald-400 text-amber-500/90'
                                    : 'hover:bg-amber-500/5 hover:text-amber-500 text-amber-500/60'
                                }`}
                              >
                                <Octagon size={12} />
                                <span>
                                  {user.status === 'Suspended'
                                    ? 'Unsuspend'
                                    : 'Suspend'}
                                </span>
                              </button>

                              {/* Delete User Action */}
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="px-2.5 py-1.5 rounded-xl border border-slate-900/80 bg-slate-950/40 hover:bg-rose-500/5 text-rose-500/70 hover:text-rose-500 text-[11px] font-bold inline-flex items-center gap-1 transition-all"
                              >
                                <Trash2 size={12} />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
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

      {/* ================= 🟩 INTERACTIVE USER DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-[#050b14] border border-slate-900 rounded-2xl p-6 shadow-2xl z-10 text-slate-300 text-xs"
            >
              {/* Close Button X */}
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <h2 className="text-base font-bold text-white tracking-wide mb-5">
                User Details
              </h2>

              <div className="flex flex-col items-center gap-5">
                {/* 1. Centered Big Profile Picture with fallback initial */}
                <UserAvatar
                  src={selectedUser.image}
                  name={selectedUser.name}
                  sizeClassName="w-20 h-20 border-2 border-slate-800"
                />

                {/* 2. Structured Information Grid matching Screenshot */}
                <div className="w-full flex flex-col gap-3 border-t border-slate-900/60 pt-4 font-medium">
                  {/* Full Name */}
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-900/30">
                    <div className="flex items-center gap-2 text-slate-500">
                      <User size={13} />
                      <span>Full Name</span>
                    </div>
                    <span className="text-white font-bold">
                      {selectedUser.name}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-900/30">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Mail size={13} />
                      <span>Email</span>
                    </div>
                    <span className="text-slate-300 max-w-[180px] truncate">
                      {selectedUser.email}
                    </span>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-900/30">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Phone size={13} />
                      <span>Phone Number</span>
                    </div>
                    <span className="text-slate-300">
                      {selectedUser.phone || '+1 (555) 123-4567'}
                    </span>
                  </div>

                  {/* Role Badge inside Detail info */}
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-900/30">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Shield size={13} />
                      <span>Role</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${roleStyles[selectedUser.role?.toLowerCase()] || roleStyles.patient}`}
                    >
                      {selectedUser.role}
                    </span>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-900/30">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Users size={13} />
                      <span>Gender</span>
                    </div>
                    <span className="text-slate-300">
                      {selectedUser.gender || 'Not Specified'}
                    </span>
                  </div>

                  {/* Account Status */}
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-900/30">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={13} />
                      <span>Account Status</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 font-bold ${statusStyles[selectedUser.status?.toLowerCase()] || statusStyles.active}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{selectedUser.status}</span>
                    </div>
                  </div>

                  {/* Joined Date */}
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={13} />
                      <span>Joined Date</span>
                    </div>
                    <span className="text-slate-300">
                      {selectedUser.joinedDate}
                    </span>
                  </div>
                </div>

                {/* Close Button Trigger */}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="w-full mt-2 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md text-center transition-all active:scale-[0.98]"
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
