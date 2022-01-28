import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
