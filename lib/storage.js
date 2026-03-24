const STORAGE_KEY = 'recruitflow_candidates';

const defaultCandidates = [
  { id: '1', name: 'Alice Cooper', role: 'Frontend Engineer', stage: 'applied', history: [{ stage: 'applied', timestamp: Date.now() }] },
  { id: '2', name: 'Bob Smith', role: 'Backend Engineer', stage: 'screening', history: [{ stage: 'applied', timestamp: Date.now() - 100000 }, { stage: 'screening', timestamp: Date.now() }] },
  { id: '3', name: 'Charlie Davis', role: 'Product Manager', stage: 'interview', history: [{ stage: 'applied', timestamp: Date.now() - 200000 }, { stage: 'interview', timestamp: Date.now() }] },
  { id: '4', name: 'Diana Prince', role: 'UX Designer', stage: 'offer', history: [{ stage: 'applied', timestamp: Date.now() - 300000 }, { stage: 'offer', timestamp: Date.now() }] },
  { id: '5', name: 'Evan Wright', role: 'DevOps Engineer', stage: 'applied', history: [{ stage: 'applied', timestamp: Date.now() }] },
];

export const loadCandidates = () => {
  if (typeof window === 'undefined') return defaultCandidates;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveCandidates(defaultCandidates);
    return defaultCandidates;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultCandidates;
  }
};

export const saveCandidates = (candidates) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
  }
};
