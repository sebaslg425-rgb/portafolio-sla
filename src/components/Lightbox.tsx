import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ isOpen, src, alt, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Lightbox Top Control Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-10 text-white font-mono text-xs border-b border-white/20 pb-3"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#FF4500]" />
          <span className="font-bold tracking-wider uppercase text-[#f7f7f7]/80 truncate max-w-xs sm:max-w-md">
            {alt || 'Visualización de Alta Resolución'}
          </span>
          <span className="text-[#f7f7f7]/50 hidden sm:inline">| SLA DOSSIER</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom In */}
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
            className="p-1.5 bg-white/10 hover:bg-[#FF4500] transition-colors"
            title="Aumentar zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.5))}
            className="p-1.5 bg-white/10 hover:bg-[#FF4500] transition-colors"
            title="Reducir zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Reset Zoom */}
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-1.5 bg-white/10 hover:bg-[#FF4500] transition-colors"
            title="Restablecer tamaño normal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 bg-white/10 hover:bg-[#FF4500] transition-colors ml-2"
            title="Cerrar visor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Container with Smooth Scaling strictly in 1:1 format */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex items-center justify-center p-2 max-w-full max-h-[85vh] overflow-hidden"
      >
        <div className="relative aspect-square w-[min(78vh,88vw,800px)] h-[min(78vh,88vw,800px)] bg-[#111111] border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center shrink-0">
          <img
            src={src}
            alt={alt}
            style={{ transform: `scale(${zoomLevel})` }}
            className="w-full h-full aspect-square object-cover transition-transform duration-200 select-none cursor-grab active:cursor-grabbing"
          />

          {/* Sutil indicador arquitectónico de proporción 1:1 */}
          <div className="absolute bottom-3 left-3 pointer-events-none z-10 font-mono text-[10px] text-white/80 bg-black/75 backdrop-blur-sm px-2.5 py-1 border border-white/15 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF4500]" />
            <span>FORMATO 1:1 // RENDER ORIGINAL</span>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 text-center font-mono text-[11px] text-[#f7f7f7]/60 select-none">
        Formato 1:1 preservado · Usa los controles superiores o presiona <kbd className="px-1.5 py-0.5 bg-white/10 text-white border border-white/20">ESC</kbd> para salir.
      </div>
    </div>
  );
};
