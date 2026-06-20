import ContactFormAndHours from '@/components/ContactUs/ContactFormAndHours';
import ContactInfoCards from '@/components/ContactUs/ContactInfoCards';
import HealthNestPage from '@/components/ContactUs/MedicalAssistanceCTA';
import SupportHero from '@/components/ContactUs/SupportHero';
import React from 'react';

const ContactUs = () => {
  return (
    <>
      <SupportHero />
      <ContactInfoCards />
      <ContactFormAndHours />
      <HealthNestPage />
    </>
  );
};

export default ContactUs;
