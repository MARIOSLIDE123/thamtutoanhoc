export interface PlayerStats {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  piecesUnlocked: number;
  guessedCorrectly: boolean;
  finalGuessText?: string;
}

export interface Question {
  id: string;
  pieceId: number;
  title: string;
  question: string;
  diagramType: 'triangle_abc' | 'triangle_side_angle' | 'ladder_wall' | 'shadow_tower' | 'triangle_height' | 'triangle_two_sides';
  triangleData?: {
    rightAngleAt: string;
    angleValue?: string;
    angleName?: string;
    knownSide1?: { name: string; value: string };
    knownSide2?: { name: string; value: string };
    target: string;
    note?: string;
  };
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  hint: string;
  points: number;
}

export interface PuzzlePiece {
  id: number;
  number: number;
  label: string;
  unlocked: boolean;
}

export type GamePhase =
  | 'HOME'
  | 'CASE_BOARD'
  | 'SCANNING'
  | 'QUESTION'
  | 'FINAL_REVEAL'
  | 'VICTORY'
  | 'QUESTION_BANK'
  | 'INSTRUCTIONS';

export interface GameSettings {
  timerSeconds: number;
  pointsPerQuestion: number;
  firstGuessBonus: number;
  soundEnabled: boolean;
  classroomMode: boolean;
  customSecretImage?: string | null;
  customSecretName?: string;
}
