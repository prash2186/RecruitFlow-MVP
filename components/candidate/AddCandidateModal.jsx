"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCandidates } from "../../context/CandidateContext";
import { STAGES } from "../../lib/constants";

export default function AddCandidateModal({ open, onClose }) {
  const { addCandidate } = useCandidates();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    stage: "applied",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;
    
    addCandidate(formData);
    setFormData({ name: "", role: "", stage: "applied" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Add New Candidate
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 1 }}>
            <TextField
              label="Candidate Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              autoFocus
            />
            <TextField
              label="Job Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              select
              label="Initial Stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              fullWidth
            >
              {STAGES.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!formData.name || !formData.role}
            sx={{ fontWeight: 600, boxShadow: "none" }}
          >
            Create Candidate
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
