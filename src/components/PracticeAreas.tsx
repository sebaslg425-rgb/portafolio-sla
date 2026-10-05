import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';

export const PracticeAreas: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="areas-de-practica" className="py-24 lg:py-32 border-b border-[#111111]/15 bg-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section kicker */}
        <div className="mb-14">
          <span className="font-mono text-xs text-[#111111]/60 tracking-[0.28em] uppercase">
            <EditableText path="practiceAreasTitle" value={data.practiceAreasTitle} />
          </span>
        </div>

        {/* 3 Column Grid with Orange Top Accent Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {data.practiceAreas.map((area, index) => (
            <div
              key={area.id}
              className="relative flex flex-col justify-between pt-6 border-t-2 border-[#FF4500]"
            >
              <div>
                {/* Number in Orange Topográfico */}
                <div className="font-mono text-sm font-bold text-[#FF4500] tracking-widest mb-4">
                  <EditableText
                    path={`practiceAreas.${index}.number`}
                    value={area.number}
                  />
                </div>

                {/* Area Title */}
                <h3
                  className="text-2xl lg:text-[1.75rem] font-bold text-[#111111] leading-tight mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <EditableText
                    path={`practiceAreas.${index}.title`}
                    value={area.title}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  />
                </h3>

                {/* Main Description */}
                <p className="font-sans text-[15px] text-[#111111]/80 leading-relaxed mb-6">
                  <EditableText
                    path={`practiceAreas.${index}.description`}
                    value={area.description}
                    multiline
                  />
                </p>

                {/* Detailed Technical Points */}
                <ul className="space-y-2.5 pt-4 text-xs font-mono text-[#111111]/70">
                  {area.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-2">
                      <span className="text-[#FF4500] select-none">■</span>
                      <span>
                        <EditableText
                          path={`practiceAreas.${index}.points.${pIndex}`}
                          value={point}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom decorative coordinates badge */}
              <div className="mt-8 pt-4 flex justify-between items-center text-[10px] font-mono text-[#111111]/50 uppercase tracking-widest">
                <span>FASE TÉCNICA {area.number}</span>
                <span className="text-[#FF4500]">ESTRICTO</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
