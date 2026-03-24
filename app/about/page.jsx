"use client";

import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import {
  RocketLaunch as RocketIcon,
  Group as GroupIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";

const FEATURES = [
  {
    title: "Intuitive Kanban",
    description:
      "Manage your hiring pipeline with a sleek, drag-and-drop interface designed for efficiency.",
    icon: <RocketIcon color="primary" />,
  },
  {
    title: "Scalable Performance",
    description:
      "Built with modern optimizations to handle thousands of candidates without slowing down.",
    icon: <SpeedIcon color="primary" />,
  },
  {
    title: "Team Collaboration",
    description:
      "Seamlessly move candidates through stages and track history in real-time.",
    icon: <GroupIcon color="primary" />,
  },
  {
    title: "Secure Data",
    description:
      "Your recruitment data is persisted locally and managed with privacy-first principles.",
    icon: <SecurityIcon color="primary" />,
  },
];

export default function AboutPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3 } }}
    >
      <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: 2,
            letterSpacing: "-1px",
            fontSize: { xs: "2.5rem", md: "3.75rem" },
          }}
        >
          About{" "}
          <span style={{ color: "var(--mui-palette-primary-main)" }}>
            RecruitFlow
          </span>
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "text.secondary",
            maxWidth: 700,
            mx: "auto",
            fontWeight: 400,
            fontSize: { xs: "1.1rem", md: "1.5rem" },
          }}
        >
          The modern Applicant Tracking System built for speed, simplicity, and
          superior candidate experiences.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: { xs: 6, md: 10 } }}>
        {FEATURES.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                transition: "transform 0.2s",
                "&:hover": { transform: { md: "translateY(-8px)" } },
              }}
              elevation={0}
            >
              <Avatar sx={{ bgcolor: "action.hover", mb: 2 }}>
                {feature.icon}
              </Avatar>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 1, fontSize: "1.1rem" }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: { xs: 4, md: 6 },
          bgcolor: "primary.main",
          color: "primary.contrastText",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "1.75rem", md: "2.125rem" },
          }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: 800,
            mx: "auto",
            fontWeight: 400,
            opacity: 0.9,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          To empower recruitment teams with high-performance tools that turn the
          chaos of volume hiring into a streamlined, joyful experience for both
          recruiters and candidates.
        </Typography>
      </Paper>

      <Box sx={{ mt: { xs: 6, md: 10 }, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          RecruitFlow MVP v1.0 • Built with Next.js & Material UI
        </Typography>
      </Box>
    </Container>
  );
}
