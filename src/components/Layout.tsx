
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="p-4 flex-1">
      <Outlet />
    </div>
  );
};

export default Layout;
