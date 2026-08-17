import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Question } from '../types';
import { Timer } from './Timer';
import { GeometryDiagram } from './GeometryDiagram';
import { DetectiveMascot } from './DetectiveMascot';
import { sound } from '../utils/audio';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, RotateCcw, Unlock, ShieldAlert, Sparkles } from 'lucide-react';

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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eab308', '#10b981', '#38bdf8', '#f59e0b'],
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
      id="question-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in select-none"
    >
      <div
        id="question-modal-card"
        className={`relative w-full ${
          classroomMode ? 'max-w-6xl' : 'max-w-4xl'
        } my-auto bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950 border-2 border-amber-500/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col`}
      >
        {/* Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center font-serif font-black text-amber-300 text-sm sm:text-base shadow-md">
              0{question.pieceId}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  MẢNH GHÉP 0{question.pieceId}
                </span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> +10 Điểm
                </span>
              </div>
              <h2 className="text-sm sm:text-base md:text-lg font-serif font-bold text-slate-100">
                {question.title}
              </h2>
            </div>
          </div>

          {/* Circular Countdown Timer (90s / 1p30s) */}
          <div className="flex items-center gap-2">
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
          </div>
        </div>

        {/* Modal Body: Question text, geometric diagram & 4 options */}
        <div className="p-4 sm:p-6 md:p-7 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Main Question & Diagram Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Left: Question statement & Mascot */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-inner">
                <p
                  className={`font-medium text-slate-100 leading-relaxed ${
                    classroomMode ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
                  }`}
                >
                  {question.question}
                </p>
              </div>

              {/* Detective Mascot Note / Hint */}
              <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-400/30">
                <DetectiveMascot
                  mood={isAnswered ? (isCorrect ? 'celebrating' : 'shocked') : 'curious'}
                  size="sm"
                />
                <div className="text-xs sm:text-sm text-slate-300">
                  <div className="font-bold text-amber-300">Gợi ý thám tử:</div>
                  <p className="mt-0.5 text-slate-300">
                    {showHint
                      ? question.hint
                      : 'Hãy nhớ các hệ thức liên hệ giữa cạnh và góc trong tam giác vuông!'}
                  </p>
                  {!showHint && !isAnswered && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setShowHint(true);
                      }}
                      className="mt-1 text-[11px] text-amber-400 hover:text-amber-200 underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Lightbulb className="w-3 h-3" /> Bấm để xem thêm manh mối
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: SVG Geometric Diagram */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[280px] sm:max-w-[320px]">
                <GeometryDiagram
                  question={question}
                  diagramType={question.diagramType}
                  triangleData={question.triangleData}
                />
              </div>
            </div>
          </div>

          {/* 4 Multiple Choice Options (A, B, C, D) */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>HÃY CHỌN ĐÁP ÁN CHÍNH XÁC:</span>
              <span className="text-[11px] text-slate-500 font-mono">1 LỰA CHỌN DUY NHẤT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((optionText, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === question.correctAnswer;
                const optLetter = ['A', 'B', 'C', 'D'][idx];

                let optionStyles =
                  'bg-slate-900/90 border-slate-700 hover:border-amber-400 text-slate-200';

                if (isAnswered) {
                  if (isCorrectOption) {
                    optionStyles =
                      'bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/60 shadow-lg';
                  } else if (isSelected && !isCorrectOption) {
                    optionStyles =
                      'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/60';
                  } else {
                    optionStyles = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`question-option-${optLetter}`}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 font-medium flex items-center gap-3.5 transition-all text-left cursor-pointer ${
                      classroomMode ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                    } ${optionStyles} ${
                      !isAnswered ? 'hover:scale-[1.01] active:scale-[0.99]' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl font-serif font-black flex items-center justify-center shrink-0 border text-xs sm:text-sm ${
                        isAnswered && isCorrectOption
                          ? 'bg-emerald-500 border-emerald-300 text-slate-950'
                          : isAnswered && isSelected
                          ? 'bg-rose-500 border-rose-300 text-white'
                          : 'bg-slate-800 border-slate-700 text-amber-300'
                      }`}
                    >
                      {optLetter}
                    </div>
                    <span className="flex-1 font-mono">{optionText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Answer Result Banner & Step-by-Step Explanation */}
          {isAnswered && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 space-y-4 animate-fade-in ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/80'
                  : 'bg-rose-950/40 border-rose-500/80'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isTimedOut ? (
                      <ShieldAlert className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-black text-slate-100">
                      {isCorrect
                        ? '🎉 CHÍNH XÁC! MẢNH GHÉP ĐƯỢC MỞ KHÓA!'
                        : isTimedOut
                        ? '⏰ ĐÃ HẾT 1 PHÚT 30 GIÂY!'
                        : '❌ CHƯA CHÍNH XÁC!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {isCorrect
                        ? `Chúc mừng bạn được cộng +${question.points} điểm!`
                        : `Gợi ý: ${question.hint}`}
                    </p>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {isCorrect ? (
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-serif font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/50 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                    >
                      <span>MỞ KHÓA MẢNH GHÉP</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={onManualUnlock}
                        className="px-3.5 py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        Mở mảnh thủ công
                      </button>
                      <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Trở về bảng
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Step-by-step Detailed Math Solution */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/20 text-slate-200 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span>📜</span> LỜI GIẢI CHI TIẾT THEO HỆ THỨC LƯỢNG:
                </div>
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-mono text-amber-100 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  {question.explanation}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
