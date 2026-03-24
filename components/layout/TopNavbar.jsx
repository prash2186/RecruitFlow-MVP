"use client";

import React, { useContext, memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeContext } from "./ThemeRegistry";

const NAV_ITEMS = [
  { label: "Pipeline", path: "/" },
  { label: "About", path: "/about" },
];

const TopNavbar = memo(function TopNavbar() {
  const { toggleColorMode, mode } = useContext(ThemeContext);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = (
    <Box sx={{ display: "flex", gap: { xs: 0, md: 1 }, flexDirection: { xs: "column", md: "row" }, p: { xs: 2, md: 0 } }}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Button
            key={item.path}
            component={Link}
            href={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: isActive ? "primary.main" : "text.secondary",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.9rem",
              px: 2,
              justifyContent: { xs: "flex-start", md: "center" },
              "&:hover": {
                color: "primary.main",
                bgcolor: "action.hover",
              },
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "background.paper",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <DashboardIcon sx={{ color: "primary.main", mr: 1.5 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}
            >
              RecruitFlow
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 4 }}>
            {navLinks}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
            <IconButton onClick={toggleColorMode} color="inherit" size="small">
              {mode === "dark" ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 32,
                height: 32,
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              PV
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <DashboardIcon sx={{ color: "primary.main", mr: 1.5 }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            RecruitFlow
          </Typography>
        </Box>
        {navLinks}
      </Drawer>
    </>
  );
});

export default TopNavbar;
