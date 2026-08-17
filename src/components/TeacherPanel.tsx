import React from 'react';
import { PlayerStats, Question } from '../types';
import { sound } from '../utils/audio';
import {
  Settings,
  X,
  Plus,
  Minus,
  Unlock,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  Maximize,
  Image as ImageIcon,
} from 'lucide-react';

interface TeacherPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  questions: Question[];
  unlockedPieces: number[];
  onAdjustScore: (delta: number) => void;
  onForceUnlockPiece: (pieceId: number) => void;
  onForceLockPiece: (pieceId: number) => void;
  onForceFinalReveal: () => void;
  onOpenImageUpload: () => void;
  onResetGame: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  classroomMode: boolean;
  onToggleClassroomMode: () => void;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  isOpen,
  onClose,
  stats,
  questions,
  unlockedPieces,
  onAdjustScore,
  onForceUnlockPiece,
  onForceLockPiece,
  onForceFinalReveal,
  onOpenImageUpload,
  onResetGame,
  soundEnabled,
  onToggleSound,
  classroomMode,
  onToggleClassroomMode,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="teacher-panel-drawer"
      className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-xs animate-fade-in select-none"
    >
      <div className="relative w-full max-w-md h-full bg-slate-900 border-l-2 border-amber-500/60 shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-serif font-black text-lg">
              <Settings className="w-5 h-5" />
              <span>BẢNG ĐIỀU KHIỂN GIÁO VIÊN</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2 mb-4">
            Quản lý trực tiếp điểm số, mở mảnh ghép nhanh hoặc chuyển sang phá án trên lớp học.
          </p>

          {/* Quick Classroom Display Settings */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 mb-5">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              TÙY CHỈNH HIỂN THỊ & LỚP HỌC
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onToggleClassroomMode}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  classroomMode
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <Maximize className="w-3.5 h-3.5" />
                {classroomMode ? 'Chế độ Máy chiếu: BẬT' : 'Chế độ Máy chiếu: TẮT'}
              </button>

              <button
                onClick={onToggleSound}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-rose-500/20 border-rose-400 text-rose-300'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                {soundEnabled ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT'}
              </button>

              <button
                onClick={() => {
                  onOpenImageUpload();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-sky-500/40 bg-sky-950/40 text-sky-300 hover:bg-sky-900/50 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Đổi ảnh nền 6 mảnh
              </button>
            </div>
          </div>

          {/* Player Score Management */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 mb-5">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>ĐIỀU CHỈNH ĐIỂM SỐ</span>
              </span>
              <span className="text-sm font-mono font-black text-amber-400">{stats.score} điểm</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onAdjustScore(10)}
                className="flex-1 py-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +10 Điểm
              </button>
              <button
                onClick={() => onAdjustScore(-10)}
                className="flex-1 py-2 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" /> -10 Điểm
              </button>
              <button
                onClick={() => onAdjustScore(30)}
                className="py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold cursor-pointer"
              >
                +30 Phá án
              </button>
            </div>
          </div>

          {/* Puzzle Pieces Manual Unlocker */}
          <div className="space-y-3 mb-5">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Unlock className="w-4 h-4 text-amber-400" />
                <span>MỞ KHÓA MẢNH GHÉP (6 MẢNH)</span>
              </span>
              <span className="text-xs text-amber-400 font-mono">
                {unlockedPieces.length}/6 đã mở
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isUnlocked = unlockedPieces.includes(num);

                return (
                  <button
                    key={num}
                    onClick={() => {
                      if (isUnlocked) {
                        onForceLockPiece(num);
                      } else {
                        onForceUnlockPiece(num);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                      isUnlocked
                        ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-amber-400'
                    }`}
                  >
                    <span>{isUnlocked ? '🔓' : '🔒'} Mảnh 0{num}</span>
                    <span className="text-[10px] font-normal">
                      {isUnlocked ? 'Khóa lại' : 'Mở ngay'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Global Controls */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => {
              onForceFinalReveal();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-serif font-black text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-transform"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>MỞ PHÁ ÁN CUỐI CÙNG NGAY</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn thiết lập lại toàn bộ ván chơi hiện tại không?')) {
                onResetGame();
                onClose();
              }
            }}
            className="w-full py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Thiết lập lại ván chơi (Reset Game)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
