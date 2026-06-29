'use client';

import React, { useState } from 'react';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiLogIn,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaHeartbeat } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Main Form States for Login
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    if (data) {
      toast.success('Logged in successfully!', {
        duration: 4000,
        style: {
          border: '1px solid #22C55E',
          padding: '8px',
          color: '#166534',
          background: '#F0FDF4',
          borderRadius: '12px',
        },
        iconTheme: {
          primary: '#22C55E',
          secondary: '#fff',
        },
      });
      redirect('/');
    }

    if (error) {
      console.log(error);
      toast.error(error.message || 'Invalid email or password', {
        style: {
          border: '1px solid #EF4444',
          padding: '8px',
          color: '#991B1B',
          background: '#FEF2F2',
          borderRadius: '12px',
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050b14] flex items-center justify-center p-4 antialiased">
      {/* Background soft glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-[#0b1322]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Subtle cyan top-left border accent indicator */}
        <div className="absolute top-0 left-0 w-[2px] h-20 bg-gradient-to-b from-cyan-400 to-transparent" />
        <div className="absolute top-0 left-0 w-20 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />

        {/* Header / Logo Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-emerald-400/30 bg-emerald-500/10">
              <span className="text-[#10b981] text-xl">
                <FaHeartbeat />
              </span>
            </div>
            <span className="text-white text-2xl font-semibold tracking-wide">
              Health<span className="text-emerald-400">Nest</span>
            </span>
          </div>

          {/* Secure Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <FiShield className="w-3.5 h-3.5" />
            Secure Portal Login
          </div>

          <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm max-w-sm">
            Please enter your details to sign in to your account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-slate-300 text-xs font-medium pl-1">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full bg-[#0e1726] border border-slate-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-slate-300 text-xs font-medium pl-1">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-[#0e1726] border border-slate-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-10 text-white placeholder-slate-500 outline-none transition-all text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action Button: Sign In */}
          <button
            type="submit"
            className="w-full font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-sm mt-2 bg-[#00c885] hover:bg-[#00b074] text-[#050b14] shadow-emerald-500/20"
          >
            <FiLogIn className="w-4 h-4 stroke-[2.5]" />
            Sign In
          </button>
        </form>

        {/* Demo Admin Account */}
        <div className="mt-4 p-3 rounded-xl border border-slate-800 bg-[#0e1726] text-xs">
          <p className="text-emerald-400 font-semibold mb-2">
            Demo Admin Account
          </p>

          <p className="text-slate-300">
            <span className="text-slate-500">Email:</span> arafat@hossen.com
          </p>

          <p className="text-slate-300 mt-1">
            <span className="text-slate-500">Password:</span> Pa$$w0rd!
          </p>
        </div>

        {/* OR Divider Line */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full border-t border-slate-800"></div>
          <span className="absolute bg-[#0b1322] px-3 text-slate-500 text-xs font-semibold tracking-wider">
            OR
          </span>
        </div>

        {/* Social Authentication: Google */}
        <button
          type="button"
          className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 text-sm"
        >
          <FcGoogle className="w-5 h-5" />
          Sign in with Google
        </button>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-xs">
            Don’t have an account?{' '}
            <Link
              href={'/register'}
              className="text-emerald-400 font-medium hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
