/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PracticeAreas } from './components/PracticeAreas';
import { ProjectGallery } from './components/ProjectGallery';
import { ConstructionLog } from './components/ConstructionLog';
import { IdentitySection } from './components/IdentitySection';
import { ContactSection } from './components/ContactSection';
import { ProjectFullPageView } from './components/ProjectFullPageView';
import { Lightbox } from './components/Lightbox';
import { EditToolbar } from './components/EditToolbar';

const AppContent: React.FC = () => {
  const { activeModalProject } = usePortfolio();

  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
  }>({
    isOpen: false,
    src: '',
    alt: '',
  });

  const openLightbox = (src: string, alt: string) => {
    setLightboxState({
      isOpen: true,
      src,
      alt,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  // If a project is selected, render the dedicated full-page organized view
  if (activeModalProject) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] text-[#111111] flex flex-col selection:bg-[#FF4500] selection:text-white">
        <ProjectFullPageView onOpenLightbox={openLightbox} />

        {/* Fullscreen High-Resolution Lightbox Viewer */}
        <Lightbox
          isOpen={lightboxState.isOpen}
          src={lightboxState.src}
          alt={lightboxState.alt}
          onClose={closeLightbox}
        />

        {/* Secret Edit Mode Floating Bar (Ctrl + Shift + E) */}
        <EditToolbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111111] flex flex-col selection:bg-[#FF4500] selection:text-white">
      {/* Top Header with Breakpoint-Protected Logo */}
      <Header />

      {/* Main Single Page Application Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Áreas de Práctica (3 Columns Grid with Orange Line Accents) */}
        <PracticeAreas />

        {/* Galería de Proyectos (Editorial Cards with Full Page Navigation) */}
        <ProjectGallery />

        {/* Registro de Obra (Retícula Inmersiva Edge-to-Edge) */}
        <ConstructionLog />

        {/* Identidad / Sobre Mí (Square Portrait & Pure Professional Curriculum) */}
        <IdentitySection />

        {/* Contacto & Footer */}
        <ContactSection />
      </main>

      {/* Fullscreen High-Resolution Lightbox Viewer */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        src={lightboxState.src}
        alt={lightboxState.alt}
        onClose={closeLightbox}
      />

      {/* Secret Edit Mode Floating Bar (Ctrl + Shift + E) */}
      <EditToolbar />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
