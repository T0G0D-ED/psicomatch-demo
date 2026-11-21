export type ViewType = 'landing' | 'match' | 'directory' | 'b2b';

export type Modality = 'Online' | 'Presencial';

export type ValparaisoCommune =
  | 'Viña del Mar'
  | 'Valparaíso'
  | 'Quilpué'
  | 'Quillota';

export type NeedTag =
  | 'ansiedad'
  | 'infanto-juvenil'
  | 'adultez'
  | 'pareja-vinculos'
  | 'duelo-animo'
  | 'estres-academico'
  | 'crecimiento';

export interface Review {
  id: string;
  author: string;
  communeOrMode: string;
  rating: number;
  comment: string;
  dateLabel: string;
}

export interface TimeSlot {
  id: string;
  dayLabel: string;
  timeLabel: string;
  modality: Modality;
  commune?: ValparaisoCommune;
  available: boolean;
}

export interface Psychologist {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  approach: string;
  plainLanguageFocus: string;
  targetAudience: string[];
  modalities: Modality[];
  communes: ValparaisoCommune[];
  priceClp: number;
  sessionMinutes: number;
  rating: number;
  reviewCount: number;
  credentials: string;
  instagramHandle?: string;
  bioLetter: string;
  tags: NeedTag[];
  tagLabels: string[];
  reviews: Review[];
  availableSlots: TimeSlot[];
}

export interface MatchOption {
  id: string;
  label: string;
  helperText: string;
  mappedTags?: NeedTag[];
  mappedModality?: Modality | 'Indiferente';
  mappedCommunes?: ValparaisoCommune[];
  maxBudgetClp?: number;
}

export interface MatchQuestion {
  id: string;
  step: number;
  category: 'audience' | 'need' | 'modality' | 'budget';
  question: string;
  subtitle: string;
  options: MatchOption[];
}

export interface MatchAnswers {
  audience?: MatchOption;
  need?: MatchOption;
  modality?: MatchOption;
  budget?: MatchOption;
}

export interface ScoredPsychologist {
  psychologist: Psychologist;
  matchScore: number | null;
  matchReasons: string[];
}

export interface DirectoryFilters {
  search: string;
  modality: Modality | 'Todas';
  commune: ValparaisoCommune | 'Todas';
  tag: NeedTag | 'Todos';
  maxPrice: number | null;
  presetLabel?: string | null;
}

export interface MoodOption {
  id: string;
  label: string;
  hint: string;
  recommendation: string;
  suggestedTags: NeedTag[];
  ctaLabel: string;
}

export interface ChatbotAction {
  label: string;
  targetView: ViewType;
  presetTags?: NeedTag[];
  presetLabel?: string;
}

export interface ChatbotResponse {
  id: string;
  triggerLabel: string;
  userMessage: string;
  botReply: string;
  followUpAction?: ChatbotAction;
  nextQuickReplyIds: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: ChatbotAction;
  timestamp: string;
}

export interface SimulatedBooking {
  id: string;
  code: string;
  psychologistId: string;
  psychologistName: string;
  psychologistApproach: string;
  slotId: string;
  slotLabel: string;
  modality: Modality;
  commune?: ValparaisoCommune;
  priceClp: number;
  sessionMinutes: number;
  patientName: string;
  patientEmail: string;
  notes?: string;
  createdAt: string;
}

export interface B2BApplication {
  id: string;
  fullName: string;
  email: string;
  registrationNumber: string;
  university: string;
  communes: ValparaisoCommune[];
  modalities: Modality[];
  suggestedPriceClp: number;
  plainFocus: string;
  createdAt: string;
}
