'jsx';
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Star,
  Calendar,
  Edit3,
  Trash2,
  X,
  ChevronDown,
} from 'lucide-react';
import NOReviews from '@/components/Dashborde/Patient/reviews/NOReviews';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import ProjectLoader from '@/components/shared/ProjectLoader';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal Form States
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  // user
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const fetchReviews = async () => {
    if (!user?.email) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}reviews/patient/${user?.email}`,
    );

    const data = await res.json();

    setReviews(data);
  };

  useEffect(() => {
    const fetchReviewsData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}reviews/patient/${user.email}`,
        );

        const data = await res.json();

        setReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsData();
  }, [user]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}patient/upcoming-appointments/${user?.email}`,
    )
      .then(res => res.json())
      .then(data => setDoctorsList(data));
  }, [user]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setSelectedDoctor('');
    setRating(0);
    setReviewMessage('');

    setIsEditing(false);
    setEditingReviewId(null);
  };

  const handleSubmitReview = async e => {
    e.preventDefault();

    if (isEditing) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}reviews/${editingReviewId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rating,
              comment: reviewMessage,
            }),
          },
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
          toast.success('Review updated successfully');

          fetchReviews();

          handleCloseModal();

          setIsEditing(false);
          setEditingReviewId(null);
        }
      } catch (error) {
        console.log(error);
      }

      return;
    }

    if (!selectedDoctor || rating === 0 || !reviewMessage) return;

    const doctor = doctorsList.find(item => item.doctorName === selectedDoctor);

    const review = {
      doctorId: doctor.doctorId,
      doctorName: doctor.doctorName,
      doctorImage: doctor.doctorImage,
      specialization: doctor.specialty,

      patientEmail: user.email,
      patientName: user.name,

      rating,
      comment: reviewMessage,
    };

    console.log(review);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success('Review added successfully');

        fetchReviews();

        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteReview = async id => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this review?',
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}reviews/${id}`,
        {
          method: 'DELETE',
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success('Review deleted successfully');

        // আবার data load করো
        fetchReviews();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete review');
    }
  };

  const handleEditReview = review => {
    setIsEditing(true);
    setEditingReviewId(review._id);

    setSelectedDoctor(review.doctorName);
    setRating(review.rating);
    setReviewMessage(review.comment);

    setIsModalOpen(true);
  };

  if (loading) {
    return <ProjectLoader />;
  }

  return (
    <div className="w-full bg-[#030712] min-h-screen p-4 md:p-8 text-slate-300 font-sans antialiased relative">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* ================= TOP HEADER BAR ================= */}
        <div className="flex items-center justify-between gap-4 pb-2">
          <h1 className="text-lg font-bold text-white tracking-wide">
            My Reviews
          </h1>
          {reviews.length > 0 && (
            <button
              onClick={handleOpenModal}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow-lg shadow-emerald-950/10 transition-all active:scale-[0.98]"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add New Review</span>
            </button>
          )}
        </div>

        {/* ================= CONDITIONAL RENDER ================= */}
        {reviews.length === 0 ? (
          <NOReviews handleOpenModal={handleOpenModal} />
        ) : (
          /* 📊 DYNAMIC REVIEWS LIST */
          <div className="flex flex-col gap-4">
            {reviews.map(review => (
              <div
                key={review._id}
                className="w-full bg-[#050b14] border border-slate-900/90 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg hover:border-slate-800/60 transition-all group"
              >
                {/* Profile and Meta Box */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                    <Image
                      src={review.doctorImage || '/fallback-avatar.png'}
                      alt={review.doctorName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                        {review.doctorName}
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-500/90 mt-0.5">
                        {review.specialization}
                      </span>
                    </div>

                    {/* Star Row */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < review.rating ? '#f59e0b' : 'transparent'}
                          className={
                            i < review.rating
                              ? 'text-amber-500'
                              : 'text-slate-800'
                          }
                        />
                      ))}
                    </div>

                    {/* Comment Body */}
                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mt-1 font-medium">
                      {review.comment}
                    </p>

                    {/* Date Block */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold mt-1">
                      <Calendar size={12} className="text-slate-600" />
                      <span>
                        {new Date(review.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Trigger Wrapper */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-900/60">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="px-3 py-1.5 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold inline-flex items-center gap-1 transition-all"
                  >
                    <Edit3 size={12} />
                    <span>Edit Review</span>
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="px-3 py-1.5 rounded-xl border border-rose-500/10 hover:border-rose-500/30 bg-rose-500/5 text-rose-500 text-xs font-bold inline-flex items-center gap-1 transition-all"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= 🟩 INTERACTIVE ADD REVIEW MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#050b14] border border-slate-900 rounded-2xl p-6 shadow-2xl z-10 text-slate-300"
            >
              {/* Modal Cross close */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <h2 className="text-base font-bold text-white tracking-wide mb-5">
                {isEditing ? 'Edit Review' : 'Add Review'}
              </h2>

              <form
                onSubmit={handleSubmitReview}
                className="flex flex-col gap-4.5"
              >
                {/* 1. Select Doctor Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400">
                    Select Doctor
                  </label>
                  <div className="relative">
                    <select
                      disabled={isEditing}
                      required
                      value={selectedDoctor}
                      onChange={e => setSelectedDoctor(e.target.value)}
                      className="w-full bg-[#0a1220] border border-slate-800/80 rounded-xl px-3.5 py-3 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="">Select Doctor</option>
                      {doctorsList.map((doc, idx) => (
                        <option
                          key={`${doc.doctorId}-${idx}`}
                          value={doc.doctorName}
                          className="bg-[#050b14]"
                        >
                          {doc.doctorName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>

                {/* 2. Interactive Star Rating */}
                <div className="flex flex-col gap-1.5 my-1">
                  <label className="text-xs font-bold text-slate-400">
                    Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-slate-800 transition-transform duration-100 hover:scale-110 focus:outline-none"
                        >
                          <Star
                            size={22}
                            fill={
                              (hoverRating || rating) >= starValue
                                ? '#10b981'
                                : 'transparent'
                            }
                            className={
                              (hoverRating || rating) >= starValue
                                ? 'text-emerald-500'
                                : 'text-emerald-500/30'
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    Click on a star to rate
                  </span>
                </div>

                {/* 3. Review Text Area */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400">
                    Review Message
                  </label>
                  <div className="relative">
                    <textarea
                      required
                      maxLength={500}
                      rows={5}
                      value={reviewMessage}
                      onChange={e => setReviewMessage(e.target.value)}
                      placeholder="Write your review here..."
                      className="w-full bg-[#0a1220] border border-slate-800/80 rounded-xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 resize-none leading-relaxed"
                    />
                    {/* Character Count Stamp */}
                    <span className="absolute bottom-3 right-3 text-[10px] text-slate-600 font-mono">
                      {reviewMessage.length}/500
                    </span>
                  </div>
                </div>

                {/* 4. Action CTA Triggers */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-xs font-bold text-slate-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1 shadow-md transition-all active:scale-[0.98]"
                  >
                    {isEditing ? 'Update Review' : 'Submit Review'}
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
