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
    <div className={`relative w-full h-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[460px] bg-slate-900/90 rounded-2xl border-2 border-amber-500/40 p-4 flex items-center justify-center shadow-2xl overflow-hidden ${className}`}>
      {/* Background blueprint grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:20px_20px] rounded-2xl pointer-events-none" />

      {/* Render diagram based on type */}
      {diagramType === 'ladder_wall' ? (
        /* Real-world: Ladder against vertical wall */
        <svg viewBox="0 0 320 240" className="w-full h-full max-h-[450px]">
          <defs>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          {/* Ground */}
          <line x1="20" y1="190" x2="300" y2="190" stroke="#94a3b8" strokeWidth="4" />
          <line x1="20" y1="194" x2="300" y2="194" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" />
          <text x="140" y="218" fill="#cbd5e1" fontSize="15" textAnchor="middle" fontWeight="bold">Mặt đất (kề)</text>

          {/* Wall */}
          <rect x="235" y="25" width="35" height="165" fill="url(#wallGrad)" stroke="#64748b" strokeWidth="2" />
          {/* Wall brick lines */}
          <line x1="235" y1="55" x2="270" y2="55" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="235" y1="85" x2="270" y2="85" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="235" y1="115" x2="270" y2="115" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="235" y1="145" x2="270" y2="145" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="235" y1="175" x2="270" y2="175" stroke="#1e293b" strokeWidth="1.5" />
          <text x="285" y="110" fill="#94a3b8" fontSize="14" fontWeight="bold" transform="rotate(90 285 110)">Bức tường</text>

          {/* Right Angle Symbol at base of wall */}
          <rect x="219" y="174" width="16" height="16" fill="none" stroke="#eab308" strokeWidth="2.5" />

          {/* Ladder (Hypotenuse) */}
          <line x1="55" y1="190" x2="235" y2="35" stroke="#eab308" strokeWidth="5" strokeLinecap="round" />
          {/* Ladder Rungs */}
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((t, idx) => {
            const rx = 55 + (235 - 55) * t;
            const ry = 190 + (35 - 190) * t;
            return <circle key={idx} cx={rx} cy={ry} r="3.5" fill="#fef08a" stroke="#854d0e" strokeWidth="1.5" />;
          })}

          {/* Angle arc at foot of ladder */}
          <path d="M 90,190 A 35,35 0 0,0 78,168" fill="none" stroke="#38bdf8" strokeWidth="3" />
          <text x="98" y="178" fill="#38bdf8" fontSize="16" fontWeight="bold">60°</text>

          {/* Dimension Labels */}
          <text x="130" y="95" fill="#fde047" fontSize="16" fontWeight="bold" textAnchor="middle" transform="rotate(-41 130 95)">
            Thang dài 5 m
          </text>
          <text x="145" y="180" fill="#f43f5e" fontSize="17" fontWeight="black" textAnchor="middle">
            d = ? m
          </text>
        </svg>
      ) : diagramType === 'shadow_tower' ? (
        /* Real-world: Lighthouse overlooking ship with angle of depression 30° */
        <svg viewBox="0 0 320 240" className="w-full h-full max-h-[450px]">
          {/* Water level */}
          <line x1="20" y1="190" x2="300" y2="190" stroke="#38bdf8" strokeWidth="3.5" />
          <path d="M 20,198 Q 45,193 70,198 T 120,198 T 170,198 T 220,198 T 270,198 T 300,198" fill="none" stroke="#0284c7" strokeWidth="2" />

          {/* Lighthouse at left */}
          <polygon points="50,190 75,190 68,45 57,45" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <rect x="54" y="32" width="17" height="13" fill="#eab308" />
          <circle cx="62" cy="38" r="6" fill="#fef08a" />
          {/* Light beam */}
          <polygon points="62,38 275,190 275,195" fill="#fef08a" opacity="0.25" />

          {/* Height marker */}
          <line x1="36" y1="38" x2="36" y2="190" stroke="#fde047" strokeWidth="2" strokeDasharray="4,4" />
          <text x="22" y="118" fill="#fde047" fontSize="15" fontWeight="bold" textAnchor="middle" transform="rotate(-90 22 118)">
            h = 45 m
          </text>

          {/* Right Angle at base */}
          <rect x="62" y="174" width="16" height="16" fill="none" stroke="#eab308" strokeWidth="2" />

          {/* Horizontal line from top of tower for angle of depression */}
          <line x1="62" y1="38" x2="160" y2="38" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
          <path d="M 110,38 A 48,48 0 0,1 100,64" fill="none" stroke="#f43f5e" strokeWidth="2" />
          <text x="120" y="58" fill="#f43f5e" fontSize="15" fontWeight="bold">30°</text>

          {/* Sight line from top to boat */}
          <line x1="62" y1="38" x2="265" y2="190" stroke="#ca8a04" strokeWidth="3" />

          {/* Boat at right */}
          <polygon points="250,190 285,190 280,202 255,202" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          <polygon points="268,172 268,188 280,188" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />

          {/* Angle at boat (Alternate interior) */}
          <path d="M 230,190 A 35,35 0 0,1 240,170" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="210" y="180" fill="#38bdf8" fontSize="16" fontWeight="bold">30°</text>

          {/* Unknown distance */}
          <text x="160" y="222" fill="#fde047" fontSize="16" fontWeight="black" textAnchor="middle">
            Khoảng cách d = ?
          </text>
        </svg>
      ) : diagramType === 'triangle_height' ? (
        /* Triangle with altitude AH perpendicular to BC */
        <svg viewBox="0 0 320 240" className="w-full h-full max-h-[450px]">
          {/* Main Triangle ABC right at A */}
          <polygon points="120,40 40,180 280,180" fill="#1e293b" stroke="#38bdf8" strokeWidth="3.5" />

          {/* Right angle at A */}
          <path d="M 106,62 L 128,75 L 141,53" fill="none" stroke="#eab308" strokeWidth="2.5" />

          {/* Altitude AH */}
          <line x1="120" y1="40" x2="120" y2="180" stroke="#f43f5e" strokeWidth="3" strokeDasharray="5,3" />
          {/* Right angle at H */}
          <rect x="104" y="164" width="16" height="16" fill="none" stroke="#f43f5e" strokeWidth="2" />

          {/* Angle at B */}
          <path d="M 70,180 A 30,30 0 0,0 58,150" fill="none" stroke="#fde047" strokeWidth="2.5" />
          <text x="76" y="168" fill="#fde047" fontSize="16" fontWeight="bold">45°</text>

          {/* Vertices labels */}
          <text x="120" y="26" fill="#f8fafc" fontSize="18" fontWeight="black" textAnchor="middle">A</text>
          <text x="22" y="190" fill="#f8fafc" fontSize="18" fontWeight="black">B</text>
          <text x="292" y="190" fill="#f8fafc" fontSize="18" fontWeight="black">C</text>
          <text x="120" y="206" fill="#f43f5e" fontSize="18" fontWeight="black" textAnchor="middle">H</text>

          {/* Side labels */}
          <text x="65" y="100" fill="#38bdf8" fontSize="15" fontWeight="bold" transform="rotate(-60 65 100)">
            AB = 9 cm
          </text>
          <text x="140" y="118" fill="#f43f5e" fontSize="17" fontWeight="black">
            AH = ?
          </text>
        </svg>
      ) : (
        /* Standard Right Triangle ABC */
        <svg viewBox="0 0 320 240" className="w-full h-full max-h-[450px]">
          {/* Vertices: A=(60, 175), B=(60, 45), C=(260, 175) - Right at A */}
          <polygon points="60,175 60,45 260,175" fill="#1e293b" stroke="#38bdf8" strokeWidth="4" />

          {/* Right Angle symbol at A */}
          <rect x="60" y="153" width="22" height="22" fill="none" stroke="#eab308" strokeWidth="2.5" />

          {/* Angle Arc if given */}
          {triangleData?.angleName === 'B' && (
            <>
              <path d="M 60,85 A 40,40 0 0,0 82,72" fill="none" stroke="#fde047" strokeWidth="3" />
              <text x="88" y="85" fill="#fde047" fontSize="17" fontWeight="bold">
                {triangleData.angleValue || '30°'}
              </text>
            </>
          )}

          {triangleData?.angleName === 'C' && (
            <>
              <path d="M 215,175 A 45,45 0 0,1 228,154" fill="none" stroke="#fde047" strokeWidth="3" />
              <text x="188" y="165" fill="#fde047" fontSize="17" fontWeight="bold">
                {triangleData.angleValue || '60°'}
              </text>
            </>
          )}

          {/* Vertices Labels */}
          <text x="35" y="195" fill="#f8fafc" fontSize="20" fontWeight="black">A</text>
          <text x="35" y="38" fill="#f8fafc" fontSize="20" fontWeight="black">B</text>
          <text x="275" y="195" fill="#f8fafc" fontSize="20" fontWeight="black">C</text>

          {/* Known Sides & Target Labels */}
          {/* Side AB (Left) */}
          <text x="25" y="115" fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="end">
            {triangleData?.knownSide1?.name.includes('AB') ? triangleData.knownSide1.value : triangleData?.knownSide2?.name.includes('AB') ? triangleData.knownSide2.value : triangleData?.target.includes('AB') ? 'AB = ?' : 'c'}
          </text>

          {/* Side AC (Bottom) */}
          <text x="160" y="208" fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">
            {triangleData?.knownSide1?.name.includes('AC') ? triangleData.knownSide1.value : triangleData?.knownSide2?.name.includes('AC') ? triangleData.knownSide2.value : triangleData?.target.includes('AC') ? 'AC = ?' : 'b'}
          </text>

          {/* Hypotenuse BC (Diagonal) */}
          <text x="175" y="95" fill="#f59e0b" fontSize="16" fontWeight="bold" transform="rotate(33 175 95)" textAnchor="middle">
            {triangleData?.knownSide1?.name.includes('BC') ? triangleData.knownSide1.value : triangleData?.target.includes('BC') ? 'BC = ?' : 'a (huyền)'}
          </text>

          {/* Target Note Badge */}
          {triangleData?.target && (
            <g transform="translate(150, 15)">
              <rect x="0" y="0" width="150" height="32" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
              <text x="75" y="22" fill="#fecdd3" fontSize="15" fontWeight="bold" textAnchor="middle">
                🎯 {triangleData.target}
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
