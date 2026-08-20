import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Question } from '../types';
import { Timer } from './Timer';
import { GeometryDiagram } from './GeometryDiagram';
import { DetectiveMascot } from './DetectiveMascot';
import { MathRenderer } from './MathRenderer';
import { sound } from '../utils/audio';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Unlock,
  ShieldAlert,
  Sparkles,
  ArrowLeft,
  Award,
} from 'lucide-react';

interface QuestionModalProps {
  question: Question;
  timerDuration?: number;
  classroomMode?: boolean;
  onSolveCorrect: () => void;
  onSolveWrong: () => void;
  onManualUnlock: () => void;
  onClose: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  timerDuration = 90,
  classroomMode = false,
  onSolveCorrect,
  onSolveWrong,
  onManualUnlock,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Sync state when question or duration changes
  useEffect(() => {
    setTimeLeft(timerDuration);
    setIsTimerRunning(true);
    setIsTimedOut(false);
    setIsAnswered(false);
    setSelectedOption(null);
    setShowHint(false);
  }, [question, timerDuration]);

  // Timer interval countdown (1s tick)
  useEffect(() => {
    if (!isTimerRunning || isAnswered) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          setIsTimedOut(true);
          setIsAnswered(true);
          setIsCorrect(false);
          onSolveWrong();
          sound.playWrong();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, isAnswered, onSolveWrong]);

