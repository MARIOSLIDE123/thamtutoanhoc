import React, { useState } from 'react';
import { Question } from '../types';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';
import { BookOpen, X, Plus, Edit2, RotateCcw, Check, Trash2, HelpCircle } from 'lucide-react';
import { MathRenderer } from './MathRenderer';

interface QuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onSaveQuestions: (questions: Question[]) => void;
}

export const QuestionBankModal: React.FC<QuestionBankModalProps> = ({
  isOpen,
  onClose,
  questions,
  onSaveQuestions,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedQuestions, setEditedQuestions] = useState<Question[]>(questions);

  if (!isOpen) return null;

  const handleUpdateField = (index: number, field: keyof Question, value: any) => {
    const updated = [...editedQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setEditedQuestions(updated);
  };

  const handleUpdateOption = (qIndex: number, optIndex: number, text: string) => {
    const updated = [...editedQuestions];
    const newOptions = [...updated[qIndex].options];
    newOptions[optIndex] = text;
    updated[qIndex] = { ...updated[qIndex], options: newOptions };
    setEditedQuestions(updated);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Khôi phục toàn bộ 6 câu hỏi chuẩn của Bài 3: Giải tam giác vuông?')) {
      setEditedQuestions(DEFAULT_QUESTIONS);
      onSaveQuestions(DEFAULT_QUESTIONS);
    }
  };

  const handleSaveAll = () => {
    onSaveQuestions(editedQuestions);
    setEditingIndex(null);
    onClose();
  };

  return (
    <div
      id="question-bank-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-5xl my-auto bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-serif font-black text-slate-100">
                📚 NGÂN HÀNG CÂU HỎI – TOÁN 9: BÀI 3
              </h2>
              <p className="text-xs text-slate-400">
                Chỉnh sửa đề bài, đáp án và giải thích cho 6 mảnh ghép bí mật.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question List Content */}
        <div className="p-4 md:p-6 space-y-4 overflow-y-auto flex-1">
          {editedQuestions.map((q, idx) => {
            const isEditing = editingIndex === idx;

            return (
              <div
                key={q.id || idx}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-serif font-bold flex items-center justify-center border border-amber-500/30">
                      0{q.pieceId}
                    </span>
                    <span className="text-sm font-bold text-slate-200">
                      {q.title || `Mảnh ghép ${q.pieceId}`}
                    </span>
                  </div>

                  <button
                    onClick={() => setEditingIndex(isEditing ? null : idx)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {isEditing ? 'Thu gọn' : 'Chỉnh sửa'}
                  </button>
                </div>

                {/* Edit Form or Summary */}
                {isEditing ? (
                  <div className="space-y-3 pt-2 border-t border-slate-800 text-xs animate-fade-in">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Tiêu đề mảnh ghép:</label>
                      <input
                        type="text"
                        value={q.title}
                        onChange={(e) => handleUpdateField(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Nội dung câu hỏi:</label>
                      <textarea
                        rows={2}
                        value={q.question}
                        onChange={(e) => handleUpdateField(idx, 'question', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">
                        4 Lựa chọn (đánh dấu chọn đáp án đúng):
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className={`flex items-center gap-2 p-2 rounded-xl border ${
                              q.correctAnswer === optIdx
                                ? 'bg-emerald-950/40 border-emerald-500'
                                : 'bg-slate-900 border-slate-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`correct-ans-${idx}`}
                              checked={q.correctAnswer === optIdx}
                              onChange={() => handleUpdateField(idx, 'correctAnswer', optIdx)}
                              className="accent-emerald-400"
                            />
                            <span className="font-bold text-amber-400 w-4">
                              {['A', 'B', 'C', 'D'][optIdx]}
                            </span>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => handleUpdateOption(idx, optIdx, e.target.value)}
                              className="flex-1 bg-transparent text-slate-200 text-xs focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Lời giải chi tiết:</label>
                      <textarea
                        rows={2}
                        value={q.explanation}
                        onChange={(e) => handleUpdateField(idx, 'explanation', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Gợi ý manh mối:</label>
                      <input
                        type="text"
                        value={q.hint}
                        onChange={(e) => handleUpdateField(idx, 'hint', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-300 line-clamp-2">
                    <MathRenderer text={q.question} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục câu hỏi mẫu Toán 9</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSaveAll}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>LƯU TẤT CẢ CÂU HỎI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
