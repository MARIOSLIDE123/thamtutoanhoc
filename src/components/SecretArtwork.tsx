import React from 'react';

interface SecretArtworkProps {
  unlockedPieces: number[]; // e.g. [1, 3, 5]
  activePieceId?: number;
  highlightAll?: boolean;
  customImageUrl?: string | null;
  onSelectPiece?: (pieceNumber: number) => void;
}

export const MasterArtworkSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 1200 800"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Background Gradients */}
        <radialGradient id="skyGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        <linearGradient id="marbleCol" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="25%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="75%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="80%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>

        <linearGradient id="torchLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#f97316" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </linearGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <pattern id="greekMeander" width="40" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 0,10 L 10,10 L 10,0 L 30,0 L 30,20 L 20,20 L 20,10 L 40,10"
            fill="none"
            stroke="#eab308"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </pattern>
      </defs>

      {/* 1. Deep Midnight Cosmic Sky with Stars & Temple Background */}
      <rect width="1200" height="800" fill="url(#skyGlow)" />

      {/* Constellations and geometry in sky */}
      <g opacity="0.35" stroke="#93c5fd" strokeWidth="0.8" fill="none">
        <circle cx="200" cy="120" r="1.5" fill="#fff" />
        <circle cx="240" cy="90" r="2" fill="#fff" />
        <circle cx="280" cy="140" r="1.5" fill="#fff" />
        <line x1="200" y1="120" x2="240" y2="90" />
        <line x1="240" y1="90" x2="280" y2="140" />

        {/* Right Triangle Constellation */}
        <circle cx="950" cy="110" r="2.5" fill="#fef08a" />
        <circle cx="1080" cy="110" r="2" fill="#fef08a" />
        <circle cx="1080" cy="200" r="2" fill="#fef08a" />
        <line x1="950" y1="110" x2="1080" y2="110" strokeDasharray="3,3" />
        <line x1="1080" y1="110" x2="1080" y2="200" strokeDasharray="3,3" />
        <line x1="950" y1="110" x2="1080" y2="200" stroke="#eab308" strokeWidth="1.5" />
      </g>

      {/* Distant Parthenon silhouette */}
      <g opacity="0.25" fill="#334155">
        <polygon points="400,220 800,220 600,160" />
        <rect x="420" y="220" width="360" height="15" />
        <rect x="430" y="235" width="15" height="120" />
        <rect x="470" y="235" width="15" height="120" />
        <rect x="510" y="235" width="15" height="120" />
        <rect x="550" y="235" width="15" height="120" />
        <rect x="590" y="235" width="15" height="120" />
        <rect x="630" y="235" width="15" height="120" />
        <rect x="670" y="235" width="15" height="120" />
        <rect x="710" y="235" width="15" height="120" />
        <rect x="750" y="235" width="15" height="120" />
      </g>

      {/* 2. Classical Doric Architecture Foreground */}
      {/* Left Pillars */}
      <g id="left-pillars">
        {/* Architrave */}
        <rect x="0" y="60" width="380" height="40" fill="url(#marbleCol)" />
        <rect x="0" y="90" width="380" height="12" fill="url(#greekMeander)" />
        
        {/* Capital & Shaft Left Col 1 */}
        <polygon points="30,100 130,100 115,130 45,130" fill="url(#marbleCol)" />
        <rect x="50" y="130" width="60" height="600" fill="url(#marbleCol)" />
        {/* Fluting */}
        <line x1="62" y1="130" x2="62" y2="730" stroke="#475569" strokeWidth="2" opacity="0.6" />
        <line x1="80" y1="130" x2="80" y2="730" stroke="#f8fafc" strokeWidth="2" opacity="0.7" />
        <line x1="98" y1="130" x2="98" y2="730" stroke="#475569" strokeWidth="2" opacity="0.6" />

        {/* Capital & Shaft Left Col 2 */}
        <polygon points="180,100 280,100 265,130 195,130" fill="url(#marbleCol)" />
        <rect x="200" y="130" width="60" height="600" fill="url(#marbleCol)" />
        <line x1="212" y1="130" x2="212" y2="730" stroke="#475569" strokeWidth="2" opacity="0.6" />
        <line x1="230" y1="130" x2="230" y2="730" stroke="#f8fafc" strokeWidth="2" opacity="0.7" />
        <line x1="248" y1="130" x2="248" y2="730" stroke="#475569" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Right Pillars */}
      <g id="right-pillars">
        <rect x="820" y="60" width="380" height="40" fill="url(#marbleCol)" />
        <rect x="820" y="90" width="380" height="12" fill="url(#greekMeander)" />
        
        {/* Right Col 1 */}
        <polygon points="920,100 1020,100 1005,130 935,130" fill="url(#marbleCol)" />
        <rect x="940" y="130" width="60" height="600" fill="url(#marbleCol)" />
        <line x1="952" y1="130" x2="952" y2="730" stroke="#475569" strokeWidth="2" opacity="0.6" />
        <line x1="970" y1="130" x2="970" y2="730" stroke="#f8fafc" strokeWidth="2" opacity="0.7" />
        <line x1="988" y1="130" x2="988" y2="730" stroke="#475569" strokeWidth="2" opacity="0.6" />

        {/* Right Col 2 */}
        <polygon points="1070,100 1170,100 1155,130 1085,130" fill="url(#marbleCol)" />
        <rect x="1090" y="130" width="60" height="600" fill="url(#marbleCol)" />
      </g>

      {/* Torch on pillar */}
      <g id="torch-left">
        <circle cx="150" cy="300" r="140" fill="url(#torchLight)" />
        <rect x="145" y="320" width="10" height="40" fill="#78350f" />
        <polygon points="135,320 165,320 160,335 140,335" fill="#ca8a04" />
        {/* Flame */}
        <path d="M 150,320 Q 140,280 150,260 Q 165,285 150,320 Z" fill="#f59e0b" filter="url(#glow)" />
        <path d="M 150,315 Q 145,290 150,275 Q 155,290 150,315 Z" fill="#fef08a" />
      </g>

      {/* 3. Central Figure: PYTHAGORAS OF SAMOS */}
      <g id="pythagoras-figure" transform="translate(10, 0)">
        {/* Aura / Ambient Warm Glow */}
        <circle cx="600" cy="380" r="260" fill="#ca8a04" opacity="0.12" filter="url(#glow)" />

        {/* Toga & Body */}
        {/* Robe Shadows and Folds */}
        <path
          d="M 440,750 L 460,480 Q 520,420 600,420 Q 680,420 740,480 L 760,750 Z"
          fill="#334155"
        />
        {/* Cream Linen Himation */}
        <path
          d="M 460,750 Q 480,500 540,430 Q 600,400 660,430 Q 720,500 740,750 Q 600,770 460,750 Z"
          fill="#f8fafc"
        />
        {/* Golden Sash / Trim */}
        <path
          d="M 520,440 Q 600,560 680,750 L 640,750 Q 580,580 500,460 Z"
          fill="url(#goldGlow)"
          opacity="0.9"
        />
        {/* Drapes */}
        <path d="M 530,480 Q 570,580 560,720" stroke="#cbd5e1" strokeWidth="4" fill="none" />
        <path d="M 620,460 Q 640,560 620,730" stroke="#94a3b8" strokeWidth="3" fill="none" />

        {/* Arms & Hands */}
        {/* Left Arm holding slate */}
        <path d="M 490,470 Q 450,530 480,580 Q 520,590 540,560" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
        {/* Right Arm with pointing finger */}
        <path d="M 710,470 Q 750,520 710,570 Q 670,560 660,540" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />

        {/* Head & Face */}
        <ellipse cx="600" cy="330" rx="48" ry="60" fill="#fde68a" />
        
        {/* Classical Noble Features */}
        <ellipse cx="585" cy="325" rx="5" ry="3" fill="#1e293b" />
        <ellipse cx="615" cy="325" rx="5" ry="3" fill="#1e293b" />
        <path d="M 580,315 Q 590,310 600,318" stroke="#78350f" strokeWidth="2.5" fill="none" />
        <path d="M 620,315 Q 610,310 600,318" stroke="#78350f" strokeWidth="2.5" fill="none" />
        <polygon points="597,322 603,322 600,342" fill="#d97706" />

        {/* Silver-White Flowing Beard */}
        <path
          d="M 555,340 Q 545,410 590,460 Q 600,480 610,460 Q 655,410 645,340 Q 600,360 555,340 Z"
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        {/* Beard Curls */}
        <path d="M 580,360 Q 590,410 585,440" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 600,360 Q 600,420 605,450" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 620,360 Q 610,410 615,440" stroke="#94a3b8" strokeWidth="2" fill="none" />

        {/* Silver Hair */}
        <path
          d="M 550,330 Q 545,260 600,260 Q 655,260 650,330 Q 655,350 645,360 Q 600,280 555,360 Z"
          fill="#e2e8f0"
        />

        {/* Golden Laurel Wreath */}
        <g id="laurel-wreath" fill="#eab308" filter="url(#glow)">
          <ellipse cx="570" cy="275" rx="8" ry="4" transform="rotate(-30 570 275)" />
          <ellipse cx="585" cy="265" rx="8" ry="4" transform="rotate(-15 585 265)" />
          <ellipse cx="600" cy="260" rx="8" ry="4" />
          <ellipse cx="615" cy="265" rx="8" ry="4" transform="rotate(15 615 265)" />
          <ellipse cx="630" cy="275" rx="8" ry="4" transform="rotate(30 630 275)" />
        </g>
      </g>

      {/* 4. The Sacred Geometric Stone Tablet Held by Pythagoras */}
      <g id="geometric-slate" transform="translate(480, 520)">
        {/* Tablet shadow & marble stone */}
        <rect x="-10" y="-10" width="260" height="190" rx="8" fill="#1e293b" opacity="0.6" />
        <rect x="0" y="0" width="240" height="170" rx="6" fill="#0f172a" stroke="#eab308" strokeWidth="3" />
        
        {/* Classical 3-4-5 Right Triangle Geometric Diagram with Squares */}
        <g transform="translate(45, 20)">
          {/* Main Right Triangle ABC */}
          <polygon points="40,90 120,90 120,30" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
          
          {/* Right Angle Symbol */}
          <rect x="110" y="80" width="10" height="10" fill="none" stroke="#fde047" strokeWidth="1.5" />

          {/* Square on base (b=4 -> 80px) */}
          <rect x="40" y="90" width="80" height="40" fill="#3b82f6" fillOpacity="0.25" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="80" y="115" fill="#93c5fd" fontSize="11" textAnchor="middle" fontWeight="bold">b² = 16</text>

          {/* Square on altitude (a=3 -> 60px) */}
          <rect x="120" y="30" width="30" height="60" fill="#10b981" fillOpacity="0.25" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="135" y="65" fill="#6ee7b7" fontSize="10" textAnchor="middle" fontWeight="bold">a² = 9</text>

          {/* Square on hypotenuse (c=5) */}
          <g transform="translate(40,90) rotate(-36.87)">
            <rect x="0" y="-40" width="100" height="40" fill="#eab308" fillOpacity="0.3" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="50" y="-15" fill="#fde047" fontSize="11" textAnchor="middle" fontWeight="bold">c² = a² + b² = 25</text>
          </g>

          {/* Formula text on tablet */}
          <text x="75" y="145" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            a² + b² = c²  |  b = a·sin B
          </text>
        </g>
      </g>

      {/* 5. Right Side: Cosmic Celestial Spheres & Golden Ratio Spiral */}
      <g id="golden-spiral" transform="translate(860, 240)">
        {/* Glowing Geometric Circle System */}
        <circle cx="120" cy="120" r="100" fill="none" stroke="#eab308" strokeWidth="1" opacity="0.4" />
        <circle cx="120" cy="120" r="70" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
        <circle cx="120" cy="120" r="40" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.5" />
        
        {/* Inscribed Golden Pentagon / Star */}
        <polygon
          points="120,20 144,80 208,80 156,120 176,180 120,144 64,180 84,120 32,80 96,80"
          fill="none"
          stroke="#fde047"
          strokeWidth="1.5"
          opacity="0.75"
          filter="url(#glow)"
        />

        {/* Golden Ratio Spiral Curve */}
        <path
          d="M 120,120 A 10,10 0 0,1 130,120 A 20,20 0 0,1 110,120 A 40,40 0 0,1 150,120 A 70,70 0 0,1 80,120"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          opacity="0.8"
        />

        <text x="120" y="240" fill="#cbd5e1" fontSize="13" textAnchor="middle" fontWeight="bold" letterSpacing="2">
          HÌNH HỌC THIÊN NHIÊN
        </text>
      </g>

      {/* 6. Foreground Marble Steps & Ancient Mathematical Tools */}
      <g id="marble-steps">
        {/* Step 1 */}
        <rect x="0" y="720" width="1200" height="30" fill="url(#marbleCol)" />
        <line x1="0" y1="720" x2="1200" y2="720" stroke="#f8fafc" strokeWidth="3" />
        
        {/* Step 2 */}
        <rect x="0" y="750" width="1200" height="50" fill="#334155" />
        <rect x="0" y="750" width="1200" height="10" fill="#475569" />

        {/* Bronze Amphora / Urn at Bottom Left */}
        <g transform="translate(180, 640)">
          <ellipse cx="40" cy="90" rx="35" ry="12" fill="#1e293b" opacity="0.5" />
          <path
            d="M 25,20 L 55,20 L 58,35 Q 75,55 60,85 Q 40,95 20,85 Q 5,55 22,35 Z"
            fill="#b45309"
            stroke="#78350f"
            strokeWidth="2"
          />
          {/* Urn Handles */}
          <path d="M 18,35 Q 0,55 20,70" stroke="#92400e" strokeWidth="4" fill="none" />
          <path d="M 62,35 Q 80,55 60,70" stroke="#92400e" strokeWidth="4" fill="none" />
          <line x1="20" y1="50" x2="60" y2="50" stroke="#fde047" strokeWidth="2" />
        </g>

        {/* Brass Compass & Papyrus Scroll at Bottom Right */}
        <g transform="translate(940, 650)">
          {/* Scroll */}
          <ellipse cx="60" cy="70" rx="50" ry="14" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <rect x="20" y="45" width="80" height="25" fill="#fef3c7" />
          <path d="M 30,52 L 70,52 M 30,58 L 85,58 M 30,64 L 60,64" stroke="#92400e" strokeWidth="1.5" />

          {/* Compass / Divider */}
          <g transform="translate(50, 10)">
            <circle cx="20" cy="10" r="5" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
            <line x1="20" y1="10" x2="5" y2="70" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="10" x2="38" y2="65" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
            <path d="M 10,40 Q 20,46 30,40" stroke="#eab308" strokeWidth="2" fill="none" />
          </g>
        </g>
      </g>

      {/* Decorative Outer Border Frame with Greek Meander */}
      <rect x="10" y="10" width="1180" height="780" fill="none" stroke="#ca8a04" strokeWidth="3" opacity="0.6" />
      <rect x="18" y="18" width="1164" height="764" fill="none" stroke="#eab308" strokeWidth="1" opacity="0.4" strokeDasharray="10,5" />
    </svg>
  );
};

