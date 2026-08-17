import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  customImage: string | null;
  onSaveImage: (imageUrl: string | null, customName?: string) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  customImage,
  onSaveImage,
}) => {
  const [preview, setPreview] = useState<string | null>(customImage);
  const [characterName, setCharacterName] = useState<string>('Pythagoras');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh (PNG, JPG, JPEG, WebP, SVG)!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        sound.playClick();
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    sound.playClick();
    onSaveImage(preview, characterName);
    onClose();
  };

  const handleResetToDefault = () => {
    sound.playClick();
    setPreview(null);
    setCharacterName('Pythagoras');
    onSaveImage(null, 'Pythagoras');
    onClose();
  };

  return (
    <div
      id="image-upload-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-xl my-auto bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950 border-2 border-amber-500/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-black text-slate-100">
                🖼️ TẢI ẢNH BÍ MẬT SAU 6 MẢNH GHÉP
              </h2>
              <p className="text-xs text-slate-400">
                Tùy chỉnh hình ảnh bí ẩn để học sinh giải mã trong tiết học
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 space-y-4 text-xs md:text-sm">
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-amber-400 bg-amber-500/10 scale-102'
                : 'border-slate-700 bg-slate-950/60 hover:border-amber-400/70 hover:bg-slate-900'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-3">
              <ImageIcon className="w-6 h-6" />
            </div>

            <p className="font-serif font-bold text-slate-200 text-sm md:text-base">
              Kéo & thả hình ảnh vào đây, hoặc <span className="text-amber-400 underline">bấm để chọn file</span>
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Hỗ trợ PNG, JPG, JPEG, WebP, SVG (khuyên dùng tỉ lệ 16:9)
            </p>
          </div>

          {/* Image Preview Box */}
          {preview ? (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>ẢNH ĐÃ CHỌN (XEM TRƯỚC):</span>
                <span className="text-emerald-400">✓ Đã sẵn sàng làm nền 6 mảnh</span>
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden border-2 border-amber-400/50 shadow-inner bg-slate-950">
                <img
                  src={preview}
                  alt="Ảnh bí mật tùy chỉnh"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-900/80 border border-amber-400/40 text-[10px] text-amber-300 font-bold">
                  ẢNH TÙY CHỈNH
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-amber-300">Ảnh mặc định hiện tại: </span>
                Tranh nghệ thuật cổ Hy Lạp khắc họa nhà toán học <strong className="text-white">Pythagoras</strong> và định lý tam giác vuông.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleResetToDefault}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Dùng ảnh Pythagoras mặc định</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-serif font-black text-xs md:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer transition-transform hover:scale-105"
            >
              <Check className="w-4 h-4 text-slate-950" />
              <span>ÁP DỤNG ẢNH BÍ MẬT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
