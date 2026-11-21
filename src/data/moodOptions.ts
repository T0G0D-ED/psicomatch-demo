import type { MoodOption } from '../types';

export const moodOptions: MoodOption[] = [
  {
    id: 'mood-abrumado',
    label: 'Abrumado/a',
    hint: 'Siento demasiado peso',
    recommendation:
      'Cuando todo se acumula, no necesitas tener respuestas claras para pedir apoyo. Te mostramos especialistas con escucha pausada y cercana para ordenar lo que estás cargando.',
    suggestedTags: ['duelo-animo', 'adultez'],
    ctaLabel: 'Ver especialistas para aliviar la carga',
  },
  {
    id: 'mood-ansioso',
    label: 'Ansioso/a',
    hint: 'Mi mente no para',
    recommendation:
      'Es válido sentir que tu mente va muy rápido. Un acompañamiento enfocado en regulación emocional y estrés cotidiano te ayuda a recuperar calma paso a paso.',
    suggestedTags: ['ansiedad', 'estres-academico'],
    ctaLabel: 'Ver especialistas para ansiedad y estrés',
  },
  {
    id: 'mood-agotado',
    label: 'Agotado/a',
    hint: 'Sin energía ni ánimo',
    recommendation:
      'El cansancio emocional sostenido es una señal importante de cuidado. Conecta con profesionales que trabajan desde el respeto a tu ritmo, sin presiones.',
    suggestedTags: ['duelo-animo', 'estres-academico'],
    ctaLabel: 'Ver especialistas en ánimo y desgaste',
  },
  {
    id: 'mood-confundido',
    label: 'Confundido/a',
    hint: 'No sé qué necesito',
    recommendation:
      'No saber qué tipo de terapia elegir es la razón #1 por la que las personas se frenan. Un enfoque integral te orienta desde la primera conversación, sin tecnicismos.',
    suggestedTags: ['adultez', 'infanto-juvenil', 'crecimiento'],
    ctaLabel: 'Explorar enfoque integral',
  },
  {
    id: 'mood-crecer',
    label: 'Buscando crecer',
    hint: 'Quiero cuidar mis vínculos',
    recommendation:
      'Ir a terapia también es para fortalecer tu autoestima, poner límites sanos o mejorar la relación contigo y con quienes quieres.',
    suggestedTags: ['crecimiento', 'pareja-vinculos'],
    ctaLabel: 'Ver especialistas en vínculos y crecimiento',
  },
];
