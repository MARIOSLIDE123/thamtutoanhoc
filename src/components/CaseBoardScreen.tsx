import React from 'react';
import { SecretArtwork } from './SecretArtwork';
import { DetectiveMascot } from './DetectiveMascot';
import { sound } from '../utils/audio';
import { Sparkles, Eye, ArrowRight, Shuffle, Image as ImageIcon } from 'lucide-react';

interface CaseBoardScreenProps {
  unlockedPieces: number[];
  onSelectPiece: (pieceNumber: number) => void;
  onOpenFinalReveal: () => void;
  onOpenImageUpload: () => void;
  customImageUrl?: string | null;
  classroomMode?: boolean;
}

export const CaseBoardScreen: React.FC<CaseBoardScreenProps> = ({
  unlockedPieces,
  onSelectPiece,
  onOpenFinalReveal,
  onOpenImageUpload,
  customImageUrl = null,
  classroomMode = false,
}) => {
  const allUnlocked = unlockedPieces.length === 6;

  const handlePieceClick = (pieceNum: number) => {
    sound.playClick();
    onSelectPiece(pieceNum);
  };

  // Pick random locked piece (1..6)
  const handleRandomPick = () => {
    const remaining = [1, 2, 3, 4, 5, 6].filter((num) => !unlockedPieces.includes(num));
    if (remaining.length === 0) {
      sound.playClick();
      onOpenFinalReveal();
      return;
    }
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const chosen = remaining[randomIndex];
    sound.playClick();
    onSelectPiece(chosen);
  };

  return (
    <div
      id="case-board-screen"
      className="min-h-[calc(100vh-60px)] w-full max-w-7xl mx-auto flex flex-col items-center justify-between p-3 sm:p-5 md:p-6 relative select-none"
    >
      {/* Top Investigation Bar: Progress & Action Buttons */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 bg-slate-900/90 border-2 border-amber-500/40 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-xl">
        {/* Left: Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Random Piece Selector Button */}
          {!allUnlocked && (
            <button
              onClick={handleRandomPick}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/25 to-yellow-500/25 hover:from-amber-500/40 hover:to-yellow-500/40 border border-amber-400/60 text-amber-300 text-xs sm:text-sm md:text-base font-serif font-black flex items-center gap-2 cursor-pointer transition-all hover:scale-105 shadow-md"
              title="Chọn ngẫu nhiên một mảnh ghép chưa mở"
            >
              <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              <span>🎲 CHỌN NGẪU NHIÊN MẢNH GHÉP</span>
            </button>
          )}

          {/* Upload / Change background image button */}
          <button
            onClick={onOpenImageUpload}
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Thay đổi ảnh bí mật đằng sau 6 mảnh ghép"
          >
            <ImageIcon className="w-4 h-4 text-sky-400" />
            <span>Đổi ảnh nền</span>
          </button>
        </div>

        {/* Right: Progress Tracker & Final Reveal */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-slate-300 font-bold uppercase tracking-wider">TIẾN ĐỘ:</span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isUnlocked = unlockedPieces.includes(num);
                return (
                  <div
                    key={num}
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-xl text-xs sm:text-sm md:text-base font-black flex items-center justify-center border-2 transition-all ${
                      isUnlocked
                        ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md scale-105'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    {isUnlocked ? '✓' : num}
                  </div>
                );
              })}
            </div>
            <span className="text-sm sm:text-base md:text-lg font-mono font-black text-amber-400 pl-1">
              {unlockedPieces.length}/6
            </span>
          </div>

          {/* Final Guess Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenFinalReveal();
            }}
            className={`px-4 py-2.5 rounded-xl border-2 text-xs sm:text-sm md:text-base font-serif font-black flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
              allUnlocked
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-amber-300 animate-bounce shadow-amber-500/30 hover:scale-105'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/50 hover:border-amber-400'
            }`}
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{allUnlocked ? 'PHÁ ÁN CUỐI CÙNG NGAY!' : 'Đoán nhân vật sớm'}</span>
          </button>
        </div>
      </div>

      {/* Main 6-Piece Puzzle Board Centerpiece */}
      <div className="w-full max-w-6xl my-auto flex flex-col items-center space-y-4">
        <div className="relative w-full">
          <SecretArtwork
            unlockedPieces={unlockedPieces}
            customImageUrl={customImageUrl}
            onSelectPiece={handlePieceClick}
          />

          {/* Clickable Overlay Grid for Locked Pieces */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1.5 p-1.5 pointer-events-none">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const isUnlocked = unlockedPieces.includes(num);

              return (
                <button
                  key={num}
                  id={`case-piece-btn-${num}`}
                  onClick={() => handlePieceClick(num)}
                  className={`w-full h-full rounded-xl transition-all cursor-pointer pointer-events-auto flex items-center justify-center group ${
                    isUnlocked
                      ? 'hover:ring-2 hover:ring-emerald-400/50'
                      : 'hover:ring-4 hover:ring-amber-400 active:scale-98'
                  }`}
                  title={isUnlocked ? `Mảnh 0${num} đã mở` : `Bấm để giải bài toán mảnh 0${num}`}
                >
                  {!isUnlocked && (
                    <span className="sr-only">Mở mảnh ghép {num}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guidance Footer with Large Typography */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3.5 rounded-2xl bg-slate-900/80 border-2 border-slate-800 text-sm sm:text-base text-slate-200 shadow-lg">
          <div className="flex items-center gap-3.5">
            <DetectiveMascot mood="curious" size="md" />
            <div>
              <span className="text-amber-400 font-bold font-serif">Thám tử Toán học: </span>
              {allUnlocked
                ? 'Tuyệt vời! Cả 6 mảnh ghép đã mở toàn bộ. Bạn đã nhận ra ai trong bức tranh chưa?'
                : 'Hãy chọn bất kỳ mảnh ghép nào (Mảnh 01 đến 06) hoặc bấm nút ngẫu nhiên để giải toán hệ thức lượng!'}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {allUnlocked ? (
              <button
                onClick={onOpenFinalReveal}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-serif font-black text-sm sm:text-base md:text-lg flex items-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-105 transition-transform cursor-pointer"
              >
                <span>TIẾN HÀNH PHÁ ÁN</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <span className="text-slate-300 font-medium">
                💡 Mỗi bài toán đúng: <strong className="text-amber-400 font-bold">+10 điểm</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
