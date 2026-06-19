import React from 'react';
import { FaHeartbeat, FaMoon, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="w-full px-6 pt-4 bg-[#030712] flex justify-center">
      <div className="w-full max-w-7xl bg-[#0b1329]/60 backdrop-blur-md border border-gray-800 rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="text-[#10b981] text-2xl">
            <FaHeartbeat />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">
            Health<span className="text-[#10b981]">Nest</span>
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <div className="relative text-white cursor-pointer py-1">
            Home
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#10b981] rounded-full"></div>
          </div>
          <span className="hover:text-white cursor-pointer transition-colors">
            Find Doctors
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            About Us
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Contact Us
          </span>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Dashboard Button */}
          <button className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700/80 rounded-xl hover:bg-gray-800/40 transition-all">
            Dashboard
          </button>

          {/* Login Button */}
          <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700/80 rounded-xl hover:bg-gray-800/40 transition-all">
            Login
          </button>

          {/* Register Button */}
          <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl hover:opacity-90 shadow-md shadow-[#10b981]/10 transition-all">
            Register
          </button>

          {/* User Profile Dropdown */}
          <div className="flex items-center gap-2 pl-2 pr-3 py-1 bg-gray-800/30 border border-gray-800 rounded-full cursor-pointer hover:bg-gray-800/50 transition-all">
            <img
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100"
              alt="Doctor Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-700"
            />
            <FaChevronDown className="text-gray-400 text-xs" />
          </div>

          {/* Dark Mode Toggle */}
          <button className="p-2.5 text-gray-400 hover:text-white bg-gray-800/30 border border-gray-800 rounded-full hover:bg-gray-800/50 transition-all flex items-center justify-center">
            <FaMoon className="text-base" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
