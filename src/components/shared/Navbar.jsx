'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  FaHeartbeat,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from 'react-icons/fa';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { LuLayoutDashboard } from 'react-icons/lu';
import Image from 'next/image';

const Navbar = () => {
  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false);
  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Dark/Light theme toggle state
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Avater image URL check
  const [imageError, setImageError] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Local state for instant slide animation
  const [activePath, setActivePath] = useState(pathname);

  // User session
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;

  // Handle Logout functionality
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully');
        },
        onError: ctx => {
          toast.error(ctx.error.message || 'Failed to logout');
        },
      },
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctors', path: '/find-doctors' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <nav className="w-full px-4 md:px-6 pt-4 bg-[#030712] flex justify-center sticky z-50 top-0 left-0">
      <div className="w-full max-w-7xl bg-[#0b1329]/60 backdrop-blur-md border border-gray-800 rounded-full px-4 lg:px-6 py-3 flex items-center justify-between shadow-lg relative">
        {/* ================= LEFT: LOGO ================= */}
        <Link href={'/'} className="flex items-center gap-2 shrink-0">
          <div className="text-[#10b981] text-2xl">
            <FaHeartbeat />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">
            Health<span className="text-[#10b981]">Nest</span>
          </span>
        </Link>

        {/* ================= CENTER: DYNAMIC LINKS (DESKTOP) ================= */}
        <LayoutGroup id="desktop-nav-group">
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = activePath === link.path;

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setActivePath(link.path)}
                  className={`relative cursor-pointer py-1 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10 px-1">{link.name}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#10b981] rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </LayoutGroup>

        {/* ================= RIGHT: ACTIONS & CONTROLS ================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!user && (
            <>
              <Link
                href={'/login'}
                className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700/80 rounded-xl hover:bg-gray-800/40 transition-all"
              >
                Login
              </Link>

              <Link
                href={'/register'}
                className="px-4 sm:px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl hover:opacity-90 shadow-md shadow-[#10b981]/10 transition-all"
              >
                Register
              </Link>
            </>
          )}

          {/* ================= DESKTOP PROFILE DROPDOWN ================= */}
          {user && (
            <div className="relative hidden sm:block">
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1 bg-gray-800/30 border border-gray-800 rounded-full cursor-pointer hover:bg-gray-800/50 transition-all select-none"
              >
                {user?.image && !imageError ? (
                  <Image
                    src={user.image}
                    width={32}
                    height={32}
                    alt="Doctor Profile"
                    onError={() => setImageError(true)}
                    className="w-8 h-8 rounded-full object-cover border border-gray-700"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] text-white flex items-center justify-center text-sm font-bold border border-emerald-500/30 uppercase select-none">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}

                <motion.div
                  animate={{ rotate: isProfileOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown className="text-gray-400 text-xs" />
                </motion.div>
              </div>

              {/* Dropdown Menu Overlay */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[125%] w-48 bg-[#091124]/95 border border-gray-800 rounded-xl p-2 shadow-2xl backdrop-blur-md flex flex-col space-y-1 z-50"
                  >
                    <Link
                      href={`/dashboard/${user?.role}/${user?.role === 'admin' ? 'analytics' : user?.role === 'doctor' ? 'overview' : 'overview'}`}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
                    >
                      <LuLayoutDashboard className="text-gray-400 text-xs" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-left w-full"
                    >
                      <FaSignOutAlt className="text-xs" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ================= THEME TOGGLE BUTTON ================= */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 text-gray-400 hover:text-white bg-gray-800/30 border border-gray-800 rounded-full hover:bg-gray-800/50 transition-all flex items-center justify-center w-10 h-10 overflow-hidden"
          >
            <motion.div
              key={isDarkMode ? 'dark' : 'light'}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? (
                <FaMoon className="text-sm sm:text-base" />
              ) : (
                <FaSun className="text-sm sm:text-base text-amber-400" />
              )}
            </motion.div>
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 text-gray-400 hover:text-white bg-gray-800/30 border border-gray-800 rounded-full hover:bg-gray-800/50 transition-all flex items-center justify-center"
          >
            {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        {/* ================= MOBILE DROPDOWN NAVIGATION ================= */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-[115%] left-2 right-2 bg-[#091124]/95 border border-gray-800 backdrop-blur-lg rounded-2xl p-5 flex flex-col space-y-4 lg:hidden shadow-2xl z-50"
            >
              <div className="flex flex-col space-y-3 pb-3 border-b border-b-gray-800/60">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium tracking-wide py-2 px-3 rounded-xl transition-all ${
                      pathname === link.path
                        ? 'text-[#10b981] bg-[#10b981]/10 font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/20'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Profile & Extra Actions */}
              <div className="flex flex-col space-y-3 pt-1">
                {user && (
                  <div className="flex flex-col bg-gray-800/20 border border-gray-800/50 rounded-xl p-2 space-y-1">
                    <div className="flex items-center gap-2 p-2 border-b border-gray-800/40 pb-2">
                      {user?.image && !imageError ? (
                        <Image
                          src={user.image}
                          width={32}
                          height={32}
                          alt="Doctor Profile"
                          onError={() => setImageError(true)}
                          className="w-8 h-8 rounded-full object-cover border border-gray-700"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] text-white flex items-center justify-center text-sm font-bold border border-emerald-500/30 uppercase select-none">
                          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-gray-300 truncate">
                          {user?.name}
                        </span>
                        <span className="text-[11px] text-emerald-400/80 font-medium capitalize">
                          {user?.role}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Dropdown Options */}
                    <Link
                      href={`/dashboard/${user?.role}/${user?.role === 'admin' ? 'analytics' : user?.role === 'doctor' ? 'overview' : 'overview'}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-gray-400 hover:text-white transition-all"
                    >
                      <LuLayoutDashboard /> Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-red-400 hover:text-red-300 transition-all text-left w-full"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}

                {!user && (
                  <div className="grid grid-cols-2 gap-3 sm:hidden">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2.5 text-xs font-medium text-gray-300 border border-gray-800 rounded-xl bg-gray-900/40 text-center"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
