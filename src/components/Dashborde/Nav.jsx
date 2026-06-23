'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { FaHeartbeat, FaMoon, FaSun } from 'react-icons/fa';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  Star,
  User,
  CalendarRange,
  Inbox,
  FileText,
  ShieldCheck,
  Users,
  Activity,
  History,
} from 'lucide-react';

import { authClient } from '@/lib/auth-client';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const role = session?.user?.role;

  // Patient menu item
  const patient = [
    {
      name: 'Overview',
      icon: LayoutDashboard,
      href: '/dashboard/patient/overview',
    },
    {
      name: 'My Appointments',
      icon: CalendarDays,
      href: '/dashboard/patient/appointments',
    },
    {
      name: 'Payments History',
      icon: CreditCard,
      href: '/dashboard/patient/payments',
    },
    {
      name: 'Feedback Reviews',
      icon: Star,
      href: '/dashboard/patient/reviews',
    },
    {
      name: 'My Profile',
      icon: User,
      href: '/dashboard/patient/profile',
    },
  ];

  // Doctor menu item
  const doctor = [
    {
      name: 'Dashboard Overview',
      icon: LayoutDashboard,
      href: '/dashboard/doctor/overview',
    },
    {
      name: 'Manage Schedules & Days',
      icon: CalendarRange,
      href: '/dashboard/doctor/schedules',
    },
    {
      name: 'Appointments Inbox',
      icon: Inbox,
      href: '/dashboard/doctor/appointments',
    },
    {
      name: 'Prescriptions Cabin',
      icon: FileText,
      href: '/dashboard/doctor/prescriptions',
    },
    {
      name: 'Profile Credentials',
      icon: User,
      href: '/dashboard/doctor/profile',
    },
  ];

  // Admin menu item
  const admin = [
    {
      name: 'Ecosystem Analytics',
      icon: Activity,
      href: '/dashboard/admin/analytics',
    },
    {
      name: 'Manage User Accounts',
      icon: Users,
      href: '/dashboard/admin/users',
    },
    {
      name: 'Verify Doctor Licenses',
      icon: ShieldCheck,
      href: '/dashboard/admin/verify-doctors',
    },
    {
      name: 'Clinical Appts Registry',
      icon: History,
      href: '/dashboard/admin/appointments-registry',
    },
    {
      name: 'Stripe Cash Flows',
      icon: CreditCard,
      href: '/dashboard/admin/cash-flows',
    },
  ];

  const menuItems =
    role === 'patient' ? patient : role === 'doctor' ? doctor : admin;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#050b14]/80 border-b border-slate-900 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3.5 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-[#10b981] text-lg shadow-md shadow-emerald-500/5">
                <FaHeartbeat />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Health<span className="text-emerald-400">Nest</span>
              </h2>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 text-slate-400 hover:text-white bg-[#0b1322]/50 border border-slate-800 rounded-full hover:bg-slate-800 transition-all flex items-center justify-center w-10 h-10 overflow-hidden"
            >
              <motion.div
                key={isDarkMode ? 'dark' : 'light'}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDarkMode ? (
                  <FaMoon className="text-sm sm:text-base text-emerald-400" />
                ) : (
                  <FaSun className="text-sm sm:text-base text-amber-400" />
                )}
              </motion.div>
            </button>

            {/* User Profile Info (Desktop) */}
            {user && (
              <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-slate-800">
                <div className="relative shrink-0">
                  {user?.image && !imageError ? (
                    <Image
                      src={user.image}
                      width={34}
                      height={34}
                      alt="Profile"
                      onError={() => setImageError(true)}
                      className="w-8.5 h-8.5 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] text-white flex items-center justify-center text-xs font-bold border border-emerald-500/30 uppercase select-none">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>

                <div className="flex flex-col min-w-0 max-w-[120px]">
                  <h3 className="text-sm font-semibold text-slate-200 truncate leading-tight">
                    {user?.name}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-medium capitalize mt-0.5">
                    {user?.role || 'Patient'}
                  </span>
                </div>
              </div>
            )}

            {/* Login button fallback */}
            {!user && (
              <Link href="/login">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-emerald-500/10">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-51 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Mobile Sidebar / Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-52
          h-screen w-72
          bg-[#050b14]
          border-r border-slate-900
          transform transition-transform duration-300 ease-in-out
          lg:hidden flex flex-col justify-between
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-900/60">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-[#10b981] text-lg">
                <FaHeartbeat />
              </div>
              <h2 className="text-lg font-bold text-white">
                Health<span className="text-emerald-400">Nest</span>
              </h2>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile User Section */}
          {user && (
            <div className="flex items-center gap-3 p-5 bg-[#0b1322]/30 border-b border-slate-900/60">
              <div className="relative shrink-0">
                {user?.image && !imageError ? (
                  <Image
                    src={user.image}
                    width={40}
                    height={40}
                    alt="Profile"
                    onError={() => setImageError(true)}
                    className="w-10 h-10 rounded-full object-cover border border-slate-800"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] text-white flex items-center justify-center text-sm font-bold border border-emerald-500/20 uppercase select-none">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className="text-sm font-semibold text-slate-200 truncate">
                  {user?.name}
                </h3>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          )}

          {/* Mobile Menu Links */}
          <div className="flex flex-col p-4 space-y-1.5">
            {menuItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-200 text-sm font-medium"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Logout */}
        {user && (
          <div className="p-4 border-t border-slate-900/60">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm font-medium text-left"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
