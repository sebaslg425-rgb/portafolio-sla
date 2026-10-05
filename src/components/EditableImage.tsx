import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Upload, RotateCcw, Image as ImageIcon, SlidersHorizontal, Square, Move, Maximize2 } from 'lucide-react';

interface EditableImageProps {
  imageId: string;
  defaultAlt?: string;
  className?: string;
  containerClassName?: string;
  forceAspectRatio?: string; // e.g. 'aspect-square'
  onClick?: () => void;
  allowResize?: boolean;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  imageId,
  defaultAlt = 'SLA Arquitectura',
  className = 'w-full h-full object-cover shrink-0',
  containerClassName = '',
  forceAspectRatio,
  onClick,
  allowResize = true,
}) => {
  const {
    isEditMode,
    currentBreakpoint,
    getImage,
    getImageState,
    updateImageSrc,
    updateImageBreakpointState,
    updateImagePan,
    resetImageDimensions,
    showToast,
  } = usePortfolio();

  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [activeInteractionMode, setActiveInteractionMode] = useState<'resize' | 'pan'>('resize');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imgData = getImage(imageId);
  const currentSrc = imgData.src;
  const currentAlt = imgData.alt || defaultAlt;

  // Retrieve isolated breakpoint-specific state for this exact image and device view
  const bpState = getImageState(imageId, currentBreakpoint);
  const customWidth = bpState.width;
  const customHeight = bpState.height;
  const panX = bpState.panX || 0;
  const panY = bpState.panY || 0;

  const isForcedSquare = Boolean(
    forceAspectRatio?.includes('aspect-square') ||
    containerClassName?.includes('aspect-square')
  );

  // Dragging state for free asymmetric resizing or panning
  const dragRef = useRef<{
    type: 'resize' | 'pan';
    handle?: string; // 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startPanX: number;
    startPanY: number;
  } | null>(null);

  // Handle native file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Por favor selecciona un archivo de imagen válido');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateImageSrc(imageId, result, file.name, file.name);
        setHasError(false);
        showToast(`Imagen actualizada: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Begin resize handle dragging
  const handleResizePointerDown = (e: React.PointerEvent, handle: string) => {
    e.stopPropagation();
    e.preventDefault();

    const rect = containerRef.current?.getBoundingClientRect();
    const currentW = customWidth || (rect ? Math.round(rect.width) : 400);
    const currentH = customHeight || (rect ? Math.round(rect.height) : 400);

    dragRef.current = {
      type: 'resize',
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: currentW,
      startHeight: currentH,
      startPanX: panX,
      startPanY: panY,
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Begin pan dragging
  const handlePanPointerDown = (e: React.PointerEvent) => {
    if (!isEditMode || activeInteractionMode !== 'pan') return;
    e.stopPropagation();
    e.preventDefault();

    dragRef.current = {
      type: 'pan',
      startX: e.clientX,
      startY: e.clientY,
      startWidth: customWidth || 400,
      startHeight: customHeight || 400,
      startPanX: panX,
      startPanY: panY,
    };

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Unified pointer move for free asymmetric resize or pan
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    e.stopPropagation();
    e.preventDefault();

    const { type, handle, startX, startY, startWidth, startHeight, startPanX, startPanY } = dragRef.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    if (type === 'resize' && handle) {
      let nextW = startWidth;
      let nextH = startHeight;

      if (isForcedSquare) {
        const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        const nextSide = Math.max(80, Math.round(startWidth + delta));
        nextW = nextSide;
        nextH = nextSide;
      } else {
        // Asymmetric horizontal adjustment
        if (handle.includes('e')) {
          nextW = Math.max(30, Math.round(startWidth + deltaX));
        } else if (handle.includes('w')) {
          nextW = Math.max(30, Math.round(startWidth - deltaX));
        }

        // Asymmetric vertical adjustment
        if (handle.includes('s')) {
          nextH = Math.max(15, Math.round(startHeight + deltaY));
        } else if (handle.includes('n')) {
          nextH = Math.max(15, Math.round(startHeight - deltaY));
        }
      }

      updateImageBreakpointState(imageId, currentBreakpoint, {
        width: nextW,
        height: nextH,
      });
    } else if (type === 'pan') {
      const nextPanX = Math.round(startPanX + deltaX);
      const nextPanY = Math.round(startPanY + deltaY);
      updateImagePan(imageId, nextPanX, nextPanY, currentBreakpoint);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragRef.current) {
      e.stopPropagation();
      dragRef.current = null;
    }
  };

  const handleSetSquare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = containerRef.current?.getBoundingClientRect();
    const side = customWidth || customHeight || (rect ? Math.round(rect.width) : 450);
    updateImageBreakpointState(imageId, currentBreakpoint, {
      width: side,
      height: side,
    });
    showToast(`1:1 fijado para ${currentBreakpoint.toUpperCase()}: ${side}x${side}px`);
  };

  const handleResetCurrentBreakpoint = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetImageDimensions(imageId, currentBreakpoint);
    showToast(`Dimensiones restablecidas para ${currentBreakpoint.toUpperCase()}`);
  };

  // Reset pan translation
  const handleResetPan = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateImagePan(imageId, 0, 0, currentBreakpoint);
    showToast(`Encuadre centrado (0,0) en ${currentBreakpoint.toUpperCase()}`);
  };

  // Custom inline styles for container
  const containerInlineStyles: React.CSSProperties = {};
  if (isForcedSquare) {
    containerInlineStyles.aspectRatio = '1 / 1';
    if (customWidth || customHeight) {
      const squareSide = customWidth || customHeight;
      containerInlineStyles.width = `${squareSide}px`;
      containerInlineStyles.height = `${squareSide}px`;
      containerInlineStyles.maxWidth = '100%';
    }
  } else {
    if (customWidth) {
      containerInlineStyles.width = `${customWidth}px`;
      containerInlineStyles.maxWidth = '100%';
    }
    if (customHeight) {
      containerInlineStyles.height = `${customHeight}px`;
    }
  }

  // Transform for pan/move
  const imgInlineStyles: React.CSSProperties = {
    transform: panX || panY ? `translate(${panX}px, ${panY}px)` : undefined,
    transformOrigin: 'center center',
  };

  const hasCustomDimensions = Boolean(customWidth || customHeight);

  // In Edit Mode, clicking the image must NOT open modals
  const handleContainerClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.stopPropagation();
      setShowControls(true);
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`relative select-none ${containerClassName} ${
        isForcedSquare ? 'aspect-square' : !hasCustomDimensions ? forceAspectRatio || '' : ''
      } ${isEditMode ? 'outline-dashed outline-1 outline-[#FF4500]/60' : ''}`}
      style={hasCustomDimensions ? containerInlineStyles : undefined}
    >
      {/* Native file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Render Image or Clean Architectural Fallback */}
      <div
        className={`w-full h-full overflow-hidden relative ${isForcedSquare ? 'aspect-square' : ''}`}
        onPointerDown={handlePanPointerDown}
        style={{
          cursor: isEditMode && activeInteractionMode === 'pan' ? 'grab' : undefined,
        }}
      >
        {!hasError && currentSrc ? (
          <img
            src={currentSrc}
            alt={currentAlt}
            onError={() => {
              const fallback = (imgData as any)?.fallbackSvg;
              if (fallback && currentSrc !== fallback) {
                updateImageSrc(imageId, fallback, currentAlt, imgData.fileName);
              } else {
                setHasError(true);
              }
            }}
            referrerPolicy="no-referrer"
            className={`${className} ${isForcedSquare ? 'w-full h-full aspect-square object-cover' : ''} pointer-events-auto transition-opacity duration-150`}
            style={imgInlineStyles}
            draggable={false}
          />
        ) : (
          <div
            className={`${className} bg-[#f7f7f7] border border-[#111111]/20 flex flex-col items-center justify-center p-6 text-center text-[#111111]/70`}
            style={imgInlineStyles}
          >
            <ImageIcon className="w-8 h-8 mb-2 stroke-[1.5] text-[#FF4500]" />
            <span className="font-mono text-[11px] uppercase tracking-widest font-semibold">{currentAlt}</span>
            <span className="font-mono text-[9px] text-[#111111]/50 mt-1">SLA DOSSIER TÉCNICO</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* EDIT MODE: FREE ASYMMETRIC RESIZE HANDLES (4 CORNERS + 4 EDGES)           */}
      {/* ========================================================================= */}
      {isEditMode && allowResize && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Top-Left Corner Handle */}
          <div
            onPointerDown={(e) => handleResizePointerDown(e, 'nw')}
            title="Arrastrar para redimensionar (esquina superior izquierda)"
            className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-[#111111] border border-[#FF4500] cursor-nwse-resize pointer-events-auto hover:bg-[#FF4500] transition-colors"
          />
          {/* Top-Right Corner Handle */}
          <div
            onPointerDown={(e) => handleResizePointerDown(e, 'ne')}
            title="Arrastrar para redimensionar (esquina superior derecha)"
            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#111111] border border-[#FF4500] cursor-nesw-resize pointer-events-auto hover:bg-[#FF4500] transition-colors"
          />
          {/* Bottom-Left Corner Handle */}
          <div
            onPointerDown={(e) => handleResizePointerDown(e, 'sw')}
            title="Arrastrar para redimensionar (esquina inferior izquierda)"
            className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-[#111111] border border-[#FF4500] cursor-nesw-resize pointer-events-auto hover:bg-[#FF4500] transition-colors"
          />
          {/* Bottom-Right Corner Handle */}
          <div
            onPointerDown={(e) => handleResizePointerDown(e, 'se')}
            title="Arrastrar para redimensionar libremente ancho y alto"
            className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#FF4500] border border-white cursor-nwse-resize pointer-events-auto hover:scale-125 transition-transform"
          />

          {/* Top Edge Handle */}
          <div
            onPointerDown={(e) => handleResizePointerDown(e, 'n')}
            title="Arrastrar borde superior (alto)"
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#111111] border border-white/60 cursor-ns-resize pointer-events-auto hover:bg-[#FF4500]"
          />
          {/* Bottom Edge Handle */}
          <div
            onPointerDown={(e) => handleResizePointerDown(e, 's')}
            title="Arrastrar borde inferior (alto)"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#111111] border border-white/60 cursor-ns-resize pointer-events-auto hover:bg-[#FF4500]"
          />
          {/* Left Edge Handle */}
          <div
            onPointerDown={(e) => handleResizePointerDown(e, 'w')}
            title="Arrastrar borde izquierdo (ancho)"
            className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-8 bg-[#111111] border border-white/60 cursor-ew-resize pointer-events-auto hover:bg-[#FF4500]"
          />
          {/* Right Edge Handle */}
          <div
            onPointerDown={(e) => handleResizePointerDown(e, 'e')}
            title="Arrastrar borde derecho (ancho)"
            className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-8 bg-[#111111] border border-white/60 cursor-ew-resize pointer-events-auto hover:bg-[#FF4500]"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODE: TOP FLOATING CONTROL BAR (BREAKPOINT-AWARE & ACTIONABLE)        */}
      {/* ========================================================================= */}
      {isEditMode && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 z-40 flex flex-col items-end gap-1 font-mono text-[10px]"
        >
          {/* Main Quick Toolbar */}
          <div className="flex items-center gap-1 bg-[#111111] text-white border border-[#FF4500] p-1 shadow-none">
            {/* Breakpoint Badge */}
            <span className="px-1.5 py-0.5 bg-white/10 text-[#FF4500] font-bold uppercase tracking-wider">
              {currentBreakpoint}
            </span>

            {/* Upload image button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Reemplazar archivo de imagen"
              className="flex items-center gap-1 px-2 py-0.5 bg-[#FF4500] hover:bg-[#e03e00] text-white font-bold transition-colors"
            >
              <Upload className="w-3 h-3" />
              <span>SUBIR</span>
            </button>

            {/* Toggle Pan (Move) vs Resize */}
            {allowResize && (
              <button
                type="button"
                onClick={() =>
                  setActiveInteractionMode(activeInteractionMode === 'pan' ? 'resize' : 'pan')
                }
                title={
                  activeInteractionMode === 'pan'
                    ? 'Modo Mover activo: arrastra la imagen dentro de su marco'
                    : 'Activar modo arrastrar para encuadrar/mover imagen'
                }
                className={`p-1 flex items-center gap-1 transition-colors ${
                  activeInteractionMode === 'pan'
                    ? 'bg-[#FF4500] text-white font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                <Move className="w-3 h-3" />
                <span className="hidden sm:inline">MOVER</span>
              </button>
            )}

            {/* Toggle sliders panel */}
            {allowResize && (
              <button
                type="button"
                onClick={() => setShowControls(!showControls)}
                title="Abrir panel numérico de dimensiones y encuadre"
                className={`p-1 transition-colors ${
                  showControls ? 'bg-white text-black font-bold' : 'hover:bg-white/20 text-white'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Interactive Numerical Sliders & Presets Panel */}
          {allowResize && showControls && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] text-white border border-white/20 p-3 w-72 text-left space-y-3"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                <span>ESTADO: {currentBreakpoint.toUpperCase()}</span>
                <span className="text-[#FF4500] truncate max-w-[120px]">{imageId}</span>
              </div>

              {/* Width Slider */}
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-gray-400">ANCHO (W):</span>
                  <span className="text-white font-bold">
                    {customWidth ? `${customWidth}px` : 'Auto (Responsive)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="1200"
                  step="5"
                  value={customWidth || 275}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const rect = containerRef.current?.getBoundingClientRect();
                    const h = customHeight || (rect ? Math.round(rect.height) : 58);
                    updateImageBreakpointState(imageId, currentBreakpoint, {
                      width: val,
                      height: h,
                    });
                  }}
                  className="w-full accent-[#FF4500] cursor-pointer"
                />
              </div>

              {/* Height Slider */}
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-gray-400">ALTO (H):</span>
                  <span className="text-white font-bold">
                    {customHeight ? `${customHeight}px` : 'Auto (Responsive)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="1000"
                  step="2"
                  value={customHeight || 58}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const rect = containerRef.current?.getBoundingClientRect();
                    const w = customWidth || (rect ? Math.round(rect.width) : 275);
                    updateImageBreakpointState(imageId, currentBreakpoint, {
                      width: w,
                      height: val,
                    });
                  }}
                  className="w-full accent-[#FF4500] cursor-pointer"
                />
              </div>

              {/* Pan X and Y Sliders */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-400">DESPLAZAMIENTO (PAN):</span>
                  <span className="text-[#FF4500] font-bold">
                    X: {panX}px | Y: {panY}px
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[9px] text-gray-500 block mb-0.5">X:</span>
                    <input
                      type="range"
                      min="-300"
                      max="300"
                      step="1"
                      value={panX}
                      onChange={(e) => updateImagePan(imageId, Number(e.target.value), panY, currentBreakpoint)}
                      className="w-full accent-[#FF4500] cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block mb-0.5">Y:</span>
                    <input
                      type="range"
                      min="-300"
                      max="300"
                      step="1"
                      value={panY}
                      onChange={(e) => updateImagePan(imageId, panX, Number(e.target.value), currentBreakpoint)}
                      className="w-full accent-[#FF4500] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Actions & Presets */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleSetSquare}
                  title="Fijar relación de aspecto 1:1"
                  className="flex-1 flex items-center justify-center gap-1 py-1 bg-white/10 hover:bg-white/20 text-gray-200 text-[9px] transition-colors"
                >
                  <Square className="w-3 h-3 text-[#FF4500]" />
                  <span>1:1</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetPan}
                  title="Centrar traslación a 0,0"
                  className="flex-1 flex items-center justify-center gap-1 py-1 bg-white/10 hover:bg-white/20 text-gray-200 text-[9px] transition-colors"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>CENTRAR</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCurrentBreakpoint}
                  title={`Restablecer solo para ${currentBreakpoint.toUpperCase()}`}
                  className="flex-1 flex items-center justify-center gap-1 py-1 bg-white/10 hover:bg-white/20 text-gray-200 text-[9px] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESET</span>
                </button>
              </div>

              <div className="text-[8px] text-gray-500 leading-tight">
                * Los cambios se guardan exclusivamente para la vista <strong>{currentBreakpoint.toUpperCase()}</strong>.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
