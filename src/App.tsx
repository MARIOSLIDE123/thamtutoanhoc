import React, { useState, useEffect, useCallback } from 'react';
import { PlayerStats, Question, GamePhase } from './types';
import { DEFAULT_QUESTIONS } from './data/defaultQuestions';
import { sound } from './utils/audio';

import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CaseBoardScreen } from './components/CaseBoardScreen';
import { ScanningAnimation } from './components/ScanningAnimation';
import { QuestionModal } from './components/QuestionModal';
import { FinalRevealModal } from './components/FinalRevealModal';
import { VictoryScreen } from './components/VictoryScreen';
import { TeacherPanel } from './components/TeacherPanel';
import { QuestionBankModal } from './components/QuestionBankModal';
import { InstructionsModal } from './components/InstructionsModal';
import { ImageUploadModal } from './components/ImageUploadModal';

export default function App() {
  // 1. Individual Player Statistics
  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem('math_detective_stats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      piecesUnlocked: 0,
      guessedCorrectly: false,
    };
  });

  // 2. Custom Background Secret Image (Base64 or URL)
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('math_detective_custom_image');
    } catch {
      return null;
    }
  });

  // 3. Questions Bank State with LocalStorage
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('math_detective_questions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_QUESTIONS;
  });

  // 4. Unlocked Pieces State [1..6]
  const [unlockedPieces, setUnlockedPieces] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('math_detective_unlocked');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // 5. Game Navigation Phase
  const [phase, setPhase] = useState<GamePhase>('HOME');

  // 6. Active selected piece for question
  const [selectedPieceNumber, setSelectedPieceNumber] = useState<number | null>(null);

  // 7. Modals & Drawers
  const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState<boolean>(false);
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  const [isFinalRevealOpen, setIsFinalRevealOpen] = useState<boolean>(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState<boolean>(false);

  // 8. Display & Audio Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [classroomMode, setClassroomMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Synchronize localStorage
  useEffect(() => {
    try {
      localStorage.setItem('math_detective_stats', JSON.stringify(stats));
    } catch {}
  }, [stats]);

  useEffect(() => {
    try {
      if (customImageUrl) {
        localStorage.setItem('math_detective_custom_image', customImageUrl);
      } else {
        localStorage.removeItem('math_detective_custom_image');
      }
    } catch {}
  }, [customImageUrl]);

  useEffect(() => {
    try {
      localStorage.setItem('math_detective_questions', JSON.stringify(questions));
    } catch {}
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem('math_detective_unlocked', JSON.stringify(unlockedPieces));
    } catch {}
  }, [unlockedPieces]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setMuted(!next);
  };

  // Piece Clicked on Board (Any of 1..6)
  const handleSelectPiece = useCallback((pieceNum: number) => {
    setSelectedPieceNumber(pieceNum);
    setPhase('SCANNING');
  }, []);

  // Scanning complete -> Open question modal
  const handleScanningComplete = useCallback(() => {
    setPhase('QUESTION');
  }, []);

  // Handle Question Solved Correctly
  const handleSolveCorrect = useCallback(() => {
    if (selectedPieceNumber === null) return;

    const pieceNum = selectedPieceNumber;
    setUnlockedPieces((prev) => (prev.includes(pieceNum) ? prev : [...prev, pieceNum]));

    setStats((prev) => ({
      ...prev,
      score: prev.score + 10,
      correctAnswers: prev.correctAnswers + 1,
      piecesUnlocked: prev.piecesUnlocked + 1,
    }));

    sound.playUnlock();
  }, [selectedPieceNumber]);

  // Handle Question Solved Wrong / Timeout
  const handleSolveWrong = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      wrongAnswers: prev.wrongAnswers + 1,
    }));
  }, []);

  // Close question modal
  const handleCloseQuestionModal = useCallback(() => {
    setSelectedPieceNumber(null);
    setPhase('CASE_BOARD');

    // If all 6 pieces are unlocked, trigger final reveal
    if (unlockedPieces.length === 6) {
      setTimeout(() => {
        setIsFinalRevealOpen(true);
      }, 500);
    }
  }, [unlockedPieces.length]);

  // Teacher manual piece unlock
  const handleManualUnlock = useCallback(() => {
    if (selectedPieceNumber === null) return;
    const pieceNum = selectedPieceNumber;

    setUnlockedPieces((prev) => (prev.includes(pieceNum) ? prev : [...prev, pieceNum]));
    setSelectedPieceNumber(null);
    setPhase('CASE_BOARD');
  }, [selectedPieceNumber]);

  // Final Guess Correctly
  const handleCorrectFinalGuess = (points: number, guessText: string) => {
    setStats((prev) => ({
      ...prev,
      score: prev.score + points,
      guessedCorrectly: true,
      finalGuessText: guessText,
    }));
  };

  // Final Guess Wrong
  const handleWrongFinalGuess = (guessText: string) => {
    // Keep record if needed
  };

  // Reset entire game session
  const handleResetGame = () => {
    setUnlockedPieces([]);
    setStats({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      piecesUnlocked: 0,
      guessedCorrectly: false,
    });
    setSelectedPieceNumber(null);
    setIsFinalRevealOpen(false);
    setPhase('CASE_BOARD');
  };

  // Find active question object
  const activeQuestion =
    questions.find((q) => q.pieceId === selectedPieceNumber) || questions[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header & Live Individual Scoreboard */}
      <Header
        stats={stats}
        unlockedCount={unlockedPieces.length}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        classroomMode={classroomMode}
        onToggleClassroomMode={() => setClassroomMode(!classroomMode)}
        onOpenTeacherPanel={() => setIsTeacherPanelOpen(true)}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        onOpenImageUpload={() => setIsImageUploadOpen(true)}
        onOpenQuestionBank={() => setIsQuestionBankOpen(true)}
        onGoHome={() => setPhase('HOME')}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Primary View Routing */}
      <main className="flex-1 flex flex-col">
        {phase === 'HOME' && (
          <HomeScreen
            onStartGame={() => setPhase('CASE_BOARD')}
            onOpenInstructions={() => setIsInstructionsOpen(true)}
            onOpenQuestionBank={() => setIsQuestionBankOpen(true)}
            onOpenImageUpload={() => setIsImageUploadOpen(true)}
            hasCustomImage={!!customImageUrl}
          />
        )}

        {(phase === 'CASE_BOARD' || phase === 'SCANNING' || phase === 'QUESTION') && (
          <CaseBoardScreen
            unlockedPieces={unlockedPieces}
            onSelectPiece={handleSelectPiece}
            onOpenFinalReveal={() => setIsFinalRevealOpen(true)}
            onOpenImageUpload={() => setIsImageUploadOpen(true)}
            customImageUrl={customImageUrl}
            classroomMode={classroomMode}
          />
        )}

        {phase === 'VICTORY' && (
          <VictoryScreen
            stats={stats}
            customImageUrl={customImageUrl}
            onPlayAgain={handleResetGame}
            onGoHome={() => setPhase('HOME')}
          />
        )}
      </main>

      {/* Mystery Detective Scanning Transition Modal */}
      {phase === 'SCANNING' && selectedPieceNumber && (
        <ScanningAnimation
          pieceNumber={selectedPieceNumber}
          onComplete={handleScanningComplete}
        />
      )}

      {/* Right Triangle Math Question Modal */}
      {phase === 'QUESTION' && selectedPieceNumber && (
        <QuestionModal
          question={activeQuestion}
          timerDuration={90}
          classroomMode={classroomMode}
          onSolveCorrect={handleSolveCorrect}
          onSolveWrong={handleSolveWrong}
          onManualUnlock={handleManualUnlock}
          onClose={handleCloseQuestionModal}
        />
      )}

      {/* Final Puzzle Reveal & Guessing Modal */}
      {isFinalRevealOpen && (
        <FinalRevealModal
          customImageUrl={customImageUrl}
          bonusPoints={30}
          onCorrectGuess={handleCorrectFinalGuess}
          onWrongGuess={handleWrongFinalGuess}
          onProceedToVictory={() => {
            setIsFinalRevealOpen(false);
            setPhase('VICTORY');
          }}
          onClose={() => setIsFinalRevealOpen(false)}
        />
      )}

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isImageUploadOpen}
        onClose={() => setIsImageUploadOpen(false)}
        customImage={customImageUrl}
        onSaveImage={(newUrl) => setCustomImageUrl(newUrl)}
      />

      {/* Teacher Control Drawer Panel */}
      <TeacherPanel
        isOpen={isTeacherPanelOpen}
        onClose={() => setIsTeacherPanelOpen(false)}
        stats={stats}
        questions={questions}
        unlockedPieces={unlockedPieces}
        onAdjustScore={(delta) => {
          setStats((prev) => ({ ...prev, score: Math.max(0, prev.score + delta) }));
        }}
        onForceUnlockPiece={(pieceId) => {
          setUnlockedPieces((prev) => (prev.includes(pieceId) ? prev : [...prev, pieceId]));
        }}
        onForceLockPiece={(pieceId) => {
          setUnlockedPieces((prev) => prev.filter((p) => p !== pieceId));
        }}
        onForceFinalReveal={() => {
          setIsFinalRevealOpen(true);
        }}
        onOpenImageUpload={() => setIsImageUploadOpen(true)}
        onResetGame={handleResetGame}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        classroomMode={classroomMode}
        onToggleClassroomMode={() => setClassroomMode(!classroomMode)}
      />

      {/* Question Bank Manager Modal */}
      <QuestionBankModal
        isOpen={isQuestionBankOpen}
        onClose={() => setIsQuestionBankOpen(false)}
        questions={questions}
        onSaveQuestions={(newQ) => setQuestions(newQ)}
      />

      {/* Instructions / Rules Modal */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
    </div>
  );
}
