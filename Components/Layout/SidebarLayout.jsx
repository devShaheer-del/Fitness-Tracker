import React from 'react';
import SideBar from '../SideBar'; // Adjust path if needed
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div
        className="flex-grow-1 p-4 bg-light"
        style={{ marginLeft: '250px', overflowY: 'auto', maxHeight: '100vh' }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
