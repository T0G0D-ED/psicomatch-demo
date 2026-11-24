import { PhoneCall, Sprout } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Footer() {
  const { navigateTo } = useApp();

  return (
    <footer className="mt-10 md:mt-16 bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 pb-24 sm:px-6 md:py-12 md:pb-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-sand">
                <Sprout className="h-4 w-4" />
              </span>
              <span className="font-serif text-xl font-bold">PsicoMatch</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              El puente empático entre personas que buscan orientación clara en lenguaje cotidiano y psicólogos independientes de la Región de Valparaíso.
            </p>
            <p className="text-xs text-sand/90">
              Cobertura presencial: Viña del Mar · Valparaíso · Quilpué · Quillota · Online en todo Chile.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
              Explora la plataforma
            </h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('match')}
                  className="hover:text-sand transition-colors"
                >
                  Match Empático (4 preguntas)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('directory')}
                  className="hover:text-sand transition-colors"
                >
                  Directorio Ético de Especialistas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('b2b')}
                  className="hover:text-sand transition-colors"
                >
                  Soy Psicólogo · Modelo 0% fijo / 7% por sesión
                </button>
              </li>
            </ul>
          </div>

          {/* Helpline */}
          <div className="rounded-2xl bg-forest/90 p-5 border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2 text-sand text-xs font-semibold uppercase tracking-wider">
              <PhoneCall className="h-4 w-4" />
              <span>Orientación en crisis · Chile</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              Si tú o alguien cercano necesita contención inmediata, llama gratis al{' '}
              <strong className="text-white">*4141</strong> (Línea de Prevención del Suicidio del MINSAL, 24/7 y confidencial).
            </p>
            <p className="text-[11px] text-ink-muted">
              Demo interactiva solo Frontend · Datos y agendamientos simulados con fines académicos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
