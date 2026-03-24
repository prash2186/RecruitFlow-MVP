import React, { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useCandidates } from "../../context/CandidateContext";

const CandidateCard = memo(
  function CandidateCard({ candidate, onClick }) {
    const { updateCandidateStage } = useCandidates();
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: candidate.id });

    const handleFastTrack = React.useCallback(
      (e) => {
        e.stopPropagation();
        if (candidate.stage !== "interview" && candidate.stage !== "offer") {
          updateCandidateStage(candidate.id, "interview");
        }
      },
      [candidate.id, candidate.stage, updateCandidateStage],
    );

    const onKeyDown = React.useCallback(
      (e) => {
        if (e.key.toLowerCase() === "f") {
          handleFastTrack(e);
        }
      },
      [handleFastTrack],
    );

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 100 : "auto",
      opacity: isDragging ? 0.3 : 1,
    };

    const isFastTrackable =
      candidate.stage !== "interview" && candidate.stage !== "offer";

    return (
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onKeyDown={onKeyDown}
        tabIndex={0}
        sx={{
          mb: 1,
          mt: 1,
          outline: "none",
          "&:focus > div > .MuiCard-root": {
            borderColor: "primary.main",
            boxShadow: 4,
          },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            onClick={onClick}
            data-testid={`candidate-card-${candidate.id}`}
            sx={{
              cursor: "grab",
              "&:active": { cursor: "grabbing" },
              boxShadow: 1,
              "&:hover": {
                boxShadow: 4,
                borderColor: "primary.main",
                "& .fast-track-btn": { opacity: 1 },
              },
              border: "1px solid transparent",
              transition: "border-color 0.2s, box-shadow 0.2s",
              position: "relative",
            }}
          >
            <CardContent sx={{ p: "16px !important" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    mr: 2,
                    bgcolor: "primary.light",
                    color: "primary.dark",
                    fontWeight: 600,
                  }}
                >
                  {candidate.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, lineHeight: 1.2 }}
                  >
                    {candidate.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 0.5,
                      color: "text.secondary",
                    }}
                  >
                    <WorkOutlineIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      {candidate.role}
                    </Typography>
                  </Box>
                </Box>

                {isFastTrackable && (
                  <Tooltip title="Fast-Track to Interview (f)" arrow>
                    <IconButton
                      className="fast-track-btn"
                      size="small"
                      onClick={handleFastTrack}
                      sx={{
                        opacity: { xs: 1, md: 0 },
                        transition: "opacity 0.2s",
                        color: "warning.main",
                        mt: -0.5,
                        mr: -0.5,
                      }}
                    >
                      <ElectricBoltIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Chip
                  label={candidate.stage}
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "0.7rem",
                    height: 20,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    );
  },
  (prevProps, nextProps) => prevProps.candidate === nextProps.candidate,
);

export default CandidateCard;
