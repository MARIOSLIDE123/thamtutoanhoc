import React from 'react';
import { Question } from '../types';

interface GeometryDiagramProps {
  question?: Question;
  diagramType?: 'triangle_abc' | 'triangle_side_angle' | 'ladder_wall' | 'shadow_tower' | 'triangle_height' | 'triangle_two_sides' | string;
  triangleData?: {
    rightAngleAt?: string;
    angleValue?: string;
    angleName?: string;
    knownSide1?: { name: string; value: string };
    knownSide2?: { name: string; value: string };
    target?: string;
    note?: string;
  };
  className?: string;
}

export const GeometryDiagram: React.FC<GeometryDiagramProps> = ({
  question,
  diagramType: directDiagramType,
  triangleData: directTriangleData,
  className = '',
}) => {
  const diagramType = directDiagramType || question?.diagramType || 'triangle_side_angle';
  const triangleData = directTriangleData || question?.triangleData;

  return (
    <div className={`relative w-full max-w-sm mx-auto aspect-4/3 bg-slate-900/90 rounded-xl border border-amber-500/30 p-3 flex items-center justify-center shadow-lg ${className}`}>
      {/* Background blueprint grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] rounded-xl pointer-events-none" />

      {/* Render diagram based on type */}
      {diagramType === 'ladder_wall' ? (
        /* Real-world: Ladder against vertical wall */
        <svg viewBox="0 0 300 220" className="w-full h-full">
          <defs>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          {/* Ground */}
          <line x1="20" y1="180" x2="280" y2="180" stroke="#94a3b8" strokeWidth="3" />
          <line x1="20" y1="183" x2="280" y2="183" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
          <text x="140" y="202" fill="#cbd5e1" fontSize="12" textAnchor="middle" fontWeight="bold">Mặt đất (kề)</text>

          {/* Wall */}
          <rect x="220" y="30" width="30" height="150" fill="url(#wallGrad)" stroke="#64748b" strokeWidth="1.5" />
          {/* Wall brick lines */}
          <line x1="220" y1="60" x2="250" y2="60" stroke="#1e293b" />
          <line x1="220" y1="90" x2="250" y2="90" stroke="#1e293b" />
          <line x1="220" y1="120" x2="250" y2="120" stroke="#1e293b" />
          <line x1="220" y1="150" x2="250" y2="150" stroke="#1e293b" />
          <text x="265" y="110" fill="#94a3b8" fontSize="11" transform="rotate(90 265 110)">Tường</text>

          {/* Right Angle Symbol at base of wall */}
          <rect x="206" y="166" width="14" height="14" fill="none" stroke="#eab308" strokeWidth="2" />

          {/* Ladder (Hypotenuse) */}
          <line x1="60" y1="180" x2="220" y2="40" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
          {/* Ladder Rungs */}
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((t, idx) => {
            const rx = 60 + (220 - 60) * t;
            const ry = 180 + (40 - 180) * t;
            return <circle key={idx} cx={rx} cy={ry} r="3" fill="#fef08a" stroke="#854d0e" strokeWidth="1" />;
          })}

          {/* Angle arc at foot of ladder */}
          <path d="M 90,180 A 30,30 0 0,0 80,163" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="96" y="172" fill="#38bdf8" fontSize="13" fontWeight="bold">60°</text>

          {/* Dimension Labels */}
          <text x="120" y="95" fill="#fde047" fontSize="13" fontWeight="bold" textAnchor="middle" transform="rotate(-41 120 95)">
            Thang dài 5 m
          </text>
          <text x="140" y="172" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">
            d = ? m
          </text>
        </svg>
      ) : diagramType === 'shadow_tower' ? (
        /* Real-world: Lighthouse overlooking ship with angle of depression 30° */
        <svg viewBox="0 0 300 220" className="w-full h-full">
          {/* Water level */}
          <line x1="20" y1="180" x2="280" y2="180" stroke="#38bdf8" strokeWidth="2.5" />
          <path d="M 20,186 Q 40,182 60,186 T 100,186 T 140,186 T 180,186 T 220,186 T 260,186 T 280,186" fill="none" stroke="#0284c7" strokeWidth="1.5" />

          {/* Lighthouse at left */}
          <polygon points="50,180 70,180 65,50 55,50" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <rect x="52" y="40" width="16" height="10" fill="#eab308" />
          <circle cx="60" cy="45" r="5" fill="#fef08a" />
          {/* Light beam */}
          <polygon points="60,45 250,180 250,185" fill="#fef08a" opacity="0.25" />

          {/* Height marker */}
          <line x1="38" y1="45" x2="38" y2="180" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="25" y="115" fill="#fde047" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 25 115)">
            h = 45 m
          </text>

          {/* Right Angle at base */}
          <rect x="60" y="166" width="14" height="14" fill="none" stroke="#eab308" strokeWidth="1.5" />

          {/* Horizontal line from top of tower for angle of depression */}
          <line x1="60" y1="45" x2="140" y2="45" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
          <path d="M 100,45 A 40,40 0 0,1 92,67" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="108" y="60" fill="#f43f5e" fontSize="11" fontWeight="bold">30°</text>

          {/* Sight line from top to boat */}
          <line x1="60" y1="45" x2="245" y2="180" stroke="#ca8a04" strokeWidth="2.5" />

          {/* Boat at right */}
          <polygon points="230,180 260,180 255,190 235,190" fill="#b45309" />
          <polygon points="245,165 245,178 255,178" fill="#f8fafc" />

          {/* Angle at boat (Alternate interior) */}
          <path d="M 215,180 A 30,30 0 0,1 223,164" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <text x="200" y="172" fill="#38bdf8" fontSize="12" fontWeight="bold">30°</text>

          {/* Unknown distance */}
          <text x="150" y="200" fill="#fde047" fontSize="13" fontWeight="bold" textAnchor="middle">
            Khoảng cách d = ?
          </text>
        </svg>
      ) : diagramType === 'triangle_height' ? (
        /* Triangle with altitude AH perpendicular to BC */
        <svg viewBox="0 0 300 220" className="w-full h-full">
          {/* Main Triangle ABC right at A */}
          {/* A=(110, 50), B=(40, 170), C=(260, 170) */}
          {/* Altitude H=(110, 170) */}
          <polygon points="110,50 40,170 260,170" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />

          {/* Right angle at A */}
          <path d="M 98,68 L 118,79 L 129,61" fill="none" stroke="#eab308" strokeWidth="1.5" />

          {/* Altitude AH */}
          <line x1="110" y1="50" x2="110" y2="170" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4,2" />
          {/* Right angle at H */}
          <rect x="96" y="156" width="14" height="14" fill="none" stroke="#f43f5e" strokeWidth="1.5" />

          {/* Angle at B */}
          <path d="M 65,170 A 25,25 0 0,0 55,145" fill="none" stroke="#fde047" strokeWidth="2" />
          <text x="68" y="160" fill="#fde047" fontSize="12" fontWeight="bold">45°</text>

          {/* Vertices labels */}
          <text x="110" y="38" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
          <text x="25" y="178" fill="#f8fafc" fontSize="14" fontWeight="bold">B</text>
          <text x="270" y="178" fill="#f8fafc" fontSize="14" fontWeight="bold">C</text>
          <text x="110" y="192" fill="#f43f5e" fontSize="14" fontWeight="bold" textAnchor="middle">H</text>

          {/* Side labels */}
          <text x="60" y="100" fill="#38bdf8" fontSize="12" fontWeight="bold" transform="rotate(-59 60 100)">
            AB = 9 cm
          </text>
          <text x="125" y="115" fill="#f43f5e" fontSize="13" fontWeight="bold">
            AH = ?
          </text>
        </svg>
      ) : (
        /* Standard Right Triangle ABC */
        <svg viewBox="0 0 300 220" className="w-full h-full">
          {/* Vertices: A=(60, 160), B=(60, 50), C=(240, 160) - Right at A */}
          <polygon points="60,160 60,50 240,160" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />

          {/* Right Angle symbol at A */}
          <rect x="60" y="142" width="18" height="18" fill="none" stroke="#eab308" strokeWidth="2" />

          {/* Angle Arc if given */}
          {triangleData?.angleName === 'B' && (
            <>
              <path d="M 60,85 A 35,35 0 0,0 78,75" fill="none" stroke="#fde047" strokeWidth="2" />
              <text x="82" y="85" fill="#fde047" fontSize="13" fontWeight="bold">
                {triangleData.angleValue || '30°'}
              </text>
            </>
          )}

          {triangleData?.angleName === 'C' && (
            <>
              <path d="M 200,160 A 40,40 0 0,1 210,142" fill="none" stroke="#fde047" strokeWidth="2" />
              <text x="175" y="152" fill="#fde047" fontSize="13" fontWeight="bold">
                {triangleData.angleValue || '60°'}
              </text>
            </>
          )}

          {/* Vertices Labels */}
          <text x="40" y="175" fill="#f8fafc" fontSize="16" fontWeight="bold">A</text>
          <text x="40" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold">B</text>
          <text x="250" y="175" fill="#f8fafc" fontSize="16" fontWeight="bold">C</text>

          {/* Known Sides & Target Labels */}
          {/* Side AB (Left) */}
          <text x="32" y="110" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="end">
            {triangleData?.knownSide1?.name.includes('AB') ? triangleData.knownSide1.value : triangleData?.knownSide2?.name.includes('AB') ? triangleData.knownSide2.value : triangleData?.target.includes('AB') ? 'AB = ?' : 'c'}
          </text>

          {/* Side AC (Bottom) */}
          <text x="150" y="185" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">
            {triangleData?.knownSide1?.name.includes('AC') ? triangleData.knownSide1.value : triangleData?.knownSide2?.name.includes('AC') ? triangleData.knownSide2.value : triangleData?.target.includes('AC') ? 'AC = ?' : 'b'}
          </text>

          {/* Hypotenuse BC (Diagonal) */}
          <text x="160" y="95" fill="#f59e0b" fontSize="13" fontWeight="bold" transform="rotate(31 160 95)" textAnchor="middle">
            {triangleData?.knownSide1?.name.includes('BC') ? triangleData.knownSide1.value : triangleData?.target.includes('BC') ? 'BC = ?' : 'a (huyền)'}
          </text>

          {/* Target Note Badge */}
          {triangleData?.target && (
            <g transform="translate(140, 20)">
              <rect x="0" y="0" width="130" height="26" rx="6" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="65" y="18" fill="#fecdd3" fontSize="12" fontWeight="bold" textAnchor="middle">
                🎯 {triangleData.target}
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
