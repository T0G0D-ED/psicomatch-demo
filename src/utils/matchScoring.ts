import type {
  DirectoryFilters,
  MatchAnswers,
  NeedTag,
  Psychologist,
  ScoredPsychologist,
} from '../types';
import { formatCLP } from './formatters';

export const NEED_TAG_LABELS: Record<NeedTag, string> = {
  ansiedad: 'Ansiedad y calma',
  'infanto-juvenil': 'Infanto-juvenil',
  adultez: 'Adultez y etapas',
  'pareja-vinculos': 'Pareja y vínculos',
  'duelo-animo': 'Duelo y ánimo',
  'estres-academico': 'Estrés laboral / académico',
  crecimiento: 'Crecimiento y autoestima',
};

export function scorePsychologists(
  list: Psychologist[],
  answers: MatchAnswers | null
): ScoredPsychologist[] {
  if (!answers || (!answers.audience && !answers.need && !answers.modality && !answers.budget)) {
    return list.map((psychologist) => ({
      psychologist,
      matchScore: null,
      matchReasons: [],
    }));
  }

  const scored = list.map((psychologist) => {
    let score = 68;
    const reasons: string[] = [];

    // 1. Audience match
    const audTags = answers.audience?.mappedTags ?? [];
    if (audTags.length > 0 && audTags.some((t) => psychologist.tags.includes(t))) {
      score += 11;
      if (audTags.includes('infanto-juvenil')) {
        reasons.push('Experiencia infanto-juvenil');
      } else if (audTags.includes('pareja-vinculos')) {
        reasons.push('Acompañamiento en vínculos/pareja');
      } else {
        reasons.push('Atiende tu etapa actual');
      }
    }

    // 2. Emotional need match
    const needTags = answers.need?.mappedTags ?? [];
    const matchedNeedCount = needTags.filter((t) => psychologist.tags.includes(t)).length;
    if (matchedNeedCount > 0) {
      score += Math.min(14, matchedNeedCount * 7);
      const firstLabel = NEED_TAG_LABELS[needTags.find((t) => psychologist.tags.includes(t))!];
      reasons.push(`Enfoque afín (${firstLabel.toLowerCase()})`);
    }

    // 3. Modality / Commune match
    const modPref = answers.modality?.mappedModality;
    const comPrefs = answers.modality?.mappedCommunes ?? [];
    if (!modPref || modPref === 'Indiferente') {
      score += 4;
    } else if (modPref === 'Online' && psychologist.modalities.includes('Online')) {
      score += 5;
      reasons.push('Disponible Online');
    } else if (modPref === 'Presencial') {
      const communeMatch = comPrefs.find((c) => psychologist.communes.includes(c));
      if (communeMatch) {
        score += 6;
        reasons.push(`Presencial en ${communeMatch}`);
      } else {
        score -= 10;
      }
    }

    // 4. Optional Budget match (if specified)
    const maxBudget = answers.budget?.maxBudgetClp;
    if (typeof maxBudget === 'number') {
      if (psychologist.priceClp <= maxBudget) {
        score += 4;
        reasons.push(`Dentro de tu rango (${formatCLP(psychologist.priceClp)})`);
      } else {
        score -= 12;
      }
    }

    const bounded = Math.max(62, Math.min(98, score));
    return {
      psychologist,
      matchScore: bounded,
      matchReasons: reasons.slice(0, 3),
    };
  });

  return scored.sort((a, b) => {
    const scoreDiff = (b.matchScore ?? 0) - (a.matchScore ?? 0);
    if (scoreDiff !== 0) return scoreDiff;
    return b.psychologist.rating - a.psychologist.rating;
  });
}

export function filterPsychologists(
  scored: ScoredPsychologist[],
  filters: DirectoryFilters,
  presetTags: NeedTag[] = []
): ScoredPsychologist[] {
  const query = filters.search.trim().toLowerCase();

  return scored.filter(({ psychologist }) => {
    if (query) {
      const haystack = [
        psychologist.name,
        psychologist.specialty,
        psychologist.approach,
        psychologist.plainLanguageFocus,
        ...psychologist.communes,
        ...psychologist.tagLabels,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (filters.modality !== 'Todas' && !psychologist.modalities.includes(filters.modality)) {
      return false;
    }

    if (filters.commune !== 'Todas' && !psychologist.communes.includes(filters.commune)) {
      return false;
    }

    if (filters.tag !== 'Todos' && !psychologist.tags.includes(filters.tag)) {
      return false;
    }

    if (presetTags.length > 0 && !presetTags.some((t) => psychologist.tags.includes(t))) {
      return false;
    }

    if (filters.maxPrice !== null && psychologist.priceClp > filters.maxPrice) {
      return false;
    }

    return true;
  });
}
