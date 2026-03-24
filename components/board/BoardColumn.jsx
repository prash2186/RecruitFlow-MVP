import React, { memo, useState, useEffect, useRef } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CandidateCard from "../candidate/CandidateCard";

const ITEMS_PER_PAGE = 20;

const BoardColumn = memo(
  function BoardColumn({ stage, title, candidates, onCardClick }) {
    const { setNodeRef, isOver } = useDroppable({ id: stage });
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const sentinelRef = useRef(null);

    // Reset visible count when candidates change (e.g. stage change or initial load)
    useEffect(() => {
      setVisibleCount(ITEMS_PER_PAGE);
    }, [candidates.length]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && visibleCount < candidates.length) {
            setVisibleCount((prev) =>
              Math.min(prev + ITEMS_PER_PAGE, candidates.length),
            );
          }
        },
        { threshold: 1.0 },
      );

      if (sentinelRef.current) {
        observer.observe(sentinelRef.current);
      }

      return () => observer.disconnect();
    }, [visibleCount, candidates.length]);

    const visibleCandidates = candidates.slice(0, visibleCount);

    return (
      <Paper
        sx={{
          width: { xs: 280, sm: 320 },
          minWidth: { xs: 280, sm: 320 },
          bgcolor: isOver ? "action.hover" : "background.default",
          p: 2,
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          maxHeight: "100%",
          transition: "background-color 0.2s",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            px: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              bgcolor: "action.selected",
              px: 1,
              py: 0.25,
              borderRadius: 2,
            }}
          >
            {candidates.length}
          </Typography>
        </Box>

        {/* Droppable area containing sortable context */}
        <Box
          ref={setNodeRef}
          sx={{
            flexGrow: 1,
            minHeight: 150,
            overflowY: "auto",
            px: 0.5,
            mx: -0.5,
          }}
        >
          <SortableContext
            items={visibleCandidates.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {visibleCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onClick={() => onCardClick(candidate)}
              />
            ))}
          </SortableContext>

          {visibleCount < candidates.length && (
            <Box
              ref={sentinelRef}
              sx={{ py: 2, display: "flex", justifyContent: "center" }}
            >
              <CircularProgress size={20} />
            </Box>
          )}

          {candidates.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                opacity: 0.5,
              }}
            >
              <Typography variant="body2">No candidates</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.stage === nextProps.stage &&
      prevProps.title === nextProps.title &&
      prevProps.candidates === nextProps.candidates &&
      prevProps.onCardClick === nextProps.onCardClick
    );
  },
);

export default BoardColumn;
