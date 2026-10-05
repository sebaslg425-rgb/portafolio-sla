import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { PortfolioData, Project, CustomImage, TextStyle, Breakpoint, BreakpointImageState, ConstructionLogItem } from '../types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';
import slaConfigStatic from '../data/sla-config.json';

const LOCAL_STORAGE_KEY = 'sla_portfolio_state_v2';

export const DEFAULT_LOGO_DIMENSIONS: Record<Breakpoint, { width: number; height: number }> = {
  mobile: { width: 145, height: 31 },
  tablet: { width: 160, height: 34 },
  desktop: { width: 175, height: 37 },
};

export const LOCKED_LOGO_DIMENSIONS = DEFAULT_LOGO_DIMENSIONS;

// Centralized loader with static sla-config.json as primary Single Source of Truth
export const getInitialPortfolioData = (): PortfolioData => {
  let base: PortfolioData;
  try {
    if (slaConfigStatic && (slaConfigStatic as any).header && (slaConfigStatic as any).projects) {
      base = JSON.parse(JSON.stringify(slaConfigStatic)) as PortfolioData;
    } else {
      base = JSON.parse(JSON.stringify(INITIAL_PORTFOLIO_DATA));
    }
  } catch {
    base = JSON.parse(JSON.stringify(INITIAL_PORTFOLIO_DATA));
  }

  // Ensure default vector fallbacks are attached if /images/ files are not yet physically in public/images/
  if (base.images) {
    Object.keys(INITIAL_PORTFOLIO_DATA.images).forEach((k) => {
      const initImg = INITIAL_PORTFOLIO_DATA.images[k];
      if (!base.images[k]) {
        base.images[k] = { ...initImg };
      } else if (initImg?.src) {
        (base.images[k] as any).fallbackSvg = initImg.src;
      }
    });
  }

  return base;
};

interface PortfolioContextType {
  data: PortfolioData;
  isEditMode: boolean;
  setIsEditMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  currentBreakpoint: Breakpoint;
  currentLogoDimensions: { width: number; height: number };
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Text updates
  updateNestedText: (path: string, value: string) => void;
  getTextStyle: (path: string) => TextStyle | undefined;
  updateTextStyle: (path: string, style: TextStyle) => void;
  resetTextStyle: (path: string) => void;
  // Image updates
  getImage: (imageId: string) => CustomImage;
  getImageState: (imageId: string, breakpoint?: Breakpoint) => BreakpointImageState;
  updateImageSrc: (imageId: string, newSrc: string, alt?: string, fileName?: string) => void;
  updateImageDimensions: (imageId: string, width: number, height: number, unlockedRatio?: boolean) => void;
  updateImageBreakpointState: (imageId: string, breakpoint: Breakpoint, state: Partial<BreakpointImageState>) => void;
  updateImagePan: (imageId: string, panX: number, panY: number, breakpoint?: Breakpoint) => void;
  resetImageDimensions: (imageId: string, breakpoint?: Breakpoint) => void;
  // Logo specific updates
  updateLogoDimensions: (breakpoint: Breakpoint, width: number, height: number) => void;
  resetLogoDimensions: () => void;
  // Project operations
  activeModalProject: Project | null;
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;
  goToNextProject: () => void;
  goToPrevProject: () => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  addProjectSpec: (projectId: string) => void;
  removeProjectSpec: (projectId: string, specIndex: number) => void;
  addGalleryImageToProject: (projectId: string, customSrc?: string) => void;
  removeGalleryImageFromProject: (projectId: string, imageId: string) => void;
  addNewProject: () => void;
  deleteProject: (projectId: string) => void;
  // Construction log operations
  addConstructionLogItem: () => void;
  deleteConstructionLogItem: (id: string) => void;
  // Reset and export/import
  resetToDefaults: () => void;
  exportConfigAsJson: () => void;
  importConfigFromJson: (jsonStr: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial data from localStorage merged with central sla-config.json
  const [data, setData] = useState<PortfolioData>(() => {
    const base = getInitialPortfolioData();
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.header && parsed.hero && parsed.projects && parsed.images) {
          const merged: PortfolioData = {
            ...base,
            ...parsed,
            header: { ...base.header, ...parsed.header },
            hero: { ...base.hero, ...parsed.hero },
            identity: { ...base.identity, ...parsed.identity },
            contact: { ...base.contact, ...parsed.contact },
            logo: parsed.logo || base.logo,
            images: { ...base.images, ...parsed.images },
            projects: parsed.projects && parsed.projects.length ? parsed.projects : base.projects,
            constructionLog:
              parsed.constructionLog && parsed.constructionLog.length ? parsed.constructionLog : base.constructionLog,
          };
          return merged;
        }
      }
    } catch (e) {
      console.error('Failed to load saved SLA state:', e);
    }
    return base;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');
  const [activeModalProjectId, setActiveModalProjectId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Clear toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Window resize listener to determine responsive breakpoint (Mobile, Tablet, Desktop)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurrentBreakpoint('mobile');
      } else if (width < 1024) {
        setCurrentBreakpoint('tablet');
      } else {
        setCurrentBreakpoint('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcut listener for Secret Edit Mode (Ctrl + Shift + E or Cmd + Shift + E)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsEditMode((prev) => {
          const next = !prev;
          showToast(next ? '● MODO EDICIÓN ACTIVADO (Ctrl+Shift+E)' : '○ Modo edición desactivado');
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showToast]);

