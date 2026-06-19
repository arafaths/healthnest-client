'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQ = () => {
  // FAQ Data with accurate answers based on your project context
  const faqData = [
    {
      id: 1,
      question: 'How do I book an appointment?',
      answer:
        'Booking an appointment is simple! Just click on the "Book Appointment" button on the hero section, select your preferred medical specialty or doctor, choose an available time slot, and confirm your details.',
    },
    {
      id: 2,
      question: 'Is the consultation fee refundable?',
      answer:
        'Yes, full refunds are available for cancellations made at least 24 hours prior to the scheduled appointment time. Refunds generally process back to your account within 5-7 business days.',
    },
    {
      id: 3,
      question: 'Can I reschedule my appointment?',
      answer:
        'Absolutely. You can easily reschedule your appointment up to 2 hours before the session from your Dashboard. Go to the "Appointments" tab and click on the "Reschedule" option next to your active booking.',
    },
    {
      id: 4,
      question: 'Are my payments secure?',
      answer:
        'Yes, we take your data security very seriously. All payment processing is managed via fully encrypted SSL protocols and 100% secure payment gateways. HealthNest never stores your card credentials.',
    },
    {
      id: 5,
      question: 'How do online prescriptions work?',
      answer:
        'After your live digital consultation, the doctor will generate a certified digital prescription. It will instantly appear under the "Prescriptions" tab on your user dashboard, ready to view or download as a PDF.',
    },
  ];

  // State to track which FAQ accordion is open
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = id => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#020613] text-white py-16 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl space-y-8">
        {/* ================= HEADER TITLE ================= */}
        <div className="w-full text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* ================= FAQ LIST CONTAINER ================= */}
        <div className="w-full flex flex-col space-y-4">
          {faqData.map(item => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="w-full bg-[#091424]/20 border border-gray-900/90 rounded-2xl overflow-hidden transition-colors hover:border-gray-800"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none transition-all group"
                >
                  <span className="text-sm md:text-base font-medium text-gray-200 group-hover:text-white transition-colors tracking-wide">
                    {item.question}
                  </span>

                  {/* Plus / Minus Custom Icon Transition */}
                  <div
                    className={`text-gray-400 p-1.5 bg-[#091424]/60 rounded-xl border border-gray-900 group-hover:text-[#10b981] group-hover:border-emerald-500/20 transition-all ${isOpen ? 'rotate-180 text-[#10b981] border-emerald-500/20' : ''}`}
                  >
                    {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
                  </div>
                </button>

                {/* Smooth Height Transition with Framer Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 md:px-6 pb-6 pt-1 border-t border-gray-900/30 text-xs md:text-sm text-gray-400 leading-relaxed font-normal tracking-wide">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
