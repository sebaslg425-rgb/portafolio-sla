import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section className="relative border-b border-[#111111]/15 overflow-hidden bg-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Massive Brutalist Architectural Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top kicker */}
            <div className="mb-5 sm:mb-6 flex items-center gap-2">
              <span className="font-mono text-xs text-[#111111]/60 tracking-[0.28em] uppercase">
                <EditableText path="hero.dossierTag" value={data.hero.dossierTag} />
              </span>
            </div>

            {/* Headline: Diseñando la escena de lo cotidiano en dos renglones */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl leading-[1.06] font-black tracking-[-0.03em] text-[#111111] select-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <EditableText as="div" path="hero.line1" value={data.hero.line1} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
              <EditableText as="div" path="hero.line2" value={data.hero.line2} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
            </h1>

            {/* Espaciado y Frase secundaria agrupada sin dejar tantos espacios */}
            <div className="mt-6 sm:mt-7 font-sans text-xl sm:text-2xl lg:text-[1.85rem] font-bold tracking-tight text-[#111111] leading-snug flex flex-wrap items-baseline gap-x-2 gap-y-1 select-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <EditableText as="span" path="hero.line3" value={data.hero.line3} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
              <div className="inline-flex items-baseline gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <EditableText as="span" path="hero.line4Prefix" value={data.hero.line4Prefix} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                <span className="text-[#FF4500]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <EditableText as="span" path="hero.line4Accent" value={data.hero.line4Accent} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-[14px] text-[#111111]/80 max-w-xl font-normal leading-relaxed mt-5" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              <EditableText
                as="span"
                path="hero.subtitle"
                value={data.hero.subtitle}
                multiline
                style={{ fontFamily: 'monospace', fontSize: '14px' }}
              />
            </p>
          </div>

          {/* RIGHT COLUMN: Architectural Visual / Blueprint Dossier Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg lg:max-w-none bg-[#f7f7f7]">
              <EditableImage
                imageId="img_hero_billboard"
                defaultAlt="Panel de Dossier Técnico SLA"
                className="w-full h-auto object-contain"
                containerClassName="w-full"
                allowResize={true}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
