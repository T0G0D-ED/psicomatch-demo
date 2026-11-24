import { useState } from 'react';
import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
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

export function FilterBar({
  totalShown,
  totalAvailable,
}: {
  totalShown: number;
  totalAvailable: number;
}) {
  const {
    directoryFilters,
    setDirectoryFilters,
    resetDirectoryFilters,
    moodPresetTags,
  } = useApp();

  const [showAdvanced, setShowAdvanced] = useState(false);

  const advancedCount =
    (directoryFilters.commune !== 'Todas' ? 1 : 0) +
    (directoryFilters.maxPrice !== null ? 1 : 0) +
    (directoryFilters.tag !== 'Todos' ? 1 : 0);

  const hasActiveFilters =
    directoryFilters.search.trim() !== '' ||
    directoryFilters.modality !== 'Todas' ||
    advancedCount > 0 ||
    moodPresetTags.length > 0;

  return (
    <div className="rounded-2xl border border-border-soft bg-surface p-3.5 sm:p-5 shadow-card space-y-3 sm:space-y-4">
      {/* Row 1: Search + Mobile Filters Toggle */}
      <div className="flex items-center gap-2 md:grid md:grid-cols-12 md:gap-3">
        <div className="relative flex-1 md:col-span-5">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={directoryFilters.search}
            onChange={(e) =>
              setDirectoryFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Buscar nombre, enfoque o comuna..."
            aria-label="Buscar especialistas"
            className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas py-2.5 pl-10 pr-3 text-base sm:text-sm text-ink placeholder:text-ink-muted focus:border-calm focus:outline-none"
          />
        </div>

        {/* Mobile Toggle for Advanced Filters */}
        <button
          type="button"
          aria-expanded={showAdvanced}
          onClick={() => setShowAdvanced((prev) => !prev)}
          className={`md:hidden inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl border px-3.5 text-xs font-semibold transition-colors ${
            showAdvanced || advancedCount > 0
              ? 'border-calm bg-sage text-ink'
              : 'border-border-soft bg-canvas text-ink'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4 text-calm" />
          <span>Filtros</span>
          {advancedCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-calm px-1.5 text-[11px] font-bold text-white">
              {advancedCount}
            </span>
          )}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${
              showAdvanced ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Modality Toggle on Desktop */}
        <div className="hidden md:flex items-center gap-1 rounded-xl border border-border-soft bg-canvas p-1 md:col-span-4">
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
                className={`min-h-[36px] flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
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

        {/* Desktop Results Counter */}
        <div className="hidden md:flex items-center justify-end md:col-span-3">
          <p className="text-xs font-medium text-ink-secondary">
            Mostrando <strong className="text-ink">{totalShown}</strong> de {totalAvailable} verificados
          </p>
        </div>
      </div>

      {/* Mobile Compact Modality Strip + Count */}
      <div className="flex flex-col gap-2.5 md:hidden">
        <div className="flex items-center gap-1 rounded-xl border border-border-soft bg-canvas p-1">
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
                className={`min-h-[38px] flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
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

        <div className="flex items-center justify-between gap-2 px-0.5">
          <p className="text-xs font-medium text-ink-secondary">
            Mostrando <strong className="text-ink">{totalShown}</strong> de {totalAvailable} especialistas
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetDirectoryFilters}
              className="inline-flex items-center gap-1 rounded-full bg-subtle px-3 py-1 text-xs font-semibold text-ink hover:bg-sage transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Advanced Filters (Commune, Optional Tariff, Specialty) */}
      <div
        className={`${
          showAdvanced ? 'grid' : 'hidden'
        } md:grid gap-3 md:grid-cols-12 border-t border-border-soft/70 pt-3 animate-fade-up md:animate-none`}
      >
        <div className="md:col-span-3">
          <label htmlFor="commune-filter" className="mb-1 block text-xs font-semibold text-ink-secondary md:sr-only">
            Comuna presencial
          </label>
          <select
            id="commune-filter"
            aria-label="Filtrar por comuna"
            value={directoryFilters.commune}
            onChange={(e) =>
              setDirectoryFilters((prev) => ({
                ...prev,
                commune: e.target.value as ValparaisoCommune | 'Todas',
              }))
            }
            className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas px-3 py-2 text-base sm:text-sm text-ink focus:border-calm focus:outline-none"
          >
            <option value="Todas">Todas las comunas</option>
            {COMMUNES.map((com) => (
              <option key={com} value={com}>
                {com}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Tariff Range Select */}
        <div className="md:col-span-4">
          <label htmlFor="tariff-filter" className="mb-1 block text-xs font-semibold text-ink-secondary md:sr-only">
            Rango de tarifa (opcional)
          </label>
          <select
            id="tariff-filter"
            aria-label="Filtrar por rango de tarifa"
            value={directoryFilters.maxPrice === null ? '' : String(directoryFilters.maxPrice)}
            onChange={(e) =>
              setDirectoryFilters((prev) => ({
                ...prev,
                maxPrice: e.target.value === '' ? null : Number(e.target.value),
              }))
            }
            className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas px-3 py-2 text-base sm:text-sm text-ink focus:border-calm focus:outline-none"
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Specialty / Need Tag */}
        <div className="md:col-span-3">
          <label htmlFor="specialty-filter" className="mb-1 block text-xs font-semibold text-ink-secondary md:sr-only">
            Área o necesidad
          </label>
          <select
            id="specialty-filter"
            aria-label="Filtrar por área o necesidad"
            value={directoryFilters.tag}
            onChange={(e) =>
              setDirectoryFilters((prev) => ({
                ...prev,
                tag: e.target.value as NeedTag | 'Todos',
              }))
            }
            className="min-h-[44px] w-full rounded-xl border border-border-soft bg-canvas px-3 py-2 text-base sm:text-sm text-ink focus:border-calm focus:outline-none"
          >
            <option value="Todos">Todas las necesidades</option>
            {NEED_TAGS.map(([tagKey, label]) => (
              <option key={tagKey} value={tagKey}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Clear Filters */}
        <div className="hidden md:flex items-center justify-end md:col-span-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetDirectoryFilters}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-subtle px-3.5 py-2 text-xs font-semibold text-ink hover:bg-sage transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