  // Autosave to localStorage on data change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [data]);

  // Logo current dimensions based on active breakpoint
  const currentLogoDimensions: { width: number; height: number } = {
    width:
      data.images?.['img_logo_brandmark']?.breakpoints?.[currentBreakpoint]?.width ??
      data.logo?.dimensions?.[currentBreakpoint]?.width ??
      data.images?.['img_logo_brandmark']?.width ??
      DEFAULT_LOGO_DIMENSIONS[currentBreakpoint].width,
    height:
      data.images?.['img_logo_brandmark']?.breakpoints?.[currentBreakpoint]?.height ??
      data.logo?.dimensions?.[currentBreakpoint]?.height ??
      data.images?.['img_logo_brandmark']?.height ??
      DEFAULT_LOGO_DIMENSIONS[currentBreakpoint].height,
  };

  // Helper to safely get an image with fallback
  const getImage = useCallback(
    (imageId: string): CustomImage => {
      if (data.images[imageId]) {
        return data.images[imageId];
      }
      return {
        id: imageId,
        src: '',
        alt: 'SLA Arquitectura',
        width: undefined,
        height: undefined,
        unlockedRatio: false,
      };
    },
    [data.images]
  );

  // Update text by dot-separated path (e.g., 'hero.line1', 'contact.email', 'identity.bio')
  const updateNestedText = useCallback((path: string, value: string) => {
    setData((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current: any = cloned;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return cloned;
    });
  }, []);

  // Text style updates (fontSize and lineHeight)
  const getTextStyle = useCallback(
    (path: string): TextStyle | undefined => {
      return data.textStyles?.[path];
    },
    [data.textStyles]
  );

  const updateTextStyle = useCallback((path: string, style: TextStyle) => {
    setData((prev) => ({
      ...prev,
      textStyles: {
        ...prev.textStyles,
        [path]: {
          ...prev.textStyles?.[path],
          ...style,
        },
      },
    }));
  }, []);

  const resetTextStyle = useCallback((path: string) => {
    setData((prev) => {
      if (!prev.textStyles || !prev.textStyles[path]) return prev;
      const copy = { ...prev.textStyles };
      delete copy[path];
      return {
        ...prev,
        textStyles: copy,
      };
    });
  }, []);

