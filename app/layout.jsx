import ThemeRegistry from "../components/layout/ThemeRegistry";
import TopNavbar from "../components/layout/TopNavbar";
import { CandidateProvider } from "../context/CandidateContext";
import { Box } from "@mui/material";
import "./globals.css";

export const metadata = {
  title: "RecruitFlow - ATS Dashboard",
  description: "A premium Kanban-style Applicant Tracking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <CandidateProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "background.default",
              }}
            >
              <TopNavbar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "calc(100vh - 64px)",
                  overflow: "hidden",
                }}
              >
                {children}
              </Box>
            </Box>
          </CandidateProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
