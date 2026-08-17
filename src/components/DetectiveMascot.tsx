import React from 'react';

export type MascotMood = 'curious' | 'investigating' | 'happy' | 'thinking' | 'victory';

interface DetectiveMascotProps {
  mood?: MascotMood;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechBubble?: string;
}

export const DetectiveMascot: React.FC<DetectiveMascotProps> = ({
  mood = 'curious',
  className = '',
  size = 'md',
  speechBubble,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* Dynamic Speech Bubble if provided */}
      {speechBubble && (
        <div className="relative z-10 max-w-xs md:max-w-md bg-slate-900/95 border-2 border-amber-400/80 rounded-2xl p-3 md:p-4 text-amber-100 text-xs md:text-sm font-medium shadow-2xl backdrop-blur-md animate-fade-in">
          <p className="leading-relaxed">{speechBubble}</p>
          {/* Arrow */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-amber-400" />
        </div>
      )}

      {/* Mascot Graphic SVG */}
      <div className={`relative ${sizeMap[size]} shrink-0 transition-transform duration-300 hover:scale-105 select-none drop-shadow-xl`}>
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="hatBand" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <radialGradient id="glassLens" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
            </radialGradient>
            <filter id="mascotGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Coat & Collar */}
          <path
            d="M 45,195 Q 60,135 100,135 Q 140,135 155,195 Z"
            fill="url(#coatGrad)"
            stroke="#78350f"
            strokeWidth="2"
          />
          {/* Trench Coat Lapels */}
          <polygon points="100,140 70,165 85,195 100,155" fill="#f59e0b" />
          <polygon points="100,140 130,165 115,195 100,155" fill="#f59e0b" />
          {/* Collar Shirt & Tie */}
          <polygon points="100,135 90,150 100,160 110,150" fill="#f8fafc" />
          <polygon points="100,150 95,175 100,185 105,175" fill="#ef4444" />

          {/* Face & Ears */}
          <ellipse cx="100" cy="100" rx="36" ry="38" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
          <ellipse cx="64" cy="100" rx="6" ry="10" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="136" cy="100" rx="6" ry="10" fill="#fde68a" stroke="#d97706" strokeWidth="1" />

          {/* Hair Tufts */}
          <path d="M 68,85 Q 75,70 85,75 Q 95,65 105,75 Q 115,65 125,72 Q 132,85 132,90" fill="#78350f" />

          {/* Eyes & Eyebrows based on Mood */}
          {mood === 'victory' || mood === 'happy' ? (
            /* Happy / Winking Eyes */
            <g stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round">
              <path d="M 82,98 Q 90,90 98,98" />
              <path d="M 108,98 Q 116,90 124,98" />
              {/* Joy blush */}
              <ellipse cx="80" cy="108" rx="6" ry="3" fill="#f87171" opacity="0.6" stroke="none" />
              <ellipse cx="120" cy="108" rx="6" ry="3" fill="#f87171" opacity="0.6" stroke="none" />
            </g>
          ) : mood === 'investigating' || mood === 'thinking' ? (
            /* Focused Detective Eyes */
            <g fill="#1e293b">
              {/* Eyebrows */}
              <path d="M 78,88 Q 90,84 96,90" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 106,90 Q 114,84 122,88" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Eyes */}
              <circle cx="88" cy="98" r="5" />
              <circle cx="114" cy="98" r="5" />
              <circle cx="89" cy="96" r="1.5" fill="#fff" />
              <circle cx="115" cy="96" r="1.5" fill="#fff" />
            </g>
          ) : (
            /* Curious Standard Eyes */
            <g fill="#1e293b">
              <path d="M 80,88 Q 90,85 96,88" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 106,88 Q 112,85 120,88" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <ellipse cx="88" cy="98" rx="5" ry="6" />
              <ellipse cx="114" cy="98" rx="5" ry="6" />
              <circle cx="89" cy="96" r="2" fill="#fff" />
              <circle cx="115" cy="96" r="2" fill="#fff" />
            </g>
          )}

          {/* Nose & Smile */}
          <path d="M 100,98 Q 103,106 97,108" stroke="#d97706" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 94,116 Q 100,122 108,116" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Detective Fedora Hat */}
          {/* Hat Brim */}
          <ellipse cx="100" cy="74" rx="58" ry="14" fill="url(#hatGrad)" stroke="#334155" strokeWidth="1.5" />
          {/* Hat Crown */}
          <path
            d="M 68,72 Q 74,32 100,32 Q 126,32 132,72 Z"
            fill="url(#hatGrad)"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          {/* Crown Crease */}
          <path d="M 88,40 Q 100,48 112,40" stroke="#0f172a" strokeWidth="2.5" fill="none" />
          {/* Golden Hat Ribbon */}
          <path d="M 69,66 Q 100,70 131,66 L 132,72 Q 100,76 68,72 Z" fill="url(#hatBand)" />

          {/* Magnifying Glass In Hand */}
          <g transform="translate(115, 80) rotate(15)" id="magnifying-glass">
            {/* Wooden Handle */}
            <rect x="22" y="24" width="8" height="35" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1.5" transform="rotate(45 26 40)" />
            {/* Golden Rim */}
            <circle cx="14" cy="14" r="22" fill="none" stroke="#eab308" strokeWidth="4" filter="url(#mascotGlow)" />
            <circle cx="14" cy="14" r="20" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
            {/* Glass Lens with Refraction */}
            <circle cx="14" cy="14" r="19" fill="url(#glassLens)" />
            <path d="M 2,6 Q 10,-2 20,2" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
};