  // Update image source isolated to that specific image ID, preserving fileName for /images/ physical mapping
  const updateImageSrc = useCallback((imageId: string, newSrc: string, alt?: string, fileName?: string) => {
    setData((prev) => {
      const existing = prev.images[imageId] || {
        id: imageId,
        src: newSrc,
        alt: alt || 'SLA Arquitectura',
      };
      const cleanFileName = fileName || (alt && alt.includes('.') ? alt : existing.fileName);
      return {
        ...prev,
        images: {
          ...prev.images,
          [imageId]: {
            ...existing,
            src: newSrc,
            alt: alt !== undefined ? alt : existing.alt,
            fileName: cleanFileName,
          },
        },
      };
    });
  }, []);

  // Get image state for active breakpoint with fallback
  const getImageState = useCallback(
    (imageId: string, bp: Breakpoint = currentBreakpoint): BreakpointImageState => {
      const isLogo = imageId === data.logo?.imageId || imageId === 'img_logo_brandmark';
      const img = data.images[imageId];
      const logoDim = data.logo?.dimensions?.[bp] || data.logo?.dimensions?.desktop || DEFAULT_LOGO_DIMENSIONS[bp];

      if (!img) {
        if (isLogo) {
          return { width: logoDim.width, height: logoDim.height, panX: 0, panY: 0 };
        }
        return {};
      }

      const bpOverride = img.breakpoints?.[bp];
      if (isLogo) {
        return {
          width: bpOverride?.width ?? logoDim.width ?? img.width ?? DEFAULT_LOGO_DIMENSIONS[bp].width,
          height: bpOverride?.height ?? logoDim.height ?? img.height ?? DEFAULT_LOGO_DIMENSIONS[bp].height,
          panX: bpOverride?.panX ?? img.panX ?? 0,
          panY: bpOverride?.panY ?? img.panY ?? 0,
        };
      }

      return {
        width: bpOverride?.width !== undefined ? bpOverride.width : img.width,
        height: bpOverride?.height !== undefined ? bpOverride.height : img.height,
        panX: bpOverride?.panX !== undefined ? bpOverride.panX : img.panX ?? 0,
        panY: bpOverride?.panY !== undefined ? bpOverride.panY : img.panY ?? 0,
      };
    },
    [data.images, data.logo, currentBreakpoint]
  );

  // Update image breakpoint state strictly isolated to this image and this breakpoint
  const updateImageBreakpointState = useCallback(
    (imageId: string, bp: Breakpoint, updates: Partial<BreakpointImageState>) => {
      setData((prev) => {
        const isLogo = imageId === prev.logo?.imageId || imageId === 'img_logo_brandmark';
        const existing = prev.images[imageId] || {
          id: imageId,
          src: '',
          alt: isLogo ? 'Logotipo Oficial SLA' : 'SLA',
        };
        const existingBp = existing.breakpoints?.[bp] || {};
        const updatedBp = {
          ...existingBp,
          ...updates,
        };

        const updatedImages = {
          ...prev.images,
          [imageId]: {
            ...existing,
            ...(bp === 'desktop' && updates.width !== undefined ? { width: updates.width } : {}),
            ...(bp === 'desktop' && updates.height !== undefined ? { height: updates.height } : {}),
            ...(updates.panX !== undefined ? { panX: updates.panX } : {}),
            ...(updates.panY !== undefined ? { panY: updates.panY } : {}),
            breakpoints: {
              ...existing.breakpoints,
              [bp]: updatedBp,
            },
          },
        };

        let updatedLogo = prev.logo;
        if (isLogo && (updates.width !== undefined || updates.height !== undefined)) {
          const currentDim = prev.logo?.dimensions?.[bp] || DEFAULT_LOGO_DIMENSIONS[bp];
          updatedLogo = {
            ...prev.logo,
            dimensions: {
              ...prev.logo.dimensions,
              [bp]: {
                width: updates.width !== undefined ? updates.width : currentDim.width,
                height: updates.height !== undefined ? updates.height : currentDim.height,
              },
            },
          };
        }

        return {
          ...prev,
          images: updatedImages,
          logo: updatedLogo,
        };
      });
    },
    []
  );

