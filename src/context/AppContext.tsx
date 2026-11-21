import React, { createContext, useContext, useState } from 'react';
import type {
  B2BApplication,
  DirectoryFilters,
  MatchAnswers,
  NeedTag,
  SimulatedBooking,
  ViewType,
} from '../types';
import { psychologists } from '../data/psychologists';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DEFAULT_FILTERS: DirectoryFilters = {
  search: '',
  modality: 'Todas',
  commune: 'Todas',
  tag: 'Todos',
  maxPrice: null,
  presetLabel: null,
};

interface AppContextValue {
  activeView: ViewType;
  navigateTo: (view: ViewType) => void;
  matchAnswers: MatchAnswers | null;
  applyMatchAnswers: (answers: MatchAnswers) => void;
  clearMatch: () => void;
  directoryFilters: DirectoryFilters;
  setDirectoryFilters: React.Dispatch<React.SetStateAction<DirectoryFilters>>;
  resetDirectoryFilters: () => void;
  moodPresetTags: NeedTag[];
  applyMoodPreset: (tags: NeedTag[], label: string) => void;
  selectedPsychologistId: string | null;
  modalInitialFocus: 'profile' | 'booking';
  openPsychologist: (id: string, focus?: 'profile' | 'booking') => void;
  closePsychologist: () => void;
  bookings: SimulatedBooking[];
  addBooking: (booking: SimulatedBooking) => void;
  cancelBooking: (id: string) => void;
  isBookingsDrawerOpen: boolean;
  setIsBookingsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  b2bApplications: B2BApplication[];
  addB2BApplication: (app: B2BApplication) => void;
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<ViewType>('landing');
  const [matchAnswers, setMatchAnswers] = useState<MatchAnswers | null>(null);
  const [directoryFilters, setDirectoryFilters] = useState<DirectoryFilters>(DEFAULT_FILTERS);
  const [moodPresetTags, setMoodPresetTags] = useState<NeedTag[]>([]);
  const [selectedPsychologistId, setSelectedPsychologistId] = useState<string | null>(null);
  const [modalInitialFocus, setModalInitialFocus] = useState<'profile' | 'booking'>('profile');
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [bookings, setBookings] = useLocalStorage<SimulatedBooking[]>('psicomatch_bookings_v1', []);
  const [b2bApplications, setB2bApplications] = useLocalStorage<B2BApplication[]>(
    'psicomatch_b2b_apps_v1',
    []
  );

  const navigateTo = (view: ViewType) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const applyMatchAnswers = (answers: MatchAnswers) => {
    setMatchAnswers(answers);
    setMoodPresetTags([]);

    const mod = answers.modality?.mappedModality;
    const coms = answers.modality?.mappedCommunes ?? [];
    const maxBudget = answers.budget?.maxBudgetClp ?? null;

    setDirectoryFilters({
      search: '',
      modality: mod && mod !== 'Indiferente' ? mod : 'Todas',
      commune: coms.length === 1 ? coms[0] : 'Todas',
      tag: 'Todos',
      maxPrice: maxBudget,
      presetLabel: null,
    });
    navigateTo('directory');
  };

  const clearMatch = () => {
    setMatchAnswers(null);
    setMoodPresetTags([]);
    setDirectoryFilters(DEFAULT_FILTERS);
  };

  const resetDirectoryFilters = () => {
    setMoodPresetTags([]);
    setDirectoryFilters(DEFAULT_FILTERS);
  };

  const applyMoodPreset = (tags: NeedTag[], label: string) => {
    setMatchAnswers(null);
    setMoodPresetTags(tags);
    setDirectoryFilters({
      ...DEFAULT_FILTERS,
      presetLabel: label,
    });
    navigateTo('directory');
  };

  const openPsychologist = (id: string, focus: 'profile' | 'booking' = 'profile') => {
    const exists = psychologists.some((p) => p.id === id);
    if (!exists) return;
    setModalInitialFocus(focus);
    setSelectedPsychologistId(id);
  };

  const closePsychologist = () => {
    setSelectedPsychologistId(null);
  };

  const addBooking = (booking: SimulatedBooking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const addB2BApplication = (app: B2BApplication) => {
    setB2bApplications((prev) => [app, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        navigateTo,
        matchAnswers,
        applyMatchAnswers,
        clearMatch,
        directoryFilters,
        setDirectoryFilters,
        resetDirectoryFilters,
        moodPresetTags,
        applyMoodPreset,
        selectedPsychologistId,
        modalInitialFocus,
        openPsychologist,
        closePsychologist,
        bookings,
        addBooking,
        cancelBooking,
        isBookingsDrawerOpen,
        setIsBookingsDrawerOpen,
        b2bApplications,
        addB2BApplication,
        isChatOpen,
        setIsChatOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp debe utilizarse dentro de AppProvider');
  }
  return ctx;
}
