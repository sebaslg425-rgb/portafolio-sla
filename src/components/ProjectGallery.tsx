import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { Plus, Trash2, Maximize2 } from 'lucide-react';

export const ProjectGallery: React.FC = () => {
  const { data, openProjectModal, isEditMode, addNewProject, deleteProject } = usePortfolio();

  // Exactly 4 projects in horizontal retícula
  const projects = data.projects.slice(0, 4);

  return (
    <section id="proyectos" className="py-20 lg:py-32 border-b border-[#111111]/15 bg-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* 1. Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 sm:mb-12 border-b border-[#111111]/15">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FF4500] font-bold tracking-[0.25em] uppercase">
              <span>02</span>
              <span className="h-px w-6 bg-[#FF4500]" />
              <span className="text-[#111111]/60">PORTAFOLIO DE ARQUITECTURA</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
              <EditableText path="projectsTitle" value={data.projectsTitle} />
            </h2>
          </div>

          <div className="max-w-lg lg:text-right flex flex-col lg:items-end">
            <p className="font-sans text-sm sm:text-base text-[#111111]/70 leading-relaxed font-normal">
              <EditableText path="projectsSubtitle" value={data.projectsSubtitle} multiline />
            </p>

            {/* In Edit Mode: Button to add a new project */}
            {isEditMode && (
              <button
                type="button"
                onClick={addNewProject}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#FF4500] hover:bg-[#e03e00] text-white font-mono text-xs font-bold tracking-wider transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ AÑADIR NUEVO PROYECTO</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-header info bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[#111111]/50 mb-8 pb-3 border-b border-[#111111]/10">
          <span>RETÍCULA HORIZONTAL // SELECCIÓN DE 4 PROYECTOS</span>
          <span className="hidden sm:inline">HAZ CLIC EN CUALQUIER PROYECTO PARA ABRIR LA FICHA TÉCNICA</span>
          <span>[{projects.length} PROYECTOS]</span>
        </div>

        {/* 2. Retícula Horizontal de 4 con Respiro y Espaciado Generoso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((project, index) => {
            return (
              <div
                key={project.id}
                className="group relative bg-[#111111] border border-[#111111]/15 overflow-hidden aspect-square select-none cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  if (!isEditMode) {
                    openProjectModal(project);
                  }
                }}
              >
                {/* Cover Image: strictly 1:1 square, smooth zoom on hover */}
                <div className="w-full h-full aspect-square overflow-hidden bg-[#f0f0f0]">
                  <EditableImage
                    imageId={project.coverImageId}
                    defaultAlt={`${project.title} - ${project.category}`}
                    className={`w-full h-full aspect-square object-cover shrink-0 group-hover:scale-105 transition-transform duration-500 ${
                      isEditMode ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    containerClassName="w-full h-full aspect-square"
                    forceAspectRatio="aspect-square"
                    allowResize={isEditMode}
                  />
                </div>

                {/* Sombreado oscuro (bg-black/40) con texto "VER PROYECTO" centrado y metadatos */}
                {!isEditMode && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 sm:p-6 pointer-events-none z-10 text-white">
                    {/* Top Row: Number & Category */}
                    <div className="flex items-center justify-between font-mono text-xs font-bold text-[#FF4500] tracking-widest uppercase">
                      <span>{project.number} // {project.category}</span>
                      <span className="text-white/70 text-[10px] font-normal">{project.year}</span>
                    </div>

                    {/* Center Action Badge: VER PROYECTO */}
                    <div className="text-center my-auto">
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white font-mono font-bold bg-[#111111]/90 px-4 py-2 border border-white/25 backdrop-blur-sm shadow-xl group-hover:border-[#FF4500] transition-colors">
                        <span>VER PROYECTO</span>
                        <Maximize2 className="w-3.5 h-3.5 text-[#FF4500]" />
                      </span>
                    </div>

                    {/* Bottom: Project Title & Location */}
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[10px] text-white/70 tracking-wider mt-0.5 uppercase">
                        {project.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* En modo edición: Controles independientes para editar ficha y eliminar proyecto */}
                {isEditMode && (
                  <div className="absolute top-2 right-2 z-30 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectModal(project);
                      }}
                      title="Abrir ficha técnica para editar información y renders"
                      className="px-2 py-1 bg-[#111111]/90 hover:bg-[#FF4500] text-white text-[10px] font-mono font-bold transition-colors border border-white/20"
                    >
                      EDITAR FICHA
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`¿Eliminar "${project.title}" del portafolio?`)) {
                          deleteProject(project.id);
                        }
                      }}
                      title="Eliminar este proyecto"
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
    </section>
  );
};
