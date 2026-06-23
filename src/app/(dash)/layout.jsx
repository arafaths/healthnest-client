import Nav from '@/components/Dashborde/Nav';
import Sidebar from '@/components/Dashborde/sidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Nav/>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 pl-0 lg:pl-64 overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;