"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { loadCandidates, saveCandidates } from "../lib/storage";

const CandidateContext = createContext(undefined);

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCandidates(loadCandidates());
    setMounted(true);
  }, []);

  const updateCandidateStage = useCallback((id, newStage) => {
    setCandidates((prev) => {
      const updated = prev.map((c) => {
        if (c.id === id && c.stage !== newStage) {
          return {
            ...c,
            stage: newStage,
            history: [...c.history, { stage: newStage, timestamp: Date.now() }],
          };
        }
        return c;
      });
      saveCandidates(updated);
      return updated;
    });
  }, []);

  const addCandidate = useCallback((candidateData) => {
    const newCandidate = {
      ...candidateData,
      id: Math.random().toString(36).substr(2, 9),
      history: [{ stage: candidateData.stage, timestamp: Date.now() }],
    };

    setCandidates((prev) => {
      const updated = [...prev, newCandidate];
      saveCandidates(updated);
      return updated;
    });
  }, []);

  const fastTrackCandidate = useCallback(
    (id, newStage) => {
      updateCandidateStage(id, newStage);
    },
    [updateCandidateStage],
  );

  const value = useMemo(
    () => ({
      candidates,
      updateCandidateStage,
      fastTrackCandidate,
      addCandidate,
    }),
    [candidates, updateCandidateStage, fastTrackCandidate, addCandidate],
  );

  if (!mounted) return null; // Avoid hydration mismatch on initial render

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => {
  const context = useContext(CandidateContext);
  if (!context)
    throw new Error("useCandidates must be used within CandidateProvider");
  return context;
};
