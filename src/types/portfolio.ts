export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface BreakpointDimensions {
  mobile: { width: number; height: number };
  tablet: { width: number; height: number };
  desktop: { width: number; height: number };
}

export interface BreakpointImageState {
  width?: number;
  height?: number;
  panX?: number;
  panY?: number;
}

export interface CustomImage {
  id: string;
  src: string;
  alt: string;
  fileName?: string;
  width?: number;
  height?: number;
  panX?: number;
  panY?: number;
  unlockedRatio?: boolean;
  breakpoints?: {
    mobile?: BreakpointImageState;
    tablet?: BreakpointImageState;
    desktop?: BreakpointImageState;
  };
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  location: string;
  year: string;
  coverImageId: string;
  shortDescription: string;
  fullDescription: string;
  galleryImageIds: string[];
  specs: ProjectSpec[];
}

export interface PracticeArea {
  id: string;
  number: string;
  title: string;
  description: string;
  points: string[];
}

export interface CurriculumItem {
  id: string;
  category: string;
  title: string;
  details: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
}

export interface ConstructionLogItem {
  id: string;
  imageId: string;
  title: string;
  description: string;
  meta?: string;
}

export interface TextStyle {
  fontSize?: number; // in pixels
  lineHeight?: number; // unitless multiplier e.g. 1.1, 1.25, 1.5
}

export interface PortfolioData {
  header: {
    kicker: string;
    tagline: string;
  };
  hero: {
    dossierTag: string;
    line1: string;
    line2: string;
    line3: string;
    line4Prefix: string;
    line4Accent: string;
    subtitle: string;
    ctaProjects: string;
    ctaContact: string;
  };
  practiceAreasTitle: string;
  practiceAreas: PracticeArea[];
  projectsTitle: string;
  projectsSubtitle: string;
  projects: Project[];
  constructionLogTitle?: string;
  constructionLogSubtitle?: string;
  constructionLog?: ConstructionLogItem[];
  identity: {
    kicker: string;
    firstName: string;
    lastName: string;
    bio: string;
    skills: CurriculumItem[];
    experience: ExperienceItem[];
    educationTitle?: string;
    education?: string;
    softwareTitle?: string;
    software?: string;
    softwareList?: string[];
    portraitCaption?: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    email: string;
    whatsappText: string;
    whatsappNumber: string;
    instagramHandle: string;
    instagramUrl: string;
    footerCopyright: string;
  };
  logo: {
    imageId: string;
    dimensions: BreakpointDimensions;
  };
  images: Record<string, CustomImage>;
  textStyles?: Record<string, TextStyle>;
}