  // Handle Option Click
  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);
    setIsTimerRunning(false);

    if (index === question.correctAnswer) {
      setIsCorrect(true);
      sound.playCorrect();
      onSolveCorrect();

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#eab308', '#10b981', '#38bdf8', '#f59e0b', '#ec4899'],
      });
    } else {
      setIsCorrect(false);
      sound.playWrong();
      onSolveWrong();
    }
  };

  // Pause / Resume Timer
  const toggleTimer = () => {
    sound.playClick();
    setIsTimerRunning((prev) => !prev);
  };

  // Reset Timer to 90s (1m30s)
  const resetTimer = () => {
    sound.playClick();
    setTimeLeft(timerDuration);
    setIsTimerRunning(true);
    setIsTimedOut(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  return (
    <div
      id="question-stage-fullscreen"
      className="fixed inset-0 z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col select-none overflow-y-auto animate-fade-in"
    >
      {/* Top Header Bar */}
      <div className="w-full bg-slate-950/95 border-b-2 border-amber-500/40 px-4 md:px-8 py-3 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md shadow-xl shrink-0">
        {/* Left: Piece Badge & Question Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-serif font-black text-amber-300 text-base md:text-xl">
              0{question.pieceId}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-xs md:text-sm font-bold uppercase tracking-wider">
                MẢNH GHÉP 0{question.pieceId}
              </span>
              <span className="text-xs md:text-sm text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> +10 Điểm
              </span>
            </div>
            <h1 className="text-base sm:text-xl md:text-2xl font-serif font-bold text-slate-100 tracking-wide mt-0.5">
              {question.title}
            </h1>
          </div>
        </div>

        {/* Right: Large Timer & Return Button */}
        <div className="flex items-center gap-3 md:gap-4">
          <Timer
            timeLeft={timeLeft}
            duration={timerDuration}
            isRunning={isTimerRunning && !isAnswered}
            onTimeUp={() => {
              if (!isAnswered) {
                setIsTimerRunning(false);
                setIsTimedOut(true);
                setIsAnswered(true);
                setIsCorrect(false);
                onSolveWrong();
              }
            }}
            onTogglePause={toggleTimer}
            onResetTimer={resetTimer}
            size={classroomMode ? 'lg' : 'md'}
          />

          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white text-xs md:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Quay lại bàn điều tra"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Trở về</span>
          </button>
        </div>
      </div>

      {/* Main Full-Screen Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col justify-between space-y-6">
        {/* Top Grid: Large Question Statement (Left) & SVG Diagram (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Area: Statement & Detective Hint (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Question Statement Box with Large Typography & LaTeX formulas */}
            <div className="p-5 md:p-8 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-2xl backdrop-blur-md">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span>📐</span> YÊU CẦU BÀI TOÁN:
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed">
                <MathRenderer text={question.question} />
              </div>
            </div>

            {/* Detective Mascot & Hint Box */}
            <div className="flex items-start gap-4 p-4 md:p-5 rounded-2xl bg-amber-500/10 border border-amber-400/40 shadow-inner">
              <DetectiveMascot
                mood={isAnswered ? (isCorrect ? 'celebrating' : 'shocked') : 'curious'}
                size="md"
                className="shrink-0"
              />
              <div className="text-sm md:text-base text-slate-300">
                <div className="font-bold text-amber-300 text-sm md:text-base flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Gợi ý điều tra từ Thám tử Toán học:</span>
                </div>
                <div className="mt-1 text-slate-200 leading-relaxed font-medium">
                  {showHint ? (
                    <MathRenderer text={question.hint} />
                  ) : (
                    'Vận dụng các hệ thức về cạnh và góc trong tam giác vuông: cạnh góc vuông = cạnh huyền × sin(góc đối) = cạnh kề × tan(góc đối)...'
                  )}
                </div>
                {!showHint && !isAnswered && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowHint(true);
                    }}
                    className="mt-2 text-xs md:text-sm text-amber-400 hover:text-amber-200 underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>🔍 Bấm để mở thêm gợi ý chi tiết</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Area: Large High-Resolution Geometry Diagram (5 cols on lg) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <GeometryDiagram
              question={question}
              diagramType={question.diagramType}
              triangleData={question.triangleData}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 4 Multiple Choice Options (A, B, C, D) in Large Responsive Grid */}
        <div className="space-y-3 pt-2">
          <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>HÃY CHỌN 1 ĐÁP ÁN CHÍNH XÁC:</span>
            </span>
            <span className="text-xs text-amber-400 font-mono font-bold">1 LỰA CHỌN DUY NHẤT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((optionText, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === question.correctAnswer;
              const optLetter = ['A', 'B', 'C', 'D'][idx];

              let optionStyles =
                'bg-slate-900/90 border-slate-700 hover:border-amber-400 hover:bg-slate-850 text-slate-100';

              if (isAnswered) {
                if (isCorrectOption) {
                  optionStyles =
                    'bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-4 ring-emerald-400/60 shadow-2xl shadow-emerald-500/20';
                } else if (isSelected && !isCorrectOption) {
                  optionStyles =
                    'bg-rose-950/90 border-rose-500 text-rose-100 ring-4 ring-rose-500/60';
                } else {
                  optionStyles = 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  id={`question-option-${optLetter}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 md:p-6 rounded-2xl border-2 font-medium flex items-center gap-4 transition-all text-left cursor-pointer shadow-lg ${
                    classroomMode ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                  } ${optionStyles} ${
                    !isAnswered ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                  }`}
                >
                  {/* Option Letter Badge */}
                  <div
                    className={`w-11 h-11 md:w-14 md:h-14 rounded-xl font-serif font-black flex items-center justify-center shrink-0 border-2 text-base md:text-xl shadow-md ${
                      isAnswered && isCorrectOption
                        ? 'bg-emerald-500 border-emerald-300 text-slate-950'
                        : isAnswered && isSelected
                        ? 'bg-rose-500 border-rose-300 text-white'
                        : 'bg-slate-800 border-slate-700 text-amber-300'
                    }`}
                  >
                    {optLetter}
                  </div>

                  {/* Math Formula Text */}
                  <div className="flex-1 font-mono font-bold text-slate-100">
                    <MathRenderer text={optionText} inline={true} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Answer Result Banner & Detailed Pedagogical Solution */}
        {isAnswered && (
          <div
            className={`p-5 md:p-7 rounded-3xl border-2 space-y-4 animate-fade-in shadow-2xl ${
              isCorrect
                ? 'bg-emerald-950/60 border-emerald-500/80 shadow-emerald-500/10'
                : 'bg-rose-950/60 border-rose-500/80 shadow-rose-500/10'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                    isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8" />
                  ) : isTimedOut ? (
                    <ShieldAlert className="w-7 h-7 md:w-8 md:h-8" />
                  ) : (
                    <XCircle className="w-7 h-7 md:w-8 md:h-8" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-black text-slate-100">
                    {isCorrect
                      ? '🎉 CHÍNH XÁC! MẢNH GHÉP ĐÃ ĐƯỢC MỞ KHÓA!'
                      : isTimedOut
                      ? '⏰ ĐÃ HẾT 1 PHÚT 30 GIÂY!'
                      : '❌ CÂU TRẢ LỜI CHƯA CHÍNH XÁC!'}
                  </h2>
                  <p className="text-sm md:text-base text-slate-300 mt-0.5">
                    {isCorrect
                      ? `Chúc mừng bạn đã giải đúng và được cộng +${question.points} điểm!`
                      : 'Hãy xem kỹ lời giải chi tiết dưới đây để nắm vững công thức hệ thức lượng.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {isCorrect ? (
                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-serif font-black text-sm md:text-base shadow-xl shadow-emerald-500/30 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                  >
                    <span>MỞ KHÓA MẢNH GHÉP & VỀ BẢNG</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onManualUnlock}
                      className="px-4 py-3 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/50 text-xs md:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Unlock className="w-4 h-4" />
                      Mở mảnh thủ công (Giáo viên)
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs md:text-sm font-bold transition-colors cursor-pointer"
                    >
                      Trở về bảng điều tra
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Step-by-Step Mathematical Explanation */}
            <div className="p-4 md:p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-slate-200 space-y-2.5">
              <div className="text-xs md:text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span>📜</span> LỜI GIẢI CHI TIẾT THEO HỆ THỨC LƯỢNG TOÁN 9:
              </div>
              <div className="text-sm md:text-base leading-relaxed text-amber-100 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <MathRenderer text={question.explanation} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
