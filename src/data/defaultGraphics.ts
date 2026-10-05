// Architectural SVG Data URLs and Vector Graphics for SLA Portfolio

// 1. SLA Architectural Logo Graphic (Data URL)
export const SLA_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 110" fill="none">
  <!-- Geometric Logo Icon (Topographic Orange #FF4500) -->
  <g transform="translate(10, 15)">
    <polygon points="0,0 55,0 18,36 0,36" fill="#FF4500" />
    <polygon points="55,0 75,0 38,36 18,36" fill="#FF4500" opacity="0.95" />
    <polygon points="0,44 38,44 75,80 38,80" fill="#FF4500" />
    <polygon points="38,80 56,80 75,62 75,44" fill="#E03E00" />
  </g>
  <!-- Typography: SEBASTIAN LOZADA ARQUITECTOS -->
  <g fill="#111111" transform="translate(105, 10)">
    <text x="0" y="46" font-family="'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="34" letter-spacing="-0.04em">SEBASTIAN LOZADA</text>
    <text x="5" y="76" font-family="'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif" font-weight="500" font-size="15" letter-spacing="0.48em" opacity="0.85">ARQUITECTOS</text>
  </g>
</svg>
`)}`;

// 2. Large Branding Hero Billboard Graphic
export const SLA_HERO_BILLBOARD_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700" fill="none">
  <rect width="800" height="700" fill="#f7f7f7" />
  <!-- Architectural Drafting Grid -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" stroke-opacity="0.08" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="800" height="700" fill="url(#grid)" />
  
  <!-- Subtle Blueprint Coordinates -->
  <text x="40" y="60" font-family="monospace" font-size="12" fill="#111111" fill-opacity="0.55" letter-spacing="0.1em">SLA.COORD // LAT 20.1011° N · LON 98.7591° W</text>
  <text x="40" y="80" font-family="monospace" font-size="11" fill="#111111" fill-opacity="0.45" letter-spacing="0.15em">PROYECTO EJECUTIVO · ESCALA 1:50 · PACHUCA</text>
  
  <!-- Massive Monogram Mark in Center -->
  <g transform="translate(160, 240)">
    <g transform="scale(1.8) translate(0, 0)">
      <polygon points="0,0 80,0 26,52 0,52" fill="#FF4500" />
      <polygon points="80,0 110,0 56,52 26,52" fill="#FF4500" opacity="0.95" />
      <polygon points="0,64 56,64 110,116 56,116" fill="#FF4500" />
      <polygon points="56,116 82,116 110,90 110,64" fill="#FF4500" />
    </g>
    <!-- Brand typography -->
    <g fill="#111111" transform="translate(230, 70)">
      <text x="0" y="50" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="900" font-size="36" letter-spacing="-0.03em">SEBASTIAN LOZADA</text>
      <text x="6" y="95" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="500" font-size="18" letter-spacing="0.48em" opacity="0.85">A R Q U I T E C T O S</text>
    </g>
  </g>

  <!-- Bottom Technical Details Strip -->
  <line x1="40" y1="640" x2="760" y2="640" stroke="#111111" stroke-opacity="0.15" stroke-width="1" />
  <text x="40" y="665" font-family="monospace" font-size="11" fill="#111111" fill-opacity="0.5" letter-spacing="0.2em">REVIT BIM LOD 350 · D5 RENDER · QGIS GEODATA · 2026</text>
  <rect x="710" y="650" width="50" height="18" fill="#FF4500" />
  <text x="718" y="663" font-family="monospace" font-size="10" font-weight="bold" fill="#f7f7f7">DOSSIER</text>
</svg>
`)}`;

// 3. Casa entre Cielos - Main Render
export const CASA_CIELOS_COVER_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none">
  <!-- Concrete and sky composition -->
  <rect width="1200" height="800" fill="#E2E0DD" />
  <!-- Clear Sky Aperture -->
  <polygon points="320,0 880,0 840,460 360,460" fill="#4B88A2" opacity="0.8" />
  
  <!-- Brutalist Raw Concrete Walls -->
  <!-- Left Wall in Perspective -->
  <polygon points="0,0 320,0 360,800 0,800" fill="#C8C4BD" />
  <!-- Right Wall in Deep Shadow -->
  <polygon points="880,0 1200,0 1200,800 840,800" fill="#9E9990" />
  <!-- Central Courtyard Floor (Porous volcanic stone) -->
  <polygon points="360,460 840,460 1020,800 180,800" fill="#757069" />
  
  <!-- Architectural Light Angle (Sharp sunbeam) -->
  <polygon points="320,0 480,0 720,800 360,800" fill="#FFFFFF" opacity="0.18" />
  <polygon points="760,180 840,460 780,800 700,800" fill="#FF4500" opacity="0.12" />

  <!-- Concrete Texture Formwork Grooves -->
  <line x1="0" y1="180" x2="330" y2="180" stroke="#A8A39C" stroke-width="2" stroke-dasharray="8,4" />
  <line x1="0" y1="360" x2="345" y2="360" stroke="#A8A39C" stroke-width="2" stroke-dasharray="8,4" />
  <line x1="0" y1="540" x2="355" y2="540" stroke="#A8A39C" stroke-width="2" stroke-dasharray="8,4" />

  <line x1="870" y1="180" x2="1200" y2="180" stroke="#7A756D" stroke-width="2" stroke-dasharray="8,4" />
  <line x1="860" y1="360" x2="1200" y2="360" stroke="#7A756D" stroke-width="2" stroke-dasharray="8,4" />
  <line x1="845" y1="540" x2="1200" y2="540" stroke="#7A756D" stroke-width="2" stroke-dasharray="8,4" />

  <!-- Solitary Endemic Tree (Huizache / Palo Dulce) Silhouette -->
  <g transform="translate(540, 420)">
    <path d="M50,160 Q45,80 30,30 Q25,10 15,0" stroke="#2B2927" stroke-width="5" fill="none" />
    <path d="M30,70 Q60,40 80,20" stroke="#2B2927" stroke-width="3" fill="none" />
    <path d="M22,100 Q-10,70 -30,50" stroke="#2B2927" stroke-width="3" fill="none" />
    <circle cx="15" cy="0" r="18" fill="#3D3A36" opacity="0.6" />
    <circle cx="80" cy="20" r="14" fill="#3D3A36" opacity="0.6" />
    <circle cx="-30" cy="50" r="16" fill="#3D3A36" opacity="0.6" />
  </g>

  <!-- Clean Title Overlay -->
  <g transform="translate(60, 710)">
    <rect x="-10" y="-30" width="380" height="70" fill="#111111" opacity="0.85" />
    <text x="15" y="-5" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="20" fill="#FFFFFF">01 · CASA ENTRE CIELOS</text>
    <text x="15" y="24" font-family="monospace" font-size="12" fill="#E0E0E0" letter-spacing="0.1em">PACHUCA, HIDALGO // 2025</text>
  </g>
</svg>
`)}`;

// 4. Capilla Yaax Jan - Main Render
export const CAPILLA_YAAX_COVER_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none">
  <!-- Yucatan Jungle Backdrop -->
  <rect width="1200" height="800" fill="#1E2A22" />
  <!-- Forest foliage foliage silhouettes -->
  <path d="M0,0 L320,0 L280,800 L0,800 Z" fill="#152119" />
  <path d="M920,0 L1200,0 L1200,800 L880,800 Z" fill="#152119" />
  
  <!-- Monolithic Raw Concrete Chapel Volume -->
  <polygon points="300,140 900,140 900,760 300,760" fill="#7C7A75" />
  <!-- Shadow side -->
  <polygon points="300,140 520,140 520,760 300,760" fill="#585651" />

  <!-- Iconic Vertical Light Slit (La ranura vertical) -->
  <rect x="510" y="140" width="16" height="520" fill="#FFF9E6" />
  <!-- Radiant Light Beam Cutting Through Dark Interior -->
  <polygon points="510,140 526,140 680,760 420,760" fill="#FFF4D0" opacity="0.35" />

  <!-- Natural Tropical Wood Altar Silhouette -->
  <rect x="460" y="660" width="120" height="24" fill="#331E12" />

  <!-- Board-formed concrete ridges -->
  <line x1="300" y1="240" x2="900" y2="240" stroke="#44423E" stroke-width="1.5" />
  <line x1="300" y1="360" x2="900" y2="360" stroke="#44423E" stroke-width="1.5" />
  <line x1="300" y1="480" x2="900" y2="480" stroke="#44423E" stroke-width="1.5" />
  <line x1="300" y1="600" x2="900" y2="600" stroke="#44423E" stroke-width="1.5" />

  <!-- Clean Title Overlay -->
  <g transform="translate(60, 710)">
    <rect x="-10" y="-30" width="380" height="70" fill="#111111" opacity="0.85" />
    <text x="15" y="-5" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="20" fill="#FFFFFF">02 · CAPILLA YAAX JAN</text>
    <text x="15" y="24" font-family="monospace" font-size="12" fill="#E0E0E0" letter-spacing="0.1em">SELVA DE YUCATÁN // 2025</text>
  </g>
</svg>
`)}`;

// 5. Interior Render: Casa entre Cielos (Patio y Concreto)
export const INTERIOR_CASA_CIELOS_1_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" fill="none">
  <rect width="1000" height="650" fill="#E3DFD7" />
  <!-- Ceiling Beam Structure -->
  <polygon points="0,0 1000,0 850,140 150,140" fill="#A39F97" />
  <line x1="350" y1="0" x2="350" y2="140" stroke="#7A766F" stroke-width="4" />
  <line x1="650" y1="0" x2="650" y2="140" stroke="#7A766F" stroke-width="4" />

  <!-- Floor to Ceiling Glazing facing inner patio -->
  <rect x="240" y="140" width="520" height="420" fill="#5F8D9E" opacity="0.5" />
  <!-- Glass Mullions -->
  <line x1="500" y1="140" x2="500" y2="560" stroke="#111111" stroke-width="5" />
  <rect x="240" y="140" width="520" height="420" stroke="#111111" stroke-width="6" fill="none" />

  <!-- Polished Concrete Floor with reflection -->
  <polygon points="0,560 1000,560 1000,650 0,650" fill="#6B665F" />
  <polygon points="260,560 740,560 850,650 150,650" fill="#8A857D" opacity="0.4" />

  <!-- Minimalist Oak Furniture Bench -->
  <rect x="360" y="520" width="280" height="28" fill="#B38656" />
  <rect x="390" y="548" width="16" height="35" fill="#111111" />
  <rect x="590" y="548" width="16" height="35" fill="#111111" />

  <text x="30" y="625" font-family="monospace" font-size="11" fill="#FFFFFF" letter-spacing="0.1em">RENDER INT 01 · PATIO CENTRAL Y ESTANCIA</text>
</svg>
`)}`;

// 6. Interior Render: Capilla Yaax Jan (Espacio de Silencio)
export const INTERIOR_CAPILLA_1_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" fill="none">
  <rect width="1000" height="650" fill="#22201E" />
  <!-- Deep textured side wall -->
  <polygon points="0,0 280,80 280,570 0,650" fill="#3D3A37" />
  <polygon points="1000,0 720,80 720,570 1000,650" fill="#2D2B29" />
  <!-- End Wall with Vertical Aperture -->
  <rect x="280" y="80" width="440" height="490" fill="#474441" />

  <!-- Sunlight beam striking floor and altar -->
  <rect x="490" y="80" width="18" height="490" fill="#FFF6D6" />
  <polygon points="490,80 508,80 640,610 380,610" fill="#FFF2BD" opacity="0.35" />

  <!-- Raw Wooden Bench in front of light -->
  <rect x="420" y="470" width="160" height="18" fill="#5E381E" />
  <rect x="440" y="488" width="12" height="35" fill="#29180D" />
  <rect x="550" y="488" width="12" height="35" fill="#29180D" />

  <text x="30" y="625" font-family="monospace" font-size="11" fill="#CCCCCC" letter-spacing="0.1em">RENDER INT 02 · RANURA CENITAL Y MATERIALIDAD HONESTA</text>
</svg>
`)}`;

// 7. Architect Portrait: Sebastián Lozada González (Drafting Table, Black & White)
export const ARCHITECT_PORTRAIT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill="none">
  <!-- Studio Wall in Grayscale Depth -->
  <rect width="600" height="600" fill="#666666" />
  <defs>
    <radialGradient id="vignette" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#808080" />
      <stop offset="100%" stop-color="#383838" />
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#vignette)" />

  <!-- Drafting Table Plane -->
  <polygon points="0,480 600,480 600,600 0,600" fill="#D6D6D6" />
  <line x1="0" y1="480" x2="600" y2="480" stroke="#111111" stroke-width="2" />

  <!-- Architectural Blueprint Roll on Table -->
  <polygon points="60,500 540,500 520,590 80,590" fill="#EAEAEA" stroke="#999999" stroke-width="1.5" />
  <!-- Blueprint Floor Plan Lines -->
  <g stroke="#333333" stroke-width="1.5" fill="none" opacity="0.7">
    <rect x="140" y="520" width="120" height="50" />
    <line x1="140" y1="545" x2="260" y2="545" />
    <rect x="290" y="520" width="140" height="50" />
    <line x1="360" y1="520" x2="360" y2="570" />
  </g>

  <!-- Technical Pens and Scale Ruler (Escalímetro) -->
  <rect x="460" y="525" width="6" height="55" fill="#111111" />
  <rect x="475" y="520" width="7" height="60" fill="#222222" />
  <rect x="490" y="515" width="8" height="65" fill="#111111" />
  <!-- White triangular scale ruler -->
  <polygon points="110,515 125,515 105,585 90,585" fill="#FFFFFF" stroke="#888888" stroke-width="1" />

  <!-- Architect Silhouette & Torso (Black T-Shirt, Focused Stance) -->
  <!-- Torso & Arms resting on table -->
  <path d="M120,600 L180,480 L220,320 L380,320 L420,480 L480,600 Z" fill="#151515" />
  <!-- Left Arm reaching forward to blueprint -->
  <path d="M170,470 Q140,490 120,520 Q105,535 90,530" stroke="#C4B8AB" stroke-width="32" stroke-linecap="round" fill="none" />
  <!-- Right Arm holding corner of blueprint -->
  <path d="M430,470 Q460,490 480,520 Q495,535 510,530" stroke="#C4B8AB" stroke-width="32" stroke-linecap="round" fill="none" />

  <!-- Neck -->
  <rect x="275" y="270" width="50" height="60" fill="#BDB0A3" />

  <!-- Head & Face Profile/Angle (Focused downward on drawing) -->
  <path d="M260,180 Q255,275 300,285 Q345,275 340,180 Q335,130 300,130 Q265,130 260,180 Z" fill="#C4B8AB" />
  <!-- Hair: Dark short architectural cut -->
  <path d="M255,175 Q250,120 300,115 Q350,120 345,175 Q325,140 300,140 Q275,140 255,175 Z" fill="#1A1817" />

  <!-- Architectural Spectacles / Glasses (Modern wireframe / black rims) -->
  <rect x="270" y="195" width="24" height="16" rx="2" stroke="#111111" stroke-width="3.5" fill="none" />
  <rect x="306" y="195" width="24" height="16" rx="2" stroke="#111111" stroke-width="3.5" fill="none" />
  <line x1="294" y1="202" x2="306" y2="202" stroke="#111111" stroke-width="3.5" />
  <line x1="262" y1="200" x2="270" y2="200" stroke="#111111" stroke-width="3" />
  <line x1="330" y1="200" x2="338" y2="200" stroke="#111111" stroke-width="3" />

  <!-- Short Beard / Stubble -->
  <path d="M275,245 Q300,280 325,245" stroke="#4A4541" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.75" />

  <!-- Vignette frame subtle line -->
  <rect x="0" y="0" width="600" height="600" stroke="#222222" stroke-width="2" fill="none" />
</svg>
`)}`;

// 8. Registro de Obra - 01 Cimbrado y Encofrado
export const CONSTRUCTION_SITE_1_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">
  <rect width="800" height="800" fill="#2b2b2b" />
  <defs>
    <pattern id="grain1" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.8" fill="#444444" />
      <circle cx="10" cy="14" r="0.8" fill="#383838" />
      <circle cx="17" cy="8" r="0.6" fill="#4a4a4a" />
    </pattern>
  </defs>
  <rect width="800" height="800" fill="url(#grain1)" />
  <!-- Concrete wall formwork timber panels -->
  <g stroke="#1a1a1a" stroke-width="2" fill="#525252">
    <rect x="80" y="100" width="640" height="90" fill="#666666" />
    <rect x="80" y="195" width="640" height="90" fill="#5c5c5c" />
    <rect x="80" y="290" width="640" height="90" fill="#616161" />
    <rect x="80" y="385" width="640" height="90" fill="#565656" />
    <rect x="80" y="480" width="640" height="90" fill="#505050" />
    <rect x="80" y="575" width="640" height="90" fill="#4a4a4a" />
  </g>
  <!-- Timber grain horizontal lines -->
  <g stroke="#3a3a3a" stroke-width="1" opacity="0.6">
    <line x1="80" y1="130" x2="720" y2="130" />
    <line x1="80" y1="160" x2="720" y2="160" />
    <line x1="80" y1="230" x2="720" y2="230" />
    <line x1="80" y1="330" x2="720" y2="330" />
    <line x1="80" y1="420" x2="720" y2="420" />
    <line x1="80" y1="520" x2="720" y2="520" />
    <line x1="80" y1="620" x2="720" y2="620" />
  </g>
  <!-- Steel Tie Rods (Moños y cuñas) -->
  <g fill="#1a1a1a" stroke="#888888" stroke-width="1.5">
    <circle cx="160" cy="145" r="10" />
    <circle cx="320" cy="145" r="10" />
    <circle cx="480" cy="145" r="10" />
    <circle cx="640" cy="145" r="10" />
    <circle cx="160" cy="335" r="10" />
    <circle cx="320" cy="335" r="10" />
    <circle cx="480" cy="335" r="10" />
    <circle cx="640" cy="335" r="10" />
    <circle cx="160" cy="525" r="10" />
    <circle cx="320" cy="525" r="10" />
    <circle cx="480" cy="525" r="10" />
    <circle cx="640" cy="525" r="10" />
  </g>
  <!-- Diagonal Scaffolding / Shoring Braces -->
  <g stroke="#d4d4d4" stroke-width="5" opacity="0.8">
    <line x1="50" y1="750" x2="280" y2="120" />
    <line x1="280" y1="120" x2="295" y2="135" />
    <line x1="420" y1="750" x2="650" y2="120" />
    <line x1="220" y1="750" x2="450" y2="120" stroke="#a3a3a3" />
  </g>
  <!-- Ground & Foundation Level -->
  <rect x="0" y="680" width="800" height="120" fill="#1e1e1e" />
  <line x1="0" y1="680" x2="800" y2="680" stroke="#FF4500" stroke-width="2" />
  <!-- Technical watermark -->
  <text x="30" y="730" font-family="monospace" font-size="12" fill="#888888" letter-spacing="0.2em">REGISTRO OBRA 01 // CIMBRADO ENDUELADO MURO NORTE</text>
  <text x="30" y="750" font-family="monospace" font-size="10" fill="#666666" letter-spacing="0.1em">SLA CONSTRUCCIÓN Y CONTROL · NIVEL ±0.00 M</text>
</svg>
`)}`;

// 9. Registro de Obra - 02 Armado de Acero Estructural
export const CONSTRUCTION_SITE_2_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">
  <rect width="800" height="800" fill="#242424" />
  <!-- Reinforcing Rebar Mesh Pattern -->
  <defs>
    <pattern id="grid_rebar" width="60" height="60" patternUnits="userSpaceOnUse">
      <line x1="0" y1="30" x2="60" y2="30" stroke="#737373" stroke-width="4" />
      <line x1="30" y1="0" x2="30" y2="60" stroke="#525252" stroke-width="4" />
      <!-- Wire ties (Alambre recocido) -->
      <circle cx="30" cy="30" r="3.5" fill="#a3a3a3" />
    </pattern>
  </defs>
  <!-- Concrete Slab Base -->
  <rect x="40" y="60" width="720" height="640" fill="#383838" stroke="#111111" stroke-width="3" />
  <rect x="40" y="60" width="720" height="640" fill="url(#grid_rebar)" />
  <!-- Main Structural Column Cages (Castillos / Columnas) -->
  <g fill="none" stroke="#e5e5e5" stroke-width="6">
    <line x1="180" y1="30" x2="180" y2="720" />
    <line x1="220" y1="30" x2="220" y2="720" />
    <line x1="580" y1="30" x2="580" y2="720" />
    <line x1="620" y1="30" x2="620" y2="720" />
  </g>
  <!-- Stirrups (Estribos cada 15 cm) -->
  <g fill="none" stroke="#a3a3a3" stroke-width="3">
    <rect x="175" y="100" width="50" height="50" />
    <rect x="175" y="180" width="50" height="50" />
    <rect x="175" y="260" width="50" height="50" />
    <rect x="175" y="340" width="50" height="50" />
    <rect x="175" y="420" width="50" height="50" />
    <rect x="175" y="500" width="50" height="50" />
    <rect x="175" y="580" width="50" height="50" />
    <rect x="575" y="100" width="50" height="50" />
    <rect x="575" y="180" width="50" height="50" />
    <rect x="575" y="260" width="50" height="50" />
    <rect x="575" y="340" width="50" height="50" />
    <rect x="575" y="420" width="50" height="50" />
    <rect x="575" y="500" width="50" height="50" />
    <rect x="575" y="580" width="50" height="50" />
  </g>
  <!-- Technical Overlay Grid & Tags -->
  <line x1="0" y1="720" x2="800" y2="720" stroke="#FF4500" stroke-width="2" />
  <rect x="0" y="720" width="800" height="80" fill="#141414" />
  <text x="30" y="755" font-family="monospace" font-size="12" fill="#888888" letter-spacing="0.2em">REGISTRO OBRA 02 // ARMADO DE ACERO fy=4200 kg/cm²</text>
  <text x="30" y="775" font-family="monospace" font-size="10" fill="#666666" letter-spacing="0.1em">VARILLAS #4 Y ESTRIBOS #2.5 @ 15 CM · SUPERVISIÓN TÉCNICA</text>
</svg>
`)}`;

// 10. Registro de Obra - 03 Vaciado y Colado de Concreto
export const CONSTRUCTION_SITE_3_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">
  <rect width="800" height="800" fill="#292929" />
  <!-- Slanted View of Ribbed Concrete Slab -->
  <polygon points="60,200 740,140 760,650 40,710" fill="#4d4d4d" stroke="#1c1c1c" stroke-width="3" />
  <!-- Beams / Nervaduras -->
  <g fill="#383838" stroke="#222222" stroke-width="2">
    <polygon points="120,230 200,220 180,680 100,690" />
    <polygon points="260,210 340,200 320,660 240,670" />
    <polygon points="400,190 480,180 460,640 380,650" />
    <polygon points="540,170 620,160 600,620 520,630" />
  </g>
  <!-- Fresh Concrete Pouring Flow Textures -->
  <path d="M380,120 Q440,280 410,400 T430,600" stroke="#737373" stroke-width="45" stroke-linecap="round" fill="none" opacity="0.6" />
  <circle cx="430" cy="380" r="80" fill="#666666" opacity="0.4" />
  <!-- Concrete Pumping Hose Pipe -->
  <path d="M450,20 C420,150 480,260 410,340" stroke="#171717" stroke-width="28" fill="none" />
  <path d="M450,20 C420,150 480,260 410,340" stroke="#FF4500" stroke-width="3" fill="none" stroke-dasharray="10 10" />
  <!-- Leveling Rule / Regla Vibratoria -->
  <rect x="220" y="440" width="360" height="14" rx="2" fill="#d4d4d4" stroke="#111111" stroke-width="2" transform="rotate(-6 400 440)" />
  <!-- Technical watermark -->
  <rect x="0" y="730" width="800" height="70" fill="#111111" />
  <line x1="0" y1="730" x2="800" y2="730" stroke="#FF4500" stroke-width="2" />
  <text x="30" y="760" font-family="monospace" font-size="12" fill="#888888" letter-spacing="0.2em">REGISTRO OBRA 03 // COLADO DE LOSA ALIVIANADA F'C=250</text>
  <text x="30" y="780" font-family="monospace" font-size="10" fill="#666666" letter-spacing="0.1em">VIBRADO MECÁNICO Y CURADO CON MEMBRANA · PACHUCA</text>
</svg>
`)}`;

// 11. Registro de Obra - 04 Mampostería de Cantera y Muros
export const CONSTRUCTION_SITE_4_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">
  <rect width="800" height="800" fill="#1f1f1f" />
  <!-- Stone masonry courses (Cantera cortada artesanal) -->
  <g fill="#454545" stroke="#171717" stroke-width="4">
    <!-- Course 1 -->
    <rect x="40" y="100" width="160" height="110" />
    <rect x="204" y="100" width="220" height="110" fill="#4d4d4d" />
    <rect x="428" y="100" width="180" height="110" fill="#3f3f3f" />
    <rect x="612" y="100" width="148" height="110" fill="#474747" />
    <!-- Course 2 -->
    <rect x="40" y="214" width="230" height="110" fill="#3d3d3d" />
    <rect x="274" y="214" width="150" height="110" fill="#525252" />
    <rect x="428" y="214" width="210" height="110" fill="#474747" />
    <rect x="642" y="214" width="118" height="110" fill="#414141" />
    <!-- Course 3 -->
    <rect x="40" y="328" width="190" height="110" fill="#4a4a4a" />
    <rect x="234" y="328" width="180" height="110" fill="#404040" />
    <rect x="418" y="328" width="210" height="110" fill="#4e4e4e" />
    <rect x="632" y="328" width="128" height="110" fill="#444444" />
    <!-- Course 4 -->
    <rect x="40" y="442" width="140" height="110" fill="#424242" />
    <rect x="184" y="442" width="230" height="110" fill="#545454" />
    <rect x="418" y="442" width="160" height="110" fill="#3c3c3c" />
    <rect x="582" y="442" width="178" height="110" fill="#494949" />
    <!-- Course 5 -->
    <rect x="40" y="556" width="220" height="110" fill="#505050" />
    <rect x="264" y="556" width="170" height="110" fill="#454545" />
    <rect x="438" y="556" width="190" height="110" fill="#424242" />
    <rect x="632" y="556" width="128" height="110" fill="#4b4b4b" />
  </g>
  <!-- Plumb line (Plomada de albañil) -->
  <line x1="380" y1="40" x2="380" y2="600" stroke="#FF4500" stroke-width="1.5" stroke-dasharray="6 4" />
  <polygon points="370,590 390,590 380,620" fill="#c4c4c4" stroke="#111111" stroke-width="1.5" />
  <!-- Spirit Level (Nivel de mano) -->
  <rect x="460" y="318" width="140" height="18" fill="#e03e00" stroke="#111111" stroke-width="2" rx="2" />
  <circle cx="530" cy="327" r="4" fill="#a3e635" />
  <!-- Technical watermark -->
  <rect x="0" y="730" width="800" height="70" fill="#141414" />
  <line x1="0" y1="730" x2="800" y2="730" stroke="#FF4500" stroke-width="2" />
  <text x="30" y="760" font-family="monospace" font-size="12" fill="#888888" letter-spacing="0.2em">REGISTRO OBRA 04 // MAMPOSTERÍA DE CANTERA REGIONAL</text>
  <text x="30" y="780" font-family="monospace" font-size="10" fill="#666666" letter-spacing="0.1em">JUNTA RETRANQUEADA 1.5 CM · CORTE A DISCO EN SITIO</text>
</svg>
`)}`;

// 12. Registro de Obra - 05 Estación Total y Trazo Topográfico
export const CONSTRUCTION_SITE_5_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">
  <rect width="800" height="800" fill="#202020" />
  <!-- Background Topographic Contour Lines -->
  <g stroke="#3a3a3a" stroke-width="1.5" fill="none" opacity="0.7">
    <ellipse cx="400" cy="500" rx="350" ry="180" />
    <ellipse cx="400" cy="500" rx="290" ry="140" />
    <ellipse cx="400" cy="500" rx="220" ry="100" />
    <ellipse cx="400" cy="500" rx="150" ry="65" />
  </g>
  <!-- Surveying Tripod -->
  <g stroke="#d4d4d4" stroke-width="8" stroke-linecap="round">
    <line x1="400" y1="360" x2="220" y2="680" stroke="#FF4500" />
    <line x1="400" y1="360" x2="400" y2="690" stroke="#e5e5e5" />
    <line x1="400" y1="360" x2="580" y2="680" stroke="#FF4500" />
  </g>
  <!-- Tripod Head Mount -->
  <polygon points="360,360 440,360 420,380 380,380" fill="#333333" stroke="#111111" stroke-width="2" />
  <!-- Total Station Body (Estación Total) -->
  <rect x="365" y="240" width="70" height="120" rx="6" fill="#f5f5f5" stroke="#111111" stroke-width="3" />
  <circle cx="400" cy="290" r="22" fill="#171717" stroke="#e5e5e5" stroke-width="3" />
  <circle cx="400" cy="290" r="14" fill="#0284c7" opacity="0.8" />
  <rect x="350" y="275" width="100" height="30" rx="4" fill="#262626" />
  <!-- Laser Beam Sight Line -->
  <line x1="400" y1="290" x2="780" y2="160" stroke="#FF4500" stroke-width="2" stroke-dasharray="8 6" />
  <circle cx="780" cy="160" r="5" fill="#FF4500" />
  <!-- Digital Screen on Body -->
  <rect x="375" y="325" width="50" height="24" fill="#111111" />
  <text x="382" y="341" font-family="monospace" font-size="9" fill="#22c55e">20.101°</text>
  <!-- Technical watermark -->
  <rect x="0" y="730" width="800" height="70" fill="#111111" />
  <line x1="0" y1="730" x2="800" y2="730" stroke="#FF4500" stroke-width="2" />
  <text x="30" y="760" font-family="monospace" font-size="12" fill="#888888" letter-spacing="0.2em">REGISTRO OBRA 05 // TRAZO Y NIVELACIÓN CON ESTACIÓN TOTAL</text>
  <text x="30" y="780" font-family="monospace" font-size="10" fill="#666666" letter-spacing="0.1em">CONTROL GEODÉSICO QGIS · POLIGONAL DE PRECISIÓN ±2 MM</text>
</svg>
`)}`;

// 13. Registro de Obra - 06 Estructura de Acero y Cubierta
export const CONSTRUCTION_SITE_6_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">
  <rect width="800" height="800" fill="#1c1c1c" />
  <!-- Industrial Portal Frames (Marcos rígidos de acero) -->
  <g stroke="#3a3a3a" stroke-width="12" fill="none">
    <!-- Frame 1 -->
    <path d="M120,680 L120,240 L400,140 L680,240 L680,680" stroke="#525252" />
    <!-- Frame 2 (Perspective depth) -->
    <path d="M220,640 L220,280 L400,200 L580,280 L580,640" stroke="#3d3d3d" />
    <!-- Frame 3 -->
    <path d="M300,600 L300,320 L400,260 L500,320 L500,600" stroke="#2b2b2b" />
  </g>
  <!-- Purlins / Montenes (Perfiles Z / C longitudinales) -->
  <g stroke="#999999" stroke-width="3">
    <line x1="120" y1="240" x2="300" y2="320" />
    <line x1="260" y1="190" x2="350" y2="290" />
    <line x1="400" y1="140" x2="400" y2="260" />
    <line x1="540" y1="190" x2="450" y2="290" />
    <line x1="680" y1="240" x2="500" y2="320" />
  </g>
  <!-- Bolted Connection Plates (Placas de conexión y pernos) -->
  <g fill="#d4d4d4">
    <rect x="385" y="130" width="30" height="25" />
    <circle cx="393" cy="138" r="2.5" fill="#111111" />
    <circle cx="407" cy="138" r="2.5" fill="#111111" />
    <circle cx="393" cy="148" r="2.5" fill="#111111" />
    <circle cx="407" cy="148" r="2.5" fill="#111111" />
  </g>
  <!-- Cross Bracing (Tensores en X) -->
  <g stroke="#FF4500" stroke-width="2" stroke-dasharray="8 6" opacity="0.8">
    <line x1="120" y1="240" x2="220" y2="640" />
    <line x1="220" y1="280" x2="120" y2="680" />
  </g>
  <!-- Technical watermark -->
  <rect x="0" y="730" width="800" height="70" fill="#111111" />
  <line x1="0" y1="730" x2="800" y2="730" stroke="#FF4500" stroke-width="2" />
  <text x="30" y="760" font-family="monospace" font-size="12" fill="#888888" letter-spacing="0.2em">REGISTRO OBRA 06 // MONTAJE DE ESTRUCTURA METÁLICA</text>
  <text x="30" y="780" font-family="monospace" font-size="10" fill="#666666" letter-spacing="0.1em">PERFILES IPR Y PLACAS DE NUDO EMPERNADAS · ENSAMBLE EN SECO</text>
</svg>
`)}`;

