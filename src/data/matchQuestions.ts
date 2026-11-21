import type { MatchQuestion } from '../types';

export const matchQuestions: MatchQuestion[] = [
  {
    id: 'q-audience',
    step: 1,
    category: 'audience',
    question: '¿Para quién buscas acompañamiento?',
    subtitle: 'Esto nos permite conectarte con especialistas con experiencia en esa etapa de vida.',
    options: [
      {
        id: 'aud-adult',
        label: 'Para mí (adulto o estudiante)',
        helperText: 'Busco un espacio personal para escucharme y adquirir herramientas concretas.',
        mappedTags: ['adultez'],
      },
      {
        id: 'aud-youth',
        label: 'Para un niño, niña o adolescente',
        helperText: 'Apoyo emocional, escolar o acompañamiento respetuoso para menores.',
        mappedTags: ['infanto-juvenil'],
      },
      {
        id: 'aud-couple',
        label: 'Para mi pareja o vínculo familiar',
        helperText: 'Mejorar la comunicación, acuerdos y el cuidado mutuo.',
        mappedTags: ['pareja-vinculos'],
      },
    ],
  },
  {
    id: 'q-need',
    step: 2,
    category: 'need',
    question: '¿Qué sientes que necesitas hoy?',
    subtitle: 'No necesitas saber nombres clínicos ni diagnósticos. Elige la frase que más resuene contigo.',
    options: [
      {
        id: 'need-anx',
        label: 'Siento ansiedad, estrés o que mi mente no para',
        helperText: 'Sobrecarga laboral o académica, tensión constante o dificultad para descansar.',
        mappedTags: ['ansiedad', 'estres-academico'],
      },
      {
        id: 'need-mood',
        label: 'Estoy atravesando un cambio, duelo o desánimo',
        helperText: 'Cansancio emocional, tristeza persistente o una transición vital importante.',
        mappedTags: ['duelo-animo', 'adultez'],
      },
      {
        id: 'need-rel',
        label: 'Quiero cuidar mis vínculos, límites o autoestima',
        helperText: 'Inseguridad personal, conflictos frecuentes o ganas de crecer emocionalmente.',
        mappedTags: ['pareja-vinculos', 'crecimiento'],
      },
      {
        id: 'need-guide',
        label: 'No estoy seguro/a, quiero orientarme primero',
        helperText: 'Prefiero un enfoque integral y cercano para conversar sin etiquetas.',
        mappedTags: ['adultez', 'infanto-juvenil', 'crecimiento'],
      },
    ],
  },
  {
    id: 'q-modality',
    step: 3,
    category: 'modality',
    question: '¿Cómo te acomoda más atenderte?',
    subtitle: 'Elige entre videollamada privada o atención presencial en la Región de Valparaíso.',
    options: [
      {
        id: 'mod-online',
        label: 'Online (videollamada privada)',
        helperText: 'Atiéndete desde tu casa o universidad, sin tiempos de traslado.',
        mappedModality: 'Online',
      },
      {
        id: 'mod-costa',
        label: 'Presencial en Viña del Mar o Valparaíso',
        helperText: 'Consulta cercana en el gran Valparaíso.',
        mappedModality: 'Presencial',
        mappedCommunes: ['Viña del Mar', 'Valparaíso'],
      },
      {
        id: 'mod-interior',
        label: 'Presencial en Quilpué o Quillota',
        helperText: 'Consulta cercana en la provincia de Marga Marga o Quillota.',
        mappedModality: 'Presencial',
        mappedCommunes: ['Quilpué', 'Quillota'],
      },
      {
        id: 'mod-any',
        label: 'Me da igual / Quiero ver ambas opciones',
        helperText: 'Priorizar afinidad con el especialista, online o presencial.',
        mappedModality: 'Indiferente',
      },
    ],
  },
  {
    id: 'q-budget',
    step: 4,
    category: 'budget',
    question: '¿Tienes un rango de tarifa por sesión en mente?',
    subtitle: 'Sin suscripciones ni mensualidades obligatorias: solo pagas la sesión que agendas.',
    options: [
      {
        id: 'bud-28',
        label: 'Hasta $28.000 CLP por sesión',
        helperText: 'Arancel accesible pensado especialmente para estudiantes y jóvenes.',
        maxBudgetClp: 28000,
      },
      {
        id: 'bud-32',
        label: 'Hasta $32.000 CLP por sesión',
        helperText: 'Cubre a la mayoría de los especialistas verificados de la región.',
        maxBudgetClp: 32000,
      },
      {
        id: 'bud-any',
        label: 'Prefiero no especificar / Ver todas las tarifas',
        helperText: 'Explorar todos los especialistas compatibles sin filtrar por precio.',
        maxBudgetClp: undefined,
      },
    ],
  },
];