  // Update image dimensions for active breakpoint
  const updateImageDimensions = useCallback(
    (imageId: string, width: number, height: number) => {
      updateImageBreakpointState(imageId, currentBreakpoint, {
        width: Math.max(20, Math.round(width)),
        height: Math.max(15, Math.round(height)),
      });
    },
    [currentBreakpoint, updateImageBreakpointState]
  );

  // Update image pan / translation for active breakpoint
  const updateImagePan = useCallback(
    (imageId: string, panX: number, panY: number, bp: Breakpoint = currentBreakpoint) => {
      updateImageBreakpointState(imageId, bp, {
        panX: Math.round(panX),
        panY: Math.round(panY),
      });
    },
    [currentBreakpoint, updateImageBreakpointState]
  );

  const resetImageDimensions = useCallback(
    (imageId: string, bp?: Breakpoint) => {
      setData((prev) => {
        const isLogo = imageId === prev.logo?.imageId || imageId === 'img_logo_brandmark';
        const existing = prev.images[imageId];
        if (!existing && !isLogo) return prev;

        const defaultLogoDim = DEFAULT_LOGO_DIMENSIONS;

        if (bp) {
          const updatedBreakpoints = { ...(existing?.breakpoints || {}) };
          delete updatedBreakpoints[bp];

          let updatedLogo = prev.logo;
          if (isLogo && defaultLogoDim[bp]) {
            updatedLogo = {
              ...prev.logo,
              dimensions: {
                ...prev.logo.dimensions,
                [bp]: defaultLogoDim[bp],
              },
            };
          }

          return {
            ...prev,
            images: existing
              ? {
                  ...prev.images,
                  [imageId]: {
                    ...existing,
                    breakpoints: updatedBreakpoints,
                  },
                }
              : prev.images,
            logo: updatedLogo,
          };
        }

        return {
          ...prev,
          images: existing
            ? {
                ...prev.images,
                [imageId]: {
                  ...existing,
                  width: undefined,
                  height: undefined,
                  panX: undefined,
                  panY: undefined,
                  breakpoints: undefined,
                  unlockedRatio: false,
                },
              }
            : prev.images,
          logo: isLogo
            ? {
                ...prev.logo,
                dimensions: defaultLogoDim,
              }
            : prev.logo,
        };
      });
    },
    []
  );

  // Update Logo dimensions for the specific breakpoint
  const updateLogoDimensions = useCallback(
    (breakpoint: Breakpoint, width: number, height: number) => {
      setData((prev) => ({
        ...prev,
        logo: {
          ...prev.logo,
          dimensions: {
            ...prev.logo.dimensions,
            [breakpoint]: {
              width: Math.max(60, Math.round(width)),
              height: Math.max(20, Math.round(height)),
            },
          },
        },
      }));
    },
    []
  );

  const resetLogoDimensions = useCallback(() => {
    setData((prev) => ({
      ...prev,
      logo: {
        ...prev.logo,
        dimensions: INITIAL_PORTFOLIO_DATA.logo.dimensions,
      },
    }));
    showToast('Dimensiones de logo restablecidas a valores iniciales');
  }, [showToast]);

  // Project Modal management
  const activeModalProject = data.projects.find((p) => p.id === activeModalProjectId) || null;

  const openProjectModal = useCallback((project: Project) => {
    setActiveModalProjectId(project.id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const closeProjectModal = useCallback(() => {
    setActiveModalProjectId(null);
    setTimeout(() => {
      const el = document.getElementById('proyectos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }, []);

  const goToNextProject = useCallback(() => {
    if (!activeModalProjectId) return;
    const currentIndex = data.projects.findIndex((p) => p.id === activeModalProjectId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % data.projects.length;
    setActiveModalProjectId(data.projects[nextIndex].id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeModalProjectId, data.projects]);

  const goToPrevProject = useCallback(() => {
    if (!activeModalProjectId) return;
    const currentIndex = data.projects.findIndex((p) => p.id === activeModalProjectId);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + data.projects.length) % data.projects.length;
    setActiveModalProjectId(data.projects[prevIndex].id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeModalProjectId, data.projects]);

  const updateProject = useCallback((projectId: string, updates: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === projectId ? { ...p, ...updates } : p)),
    }));
  }, []);

  const addProjectSpec = useCallback((projectId: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              specs: [...p.specs, { label: 'Especificación', value: 'Detalle' }],
            }
          : p
      ),
    }));
  }, []);

