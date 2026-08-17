import React, { useEffect, useRef } from 'react';
import { DetectiveMascot } from './DetectiveMascot';
import { sound } from '../utils/audio';

interface ScanningAnimationProps {
  pieceNumber: number;
  onComplete: () => void;
}

export const ScanningAnimation: React.FC<ScanningAnimationProps> = ({
  pieceNumber,
  onComplete,
}) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    sound.playScan();
    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    onCompleteRef.current();
  };

  return (
    <div
      id="scanning-overlay"
      onClick={handleSkip}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md animate-fade-in cursor-pointer select-none"
      title="Bấm để mở câu hỏi ngay"
    >
      <div className="relative max-w-lg w-full mx-4 p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950 border-2 border-amber-500/70 shadow-2xl flex flex-col items-center text-center overflow-hidden">
        {/* Scanning beam effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/10 to-transparent w-full h-12 animate-pulse pointer-events-none" />

        {/* Mascot investigating */}
        <DetectiveMascot mood="investigating" size="lg" className="mb-4 animate-bounce" />

        {/* Top Secret Badge */}
        <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest mb-3">
          🔍 SCANNING CASE FILE • MẢNH 0{pieceNumber}
        </div>

        <h2 className="text-2xl md:text-3xl font-serif font-black text-amber-300 tracking-wide mb-2">
          ĐANG TRUY XUẤT BÀI TOÁN SỐ 0{pieceNumber}
        </h2>

        <p className="text-sm text-slate-300 font-medium">
          Chuẩn bị 1 phút 30 giây tính toán hệ thức lượng tam giác vuông...
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden border border-amber-500/30">
          <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full animate-pulse w-full" />
        </div>

        <div className="mt-3 text-[11px] text-slate-400 font-mono">
          Bấm bất kỳ đâu để vào câu hỏi ngay ⚡
        </div>
      </div>
    </div>
  );
};
