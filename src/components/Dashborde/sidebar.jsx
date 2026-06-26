'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
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

export default function Sidebar() {
  const pathname = usePathname();

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

  // Get user
  const {
    data: session,
  } = authClient.useSession(); 
  const role = session?.user?.role;
  const user = session?.user;

  const menuItems =
    role === 'admin'
      ? admin
      : role === 'doctor'
        ? doctor
        : patient;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-[#050b14] border-r border-slate-900 hidden lg:flex flex-col justify-between py-6 overflow-hidden select-none">
      {/* Background Subtle Glow Effect */}
      <div className="absolute -top-20 -left-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Menu List - */}
      <div className="space-y-1.5 flex-1 pt-17 px-3 z-10">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={idx}
              href={item.href}
              className={`w-full flex items-center justify-between py-3 px-4 text-[14px] font-medium rounded-xl relative transition-all duration-200 overflow-hidden group
                ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent border border-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
                }`}
            >
              <div className="flex items-center gap-3.5 relative z-10">
                <item.icon
                  size={19}
                  className={
                    isActive
                      ? 'text-[#00c885]'
                      : 'text-slate-400 group-hover:text-slate-300 transition-colors'
                  }
                />
                <span>{item.name}</span>
              </div>

              {/* Glowing Left Indicator Active Line */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00c885] shadow-[0_0_12px_#00c885]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout Button - */}
      <div className="pt-4 border-t border-slate-900/60 px-3 z-10">
        {user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 py-3 px-4 text-sm text-slate-400 hover:text-red-400 font-medium rounded-xl hover:bg-red-500/5 transition-all duration-200 text-left group"
          >
            <LogOut
              size={19}
              className="text-slate-400 group-hover:text-red-400 transition-colors"
            />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
