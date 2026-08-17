import React from 'react';
import { DetectiveMascot } from './DetectiveMascot';
import { sound } from '../utils/audio';
import {
  Play,
  Image as ImageIcon,
  BookOpen,
  HelpCircle,
  Sparkles,
  Compass,
} from 'lucide-react';

interface HomeScreenProps {
  onStartGame: () => void;
  onOpenInstructions: () => void;
  onOpenQuestionBank: () => void;
  onOpenImageUpload: () => void;
  hasCustomImage: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onOpenInstructions,
  onOpenQuestionBank,
  onOpenImageUpload,
  hasCustomImage,
}) => {
  return (
    <div
      id="home-screen"
      className="min-h-[calc(100vh-60px)] w-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden select-none"
    >
      {/* Ancient Greek Atmospheric Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between px-8">
        <div className="w-16 h-full border-x-4 border-slate-600 bg-slate-800/20" />
        <div className="w-16 h-full border-x-4 border-slate-600 bg-slate-800/20 hidden md:block" />
        <div className="w-16 h-full border-x-4 border-slate-600 bg-slate-800/20" />
      </div>

      {/* Floating Geometric Trigonometric Symbols */}
      <div className="absolute top-12 left-12 text-amber-500/20 font-serif text-3xl font-bold animate-pulse pointer-events-none">
        sin(B) = b / a
      </div>
      <div className="absolute bottom-16 right-16 text-sky-400/20 font-serif text-3xl font-bold animate-pulse pointer-events-none">
        a² + b² = c²
      </div>
      <div className="absolute top-24 right-20 text-emerald-400/20 font-serif text-2xl font-bold pointer-events-none">
        tan(C) = c / b
      </div>

      {/* Main Hero Card */}
      <div className="relative z-10 max-w-5xl w-full my-auto flex flex-col items-center text-center space-y-6 animate-fade-in">
        {/* Ancient Greece Investigation Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 font-mono text-xs md:text-sm font-black tracking-widest uppercase shadow-xl backdrop-blur-xs">
          <Sparkles className="w-4 h-4 text-amber-400" />
          GAME TƯƠNG TÁC TOÁN 9 – BÀI 3: GIẢI TAM GIÁC VUÔNG
        </div>

        {/* Mascot Centerpiece */}
        <div className="relative my-2">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-sky-500/20 rounded-full blur-2xl pointer-events-none" />
          <DetectiveMascot
            mood="curious"
            size="xl"
            speechBubble="Chào mừng bạn! Hãy chọn bất kỳ mảnh ghép nào để giải hệ thức lượng và tìm ra danh tính vĩ nhân bí mật!"
          />
        </div>

        {/* Cinematic Title - Always on 1 single line */}
        <div className="space-y-2 w-full flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-normal sm:tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-2xl text-center whitespace-nowrap leading-snug">
            🕵️ THÁM TỬ TOÁN HỌC
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed">
            “Giải toán – Mở khóa bí mật – Tìm ra nhà toán học huyền thoại!”
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-slate-300">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            🧩 6 Mảnh ghép tự do
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 text-amber-300">
            ⏱️ 1 Phút 30 Giây / Câu
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 text-sky-300">
            {hasCustomImage ? '🖼️ Ảnh tùy chỉnh' : '🏛️ Bí mật Pythagoras'}
          </span>
        </div>

        {/* Main CTA Button - "BẮT ĐẦU" */}
        <div className="w-full max-w-md space-y-3 pt-2">
          <button
            id="start-game-btn"
            onClick={() => {
              sound.playClick();
              onStartGame();
            }}
            className="w-full py-4 md:py-5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-serif font-black text-lg md:text-2xl tracking-wider uppercase shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <span>BẮT ĐẦU</span>
          </button>

          {/* Secondary Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onOpenInstructions();
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 text-xs md:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>HƯỚNG DẪN</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenImageUpload();
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 text-xs md:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-sky-400" />
              <span>TẢI ẢNH NỀN</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenQuestionBank();
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 text-xs md:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>NGÂN HÀNG CÂU</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
