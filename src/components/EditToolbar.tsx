import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Save,
  Download,
  Upload,
  RotateCcw,
  Plus,
  X,
  CheckCircle,
  Monitor,
  Tablet,
  Smartphone,
  Edit3,
} from 'lucide-react';

export const EditToolbar: React.FC = () => {
  const {
    isEditMode,
    setIsEditMode,
    currentBreakpoint,
    currentLogoDimensions,
    resetToDefaults,
    exportConfigAsJson,
    importConfigFromJson,
    addNewProject,
    toastMessage,
    showToast,
  } = usePortfolio();

  const jsonFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importConfigFromJson(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50">
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#111111] text-white border-l-4 border-[#FF4500] font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF4500]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Discrete toggle button when NOT in edit mode */}
      {!isEditMode && (
        <button
          type="button"
          onClick={() => {
            setIsEditMode(true);
            showToast('● MODO EDICIÓN ACTIVADO (Ctrl+Shift+E)');
          }}
          title="Activar Modo Edición Secreto (Ctrl + Shift + E)"
          className="fixed bottom-4 right-4 z-40 p-2.5 bg-[#111111] hover:bg-[#FF4500] text-white/70 hover:text-white border border-white/20 transition-colors group"
        >
          <Edit3 className="w-4 h-4" />
          <span className="sr-only">Activar Modo Edición</span>
        </button>
      )}

      {/* Full Floating Architectural Toolbar when IN edit mode */}
      {isEditMode && (
        <aside
          aria-label="Panel de Control de Edición"
          className="fixed bottom-0 inset-x-0 z-50 bg-[#111111] text-white border-t-2 border-[#FF4500] px-4 py-3 font-mono text-xs"
        >
          <input
            type="file"
            ref={jsonFileInputRef}
            onChange={handleJsonUpload}
            accept=".json"
            className="hidden"
          />

          <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Status & Current Breakpoint badge */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#FF4500] rounded-full animate-ping" />
                <span className="font-bold text-[#FF4500] tracking-wider uppercase">
                  MODO EDICIÓN ACTIVO
                </span>
                <span className="hidden sm:inline text-gray-400 text-[10px] bg-white/10 px-1.5 py-0.5">
                  Ctrl + Shift + E
                </span>
              </div>

              {/* Viewport Breakpoint Indicator */}
              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-white/10 border border-white/20 text-gray-300 text-[11px]">
                {currentBreakpoint === 'mobile' && <Smartphone className="w-3.5 h-3.5 text-[#FF4500]" />}
                {currentBreakpoint === 'tablet' && <Tablet className="w-3.5 h-3.5 text-[#FF4500]" />}
                {currentBreakpoint === 'desktop' && <Monitor className="w-3.5 h-3.5 text-[#FF4500]" />}
                <span className="uppercase font-semibold">Pantalla: {currentBreakpoint}</span>
                <span className="text-gray-400">· Logo: {currentLogoDimensions.width}×{currentLogoDimensions.height}px</span>
              </div>
            </div>

            {/* Center / Right: Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Add Project */}
              <button
                type="button"
                onClick={addNewProject}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+ PROYECTO</span>
              </button>

              {/* Export Configuration Button */}
              <button
                type="button"
                onClick={exportConfigAsJson}
                title="Descargar archivo sla-config.json con todos los textos, imágenes y dimensiones actuales"
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FF4500] hover:bg-[#e03e00] text-white font-bold tracking-wider uppercase transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>EXPORTAR CONFIGURACIÓN</span>
              </button>

              {/* Import JSON */}
              <button
                type="button"
                onClick={() => jsonFileInputRef.current?.click()}
                title="Cargar configuración desde archivo JSON"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden md:inline">IMPORTAR JSON</span>
              </button>

              {/* Reset Defaults */}
              <button
                type="button"
                onClick={() => {
                  if (confirm('¿Restablecer todo el contenido a los valores iniciales de fábrica?')) {
                    resetToDefaults();
                  }
                }}
                title="Restablecer textos e imágenes originales"
                className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#FF4500]/60 hover:border-[#FF4500] text-[#FF4500] hover:text-white hover:bg-[#FF4500]/20 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden md:inline">RESTABLECER</span>
              </button>

              {/* Exit Edit Mode */}
              <button
                type="button"
                onClick={() => {
                  setIsEditMode(false);
                  showToast('○ Modo edición finalizado');
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#f7f7f7] text-[#111111] hover:bg-[#FF4500] hover:text-[#f7f7f7] font-bold transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>SALIR</span>
              </button>
            </div>

          </div>
        </aside>
      )}

      {/* Botón flotante y muy visible en la esquina inferior durante el Modo Edición */}
      {isEditMode && (
        <div className="fixed bottom-16 right-6 z-50">
          <button
            type="button"
            onClick={exportConfigAsJson}
            title="Descargar sla-config.json con todos los ajustes visuales, textos y posiciones"
            className="group flex items-center gap-2.5 px-5 py-3.5 bg-[#FF4500] hover:bg-[#111111] text-white font-mono text-xs font-black tracking-wider uppercase shadow-2xl border-2 border-white transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4 stroke-[2.5] transition-transform group-hover:-translate-y-0.5" />
            <span>EXPORTAR CONFIGURACIÓN</span>
          </button>
        </div>
      )}
    </>
  );
};
