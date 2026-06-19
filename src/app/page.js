import HeroBanner from '@/components/Home/HeroBanner';
import MedicalSpecializations from '@/components/Home/MedicalSpecializations';
import SuccessStories from '@/components/Home/SuccessStories';
import React from 'react';

const page = () => {
  return (
    <>
      <HeroBanner />
      <MedicalSpecializations />
      <SuccessStories/>
    </>
  );
};

export default page;