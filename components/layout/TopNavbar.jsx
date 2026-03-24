'use client';

import React, { useContext, memo } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ThemeContext } from './ThemeRegistry';

const TopNavbar = memo(function TopNavbar() {
  const { toggleColorMode, mode } = useContext(ThemeContext);

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <DashboardIcon sx={{ color: 'primary.main', mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '-0.5px' }}>
          RecruitFlow
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={toggleColorMode} color="inherit" size="small">
            {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
          </IconButton>
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>HR</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default TopNavbar;
