"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import dynamic from "next/dynamic";
import { Box, Typography, Button } from "@mui/material";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useCandidates } from "../../context/CandidateContext";
import BoardColumn from "./BoardColumn";
import CandidateCard from "../candidate/CandidateCard";

// Dynamically import the drawer since it's not immediately visible
const CandidateDrawer = dynamic(() => import("../candidate/CandidateDrawer"), {
  ssr: false,
});
const AddCandidateModal = dynamic(() => import("../candidate/AddCandidateModal"), {
  ssr: false,
});

import { STAGES } from "../../lib/constants";

const KanbanBoard = memo(function KanbanBoard() {
  const { candidates, updateCandidateStage } = useCandidates();
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback(
    (event) => {
      const { active } = event;
      const candidate = candidates.find((c) => c.id === active.id);
      if (candidate) setActiveCandidate(candidate);
    },
    [candidates],
  );

  const handleDragEnd = useCallback(
    (event) => {
      setActiveCandidate(null);
      const { active, over } = event;
      if (!over) return;

      const candidateId = active.id;
      const overId = over.id;
      let newStage;

      if (STAGES.some((s) => s.id === overId)) {
        newStage = overId;
      } else {
        const overCandidate = candidates.find((c) => c.id === overId);
        if (overCandidate) newStage = overCandidate.stage;
      }

      if (newStage) {
        updateCandidateStage(candidateId, newStage);
      }
    },
    [candidates, updateCandidateStage],
  );

  const handleCardClick = useCallback(
    (candidate) => {
      // Only open the drawer if we're not dragging
      if (!activeCandidate) {
        setSelectedCandidate(candidate);
      }
    },
    [activeCandidate],
  );

  // Memoize column data
  const columnsData = useMemo(() => {
    return STAGES.map((stage) => ({
      ...stage,
      filteredCandidates: candidates.filter((c) => c.stage === stage.id),
    }));
  }, [candidates]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box 
        sx={{ 
          mb: 4, 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between", 
          alignItems: { xs: "flex-start", sm: "flex-start" },
          gap: 2
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, letterSpacing: "-1px" }}
          >
            Recruitment Pipeline
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.95rem" }}
          >
            Manage and track candidates across the hiring stages.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={() => setIsAddModalOpen(true)}
          fullWidth={false}
          sx={{ 
            fontWeight: 700, 
            boxShadow: "none", 
            borderRadius: 2.5,
            px: 3,
            py: 1,
            width: { xs: "100%", sm: "auto" }
          }}
        >
          Add Candidate
        </Button>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowX: "auto",
          overflowY: "hidden",
          pb: 2,
          mr: -3,
          pr: 3,
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              height: "100%",
              minWidth: "max-content",
            }}
          >
            {columnsData.map((stage) => (
              <BoardColumn
                key={stage.id}
                stage={stage.id}
                title={stage.title}
                candidates={stage.filteredCandidates}
                onCardClick={handleCardClick}
              />
            ))}
          </Box>

          <DragOverlay>
            {activeCandidate ? (
              <CandidateCard candidate={activeCandidate} onClick={() => {}} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </Box>

      <CandidateDrawer
        open={Boolean(selectedCandidate)}
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      <AddCandidateModal 
        open={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </Box>
  );
});

export default KanbanBoard;
