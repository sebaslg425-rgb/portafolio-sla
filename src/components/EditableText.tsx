import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Check, RotateCcw, Type } from 'lucide-react';

interface EditableTextProps {
  path: string;
  value: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  path,
  value,
  as: Component = 'span',
  className = '',
  style,
  placeholder = 'Texto...',
  multiline = false,
}) => {
  const { isEditMode, updateNestedText, getTextStyle, updateTextStyle, resetTextStyle } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Custom typography style stored for this text path
  const customStyle = getTextStyle(path);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSaveAndClose = () => {
    setIsEditing(false);
    if (draft !== value) {
      updateNestedText(path, draft);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSaveAndClose();
    } else if (e.key === 'Escape') {
      setDraft(value);
      setIsEditing(false);
    }
  };

  // Compute merged typography styles
  const mergedStyle: React.CSSProperties = {
    ...style,
  };
  if (customStyle?.fontSize) {
    mergedStyle.fontSize = `${customStyle.fontSize}px`;
  }
  if (customStyle?.lineHeight) {
    mergedStyle.lineHeight = customStyle.lineHeight;
  }

  // Not in edit mode: clean semantic rendering with custom typography applied
  if (!isEditMode) {
    return (
      <Component className={className} style={mergedStyle}>
        {value}
      </Component>
    );
  }

  // Current active font size number (fallback from computed style or 16)
  const currentFontSize = customStyle?.fontSize || 16;
  const currentLineHeight = customStyle?.lineHeight || 1.3;

  const handleFontSizeChange = (delta: number) => {
    const nextSize = Math.max(10, Math.min(140, currentFontSize + delta));
    updateTextStyle(path, { fontSize: nextSize });
  };

  const handleLineHeightPreset = (lh: number) => {
    updateTextStyle(path, { lineHeight: lh });
  };

  if (isEditing) {
    return (
      <div ref={containerRef} className="relative inline-block w-full my-1 z-30">
        {/* Floating Typography Quick Toolbar (docked directly above the editable text) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute -top-12 left-0 z-50 flex items-center gap-2 bg-[#111111] text-white border border-[#FF4500] px-2.5 py-1 text-[11px] font-mono shadow-none select-none whitespace-nowrap"
        >
          <div className="flex items-center gap-1.5 pr-2 border-r border-white/20">
            <Type className="w-3.5 h-3.5 text-[#FF4500]" />
            <span className="text-gray-400 uppercase text-[10px]">TAMAÑO:</span>
            <button
              type="button"
              onClick={() => handleFontSizeChange(-2)}
              className="px-1.5 py-0.5 bg-white/10 hover:bg-[#FF4500] text-white font-bold"
              title="Reducir fuente"
            >
              -
            </button>
            <span className="font-bold text-white min-w-[32px] text-center">
              {customStyle?.fontSize ? `${customStyle.fontSize}px` : 'Auto'}
            </span>
            <button
              type="button"
              onClick={() => handleFontSizeChange(2)}
              className="px-1.5 py-0.5 bg-white/10 hover:bg-[#FF4500] text-white font-bold"
              title="Aumentar fuente"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-1 pr-2 border-r border-white/20">
            <span className="text-gray-400 uppercase text-[10px]">INTERLÍNEA:</span>
            {[1.0, 1.15, 1.3, 1.5, 1.8].map((lh) => (
              <button
                key={lh}
                type="button"
                onClick={() => handleLineHeightPreset(lh)}
                className={`px-1.5 py-0.5 text-[10px] transition-colors ${
                  currentLineHeight === lh ? 'bg-[#FF4500] text-white font-bold' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                {lh}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => resetTextStyle(path)}
            title="Restablecer tipografía a valores por defecto"
            className="p-1 hover:text-[#FF4500] text-gray-400 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={handleSaveAndClose}
            className="flex items-center gap-1 px-2 py-0.5 bg-[#FF4500] hover:bg-[#e03e00] text-white font-bold text-[10px] ml-1"
          >
            <Check className="w-3 h-3" />
            <span>LISTO</span>
          </button>
        </div>

        {/* Content Editor */}
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => {
              if (draft !== value) updateNestedText(path, draft);
            }}
            onKeyDown={handleKeyDown}
            style={mergedStyle}
            className={`${className} bg-white text-[#111111] border-2 border-[#FF4500] p-3 outline-none w-full resize-y min-h-[90px] font-sans rounded-none`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => {
              if (draft !== value) updateNestedText(path, draft);
            }}
            onKeyDown={handleKeyDown}
            style={mergedStyle}
            className={`${className} bg-white text-[#111111] border-2 border-[#FF4500] px-3 py-1 outline-none w-full font-sans rounded-none`}
          />
        )}
      </div>
    );
  }

  return (
    <Component
      onClick={() => setIsEditing(true)}
      title="Clic para editar contenido, tamaño de fuente e interlineado (Modo Edición)"
      style={mergedStyle}
      className={`${className} relative cursor-pointer group outline-dashed outline-1 outline-[#FF4500]/50 hover:outline-[#FF4500] hover:bg-[#FF4500]/5 transition-all duration-150`}
    >
      {value || <span className="text-gray-400 italic">{placeholder}</span>}
      <span className="sr-only">Editar texto y tipografía</span>
    </Component>
  );
};