  const removeProjectSpec = useCallback((projectId: string, specIndex: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              specs: p.specs.filter((_, idx) => idx !== specIndex),
            }
          : p
      ),
    }));
  }, []);

  // Dynamic gallery management inside modal
  const addGalleryImageToProject = useCallback(
    (projectId: string, customSrc?: string) => {
      const newImageId = `img_${projectId}_gallery_${Date.now()}`;
      setData((prev) => {
        const targetProj = prev.projects.find((p) => p.id === projectId);
        if (!targetProj) return prev;

        const defaultPlaceholderSrc =
          customSrc ||
          prev.images[targetProj.coverImageId]?.src ||
          INITIAL_PORTFOLIO_DATA.images.img_proj_01_interior_1.src;

        return {
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  galleryImageIds: [...p.galleryImageIds, newImageId],
                }
              : p
          ),
          images: {
            ...prev.images,
            [newImageId]: {
              id: newImageId,
              src: defaultPlaceholderSrc,
              alt: `${targetProj.title} - Render interior adicional`,
              unlockedRatio: false,
            },
          },
        };
      });
      showToast('Nueva ranura de render agregada');
    },
    [showToast]
  );

  const removeGalleryImageFromProject = useCallback(
    (projectId: string, imageId: string) => {
      setData((prev) => {
        const targetProj = prev.projects.find((p) => p.id === projectId);
        if (!targetProj) return prev;
        return {
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  galleryImageIds: p.galleryImageIds.filter((id) => id !== imageId),
                }
              : p
          ),
        };
      });
      showToast('Render eliminado de la galería');
    },
    [showToast]
  );

  // Add entirely new project
  const addNewProject = useCallback(() => {
    const nextIndex = data.projects.length + 1;
    const formattedNum = nextIndex < 10 ? `0${nextIndex}` : `${nextIndex}`;
    const newProjId = `proj_${Date.now()}`;
    const newCoverId = `img_${newProjId}_cover`;
    const newInteriorId = `img_${newProjId}_interior_1`;

    const newProject: Project = {
      id: newProjId,
      number: formattedNum,
      title: `Nuevo Proyecto ${formattedNum}`,
      category: 'ARQUITECTURA Y DISEÑO',
      location: 'MÉXICO',
      year: new Date().getFullYear().toString(),
      coverImageId: newCoverId,
      shortDescription: 'Descripción breve de la propuesta arquitectónica, volumetría y materialidad.',
      fullDescription: 'Memoria descriptiva completa del proyecto ejecutivo, desarrollo conceptual, relaciones con el entorno y coordinación técnica de obra.',
      galleryImageIds: [newInteriorId],
      specs: [
        { label: 'Superficie', value: '250 m²' },
        { label: 'Estructura', value: 'Concreto y acero' },
        { label: 'Software', value: 'Revit · D5 Render' },
      ],
    };

    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
      images: {
        ...prev.images,
        [newCoverId]: {
          id: newCoverId,
          src: INITIAL_PORTFOLIO_DATA.images.img_proj_01_cover.src,
          alt: `${newProject.title} - Portada`,
          unlockedRatio: false,
        },
        [newInteriorId]: {
          id: newInteriorId,
          src: INITIAL_PORTFOLIO_DATA.images.img_proj_01_interior_1.src,
          alt: `${newProject.title} - Render interior`,
          unlockedRatio: false,
        },
      },
    }));
    showToast(`Proyecto ${formattedNum} añadido exitosamente`);
  }, [data.projects.length, showToast]);

  const deleteProject = useCallback(
    (projectId: string) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== projectId),
      }));
      if (activeModalProjectId === projectId) {
        setActiveModalProjectId(null);
      }
      showToast('Proyecto eliminado');
    },
    [activeModalProjectId, showToast]
  );

  // Construction Log operations
  const addConstructionLogItem = useCallback(() => {
    setData((prev) => {
      const currentList = prev.constructionLog || [];
      const newIndex = currentList.length + 1;
      const formattedNum = newIndex < 10 ? `0${newIndex}` : `${newIndex}`;
      const newSiteId = `site_${Date.now()}`;
      const newImageId = `img_${newSiteId}`;

      const newItem: ConstructionLogItem = {
        id: newSiteId,
        imageId: newImageId,
        title: `Registro de Obra ${formattedNum}`,
        description: 'Supervisión técnica de proceso constructivo, verificación de armados, cimbrado o acabados de materialidad honesta en campo.',
        meta: `FASE ${formattedNum} // CONTROL EN SITIO`,
      };

      return {
        ...prev,
        constructionLog: [...currentList, newItem],
        images: {
          ...prev.images,
          [newImageId]: {
            id: newImageId,
            src: INITIAL_PORTFOLIO_DATA.images.img_site_01?.src || '',
            alt: newItem.title,
            unlockedRatio: false,
          },
        },
      };
    });
    showToast('Nuevo registro de obra añadido');
  }, [showToast]);

  const deleteConstructionLogItem = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        constructionLog: (prev.constructionLog || []).filter((item) => item.id !== id),
      }));
      showToast('Registro de obra eliminado');
    },
    [showToast]
  );

  // Backup and Reset actions
  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setData(getInitialPortfolioData());
    showToast('Portafolio restablecido a configuración central');
  }, [showToast]);

  const exportConfigAsJson = useCallback(() => {
    const cloned: PortfolioData = JSON.parse(JSON.stringify(data));

    // Ensure all images are sanitized with clean /images/... paths for physical storage in public/images/
    if (cloned.images) {
      Object.keys(cloned.images).forEach((key) => {
        const img = cloned.images[key];
        if (img) {
          delete (img as any).fallbackSvg;
          if (img.fileName) {
            img.src = `/images/${img.fileName}`;
          } else if (img.src && img.src.startsWith('data:')) {
            img.src = `/images/${img.id}.jpg`;
          } else if (img.src && !img.src.startsWith('/') && !img.src.startsWith('http')) {
            img.src = `/images/${img.src}`;
          }
        }
      });
    }

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cloned, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'sla-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Configuración exportada exitosamente como "sla-config.json"');
  }, [data, showToast]);

  const importConfigFromJson = useCallback(
    (jsonStr: string): boolean => {
      try {
        const parsed = JSON.parse(jsonStr);
        if (parsed.header && parsed.hero && parsed.projects && parsed.images) {
          setData(parsed);
          showToast('Configuración importada exitosamente');
          return true;
        } else {
          showToast('El archivo JSON no cumple con la estructura del portafolio SLA');
          return false;
        }
      } catch (err) {
        showToast('Error al parsear el archivo JSON');
        return false;
      }
    },
    [showToast]
  );

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isEditMode,
        setIsEditMode,
        currentBreakpoint,
        currentLogoDimensions,
        toastMessage,
        showToast,
        updateNestedText,
        getTextStyle,
        updateTextStyle,
        resetTextStyle,
        getImage,
        getImageState,
        updateImageSrc,
        updateImageDimensions,
        updateImageBreakpointState,
        updateImagePan,
        resetImageDimensions,
        updateLogoDimensions,
        resetLogoDimensions,
        activeModalProject,
        openProjectModal,
        closeProjectModal,
        goToNextProject,
        goToPrevProject,
        updateProject,
        addProjectSpec,
        removeProjectSpec,
        addGalleryImageToProject,
        removeGalleryImageFromProject,
        addNewProject,
        deleteProject,
        addConstructionLogItem,
        deleteConstructionLogItem,
        resetToDefaults,
        exportConfigAsJson,
        importConfigFromJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
