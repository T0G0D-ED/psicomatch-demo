import { RotateCcw, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Modality, NeedTag, ValparaisoCommune } from '../../types';
import { NEED_TAG_LABELS } from '../../utils/matchScoring';

const COMMUNES: ValparaisoCommune[] = [
  'Viña del Mar',
  'Valparaíso',
  'Quilpué',
  'Quillota',
];

const NEED_TAGS = Object.entries(NEED_TAG_LABELS) as [NeedTag, string][];

const PRICE_OPTIONS = [
  { value: '', label: 'Sin filtro (cualquier tarifa)' },
  { value: '26000', label: 'Hasta $26.000 CLP' },
  { value: '28000', label: 'Hasta $28.000 CLP' },
  { value: '30000', label: 'Hasta $30.000 CLP' },
  { value: '32000', label: 'Hasta $32.000 CLP' },
  { value: '34000', label: 'Hasta $34.000 CLP' },
];

export function FilterBar({ totalShown, totalAvailable }: { totalShown: number; totalAvailable: number }) {
  const {
    directoryFilters,
    setDirectoryFilters,
    resetDirectoryFilters,
    moodPresetTags,
  } = useApp();

  const hasActiveFilters =
    directoryFilters.search.trim() !== '' ||
    directoryFilters.modality !== 'Todas' ||
    directoryFilters.commune !== 'Todas' ||
    directoryFilters.tag !== 'Todos' ||
    directoryFilters.maxPrice !== null ||
    moodPresetTags.length > 0;

  return (
    <div className="rounded-2xl border border-border-soft bg-surface p-4 sm:p-5 shadow-card space-y-4">
      <div className="grid gap-3 md:grid-cols-12">
        {/* Search Input */}
        <div className="relative md:col-span-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={directoryFilters.search}
            onChange={(e) =>
              setDirectoryFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Buscar por nombre, enfoque o comuna..."
            aria-label="Buscar especialistas"
            className="w-full rounded-xl border border-border-soft bg-canvas py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
          />
        </div>

        {/* Modality Toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-border-soft bg-canvas p-1 md:col-span-3">
          {(['Todas', 'Online', 'Presencial'] as const).map((mod) => {
            const active = directoryFilters.modality === mod;
            return (
              <button
                key={mod}
                type="button"
                onClick={() =>
                  setDirectoryFilters((prev) => ({
                    ...prev,
                    modality: mod as Modality | 'Todas',
                  }))
                }
                className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-calm text-white shadow-xs'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {mod}
              </button>
            );
          })}
        </div>

        {/* Commune Select */}
        <div className="md:col-span-2">
          <select
            aria-label="Filtrar por comuna"
            value={directoryFilters.commune}
            onChange={(e) =>
              setDirectoryFilters((prev) => ({
                ...prev,
                commune: e.target.value as ValparaisoCommune | 'Todas',
              }))
            }
            className="w-full rounded-xl border border-border-soft bg-canvas px-3 py-2.5 text-sm text-ink focus:border-calm focus:outline-none"
          >
            <option value="Todas">Todas las comunas</option>
            {COMMUNES.map((com) => (
              <option key={com} value={com}>
                {com}
              </option>
            ))}
          </select>
        </div>

        {/* Tariff Range Select (Explicitly Optional!) */}
        <div className="md:col-span-3">
          <select
            aria-label="Filtrar por rango de tarifa"
            value={directoryFilters.maxPrice === null ? '' : String(directoryFilters.maxPrice)}
            onChange={(e) =>
              setDirectoryFilters((prev) => ({
                ...prev,
                maxPrice: e.target.value === '' ? null : Number(e.target.value),
              }))
            }
            className="w-full rounded-xl border border-border-soft bg-canvas px-3 py-2.5 text-sm text-ink focus:border-calm focus:outline-none"
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row: Specialty / Need Tag + Counter + Clear */}
      <div className="flex flex-col gap-3 border-t border-border-soft/70 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="specialty-filter" className="text-xs font-semibold text-ink-secondary">
            Área o necesidad:
          </label>
          <select
            id="specialty-filter"
            value={directoryFilters.tag}
            onChange={(e) =>
              setDirectoryFilters((prev) => ({
                ...prev,
                tag: e.target.value as NeedTag | 'Todos',
              }))
            }
            className="rounded-lg border border-border-soft bg-canvas px-3 py-1.5 text-xs font-medium text-ink focus:border-calm focus:outline-none"
          >
            <option value="Todos">Todas las necesidades</option>
            {NEED_TAGS.map(([tagKey, label]) => (
              <option key={tagKey} value={tagKey}>
                {label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetDirectoryFilters}
              className="inline-flex items-center gap-1 rounded-full bg-subtle px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sage transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        <p className="text-xs font-medium text-ink-secondary">
          Mostrando <strong className="text-ink">{totalShown}</strong> de {totalAvailable} especialistas verificados
        </p>
      </div>
    </div>
  );
}