export const SecretArtwork: React.FC<SecretArtworkProps> = ({
  unlockedPieces,
  activePieceId,
  highlightAll = false,
  customImageUrl = null,
  onSelectPiece,
}) => {
  // Grid layout: 2 rows x 3 columns
  const piecesConfig = [
    { id: 1, row: 0, col: 0, label: 'MẢNH 01' },
    { id: 2, row: 0, col: 1, label: 'MẢNH 02' },
    { id: 3, row: 0, col: 2, label: 'MẢNH 03' },
    { id: 4, row: 1, col: 0, label: 'MẢNH 04' },
    { id: 5, row: 1, col: 1, label: 'MẢNH 05' },
    { id: 6, row: 1, col: 2, label: 'MẢNH 06' },
  ];

  return (
    <div
      id="secret-puzzle-board"
      className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-500/40 bg-slate-950 select-none group"
    >
      {/* 1. Underlying master full artwork (custom uploaded image or default Pythagoras illustration) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {customImageUrl ? (
          <img
            src={customImageUrl}
            alt="Bức tranh bí mật"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <MasterArtworkSVG className="w-full h-full object-cover" />
        )}
      </div>

      {/* 2. Grid overlay with puzzle piece covers */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1.5 p-1.5 pointer-events-none">
        {piecesConfig.map((piece) => {
          const isUnlocked = highlightAll || unlockedPieces.includes(piece.id);
          const isActive = activePieceId === piece.id;

          return (
            <div
              key={piece.id}
              id={`puzzle-piece-container-${piece.id}`}
              onClick={() => {
                if (onSelectPiece) {
                  onSelectPiece(piece.id);
                }
              }}
              className={`relative w-full h-full rounded-xl overflow-hidden transition-all duration-700 pointer-events-auto cursor-pointer ${
                isActive ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-[1.01] z-20 shadow-2xl' : ''
              }`}
            >
              {/* Unlocked light sweep shimmer */}
              {isUnlocked ? (
                <div className="w-full h-full relative group/unlocked hover:ring-2 hover:ring-emerald-400/60 transition-all">
                  {/* Subtle golden corner badge */}
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-400/60 backdrop-blur-xs flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-300 shadow-md">
                    <span className="text-emerald-400">✓</span> {piece.label}
                  </div>
                  {/* Glass shimmer overlay */}
                  <div className="absolute inset-0 border border-amber-400/20 rounded-xl pointer-events-none" />
                </div>
              ) : (
                /* Locked Ancient Cover Tile */
                <div
                  id={`locked-tile-${piece.id}`}
                  className="w-full h-full relative bg-gradient-to-br from-slate-900 via-slate-925 to-indigo-950 border-2 border-amber-600/50 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-inner cursor-pointer hover:border-amber-400 hover:from-slate-850 hover:to-indigo-900 transition-all duration-300 group/tile"
                >
                  {/* Ancient stone texture pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#eab308_1.5px,transparent_1.5px)] [background-size:18px_18px] pointer-events-none" />

                  {/* Corner ornaments */}
                  <div className="absolute top-2 left-2 text-amber-500/60 text-xs font-serif">⌜</div>
                  <div className="absolute top-2 right-2 text-amber-500/60 text-xs font-serif">⌝</div>
                  <div className="absolute bottom-2 left-2 text-amber-500/60 text-xs font-serif">⌞</div>
                  <div className="absolute bottom-2 right-2 text-amber-500/60 text-xs font-serif">⌟</div>

                  {/* Lock badge */}
                  <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-b from-amber-500/25 to-amber-700/15 border-2 border-amber-500/60 flex items-center justify-center mb-2 shadow-xl group-hover/tile:scale-110 group-hover/tile:border-amber-400 transition-transform duration-300">
                    <span className="text-xl sm:text-2xl md:text-3xl drop-shadow-md">🔒</span>
                  </div>

                  <div className="relative z-10 font-serif font-black tracking-widest text-amber-300 text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-md">
                    {piece.label}
                  </div>

                  <div className="relative z-10 text-xs sm:text-sm text-slate-300 font-semibold tracking-wide mt-1 group-hover/tile:text-amber-200 transition-colors">
                    BÍ MẬT ĐANG KHÓA
                  </div>

                  {/* Detective Hint badge */}
                  <div className="relative z-10 mt-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs sm:text-sm text-amber-300 font-mono font-bold flex items-center gap-1.5 shadow-sm">
                    <span>📐</span> Bấm giải bài toán
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Outer subtle vignette */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] border border-amber-500/20" />
    </div>
  );
};
