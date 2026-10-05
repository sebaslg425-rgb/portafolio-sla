import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';
import { Mail, MessageCircle, Instagram, ArrowUp, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsappNumber = data.contact.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="contacto" className="pt-24 lg:pt-36 pb-16 bg-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Kicker */}
        <div className="mb-10">
          <span className="font-mono text-xs text-[#111111]/60 tracking-[0.28em] uppercase">
            <EditableText path="contact.kicker" value={data.contact.kicker} />
          </span>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="max-w-3xl mb-20">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight leading-[1.05] mb-6">
            <EditableText path="contact.title" value={data.contact.title} />
          </h2>
          <p className="font-sans text-lg sm:text-xl text-[#111111]/80 leading-relaxed font-normal">
            <EditableText path="contact.subtitle" value={data.contact.subtitle} multiline />
          </p>
        </div>

        {/* 3 Contact Channels (Functional Direct Links) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24 border-b border-[#111111]/15">
          {/* CORREO */}
          <div className="pt-6 pb-4 bg-[#f7f7f7] border-t-2 border-[#FF4500] transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-[#111111]/60 uppercase tracking-widest">
                CORREO ELECTRÓNICO
              </span>
              <Mail className="w-4 h-4 text-[#111111]/40 group-hover:text-[#FF4500] transition-colors" />
            </div>
            <a
              href={`mailto:${data.contact.email}`}
              className="font-display text-lg sm:text-xl font-bold text-[#111111] group-hover:text-[#FF4500] transition-colors break-all flex items-center justify-between"
            >
              <span>
                <EditableText path="contact.email" value={data.contact.email} />
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
            </a>
            <span className="block mt-2 text-xs font-mono text-[#111111]/50">
              Respuesta en menos de 24 horas
            </span>
          </div>

          {/* WHATSAPP */}
          <div className="pt-6 pb-4 bg-[#f7f7f7] border-t-2 border-[#FF4500] transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-[#111111]/60 uppercase tracking-widest">
                WHATSAPP DIRECTO
              </span>
              <MessageCircle className="w-4 h-4 text-[#111111]/40 group-hover:text-[#FF4500] transition-colors" />
            </div>
            <a
              href={`https://wa.me/${cleanWhatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="font-display text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#FF4500] transition-colors flex items-center justify-between"
            >
              <span>
                <EditableText path="contact.whatsappText" value={data.contact.whatsappText} />
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
            </a>
            <span className="block mt-2 text-xs font-mono text-[#111111]/50">
              Atención inmediata de anteproyectos
            </span>
          </div>

          {/* INSTAGRAM */}
          <div className="pt-6 pb-4 bg-[#f7f7f7] border-t-2 border-[#FF4500] transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-[#111111]/60 uppercase tracking-widest">
                INSTAGRAM
              </span>
              <Instagram className="w-4 h-4 text-[#111111]/40 group-hover:text-[#FF4500] transition-colors" />
            </div>
            <a
              href={data.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="font-display text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#FF4500] transition-colors flex items-center justify-between"
            >
              <span>
                @<EditableText path="contact.instagramHandle" value={data.contact.instagramHandle} />
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
            </a>
            <span className="block mt-2 text-xs font-mono text-[#111111]/50">
              Procesos de obra y renders en D5
            </span>
          </div>
        </div>

        {/* BOTTOM FOOTER BAR */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#111111]/70">
          <div>
            <EditableText
              path="contact.footerCopyright"
              value={data.contact.footerCopyright}
            />
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#111111]/20 hover:border-[#111111] hover:text-[#111111] hover:opacity-75 transition-all duration-300 text-[11px] tracking-widest uppercase font-semibold"
          >
            <span>VOLVER AL INICIO</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF4500]" />
          </button>
        </div>
      </div>
    </section>
  );
};
