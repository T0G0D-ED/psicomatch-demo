import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  maxWidthClass = 'max-w-4xl',
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-dark/55 backdrop-blur-xs p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Ventana de detalle'}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative flex w-full ${maxWidthClass} max-h-[92dvh] flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl bg-surface border border-border-soft shadow-floating animate-sheet-up sm:animate-fade-up`}
      >
        {/* Mobile sheet drag handle */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden shrink-0">
          <span className="h-1 w-10 rounded-full bg-border-soft" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-subtle text-ink hover:bg-sage-strong transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex-1 overflow-y-auto overscroll-contain pb-safe">
          {children}
        </div>
      </div>
    </div>
  );
}
