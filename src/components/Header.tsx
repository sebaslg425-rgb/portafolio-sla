import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X } from 'lucide-react';
import { EditableImage } from './EditableImage';

export const Header: React.FC = () => {
  const { data, isEditMode } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener: disappears when scrolling down away from the top/first page
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 60;
      setIsScrolled(scrolled);
      if (scrolled) {
        setMobileMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ÁREAS DE PRÁCTICA', href: '#areas-de-practica' },
    { label: 'PROYECTOS', href: '#proyectos' },
    { label: 'REGISTRO DE OBRA', href: '#registro-de-obra' },
    { label: 'IDENTIDAD', href: '#identidad' },
    { label: 'CONTACTO', href: '#contacto' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-[#f7f7f7] border-b border-[#111111]/15 transition-all duration-300 ${
        isScrolled && !isEditMode
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-2 md:py-2.5 flex items-center justify-between gap-4">
        {/* LOGO ZONE: Redimensionable en aristas, posición y tamaño con persistencia total */}
        <div className="relative flex items-center shrink-0">
          <EditableImage
            imageId={data.logo.imageId || 'img_logo_brandmark'}
            defaultAlt="Logotipo Oficial SLA — Sebastián Lozada Arquitectos"
            className="w-full h-full object-contain object-left pointer-events-auto"
            containerClassName="flex items-center"
            allowResize={true}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>

        {/* DESKTOP NAVIGATION (Zone 2) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[11px] font-mono tracking-[0.22em] font-medium text-[#111111]/80 hover:text-[#FF4500] hover:opacity-75 transition-all duration-300 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            className="p-1.5 border border-[#111111]/20 hover:border-[#111111] hover:opacity-75 transition-all duration-300 bg-[#f7f7f7] text-[#111111] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE FLYOUT NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#111111]/15 bg-[#f7f7f7] px-6 py-6 space-y-4 font-mono">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest pb-2 border-b border-[#111111]/10">
            ÍNDICE DE NAVEGACIÓN
          </div>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider text-[#111111] hover:text-[#FF4500] hover:opacity-75 py-1 transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
