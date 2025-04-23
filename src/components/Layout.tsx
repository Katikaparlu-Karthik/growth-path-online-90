
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex-1">
      <Outlet />
    </div>
  );
};

export default Layout;
