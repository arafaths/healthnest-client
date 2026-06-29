'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiImage,
  FiLock,
  FiEye,
  FiEyeOff,
  FiBriefcase,
  FiShield,
  FiUserPlus,
  FiCheck,
  FiX,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaHeartbeat } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { methods } from 'better-auth/react';
import { json } from 'better-auth';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading state for form submission
  const [isLoading, setIsLoading] = useState(false);

  // Independent local state for UI matching check only
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  // Main Form States (Excluding confirmPassword)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    gender: '',
    role: '',
    password: '',
    agreeTerms: false,
  });

  // Live Validation States for Password
  const passwordRules = {
    hasMinLength: formData.password.length >= 6,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  };

  // UI Match checking using local confirmPassword state
  const isPasswordMatch = formData.password === confirmPassword;
  const showMatchError = confirmPassword.length > 0 && !isPasswordMatch;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Final Validation Check before submit
    const isAllRulesPassed = Object.values(passwordRules).every(Boolean);
    if (!isAllRulesPassed) {
      alert('Please satisfy all password requirements.');
      return;
    }
    if (!isPasswordMatch) {
      return; // Stop form submission if passwords mismatch
    }

    // Start loading spinner and disable button
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name, // required
        email: formData.email, // required
        password: formData.password, // required
        image: formData.photoUrl,
        role: formData.role,
        gender: formData.gender,
        status: 'Active',
      });

      if (data) {
        if (formData.role === 'doctor') {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}doctors`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              doctorName: formData.name,
              email: formData.email,
              profileImage: formData.photoUrl,
            }),
          });
          if (!res.ok) {
            toast.error('Failed to create doctor profile');
            return;
          }
        }

        toast.success('Account created successfully!', {
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
        router.push('/');
      }

      if (error) {
        console.log(error);
        toast.error(error.message || 'Something went wrong!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      // Stop loading and re-enable button if something goes wrong or process completes
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050b14] flex items-center justify-center p-4 antialiased">
      {/* Background soft glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main SignUp Card */}
      <div className="relative w-full max-w-xl bg-[#0b1322]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
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

          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <FiShield className="w-3.5 h-3.5" />
            Welcome to HealthNest
          </div>

          <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
            Create Your Account
          </h1>
          <p className="text-slate-400 text-sm max-w-sm">
            Join HealthNest and connect with trusted healthcare services.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-slate-300 text-xs font-medium pl-1">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-[#0e1726] border border-slate-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none transition-all text-sm"
                required
              />
            </div>
          </div>

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

          {/* Photo URL */}
          <div className="space-y-1.5">
            <label className="text-slate-300 text-xs font-medium pl-1">
              Photo URL
            </label>
            <div className="relative">
              <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Enter photo URL (optional)"
                className="w-full bg-[#0e1726] border border-slate-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

          {/* Gender & Role Split Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gender */}
            <div className="space-y-1.5">
              <label className="text-slate-300 text-xs font-medium pl-1">
                Gender
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-[#0e1726] border border-slate-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none transition-all text-sm appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-slate-500">
                    Select your gender
                  </option>
                  <option value="male" className="bg-[#0e1726]">
                    Male
                  </option>
                  <option value="female" className="bg-[#0e1726]">
                    Female
                  </option>
                  <option value="other" className="bg-[#0e1726]">
                    Other
                  </option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-slate-300 text-xs font-medium pl-1">
                Role
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#0e1726] border border-slate-800 focus:border-emerald-500/50 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none transition-all text-sm appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-slate-500">
                    Select your role
                  </option>
                  <option value="patient" className="bg-[#0e1726]">
                    Patient
                  </option>
                  <option value="doctor" className="bg-[#0e1726]">
                    Doctor
                  </option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Password & Confirm Password Split Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-slate-300 text-xs font-medium pl-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full bg-[#0e1726] border rounded-xl py-3 pl-11 pr-10 text-white placeholder-slate-500 outline-none transition-all text-sm ${
                    showMatchError
                      ? 'border-red-500 focus:border-red-500/70'
                      : 'border-slate-800 focus:border-emerald-500/50'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Validation Error Messages for Mismatch */}
          <div className="pl-1">
            <AnimatePresence>
              {showMatchError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs font-medium flex items-center gap-1"
                >
                  <FiX className="w-3.5 h-3.5 shrink-0" />
                  Passwords do not match
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password Validation Guidance Indicators (Dynamic Colors) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-0.5">
            {/* Rule 1: Minimum 6 characters */}
            <div
              className={`flex items-center gap-1.5 text-xs transition-colors duration-250 ${
                passwordRules.hasMinLength
                  ? 'text-emerald-400'
                  : 'text-slate-500'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-all ${
                  passwordRules.hasMinLength
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                <FiCheck
                  className={passwordRules.hasMinLength ? 'stroke-[3]' : ''}
                />
              </div>
              Minimum 6 characters
            </div>

            {/* Rule 2: At least one uppercase letter */}
            <div
              className={`flex items-center gap-1.5 text-xs transition-colors duration-250 ${
                passwordRules.hasUppercase
                  ? 'text-emerald-400'
                  : 'text-slate-500'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-all ${
                  passwordRules.hasUppercase
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                <FiCheck
                  className={passwordRules.hasUppercase ? 'stroke-[3]' : ''}
                />
              </div>
              At least one uppercase letter
            </div>

            {/* Rule 3: At least one number */}
            <div
              className={`flex items-center gap-1.5 text-xs transition-colors duration-250 ${
                passwordRules.hasNumber ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-all ${
                  passwordRules.hasNumber
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                <FiCheck
                  className={passwordRules.hasNumber ? 'stroke-[3]' : ''}
                />
              </div>
              At least one number
            </div>
          </div>

          {/* Terms and Privacy Checkbox */}
          <div className="flex items-center gap-2.5 pt-2">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 rounded accent-emerald-500 bg-[#0e1726] border-slate-800 cursor-pointer"
              required
            />
            <label
              htmlFor="agreeTerms"
              className="text-xs text-slate-300 cursor-pointer select-none"
            >
              I agree to the{' '}
              <span className="text-emerald-400 hover:underline">
                Terms & Privacy Policy
              </span>
            </label>
          </div>

          {/* Action Button: Create Account */}
          <button
            type="submit"
            disabled={
              isLoading ||
              showMatchError ||
              !Object.values(passwordRules).every(Boolean)
            }
            className={`w-full font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-sm mt-2 ${
              isLoading ||
              showMatchError ||
              !Object.values(passwordRules).every(Boolean)
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-[#00c885] hover:bg-[#00b074] text-[#050b14] shadow-emerald-500/20'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-500 border-t-slate-300 rounded-full animate-spin" />
            ) : (
              <FiUserPlus className="w-4 h-4 stroke-[2.5]" />
            )}
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

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
          Sign up with Google
        </button>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-xs">
            Already have an account?{' '}
            <Link
              href={'/login'}
              className="text-emerald-400 font-medium hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
