import React, { useState } from 'react';
import { SecretArtwork } from './SecretArtwork';
import { DetectiveMascot } from './DetectiveMascot';
import { sound } from '../utils/audio';
import { Check, X, Award, HelpCircle, Sparkles, Send } from 'lucide-react';

interface FinalRevealModalProps {
  customImageUrl?: string | null;
  bonusPoints?: number;
  onCorrectGuess: (points: number, guessName: string) => void;
  onWrongGuess: (guessName: string) => void;
  onProceedToVictory: () => void;
  onClose: () => void;
}

export const FinalRevealModal: React.FC<FinalRevealModalProps> = ({
  customImageUrl = null,
  bonusPoints = 30,
  onCorrectGuess,
  onWrongGuess,
  onProceedToVictory,
  onClose,
}) => {
  const [guessInput, setGuessInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [attempts, setAttempts] = useState<Array<{ guess: string; isCorrect: boolean }>>([]);
  const [currentBonus, setCurrentBonus] = useState(bonusPoints);

  const handleEvaluateGuess = (isCorrectAnswer: boolean) => {
    const text = guessInput.trim() || (isCorrectAnswer ? 'Pythagoras' : 'Chưa đúng');

    if (isCorrectAnswer) {
      sound.playCorrect();
      setIsSolved(true);
      setAttempts((prev) => [...prev, { guess: text, isCorrect: true }]);
      onCorrectGuess(currentBonus, text);
    } else {
      sound.playWrong();
      setAttempts((prev) => [...prev, { guess: text, isCorrect: false }]);
      onWrongGuess(text);
      setCurrentBonus((prev) => Math.max(10, prev - 10));
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim()) return;

    const lower = guessInput.trim().toLowerCase();
    // Auto-detect common answers for Pythagoras
    if (
      lower.includes('pythagor') ||
      lower.includes('pitago') ||
      lower.includes('pi-ta-go') ||
      lower.includes('pythagore')
    ) {
      handleEvaluateGuess(true);
    } else {
      // Prompt confirmation or evaluate
      handleEvaluateGuess(false);
    }
  };

  return (
    <div
      id="final-reveal-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/95 backdrop-blur-lg overflow-y-auto animate-fade-in select-none"
    >
      <div className="relative w-full max-w-5xl my-auto bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950 border-3 border-amber-400 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 py-2 px-6 flex items-center justify-between text-slate-950 font-serif font-black text-sm md:text-base tracking-widest uppercase shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>🔓 BÍ MẬT ĐÃ ĐƯỢC GIẢI MÃ TOÀN DIỆN!</span>
          </div>
          <span className="hidden md:inline text-xs font-bold font-mono">PHÁ ÁN CUỐI CÙNG</span>
        </div>

        <div className="p-4 md:p-8 space-y-6">
          {/* Header Message with Detective Mascot */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-950/40 border border-amber-400/40">
            <div className="flex items-center gap-4">
              <DetectiveMascot
                mood={isSolved ? 'celebrating' : 'curious'}
                size="md"
                className="shrink-0"
              />
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  GIAI ĐOẠN ĐOÁN NHÂN VẬT BÍ ẨN
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-black text-slate-100 mt-0.5">
                  {isSolved
                    ? '🎉 BẠN ĐÃ PHÁ ÁN THÀNH CÔNG: VĨ NHÂN PYTHAGORAS!'
                    : '🕵️ "Hãy quan sát toàn bộ bức tranh – Bạn nhận ra nhân vật lịch sử nào?"'}
                </h2>
              </div>
            </div>

            {isSolved && (
              <button
                onClick={onProceedToVictory}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-serif font-black text-base shadow-xl shadow-amber-500/30 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer shrink-0"
              >
                <Award className="w-5 h-5 text-slate-950" />
                <span>XEM LỄ VINH DANH</span>
              </button>
            )}
          </div>

          {/* Master Full Artwork View */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-2xl">
            <SecretArtwork
              unlockedPieces={[1, 2, 3, 4, 5, 6]}
              highlightAll={true}
              customImageUrl={customImageUrl}
            />
          </div>

          {/* Guessing & Verification Section */}
          {!isSolved && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>NHẬP TÊN NHÂN VẬT BÍ ẨN (THƯỞNG +{currentBonus} ĐIỂM):</span>
                </div>
                <span className="text-xs text-slate-400">
                  Gợi ý: Nhà toán học Hy Lạp cổ đại với định lý tam giác vuông nổi tiếng
                </span>
              </div>

              {/* Guess Input Form */}
              <form onSubmit={handleQuickSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Nhập tên nhân vật (ví dụ: Pythagoras / Pitago)..."
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border-2 border-amber-500/40 text-slate-100 placeholder-slate-500 text-base focus:outline-none focus:border-amber-400 font-medium"
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEvaluateGuess(true)}
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer transition-transform hover:scale-105"
                    >
                      <Check className="w-4 h-4" />
                      <span>✅ ĐÚNG (+{currentBonus}đ)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEvaluateGuess(false)}
                      className="px-4 py-3 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>❌ SAI</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Guessing History Log */}
              {attempts.length > 0 && (
                <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-slate-400">Lịch sử đoán:</span>
                  {attempts.map((att, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2.5 py-1 rounded-lg border ${
                        att.isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-rose-950/60 border-rose-600 text-rose-300 line-through'
                      }`}
                    >
                      {att.guess} {att.isCorrect ? '✓' : '✗'}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer controls */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              ← Quay lại phòng điều tra
            </button>

            {isSolved && (
              <button
                onClick={onProceedToVictory}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-serif font-black text-sm hover:scale-105 transition-transform cursor-pointer"
              >
                🏆 Chuyển đến Bảng Vinh Danh Chiến Thắng →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
