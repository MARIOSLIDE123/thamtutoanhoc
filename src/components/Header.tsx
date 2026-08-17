import React from 'react';
import { PlayerStats } from '../types';
import { sound } from '../utils/audio';
import {
  Trophy,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  HelpCircle,
  Image as ImageIcon,
  MonitorPlay,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface HeaderProps {
  stats: PlayerStats;
  unlockedCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  classroomMode: boolean;
  onToggleClassroomMode: () => void;
  onOpenTeacherPanel: () => void;
  onOpenInstructions: () => void;
  onOpenImageUpload: () => void;
  onOpenQuestionBank: () => void;
  onGoHome: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  unlockedCount,
  soundEnabled,
  onToggleSound,
  classroomMode,
  onToggleClassroomMode,
  onOpenTeacherPanel,
  onOpenInstructions,
  onOpenImageUpload,
  onOpenQuestionBank,
  onGoHome,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header
      id="game-app-header"
      className="w-full bg-slate-950/90 backdrop-blur-md border-b border-amber-500/30 px-3 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 select-none shadow-xl"
    >
      {/* Left: Brand logo & Title strictly on 1 line */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 group cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg">
              🕵️
            </div>
          </div>
          <div className="text-left whitespace-nowrap">
            <div className="text-xs sm:text-sm font-serif font-black tracking-wider text-amber-300 group-hover:text-amber-200 transition-colors uppercase whitespace-nowrap">
              THÁM TỬ TOÁN HỌC
            </div>
            <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap hidden sm:block">
              Toán 9: Giải tam giác vuông
            </div>
          </div>
        </button>
      </div>

      {/* Center: Live Individual Score & Puzzle Progress */}
      <div className="flex items-center gap-2.5 bg-slate-900/90 border border-amber-500/30 px-3.5 py-1.5 rounded-2xl shadow-inner">
        {/* Score */}
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-serif font-bold text-slate-300">ĐIỂM:</span>
          <span className="text-sm font-mono font-black text-amber-300">{stats.score}</span>
        </div>

        <div className="w-px h-4 bg-slate-800" />

        {/* Unlocked Progress */}
        <div className="flex items-center gap-1.5 text-xs text-slate-300">
          <span className="text-[11px] text-slate-400">Mảnh ghép:</span>
          <span className="font-mono font-bold text-emerald-400">{unlockedCount}/6</span>
        </div>
      </div>

      {/* Right: Actions and Tool Controls */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Upload Custom Image Button */}
        <button
          onClick={onOpenImageUpload}
          title="Tải ảnh bí mật tùy chỉnh"
          className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/80 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden lg:inline">Tải ảnh nền</span>
        </button>

        {/* Question Bank Button */}
        <button
          onClick={onOpenQuestionBank}
          title="Ngân hàng câu hỏi"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        {/* Classroom Mode Toggle */}
        <button
          onClick={onToggleClassroomMode}
          title={classroomMode ? 'Tắt chế độ máy chiếu' : 'Bật chế độ máy chiếu (chữ to)'}
          className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
            classroomMode
              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <MonitorPlay className="w-4 h-4" />
          <span className="hidden xl:inline">{classroomMode ? 'Máy chiếu ON' : 'Máy chiếu'}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Rules button */}
        <button
          onClick={onOpenInstructions}
          title="Xem hướng dẫn luật chơi"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Teacher Mode Button */}
        <button
          onClick={onOpenTeacherPanel}
          title="Bảng điều khiển giáo viên"
          className="px-2.5 py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Giáo viên</span>
        </button>
      </div>
    </header>
  );
};
