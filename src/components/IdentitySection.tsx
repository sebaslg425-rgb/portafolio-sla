import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';

export const IdentitySection: React.FC = () => {
  const { data, isEditMode } = usePortfolio();

  const defaultSoftwareList = [
    '2D (AutoCAD)',
    'BIM (Revit)',
    'Visualización (D5 Render)',
    'Post (Photoshop)',
    'Gestión (Office)',
  ];

  const softwareItems =
    data.identity.softwareList && data.identity.softwareList.length > 0
      ? data.identity.softwareList
      : defaultSoftwareList;

  const parseBio = (text: string) => {
    const targetPhrase = 'diseñando así la escena de lo cotidiano';
    const idx = text.toLowerCase().indexOf(targetPhrase.toLowerCase());
    if (idx === -1) {
      return { lead: text, accent: '', tail: '' };
    }
    const lead = text.slice(0, idx);
    const remainder = text.slice(idx);
    const match = remainder.match(/^(diseñando así la escena de lo cotidiano\.?)/i);
    if (match) {
      return {
        lead,
        accent: match[0],
        tail: remainder.slice(match[0].length),
      };
    }
    return {
      lead,
      accent: targetPhrase,
      tail: remainder.slice(targetPhrase.length),
    };
  };

  const parsedBio = parseBio(data.identity.bio || '');

  return (
    <section id="identidad" className="py-24 lg:py-36 border-b border-[#111111]/15 bg-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Kicker */}
        <div className="mb-14">
          <span className="font-mono text-xs text-[#111111]/60 tracking-[0.28em] uppercase">
            <EditableText path="identity.kicker" value={data.identity.kicker} />
          </span>
        </div>

        {/* 2-Column Balanced Grid: Left (Portrait) | Right (Name + Trayectoria + Formación + Software) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* ========================================================================= */}
          {/* COLUMNA IZQUIERDA: RETRATO EN BLANCO Y NEGRO (Mismo alto que textos)      */}
          {/* ========================================================================= */}
          <div className="w-full h-full flex flex-col justify-between">
            {/* Marco de retrato que llena la altura de la columna */}
            <div className="w-full flex-1 min-h-[380px] lg:min-h-0 bg-[#111111] overflow-hidden flex flex-col">
              <EditableImage
                imageId="img_portrait"
                defaultAlt="Fotografía de retrato de Sebastián Lozada González"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                containerClassName="w-full h-full flex-1"
                allowResize={true}
              />
            </div>

            {/* Pie técnico sutil bajo el retrato */}
            <div className="pt-2 px-0.5 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#111111]/55 uppercase shrink-0">
              <EditableText
                path="identity.portraitCaption"
                value={data.identity.portraitCaption || 'DIRECTOR / PROYECTISTA — ARQ. SEBASTIÁN LOZADA GONZÁLEZ'}
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMNA DERECHA: NOMBRE + TRAYECTORIA + FORMACIÓN + SOFTWARE             */}
          {/* ========================================================================= */}
          <div className="w-full flex flex-col space-y-5">
            
            {/* Nombre: Sebastián Lozada González */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#FF4500] tracking-tight leading-[1.08]">
                <EditableText
                  path="identity.firstName"
                  value={data.identity.firstName}
                  className="text-[#FF4500]"
                  style={{ fontFamily: 'Plus Jakarta Sans', color: '#ff4500' }}
                />{' '}
                <span className="text-[#FF4500]">
                  <EditableText
                    path="identity.lastName"
                    value={data.identity.lastName}
                    className="text-[#FF4500]"
                    style={{ fontFamily: 'Plus Jakarta Sans', color: '#ff4500' }}
                  />
                </span>
              </h2>
            </div>

            {/* Grupo compacto de Trayectoria, Formación y Software (justo debajo del nombre) */}
            <div className="space-y-3">
              {/* TRAYECTORIA Y EXPERIENCIA PROFESIONAL */}
              <div className="pt-2 border-t border-[#111111]/15 text-[16px]" style={{ fontSize: '16px' }}>
                <span className="font-mono text-[12px] font-bold text-[#111111] tracking-[0.2em] uppercase block mb-1.5" style={{ fontSize: '12px' }}>
                  TRAYECTORIA & EXPERIENCIA PROFESIONAL
                </span>

                <div className="space-y-1.5 text-xs font-sans" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  {data.identity.experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      style={{ fontFamily: 'Plus Jakarta Sans' }}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between py-1.5 px-2.5 gap-1 bg-[#f7f7f7] font-sans"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-bold text-[#FF4500] whitespace-nowrap text-[11px]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                          <EditableText
                            path={`identity.experience.${index}.period`}
                            value={exp.period}
                            style={{ fontFamily: 'Plus Jakarta Sans' }}
                          />
                        </span>
                        <span className="font-semibold text-[#111111]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                          <EditableText
                            path={`identity.experience.${index}.role`}
                            value={exp.role}
                            style={{ fontFamily: 'Plus Jakarta Sans' }}
                          />
                        </span>
                      </div>
                      <span className="text-[#111111]/60 sm:text-right text-[11px]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                        <EditableText
                          path={`identity.experience.${index}.company`}
                          value={exp.company}
                          style={{ fontFamily: 'Plus Jakarta Sans' }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FORMACIÓN ACADÉMICA */}
              <div className="pt-2 border-t border-[#111111]/15">
                <span className="font-mono text-xs font-bold text-[#111111] tracking-[0.2em] uppercase block mb-1.5">
                  <EditableText
                    path="identity.educationTitle"
                    value={data.identity.educationTitle || 'FORMACIÓN ACADÉMICA'}
                  />
                </span>
                <div
                  className="py-1.5 px-2.5 bg-[#f7f7f7] text-xs font-sans font-medium text-[#111111]"
                  style={{ fontFamily: 'Plus Jakarta Sans' }}
                >
                  <EditableText
                    path="identity.education"
                    value={data.identity.education || 'Licenciatura en Arquitectura / UAEH'}
                    style={{ fontFamily: 'Plus Jakarta Sans' }}
                  />
                </div>
              </div>

              {/* USO DE SOFTWARE */}
              <div className="pt-2 border-t border-[#111111]/15">
                <span className="font-mono text-xs font-bold text-[#111111] tracking-[0.2em] uppercase block mb-1.5">
                  <EditableText
                    path="identity.softwareTitle"
                    value={data.identity.softwareTitle || 'USO DE SOFTWARE'}
                  />
                </span>
                <div className="space-y-1 text-xs font-sans" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  {softwareItems.map((item, index) => (
                    <div
                      key={index}
                      className="py-1 px-2.5 bg-[#f7f7f7] font-medium text-[#111111]"
                      style={{ fontFamily: 'Plus Jakarta Sans' }}
                    >
                      <EditableText
                        path={`identity.softwareList.${index}`}
                        value={item}
                        style={{ fontFamily: 'Plus Jakarta Sans' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* MANIFIESTO ARQUITECTÓNICO & FILOSOFÍA */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-[#111111]/15">
          {/* Header técnico con índice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <span className="font-mono text-xs text-[#FF4500] font-bold tracking-[0.25em] uppercase">
              02 / MANIFIESTO ARQUITECTÓNICO & FILOSOFÍA
            </span>
            <span className="font-mono text-[11px] text-[#111111]/45 tracking-widest uppercase">
              SLA / RIGOR TÉCNICO & PRAXIS
            </span>
          </div>

          {/* Bloque principal con línea vertical naranja y amplitud tipográfica */}
          <div className="border-l-2 sm:border-l-[3px] border-[#FF4500] pl-6 sm:pl-10 py-2 sm:py-3 mb-10">
            {isEditMode ? (
              <div className="space-y-2">
                <EditableText
                  path="identity.bio"
                  value={data.identity.bio}
                  multiline
                  className="font-sans text-lg sm:text-xl lg:text-2xl text-[#111111]/90 leading-relaxed font-normal"
                />
                <span className="text-[11px] font-mono text-[#FF4500] block">
                  * La frase &ldquo;diseñando así la escena de lo cotidiano&rdquo; se destacará automáticamente en naranja y negrita.
                </span>
              </div>
            ) : (
              <p className="font-sans text-lg sm:text-xl lg:text-2xl text-[#111111]/85 leading-relaxed font-normal">
                {parsedBio.lead}
                <span className="text-[#FF4500] font-bold">
                  {parsedBio.accent}
                </span>
                {parsedBio.tail}
              </p>
            )}
          </div>

          {/* Cuadrícula de 4 pilares conceptuales del manifiesto (amplitud, equilibrio y presencia) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-[#111111]/10">
            <div className="p-4 sm:p-5 bg-[#f2f2f2]/70 border border-[#111111]/5 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-[#FF4500] font-bold tracking-widest uppercase block mb-2">
                PILAR 01
              </span>
              <h4 className="font-display text-sm font-bold text-[#111111] mb-1">Geometría Precisa</h4>
              <p className="font-sans text-xs text-[#111111]/65 leading-relaxed">
                Control volumétrico, orden espacial limpio y proporcionalidad rigurosa en cada trazo.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#f2f2f2]/70 border border-[#111111]/5 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-[#FF4500] font-bold tracking-widest uppercase block mb-2">
                PILAR 02
              </span>
              <h4 className="font-display text-sm font-bold text-[#111111] mb-1">Honestidad Material</h4>
              <p className="font-sans text-xs text-[#111111]/65 leading-relaxed">
                Autenticidad de texturas, respuesta honesta a la luz y solidez tectónica duradera.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#f2f2f2]/70 border border-[#111111]/5 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-[#FF4500] font-bold tracking-widest uppercase block mb-2">
                PILAR 03
              </span>
              <h4 className="font-display text-sm font-bold text-[#111111] mb-1">Viabilidad Técnica</h4>
              <p className="font-sans text-xs text-[#111111]/65 leading-relaxed">
                Sistemas constructivos eficientes, detalle ejecutable y rigor en el control de obra.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#f2f2f2]/70 border border-[#111111]/5 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-[#FF4500] font-bold tracking-widest uppercase block mb-2">
                PILAR 04
              </span>
              <h4 className="font-display text-sm font-bold text-[#111111] mb-1">Análisis del Entorno</h4>
              <p className="font-sans text-xs text-[#111111]/65 leading-relaxed">
                Estudio riguroso del contexto físico, orientación bioclimática e integración cotidiana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
