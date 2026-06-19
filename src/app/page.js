import CTABanner from '@/components/Home/CTABanner';
import FAQ from '@/components/Home/FAQ';
import HeroBanner from '@/components/Home/HeroBanner';
import MedicalSpecializations from '@/components/Home/MedicalSpecializations';
import SuccessStories from '@/components/Home/SuccessStories';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import React from 'react';

const page = () => {
  return (
    <>
      <HeroBanner />
      <MedicalSpecializations />
      <SuccessStories />
      <WhyChooseUs />
      <FAQ />
      <CTABanner />
    </>
  );
};

export default page;
