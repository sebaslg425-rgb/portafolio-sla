import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { Plus, Trash2, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ConstructionLogItem } from '../types/portfolio';

export const ConstructionLog: React.FC = () => {
  const {
    data,
    isEditMode,
    addConstructionLogItem,
    deleteConstructionLogItem,
    getImage,
  } = usePortfolio();

  const items: ConstructionLogItem[] = data.constructionLog || [];

  // Active expanded item for the full-screen modal
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const activeItem = activeItemIndex !== null && items[activeItemIndex] ? items[activeItemIndex] : null;

  // Keyboard navigation for modal (Esc to close, ArrowLeft / ArrowRight to cycle)
  useEffect(() => {
    if (activeItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % items.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, items.length]);

  return (
    <section id="registro-de-obra" className="py-20 lg:py-32 border-b border-[#111111]/15 bg-[#f7f7f7]">
      {/* 1. SECTION HEADER (Contained within architectural grid width) */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-10 sm:mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#111111]/15">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FF4500] font-bold tracking-[0.25em] uppercase">
              <span>03</span>
              <span className="h-px w-6 bg-[#FF4500]" />
              <span className="text-[#111111]/60">CONTROL TÉCNICO EN CAMPO</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              <EditableText
                path="constructionLogTitle"
                value={data.constructionLogTitle || 'REGISTRO DE OBRA'}
              />
            </h2>
          </div>

          <div className="max-w-lg lg:text-right flex flex-col lg:items-end">
            <p className="font-sans text-sm sm:text-base text-[#111111]/70 leading-relaxed font-normal">
              <EditableText
                path="constructionLogSubtitle"
                value={
                  data.constructionLogSubtitle ||
                  'Bitácora fotográfica de procesos constructivos, materialidad honesta y control de calidad en campo.'
                }
                multiline
              />
            </p>

            {/* In Edit Mode: Button to add a new site record */}
            {isEditMode && (
              <button
                type="button"
                onClick={addConstructionLogItem}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#FF4500] hover:bg-[#e03e00] text-white font-mono text-xs font-bold tracking-wider transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ AGREGAR REGISTRO DE OBRA</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#111111]/50 pt-2">
          <span>RETÍCULA INMERSIVA // SUPERVISIÓN DIRECTA</span>
          <span className="hidden sm:inline">HAZ CLIC EN CUALQUIER IMAGEN PARA EXPANDIR EN FORMATO ORIGINAL</span>
          <span>[{items.length} REGISTROS]</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RETÍCULA CON ESPACIADO Y RESPIRO EDITORIAL                             */}
      {/* ========================================================================= */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-7">
          {items.map((item, index) => {
            return (
              <div
                key={item.id}
                className="group relative bg-[#111111] border border-[#111111]/15 overflow-hidden aspect-square select-none cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  if (!isEditMode) {
                    setActiveItemIndex(index);
                  }
                }}
              >
                {/* Image in base state: 1:1, grayscale, smooth hover zoom */}
                <div className="w-full h-full aspect-square overflow-hidden bg-[#1a1a1a]">
                  <EditableImage
                    imageId={item.imageId}
                    defaultAlt={item.title}
                    className={`w-full h-full aspect-square object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500 ${
                      isEditMode ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    containerClassName="w-full h-full aspect-square"
                    forceAspectRatio="aspect-square"
                    allowResize={isEditMode}
                  />
                </div>

                {/* Sombreado oscuro muy sutil con título corto al pasar el cursor */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-between pointer-events-none z-10 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#FF4500] font-bold tracking-widest uppercase">
                      {item.meta || `REG. ${String(index + 1).padStart(2, '0')}`}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-white/80" />
                  </div>

                  <div>
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                      <EditableText
                        path={`constructionLog.${index}.title`}
                        value={item.title}
                        className="text-white"
                      />
                    </h4>
                    <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest mt-1 block">
                      VER DETALLE ORIGINAL →
                    </span>
                  </div>
                </div>

                {/* En modo edición: botón de editar textos y eliminar registro */}
                {isEditMode && (
                  <div className="absolute top-2 right-2 z-30 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveItemIndex(index);
                      }}
                      title="Abrir y editar descripción detallada"
                      className="px-2 py-1 bg-[#111111]/90 hover:bg-[#FF4500] text-white text-[10px] font-mono font-bold transition-colors border border-white/20"
                    >
                      DETALLES
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`¿Eliminar "${item.title}" del registro de obra?`)) {
                          deleteConstructionLogItem(item.id);
                        }
                      }}
                      title="Eliminar este registro"
                      className="p-1.5 bg-[#111111]/90 hover:bg-[#FF4500] text-white transition-colors border border-white/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MODAL DE EXPANSIÓN A PANTALLA COMPLETA (FORMATO ORIGINAL SIN RECORTAR) */}
      {/* ========================================================================= */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-10 select-none animate-fadeIn"
          onClick={() => setActiveItemIndex(null)}
        >
          {/* Top Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 text-white font-mono text-xs border-b border-white/20 pb-3"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#FF4500]" />
              <span className="font-bold tracking-wider uppercase text-white/90 truncate max-w-xs sm:max-w-md">
                {activeItem.title}
              </span>
              <span className="text-white/40 hidden sm:inline">
                | [{activeItemIndex! + 1} DE {items.length}]
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveItemIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : 0))
                }
                className="p-1.5 bg-white/10 hover:bg-[#FF4500] text-white transition-colors"
                title="Imagen anterior (Flecha Izquierda)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % items.length : 0))
                }
                className="p-1.5 bg-white/10 hover:bg-[#FF4500] text-white transition-colors"
                title="Siguiente imagen (Flecha Derecha)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveItemIndex(null)}
                className="p-1.5 bg-white/10 hover:bg-[#FF4500] text-white transition-colors ml-2"
                title="Cerrar vista (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Content Box: Original Aspect Ratio Image + Detailed Technical Description */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center pt-10 pb-4 overflow-y-auto"
          >
            {/* Contenedor de la Imagen en Formato Original (object-contain, sin grayscale, sin aspect-square) */}
            <div className="relative w-full flex items-center justify-center max-h-[62vh] sm:max-h-[68vh] overflow-hidden bg-black/40 border border-white/15">
              <img
                src={getImage(activeItem.imageId).src}
                alt={activeItem.title}
                className="w-auto h-auto max-w-full max-h-[60vh] sm:max-h-[66vh] object-contain shadow-2xl filter-none transition-all duration-300"
              />

              <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-widest text-white/70 bg-black/70 px-2 py-0.5 border border-white/10 pointer-events-none">
                FORMATO ORIGINAL // SIN RECORTE
              </div>
            </div>

            {/* Ficha técnica y descripción detallada debajo de la foto */}
            <div className="w-full mt-4 bg-[#141414] border border-white/15 p-4 sm:p-6 text-white font-sans">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2.5 border-b border-white/10">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-bold text-[#FF4500] tracking-wider uppercase">
                    {activeItem.meta || `REGISTRO 0${activeItemIndex! + 1}`}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    <EditableText
                      path={`constructionLog.${activeItemIndex}.title`}
                      value={activeItem.title}
                      className="text-white"
                    />
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
                  SLA BITÁCORA TÉCNICA
                </span>
              </div>

              <div className="pt-3">
                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  <EditableText
                    path={`constructionLog.${activeItemIndex}.description`}
                    value={activeItem.description}
                    multiline
                    className="text-white"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
