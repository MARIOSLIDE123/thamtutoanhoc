import React from 'react';
import { BookOpen, X, CheckCircle, HelpCircle, Shield, Award } from 'lucide-react';
import { DetectiveMascot } from './DetectiveMascot';
import { MathRenderer } from './MathRenderer';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="instructions-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-3xl my-auto bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950 border-2 border-amber-500/60 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-serif font-black text-slate-100">
                🕵️ HƯỚNG DẪN LUẬT CHƠI THÁM TỬ TOÁN HỌC
              </h2>
              <p className="text-xs text-slate-400">
                Toán 9 Bài 3: Giải tam giác vuông – Truy tìm nhà bác học bí ẩn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-7 space-y-5 overflow-y-auto flex-1 text-slate-300 text-xs md:text-sm leading-relaxed">
          {/* Mascot intro */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30">
            <DetectiveMascot mood="curious" size="sm" />
            <p className="text-amber-100 font-medium">
              Chào mừng các nhà thám tử trẻ! Một bức tranh cổ đại về một vĩ nhân toán học đang bị phong ấn dưới 6 mảnh ghép ma trận. Hãy vận dụng các hệ thức về cạnh và góc trong tam giác vuông để giải mã toàn bộ vụ án!
            </p>
          </div>

          {/* 4 Rules cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-serif font-bold text-sm flex items-center gap-2">
                <span>1️⃣</span> LỰA CHỌN MẢNH GHÉP
              </div>
              <p className="text-slate-400 text-xs">
                Các đội lần lượt hoặc giáo viên chỉ định chọn một trong 6 mảnh ghép (Mảnh 01 đến 06) trên bàn điều tra Hy Lạp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-serif font-bold text-sm flex items-center gap-2">
                <span>2️⃣</span> 1 PHÚT 30 GIÂY THỬ THÁCH
              </div>
              <p className="text-slate-400 text-xs">
                Mỗi câu hỏi có đồng hồ đếm ngược 1 phút 30 giây (90s) (Xanh → Vàng → Đỏ). Hãy tính toán thật cẩn thận và chọn đáp án chính xác.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-serif font-bold text-sm flex items-center gap-2">
                <span>3️⃣</span> MỞ KHÓA BÍ MẬT (+10 ĐIỂM)
              </div>
              <p className="text-slate-400 text-xs">
                Trả lời đúng sẽ mở khóa một phần hình ảnh thật phía sau và cộng 10 điểm cho đội. Trả lời sai mảnh ghép vẫn bị khóa.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-yellow-400 font-serif font-bold text-sm flex items-center gap-2">
                <span>4️⃣</span> PHÁ ÁN CUỐI CÙNG (+30 ĐIỂM)
              </div>
              <p className="text-slate-400 text-xs">
                Khi mở đủ 6 mảnh ghép, các đội quan sát tranh và xung phong đoán nhân vật. Đội đầu tiên đoán đúng nhận +30 điểm!
              </p>
            </div>
          </div>

          {/* Math Formulas Reference Box */}
          <div className="p-4 md:p-5 rounded-2xl bg-slate-950 border-2 border-amber-500/40 space-y-3">
            <div className="text-xs md:text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>📐</span> BÍ KÍP HỆ THỨC LƯỢNG TOÁN 9 – BÀI 3:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base font-mono text-amber-100">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div><MathRenderer text="• $b = a \\cdot \\sin(B) = a \\cdot \\cos(C)$" /></div>
                <div><MathRenderer text="• $c = a \\cdot \\sin(C) = a \\cdot \\cos(B)$" /></div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div><MathRenderer text="• $b = c \\cdot \\tan(B) = c \\cdot \\cot(C)$" /></div>
                <div><MathRenderer text="• $c = b \\cdot \\tan(C) = b \\cdot \\cot(B)$" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-serif font-black text-xs md:text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            ĐÃ HIỂU LUẬT – BẮT ĐẦU PHÁ ÁN
          </button>
        </div>
      </div>
    </div>
  );
};
