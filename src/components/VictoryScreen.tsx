import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PlayerStats } from '../types';
import { DetectiveMascot } from './DetectiveMascot';
import { SecretArtwork } from './SecretArtwork';
import { sound } from '../utils/audio';
import { Trophy, Medal, RotateCcw, Home, Sparkles, CheckCircle, Award } from 'lucide-react';

interface VictoryScreenProps {
  stats: PlayerStats;
  customImageUrl?: string | null;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  stats,
  customImageUrl = null,
  onPlayAgain,
  onGoHome,
}) => {
  useEffect(() => {
    sound.playVictory();

    // Multistage Confetti fireworks
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#eab308', '#38bdf8', '#10b981', '#f59e0b', '#ec4899'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#eab308', '#38bdf8', '#10b981', '#f59e0b', '#ec4899'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div
      id="victory-screen"
      className="min-h-screen w-full bg-radial from-slate-900 via-slate-925 to-black text-slate-100 p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-4xl w-full my-auto flex flex-col items-center text-center space-y-6 animate-fade-in">
        {/* Victory Header Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border-2 border-amber-400 text-amber-300 font-serif font-black text-sm md:text-base tracking-widest uppercase shadow-2xl animate-pulse">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>🏆 VỤ ÁN ĐÃ ĐƯỢC PHÁ HOÀN TOÀN! 🏆</span>
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>

        {/* Mascot Celebrating */}
        <div className="relative">
          <DetectiveMascot
            mood="victory"
            size="lg"
            speechBubble="Xuất sắc! Bạn đã giải mã thành công toàn bộ hệ thức lượng tam giác vuông và tìm ra nhân vật lịch sử!"
          />
        </div>

        {/* Revealed Secret Artwork Masterpiece */}
        <div className="w-full max-w-xl rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl shadow-amber-500/20">
          <SecretArtwork
            unlockedPieces={[1, 2, 3, 4, 5, 6]}
            highlightAll={true}
            customImageUrl={customImageUrl}
          />
        </div>

        {/* Individual Score Card & Performance Metrics */}
        <div className="w-full max-w-xl p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950 border-2 border-amber-500/60 shadow-2xl space-y-4">
          <div className="text-amber-400 font-serif font-black text-xl md:text-2xl">
            BẢNG THÀNH TÍCH PHÁ ÁN
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <span className="text-xs text-slate-400 font-medium">Tổng điểm</span>
              <span className="text-2xl md:text-3xl font-mono font-black text-amber-300 mt-1">
                {stats.score}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <span className="text-xs text-slate-400 font-medium">Câu đúng</span>
              <span className="text-2xl md:text-3xl font-mono font-black text-emerald-400 mt-1">
                {stats.correctAnswers}/6
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <span className="text-xs text-slate-400 font-medium">Mảnh ghép</span>
              <span className="text-2xl md:text-3xl font-mono font-black text-sky-400 mt-1">
                {stats.piecesUnlocked}/6
              </span>
            </div>
          </div>
        </div>

        {/* Mathematical Historical Note */}
        <div className="max-w-2xl p-4 md:p-5 rounded-2xl bg-slate-900/60 border border-amber-500/20 text-xs md:text-sm text-slate-300 leading-relaxed flex items-start gap-3 text-left">
          <div className="text-2xl">🏛️</div>
          <div>
            <span className="font-bold text-amber-300">Ghi chú kiến thức Toán 9: </span>
            Pythagoras (sinh khoảng 570 TCN tại đảo Samos, Hy Lạp) là triết gia và nhà toán học vĩ đại. Định lý mang tên ông là nền tảng của hình học tam giác vuông (a² + b² = c²) và mở đường cho hệ thống tỉ số lượng giác (sin, cos, tan, cot) mà bạn vừa giải mã thành công hôm nay!
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onPlayAgain}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-serif font-black text-sm md:text-base shadow-xl shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 text-slate-950" />
            <span>🔄 CHƠI LƯỢT MỚI</span>
          </button>

          <button
            onClick={onGoHome}
            className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-sm md:text-base flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>🏠 VỀ TRANG CHỦ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
