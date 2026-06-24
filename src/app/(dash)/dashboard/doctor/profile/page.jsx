'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  User,
  Calendar,
  Mail,
  Phone,
  Pencil,
  Save,
  X,
  Plus,
  CheckCircle2,
  ChevronDown,
  Image as ImageIcon,
  Clock,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function DynamicDoctorProfile() {
  // 1. Profile Information State
  const [profile, setProfile] = useState({
    doctorName: '',
    specialty: '',
    qualifications: '',
    experience: '',
    hospitalName: '',
    fee: '',
    aboutMe: '',
    email: '',
    phone: '',
    profileImage: '',
  });

  // 2. Availability States
  const [availableDays, setAvailableDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  // 3. UI Control States
  const [newSlot, setNewSlot] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctorId, setDoctorId] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('');

  // State to track if image fails to load or is invalid
  const [imageError, setImageError] = useState(false);

  // 4. User Session
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Helper to generate the first letter of the doctor's name
  const getInitial = name => {
    if (!name) return 'D';
    return name.trim().charAt(0).toUpperCase();
  };

  // ================= FETCH DOCTOR DATA FROM MONGODB (GET) =================
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/doctors/${user?.email}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch doctor profile');
        }

        const data = await response.json();
        setDoctorId(data._id);
        setVerificationStatus(data.verificationStatus);

        setProfile({
          doctorName: data.doctorName || '',
          specialty: data.specialization || '',
          qualifications: data.qualifications || '',
          experience: data.experience || '',
          hospitalName: data.hospitalName || '',
          fee: data.consultationFee || '',
          aboutMe: data.aboutMe || '',
          email: data.email || '',
          phone: data.phone || '',
          profileImage: data.profileImage || '',
        });

        // Reset image error state whenever new image is loaded
        setImageError(false);

        setAvailableDays(data.availableDays || []);
        setTimeSlots(data.availableSlots || []);
      } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchProfileData();
    }
  }, [user]);

  // Handle image input change and instantly reset error tracker
  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (name === 'profileImage') {
      setImageError(false);
    }
  };

  // Toggle available days selection
  const toggleDay = day => {
    setAvailableDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };

  // Remove specific time slot
  const removeSlot = indexToRemove => {
    setTimeSlots(timeSlots.filter((_, index) => index !== indexToRemove));
  };

  // Add new time slot to array
  const handleAddSlot = e => {
    e.preventDefault();
    if (newSlot.trim()) {
      setTimeSlots([...timeSlots, newSlot.trim()]);
      setNewSlot('');
      setIsAdding(false);
    }
  };

  // ================= UPDATE DOCTOR DATA IN MONGODB (PATCH) =================
  const handleSubmit = async e => {
    e.preventDefault();

    const updatedData = {
      ...profile,
      availableDays,
      availableSlots: timeSlots,
    };

    try {
      const res = await fetch(`http://localhost:5000/doctors/${doctorId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating data in MongoDB:', error);
      toast.error('An error occurred while saving.');
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#030712] flex items-center justify-center text-emerald-400 font-bold text-sm tracking-wide">
        Loading Profile Data...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-8 text-slate-300 select-none">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto flex flex-col gap-6"
      >
        {/* ================= HEADER PROFILE HERO ================= */}
        <div className="w-full bg-[#050b14] border border-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Dynamic Avatar Container */}
            {/* Fixed Avatar Container */}
            <div className="relative w-28 h-28 shrink-0 select-none">
              {/* Inner wrapper for image/initial to keep absolute layer scoping separate */}
              <div className="w-full h-full border-2 border-slate-800 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
                {profile.profileImage && !imageError ? (
                  <Image
                    src={profile.profileImage}
                    alt={profile.doctorName || 'Doctor'}
                    fill
                    className="object-cover rounded-full"
                    unoptimized
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-3xl font-extrabold text-emerald-400 tracking-wider">
                    {getInitial(profile.doctorName)}
                  </div>
                )}
              </div>

              {/* Verification Badge shifted outside the image wrapper but inside the relative container */}
              <div className="absolute bottom-1 right-1 bg-[#050b14] rounded-full p-0.5 z-20 shadow-md">
                {verificationStatus === 'verified' ? (
                  <CheckCircle2
                    size={22}
                    className="text-emerald-500"
                    fill="currentColor"
                    stroke="#050b14"
                  />
                ) : (
                  <Clock
                    size={22}
                    className="text-amber-500 animate-pulse"
                    fill="currentColor"
                    stroke="#050b14"
                    strokeWidth={2.5}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {verificationStatus === 'verified' ? (
                <span className="self-center sm:self-start bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <CheckCircle2 size={12} /> Verified Doctor
                </span>
              ) : (
                <span className="self-center sm:self-start bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 animate-pulse">
                  <Clock size={12} /> Pending Approval
                </span>
              )}

              <h1 className="text-2xl font-bold text-white tracking-wide mt-1">
                {profile.doctorName || 'N/A'}
              </h1>
              <p className="text-sm font-semibold text-emerald-400">
                {profile.specialty}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Mail size={13} /> {profile.email || 'No Email Provided'}
                </span>
                {profile.phone && (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone size={13} /> {profile.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= TWO COLUMN BODY GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: Professional Information Form */}
          <div className="lg:col-span-2 bg-[#050b14] border border-slate-900 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-900 pb-3">
              <User size={18} className="text-emerald-400" />
              <h2>Professional Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="doctorName"
                  value={profile.doctorName}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full"
                  required
                />
              </div>

              {/* Specialization Dropdown */}
              <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1 relative">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Specialization
                </label>
                <select
                  name="specialty"
                  value={profile.specialty}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full appearance-none pr-6 cursor-pointer"
                >
                  <option value="" disabled className="bg-[#050b14]">
                    Select specialty
                  </option>
                  <option value="Cardiologist" className="bg-[#050b14]">
                    Cardiologist
                  </option>
                  <option value="Neurologist" className="bg-[#050b14]">
                    Neurologist
                  </option>
                  <option value="Orthopedic" className="bg-[#050b14]">
                    Orthopedic
                  </option>
                  <option value="Dermatologist" className="bg-[#050b14]">
                    Dermatologist
                  </option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 bottom-4 text-slate-400 pointer-events-none"
                />
              </div>

              {/* Qualifications */}
              <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Qualifications
                </label>
                <input
                  type="text"
                  name="qualifications"
                  value={profile.qualifications}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full"
                />
              </div>

              {/* Experience */}
              <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="experience"
                  value={profile.experience}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full"
                />
              </div>

              {/* Hospital Name */}
              <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Hospital Name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={profile.hospitalName}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full"
                />
              </div>

              {/* Consultation Fee */}
              <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Consultation Fee (₹)
                </label>
                <input
                  type="number"
                  name="fee"
                  value={profile.fee}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full"
                />
              </div>

              {/* Email Input */}
              <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full"
                />
              </div>

              {/* Phone Input */}
              <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full"
                />
              </div>
            </div>

            {/* PROFILE IMAGE URL INPUT */}
            <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1 relative">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                <ImageIcon size={10} /> Profile Image URL
              </label>
              <input
                type="text"
                name="profileImage"
                placeholder="https://example.com/image.jpg"
                value={profile.profileImage}
                onChange={handleInputChange}
                className="bg-transparent text-sm text-white font-semibold focus:outline-none w-full pr-4"
              />
            </div>

            {/* About Me Textarea */}
            <div className="bg-[#0a1220] border border-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                About Me
              </label>
              <textarea
                rows={4}
                name="aboutMe"
                value={profile.aboutMe}
                onChange={handleInputChange}
                className="bg-transparent text-sm text-slate-300 leading-relaxed focus:outline-none w-full resize-none mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99]"
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>

          {/* RIGHT COLUMN: Availability Management Panel */}
          <div className="bg-[#050b14] border border-slate-900 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-900 pb-3">
              <Calendar size={18} className="text-emerald-400" />
              <h2>Availability</h2>
            </div>

            {/* Available Days Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400">
                Available Days
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                  const isActive = availableDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                          : 'bg-[#0a1220] border border-slate-800/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots Component */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400">
                Available Time Slots
              </label>
              <div className="flex flex-col gap-2">
                {timeSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0a1220] border border-slate-800/60 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-semibold text-white group hover:border-slate-700 transition-colors"
                  >
                    <span>{slot}</span>
                    <button
                      type="button"
                      onClick={() => removeSlot(idx)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Inline input form to add slot */}
              {isAdding ? (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="e.g., 04:00 PM - 06:00 PM"
                    value={newSlot}
                    onChange={e => setNewSlot(e.target.value)}
                    autoFocus
                    className="flex-1 bg-[#0a1220] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSlot}
                    className="bg-emerald-500 text-slate-950 px-3 rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="bg-slate-900 border border-slate-800 text-slate-400 px-2 rounded-xl"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
                  className="w-full py-2.5 mt-1 border border-dashed border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-semibold text-xs rounded-xl inline-flex items-center justify-center gap-1.5 bg-[#0a1220]/20 transition-all"
                >
                  <Plus size={14} />
                  <span>Add Time Slot</span>
                </button>
              )}
            </div>

            {/* Current Status Indicator */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400">
                Status
              </label>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-transparent border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 font-bold text-xs rounded-xl inline-flex items-center justify-center gap-1.5 bg-emerald-500/5 transition-all"
            >
              <Calendar size={14} />
              <span>Update Availability</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
