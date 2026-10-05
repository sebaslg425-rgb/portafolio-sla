import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Trash2,
  Maximize2,
  Share2,
} from 'lucide-react';

interface ProjectFullPageViewProps {
  onOpenLightbox?: (src: string, alt: string) => void;
}

export const ProjectFullPageView: React.FC<ProjectFullPageViewProps> = ({ onOpenLightbox }) => {
  const {
    activeModalProject,
    closeProjectModal,
    goToNextProject,
    goToPrevProject,
    isEditMode,
    addGalleryImageToProject,
    removeGalleryImageFromProject,
    addProjectSpec,
    removeProjectSpec,
    data,
    getImage,
    showToast,
  } = usePortfolio();

  // Scroll to top when active project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeModalProject?.id]);

  // Keyboard navigation (Esc to return, Arrow Left/Right to change project)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'Escape') {
        closeProjectModal();
      } else if (e.key === 'ArrowRight') {
        goToNextProject();
      } else if (e.key === 'ArrowLeft') {
        goToPrevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProjectModal, goToNextProject, goToPrevProject]);

  if (!activeModalProject) return null;

  const projectIndex = data.projects.findIndex((p) => p.id === activeModalProject.id);
  const totalProjects = data.projects.length;

  const prevIndex = (projectIndex - 1 + totalProjects) % totalProjects;
  const nextIndex = (projectIndex + 1) % totalProjects;
  const prevProject = data.projects[prevIndex];
  const nextProject = data.projects[nextIndex];

  const galleryCount = activeModalProject.galleryImageIds.length;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Enlace del proyecto copiado al portapapeles');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111111] flex flex-col selection:bg-[#FF4500] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP STICKY ARCHITECTURAL BAR                                           */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#f7f7f7]/95 backdrop-blur-md border-b border-[#111111]/15">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-3.5 flex items-center justify-between gap-4">
          
          {/* Back button */}
          <button
            type="button"
            onClick={closeProjectModal}
            className="group flex items-center gap-2.5 px-4 py-2 bg-[#111111] hover:bg-[#FF4500] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>VOLVER A PROYECTOS</span>
          </button>

          {/* Breadcrumb / Project Indicator */}
          <div className="hidden md:flex items-center gap-3 font-mono text-xs text-[#111111]/70 uppercase tracking-widest">
            <span className="text-[#FF4500] font-bold">
              {activeModalProject.number}
            </span>
            <span className="text-[#111111]/30">/</span>
            <span className="font-semibold text-[#111111] truncate max-w-[280px]">
              {activeModalProject.title}
            </span>
            <span className="text-[#111111]/30">/</span>
            <span className="text-[#111111]/50 text-[11px]">
              [{projectIndex + 1} DE {totalProjects}]
            </span>
          </div>

          {/* Navigation Controls: Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copiar enlace directo"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-[#111111]/20 hover:border-[#FF4500] hover:text-[#FF4500] text-[#111111] font-mono text-xs uppercase transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">COMPARTIR</span>
            </button>

            <button
              type="button"
              onClick={closeProjectModal}
              title="Cerrar vista de proyecto (Esc)"
              className="p-2 border border-[#111111]/20 hover:bg-[#FF4500] hover:text-white transition-colors"
              aria-label="Cerrar vista"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN FULL-PAGE PROJECT CONTENT CONTAINER                               */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-10 lg:py-16 space-y-16 lg:space-y-24">
        
        {/* ======================================================================= */}
        {/* A. PROJECT HERO HEADER (Monumental brutalist typography & metadata)    */}
        {/* ======================================================================= */}
        <section className="border-b border-[#111111]/15 pb-12 lg:pb-16">
          {/* Metadata Top Bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs uppercase tracking-widest text-[#111111]/70 mb-6">
            <span className="px-2.5 py-1 bg-[#111111] text-[#FF4500] font-bold">
              <EditableText
                path={`projects.${projectIndex}.number`}
                value={activeModalProject.number}
              />
            </span>
            <span className="text-[#111111]/30">·</span>
            <span className="font-semibold text-[#111111]">
              <EditableText
                path={`projects.${projectIndex}.category`}
                value={activeModalProject.category}
              />
            </span>
            <span className="text-[#111111]/30">·</span>
            <span>
              <EditableText
                path={`projects.${projectIndex}.location`}
                value={activeModalProject.location}
              />
            </span>
            <span className="text-[#111111]/30">·</span>
            <span>
              <EditableText
                path={`projects.${projectIndex}.year`}
                value={activeModalProject.year}
              />
            </span>
          </div>

          {/* Monumental Project Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight leading-[1.05] max-w-5xl mb-6">
            <EditableText
              path={`projects.${projectIndex}.title`}
              value={activeModalProject.title}
            />
          </h1>

          {/* Executive Subtitle / Abstract */}
          <div className="max-w-4xl">
            <p className="font-sans text-lg sm:text-xl lg:text-2xl text-[#111111]/85 leading-relaxed font-normal">
              <EditableText
                path={`projects.${projectIndex}.shortDescription`}
                value={activeModalProject.shortDescription}
                multiline
              />
            </p>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* B. PRIMARY EXHIBITION COVER VISUAL (1:1 Square Architectural Stage)    */}
        {/* ======================================================================= */}
        <section className="space-y-3">
          <div className="flex justify-center w-full">
            <div className="relative overflow-hidden w-full max-w-[800px] aspect-square bg-[#f0f0f0] border border-[#111111]/15 group/cover shrink-0">
              <EditableImage
                imageId={activeModalProject.coverImageId}
                defaultAlt={`${activeModalProject.title} - Vista Principal`}
                className="w-full h-full aspect-square object-cover cursor-zoom-in transition-transform duration-500 group-hover/cover:scale-[1.01]"
                containerClassName="w-full h-full aspect-square"
                forceAspectRatio="aspect-square"
                allowResize={false}
                onClick={() => {
                  const img = getImage(activeModalProject.coverImageId);
                  if (onOpenLightbox) onOpenLightbox(img.src, img.alt);
                }}
              />

              {/* Click to expand overlay button */}
              <button
                type="button"
                onClick={() => {
                  const img = getImage(activeModalProject.coverImageId);
                  if (onOpenLightbox) onOpenLightbox(img.src, img.alt);
                }}
                title="Expandir imagen en formato 1:1"
                className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-[#111111]/85 hover:bg-[#FF4500] text-white font-mono text-xs backdrop-blur-sm transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold tracking-wider uppercase">EXPANDIR IMAGEN 1:1</span>
              </button>
            </div>
          </div>

          {/* Architectural Caption Bar */}
          <div className="max-w-[800px] mx-auto flex flex-wrap items-center justify-between text-xs font-mono text-[#111111]/60 px-1 pt-1 border-t border-[#111111]/10">
            <div className="flex items-center gap-2">
              <span className="text-[#FF4500] font-bold">■</span>
              <span>RENDER PRINCIPAL 1:1 // PERSPECTIVA DE CONJUNTO</span>
            </div>
            <div className="text-[11px]">
              EXPEDIENTE TÉCNICO · {activeModalProject.number}
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* C. ORGANIZED TWO-COLUMN DOSSIER & TECHNICAL SPECIFICATIONS             */}
        {/* ======================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-6 border-t-2 border-[#111111]">
          
          {/* LEFT COLUMN: MEMORIA DESCRIPTIVA & ARQUITECTURA (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF4500] tracking-widest uppercase">
              <span>01</span>
              <span className="h-px w-6 bg-[#FF4500]" />
              <span>MEMORIA ARQUITECTÓNICA & CONCEPTO</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight leading-snug">
              Desarrollo Proyectual, Criterios Espaciales y Materialidad
            </h2>

            <div className="font-sans text-[16px] sm:text-[17px] text-[#111111]/90 leading-relaxed font-normal space-y-4">
              <EditableText
                path={`projects.${projectIndex}.fullDescription`}
                value={activeModalProject.fullDescription}
                multiline
              />
            </div>
          </div>

          {/* RIGHT COLUMN: FICHA TÉCNICA DETALLADA (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF4500] tracking-widest uppercase">
              <span>02</span>
              <span className="h-px w-6 bg-[#FF4500]" />
              <span>FICHA TÉCNICA OFICIAL</span>
            </div>

            <div className="bg-[#f0f0f0] border border-[#111111]/15 p-6 space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-[#111111] tracking-wider pb-3 border-b border-[#111111]/15 flex items-center justify-between">
                <span>ESPECIFICACIONES DE OBRA</span>
                <span className="text-[#FF4500]">{activeModalProject.number}</span>
              </h3>

              {/* Fixed core metadata fields */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-baseline py-1.5 border-b border-[#111111]/10">
                  <span className="text-[#111111]/60 uppercase tracking-wider">Programa</span>
                  <span className="font-bold text-[#111111] text-right">{activeModalProject.category}</span>
                </div>
                <div className="flex justify-between items-baseline py-1.5 border-b border-[#111111]/10">
                  <span className="text-[#111111]/60 uppercase tracking-wider">Localización</span>
                  <span className="font-bold text-[#111111] text-right">{activeModalProject.location}</span>
                </div>
                <div className="flex justify-between items-baseline py-1.5 border-b border-[#111111]/10">
                  <span className="text-[#111111]/60 uppercase tracking-wider">Año de Proyecto</span>
                  <span className="font-bold text-[#111111] text-right">{activeModalProject.year}</span>
                </div>

                {/* Dynamic custom specs */}
                {activeModalProject.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex justify-between items-baseline py-1.5 border-b border-[#111111]/10 group/spec"
                  >
                    <span className="text-[#111111]/60 uppercase tracking-wider flex items-center gap-1.5">
                      <EditableText
                        path={`projects.${projectIndex}.specs.${sIdx}.label`}
                        value={spec.label}
                      />
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => removeProjectSpec(activeModalProject.id, sIdx)}
                          title="Eliminar especificación"
                          className="text-[#FF4500] hover:text-black opacity-0 group-hover/spec:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                    <span className="font-bold text-[#111111] text-right">
                      <EditableText
                        path={`projects.${projectIndex}.specs.${sIdx}.value`}
                        value={spec.value}
                      />
                    </span>
                  </div>
                ))}
              </div>

              {/* Add spec button in edit mode */}
              {isEditMode && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => addProjectSpec(activeModalProject.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#111111] hover:bg-[#FF4500] text-white font-mono text-[11px] font-bold tracking-wider transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>AGREGAR DATO TÉCNICO</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </section>

        {/* ======================================================================= */}
        {/* D. VISUAL GALLERY & BLUEPRINT EXHIBITION (Interior Renders & Drawings) */}
        {/* ======================================================================= */}
        <section className="space-y-8 pt-8 border-t border-[#111111]/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#111111]/15">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF4500] tracking-widest uppercase mb-2">
                <span>03</span>
                <span className="h-px w-6 bg-[#FF4500]" />
                <span>EXPEDIENTE VISUAL & DETALLES</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight">
                Galería de Renders, Vistas Interiores & Materialidad
              </h2>
              <p className="font-mono text-xs text-[#111111]/60 mt-1">
                {galleryCount} {galleryCount === 1 ? 'registro visual disponible' : 'registros visuales disponibles'}. Haz clic en cualquier vista para ampliarla en alta definición.
              </p>
            </div>

            {/* In Edit Mode: Button to add a new gallery render slot */}
            {isEditMode && (
              <button
                type="button"
                onClick={() => addGalleryImageToProject(activeModalProject.id)}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#FF4500] hover:bg-[#111111] text-white font-mono text-xs font-bold tracking-wider transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>AGREGAR RENDER A GALERÍA</span>
              </button>
            )}
          </div>

          {/* Dynamic Grid: 1 col, 2 cols, or 3 cols based on count */}
          {galleryCount > 0 ? (
            <div className={`grid grid-cols-1 ${galleryCount === 1 ? 'max-w-3xl' : galleryCount === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
              {activeModalProject.galleryImageIds.map((imgId, idx) => {
                return (
                  <div
                    key={imgId}
                    className="group relative bg-[#f0f0f0] border border-[#111111]/15 flex flex-col justify-between transition-all duration-300 hover:border-[#111111]"
                  >
                    <div className="relative overflow-hidden w-full aspect-square shrink-0 bg-[#f0f0f0]">
                      <EditableImage
                        imageId={imgId}
                        defaultAlt={`${activeModalProject.title} - Detalle ${idx + 1}`}
                        className="w-full h-full aspect-square object-cover shrink-0 cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.02]"
                        containerClassName="w-full h-full aspect-square"
                        forceAspectRatio="aspect-square"
                        allowResize={true}
                        onClick={() => {
                          const img = getImage(imgId);
                          if (onOpenLightbox) onOpenLightbox(img.src, img.alt);
                        }}
                      />

                      {/* Expand Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const img = getImage(imgId);
                          if (onOpenLightbox) onOpenLightbox(img.src, img.alt);
                        }}
                        title="Ver en pantalla completa"
                        className="absolute bottom-3 right-3 p-2 bg-[#111111]/85 hover:bg-[#FF4500] text-white backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Architectural detail footer label */}
                    <div className="p-3 bg-[#f7f7f7] border-t border-[#111111]/10 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-[#111111]/70 font-semibold">
                        <span className="text-[#FF4500]">DETALLE {String(idx + 1).padStart(2, '0')}</span>
                        <span>·</span>
                        <span className="text-[11px] uppercase truncate max-w-[160px]">
                          VISTA AXONOMÉTRICA / INTERIOR
                        </span>
                      </div>

                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => removeGalleryImageFromProject(activeModalProject.id, imgId)}
                          title="Eliminar este render de la galería"
                          className="text-[#FF4500] hover:text-[#111111] p-1 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">QUITAR</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 border border-dashed border-[#111111]/25 text-center text-[#111111]/60 font-mono text-sm bg-[#f0f0f0]/50">
              <p>No se han registrado imágenes interiores adicionales para este proyecto.</p>
              {isEditMode && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => addGalleryImageToProject(activeModalProject.id)}
                    className="px-4 py-2 bg-[#111111] text-white hover:bg-[#FF4500] font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    + AGREGAR PRIMER RENDER
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ======================================================================= */}
        {/* E. BOTTOM SUBTLE TEXT NAVIGATION: PREV & NEXT PROJECT                   */}
        {/* ======================================================================= */}
        <section className="pt-8 border-t border-[#111111]/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 text-xs font-mono">
            {/* Previous Project subtle link */}
            <button
              type="button"
              onClick={goToPrevProject}
              className="group flex items-center gap-2 text-[#111111]/70 hover:text-[#FF4500] transition-colors uppercase tracking-wider py-1.5"
            >
              <ChevronLeft className="w-4 h-4 text-[#FF4500] transition-transform duration-150 group-hover:-translate-x-1" />
              <span>
                <span className="font-bold text-[#111111] group-hover:text-[#FF4500]">ANTERIOR</span>
                <span className="mx-2 text-[#111111]/30">·</span>
                <span className="text-[#111111]/60 group-hover:text-[#FF4500]">{prevProject.title}</span>
              </span>
            </button>

            {/* Back to Catalogue subtle link */}
            <button
              type="button"
              onClick={closeProjectModal}
              className="text-[#111111]/60 hover:text-[#FF4500] transition-colors uppercase tracking-wider text-[11px] underline underline-offset-4 decoration-[#111111]/20 hover:decoration-[#FF4500] py-1.5"
            >
              VOLVER AL CATÁLOGO
            </button>

            {/* Next Project subtle link */}
            <button
              type="button"
              onClick={goToNextProject}
              className="group flex items-center gap-2 text-[#111111]/70 hover:text-[#FF4500] transition-colors uppercase tracking-wider py-1.5"
            >
              <span>
                <span className="text-[#111111]/60 group-hover:text-[#FF4500]">{nextProject.title}</span>
                <span className="mx-2 text-[#111111]/30">·</span>
                <span className="font-bold text-[#111111] group-hover:text-[#FF4500]">SIGUIENTE</span>
              </span>
              <ChevronRight className="w-4 h-4 text-[#FF4500] transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};
