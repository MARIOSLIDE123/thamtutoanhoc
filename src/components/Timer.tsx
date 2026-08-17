import React, { useEffect } from 'react';
import { sound } from '../utils/audio';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  duration?: number; // default 90s (1m30s)
  totalTime?: number; // alias for backward compatibility
  timeLeft: number;
  isRunning?: boolean;
  isPaused?: boolean; // alias for backward compatibility
  onTimeUp?: () => void;
  onTogglePause?: () => void;
  onResetTimer?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const Timer: React.FC<TimerProps> = ({
  duration: directDuration,
  totalTime,
  timeLeft,
  isRunning,
  isPaused,
  onTimeUp,
  onTogglePause,
  onResetTimer,
  size = 'md',
}) => {
  const duration = directDuration || totalTime || 90;
  const running = isRunning !== undefined ? isRunning : !isPaused;

  // Dimension mapping - adjusted so mm:ss text fits comfortably
  const sizeMap = {
    sm: { radius: 26, stroke: 4, width: 68, textClass: 'text-xs' },
    md: { radius: 42, stroke: 6, width: 104, textClass: 'text-lg sm:text-xl' },
    lg: { radius: 56, stroke: 8, width: 140, textClass: 'text-2xl sm:text-3xl' },
  };

  const { radius, stroke, width, textClass } = sizeMap[size];
  const circumference = 2 * Math.PI * radius;
  const safeTimeLeft = Math.max(0, Math.min(timeLeft, duration));
  const progressRatio = duration > 0 ? safeTimeLeft / duration : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  // Format mm:ss
  const minutes = Math.floor(safeTimeLeft / 60);
  const seconds = safeTimeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Dynamic color determination
  const getColor = () => {
    if (safeTimeLeft > 30) {
      return { stroke: '#10b981', text: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    }
    if (safeTimeLeft > 10) {
      return { stroke: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-500/10' };
    }
    return { stroke: '#ef4444', text: 'text-rose-400', bg: 'bg-rose-500/20' };
  };

  const colorInfo = getColor();
  const isUrgent = running && safeTimeLeft <= 10 && safeTimeLeft > 0;

  // Sound triggering on tick
  useEffect(() => {
    if (!running || safeTimeLeft < 0) return;
    if (safeTimeLeft <= 10 && safeTimeLeft > 0) {
      sound.playUrgentTick();
    } else if (safeTimeLeft > 0 && safeTimeLeft <= duration) {
      sound.playTimerTick();
    } else if (safeTimeLeft === 0) {
      sound.playWrong();
      onTimeUp?.();
    }
  }, [safeTimeLeft, running, duration]);

  return (
    <div className="flex items-center gap-2">
      <div
        id="circular-timer"
        className={`relative flex items-center justify-center select-none ${
          isUrgent ? 'animate-bounce' : ''
        }`}
        style={{ width, height: width }}
        title={`Thời gian còn lại: ${formattedTime} (Tổng 1 phút 30 giây)`}
      >
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${width} ${width}`}>
          {/* Background track */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="#334155"
            strokeWidth={stroke}
            className="opacity-40"
          />

          {/* Animated progress circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={colorInfo.stroke}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={isNaN(strokeDashoffset) ? 0 : strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear drop-shadow-md"
          />
        </svg>

        {/* Center Countdown Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono font-black ${textClass} ${colorInfo.text} drop-shadow-md tracking-tight`}>
            {formattedTime}
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-0.5">
            {safeTimeLeft === 0 ? 'HẾT GIỜ' : '1P30S'}
          </span>
        </div>
      </div>

      {/* Optional Quick pause/reset controls if callbacks provided */}
      {(onTogglePause || onResetTimer) && (
        <div className="flex flex-col gap-1">
          {onTogglePause && (
            <button
              type="button"
              onClick={onTogglePause}
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
              title={running ? 'Tạm dừng đồng hồ' : 'Tiếp tục đếm giờ'}
            >
              {running ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          )}
          {onResetTimer && (
            <button
              type="button"
              onClick={onResetTimer}
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
              title="Đặt lại 1 phút 30 giây"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
