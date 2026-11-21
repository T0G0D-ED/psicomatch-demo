import type { ChatbotResponse } from '../types';

export const chatbotResponses: ChatbotResponse[] = [
  {
    id: 'bot-no-se',
    triggerLabel: 'No sé qué psicólogo necesito',
    userMessage: 'No sé qué psicólogo necesito',
    botReply:
      '¡Es completamente normal no saberlo! Responde 4 preguntas cotidianas en nuestro Match Empático y traduciremos lo que buscas en especialistas compatibles de la Región de Valparaíso.',
    followUpAction: {
      label: 'Hacer Match Empático (2 min)',
      targetView: 'match',
    },
    nextQuickReplyIds: ['bot-precio', 'bot-suscripcion', 'bot-comunas'],
  },
  {
    id: 'bot-precio',
    triggerLabel: '¿Cuánto cuesta una sesión?',
    userMessage: '¿Cuánto cuesta una sesión?',
    botReply:
      'Las sesiones de 50 minutos en PsicoMatch van entre $24.000 y $34.000 CLP según el especialista. Puedes explorar todos sin filtro de tarifa o indicar un tope si lo prefieres.',
    followUpAction: {
      label: 'Explorar directorio de psicólogos',
      targetView: 'directory',
    },
    nextQuickReplyIds: ['bot-suscripcion', 'bot-no-se', 'bot-comunas'],
  },
  {
    id: 'bot-suscripcion',
    triggerLabel: '¿Tiene suscripción mensual?',
    userMessage: '¿Tiene suscripción mensual?',
    botReply:
      'No. En PsicoMatch creemos en la flexibilidad total: no hay contratos ni membresías mensuales obligatorias. Solo pagas la sesión que eliges agendar.',
    followUpAction: {
      label: 'Ver horarios disponibles',
      targetView: 'directory',
    },
    nextQuickReplyIds: ['bot-no-se', 'bot-comunas', 'bot-b2b'],
  },
  {
    id: 'bot-comunas',
    triggerLabel: 'Atención en Quilpué, Viña o Valpo',
    userMessage: '¿Atienden presencial en la Región de Valparaíso?',
    botReply:
      'Sí. Contamos con consultas presenciales verificadas en Viña del Mar, Valparaíso, Quilpué y Quillota, además de atención online privada desde cualquier lugar.',
    followUpAction: {
      label: 'Filtrar por comuna o modalidad',
      targetView: 'directory',
    },
    nextQuickReplyIds: ['bot-no-se', 'bot-precio', 'bot-agendar'],
  },
  {
    id: 'bot-agendar',
    triggerLabel: '¿Cómo agendo una hora?',
    userMessage: '¿Cómo funciona el agendamiento?',
    botReply:
      'Es muy directo: eliges un especialista (por Match o en el Directorio), seleccionas un día y horario disponible, confirmas modalidad y listo. En esta demo puedes simular la reserva al instante.',
    followUpAction: {
      label: 'Ir al directorio ahora',
      targetView: 'directory',
    },
    nextQuickReplyIds: ['bot-no-se', 'bot-suscripcion'],
  },
  {
    id: 'bot-b2b',
    triggerLabel: 'Soy psicólogo/a',
    userMessage: 'Soy psicólogo/a y quiero sumarme',
    botReply:
      '¡Bienvenida/o! PsicoMatch elimina los costos fijos: $0 por estar publicado y solo una comisión del 7% por cada sesión agendada y efectiva.',
    followUpAction: {
      label: 'Ver propuesta Soy Psicólogo (B2B)',
      targetView: 'b2b',
    },
    nextQuickReplyIds: ['bot-no-se', 'bot-suscripcion'],
  },
];

export const INITIAL_QUICK_REPLY_IDS = [
  'bot-no-se',
  'bot-precio',
  'bot-suscripcion',
  'bot-comunas',
  'bot-b2b',
];

export function matchFreeTextToBotReply(input: string): {
  text: string;
  action?: ChatbotResponse['followUpAction'];
} {
  const q = input.toLowerCase();

  if (
    q.includes('suicid') ||
    q.includes('matar') ||
    q.includes('morir') ||
    q.includes('emergencia') ||
    q.includes('crisis') ||
    q.includes('urgencia')
  ) {
    return {
      text: 'Si estás pasando por una crisis o emergencia emocional ahora mismo, por favor llama gratis al *4141 (Línea de Prevención del Suicidio del MINSAL Chile, 24/7) o acude al servicio de urgencia más cercano. No estás sola/o.',
    };
  }

  if (q.includes('psicolog') && (q.includes('soy') || q.includes('trabajar') || q.includes('comision') || q.includes('7%'))) {
    const b2b = chatbotResponses.find((r) => r.id === 'bot-b2b')!;
    return { text: b2b.botReply, action: b2b.followUpAction };
  }

  if (q.includes('precio') || q.includes('cuesta') || q.includes('valor') || q.includes('tarifa') || q.includes('clp')) {
    const price = chatbotResponses.find((r) => r.id === 'bot-precio')!;
    return { text: price.botReply, action: price.followUpAction };
  }

  if (q.includes('suscrip') || q.includes('contrato') || q.includes('mensual')) {
    const sub = chatbotResponses.find((r) => r.id === 'bot-suscripcion')!;
    return { text: sub.botReply, action: sub.followUpAction };
  }

  if (q.includes('viña') || q.includes('valpo') || q.includes('valpara') || q.includes('quilpu') || q.includes('quillota') || q.includes('presencial') || q.includes('online')) {
    const com = chatbotResponses.find((r) => r.id === 'bot-comunas')!;
    return { text: com.botReply, action: com.followUpAction };
  }

  return {
    text: 'Gracias por escribirme. Puedo ayudarte a encontrar el especialista adecuado en 4 preguntas simples, sin tecnicismos ni diagnósticos previos. ¿Te gustaría probar el Match Empático o ver el directorio?',
    action: { label: 'Hacer Match Empático →', targetView: 'match' },
  };
}
