'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  FaHeartbeat,
  FaMoon,
  FaChevronDown,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  // Mobile menu open/close state
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 1. Local state for instant slide animation
  const [activePath, setActivePath] = useState(pathname);


  // Dynamic Navigation Links Array
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
        {/* Isolated animation group using LayoutGroup */}
        <LayoutGroup id="desktop-nav-group">
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = activePath === link.path;

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setActivePath(link.path)} // Slides the line instantly on click
                  className={`relative cursor-pointer py-1 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10 px-1">{link.name}</span>

                  {/* Super smooth spring active indicator */}
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
          <Link
            href={'/dashboard/patient'}
            className="hidden xl:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700/80 rounded-xl hover:bg-gray-800/40 transition-all"
          >
            Dashboard
          </Link>

          <Link href={'login'} className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700/80 rounded-xl hover:bg-gray-800/40 transition-all">
            Login
          </Link>

          <Link
            href={'/register'}
            className="px-4 sm:px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl hover:opacity-90 shadow-md shadow-[#10b981]/10 transition-all"
          >
            Register
          </Link>

          <div className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 bg-gray-800/30 border border-gray-800 rounded-full cursor-pointer hover:bg-gray-800/50 transition-all">
            <img
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100"
              alt="Doctor Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-700"
            />
            <FaChevronDown className="text-gray-400 text-xs" />
          </div>

          <button className="p-2.5 text-gray-400 hover:text-white bg-gray-800/30 border border-gray-800 rounded-full hover:bg-gray-800/50 transition-all flex items-center justify-center">
            <FaMoon className="text-sm sm:text-base" />
          </button>

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
              {/* Dynamic mobile links */}
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
                <div className="xl:hidden flex items-center justify-between bg-gray-800/20 border border-gray-800/50 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100"
                      alt="Doctor Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-300">
                      My Account
                    </span>
                  </div>
                  <FaChevronDown className="text-gray-500 text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="xl:hidden w-full py-2.5 text-xs font-medium text-gray-300 border border-gray-800 rounded-xl bg-gray-900/40">
                    Dashboard
                  </button>
                  <button className="sm:hidden w-full py-2.5 text-xs font-medium text-gray-300 border border-gray-800 rounded-xl bg-gray-900/40">
                    Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
