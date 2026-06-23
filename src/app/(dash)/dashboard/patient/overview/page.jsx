import StatsGrid from '@/components/Dashborde/Patient/Overview/StatsGrid';
import StayHealthyBanner from '@/components/Dashborde/Patient/Overview/StayHealthyBanner';
import UpcomingAppointments from '@/components/Dashborde/Patient/Overview/UpcomingAppointments';
import React from 'react';

const page = () => {
  return (
    <>
      <StatsGrid />
      <UpcomingAppointments />
      <StayHealthyBanner />
    </>
  );
};

export default page;
