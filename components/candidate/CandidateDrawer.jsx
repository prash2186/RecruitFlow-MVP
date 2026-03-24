import React, { memo, useCallback } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Button,
  Step,
  Stepper,
  StepLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatDistanceToNow } from "date-fns";
import { useCandidates } from "../../context/CandidateContext";

import { STAGES, STAGE_IDS } from "../../lib/constants";

const CandidateDrawer = memo(function CandidateDrawer({
  candidate,
  open,
  onClose,
}) {
  const { fastTrackCandidate } = useCandidates();

  const currentStageIndex = candidate ? STAGE_IDS.indexOf(candidate.stage) : -1;

  const handleFastTrack = useCallback(() => {
    if (
      candidate &&
      currentStageIndex >= 0 &&
      currentStageIndex < STAGE_IDS.length - 1
    ) {
      fastTrackCandidate(candidate.id, STAGE_IDS[currentStageIndex + 1]);
    }
  }, [candidate, currentStageIndex, fastTrackCandidate]);

  if (!candidate) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 420 },
          p: 4,
          borderLeft: "1px solid",
          borderColor: "divider",
        },
        elevation: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Candidate Profile
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ bgcolor: "action.hover" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mr: 3,
            bgcolor: "primary.main",
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          {candidate.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            {candidate.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            {candidate.role}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
        Current Stage
      </Typography>
      <Stepper activeStep={currentStageIndex} alternativeLabel sx={{ mb: 4 }}>
        {STAGE_IDS.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  textTransform: "capitalize",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleFastTrack}
          disabled={currentStageIndex === STAGE_IDS.length - 1}
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: "none",
            "&:hover": { boxShadow: "none", bgcolor: "primary.dark" },
          }}
        >
          {currentStageIndex === STAGE_IDS.length - 1
            ? "Job Offered ✅"
            : `Move to ${STAGE_IDS[currentStageIndex + 1]}`}
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
        History Timeline
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {candidate.history
          .slice()
          .reverse()
          .map((event, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: index === 0 ? "primary.main" : "divider",
                    }}
                  />
                  {index < candidate.history.length - 1 && (
                    <Box
                      sx={{ width: 2, height: 32, bgcolor: "divider", mt: 0.5 }}
                    />
                  )}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: index === 0 ? 600 : 400, pt: 0 }}
                >
                  Moved to{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {event.stage}
                  </span>
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
              >
                {formatDistanceToNow(event.timestamp, { addSuffix: true })}
              </Typography>
            </Box>
          ))}
      </Box>
    </Drawer>
  );
});

export default CandidateDrawer;
