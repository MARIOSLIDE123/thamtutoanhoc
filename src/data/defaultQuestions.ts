import { Question } from '../types';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    pieceId: 1,
    title: 'Mảnh ghép số 01: Tính cạnh góc vuông đối diện',
    question: 'Cho tam giác ABC vuông tại A, có góc B = 30° và cạnh huyền BC = 12 cm. Hãy tính độ dài cạnh góc vuông AC.',
    diagramType: 'triangle_side_angle',
    triangleData: {
      rightAngleAt: 'A',
      angleName: 'B',
      angleValue: '30°',
      knownSide1: { name: 'BC (huyền)', value: '12 cm' },
      target: 'AC = ?',
      note: 'AC là cạnh đối của góc B'
    },
    options: [
      'AC = 6 cm',
      'AC = 6√3 cm',
      'AC = 8 cm',
      'AC = 24 cm'
    ],
    correctAnswer: 0,
    explanation: 'Trong tam giác vuông ABC vuông tại A:\n• Cạnh góc vuông = Cạnh huyền × sin(góc đối)\n• Ta có: AC = BC · sin(B) = 12 · sin(30°)\n• Vì sin(30°) = 1/2 nên AC = 12 · 0.5 = 6 cm.',
    hint: 'Trong tam giác vuông, cạnh góc vuông đối diện với một góc bằng cạnh huyền nhân với sin của góc đó: b = a · sin(B).',
    points: 10,
  },
  {
    id: 'q-2',
    pieceId: 2,
    title: 'Mảnh ghép số 02: Tính cạnh góc vuông qua cạnh kề và góc',
    question: 'Cho tam giác ABC vuông tại A, có góc C = 60° và cạnh góc vuông AC = 8 cm. Hãy tính độ dài cạnh góc vuông AB.',
    diagramType: 'triangle_side_angle',
    triangleData: {
      rightAngleAt: 'A',
      angleName: 'C',
      angleValue: '60°',
      knownSide1: { name: 'AC (kề)', value: '8 cm' },
      target: 'AB = ?',
      note: 'AB là cạnh đối của góc C'
    },
    options: [
      'AB = 4 cm',
      'AB = 8√3 cm',
      'AB = 16 cm',
      'AB = 8/√3 cm'
    ],
    correctAnswer: 1,
    explanation: 'Trong tam giác vuông ABC vuông tại A:\n• Cạnh góc vuông này bằng cạnh góc vuông kia nhân với tan góc đối: AB = AC · tan(C)\n• Thay số: AB = 8 · tan(60°) = 8√3 cm (≈ 13.86 cm).',
    hint: 'Sử dụng hệ thức giữa các cạnh góc vuông: Cạnh đối = Cạnh kề × tan(góc nhọn kề)',
    points: 10,
  },
  {
    id: 'q-3',
    pieceId: 3,
    title: 'Mảnh ghép số 03: Bài toán thực tế - Chiếc thang dựa tường',
    question: 'Một chiếc thang dài 5 m được dựng dựa vào một bức tường thẳng đứng, tạo với mặt đất một góc 60°. Khoảng cách từ chân thang đến chân tường là bao nhiêu mét?',
    diagramType: 'ladder_wall',
    triangleData: {
      rightAngleAt: 'Chân tường',
      angleName: 'Góc nghiêng',
      angleValue: '60°',
      knownSide1: { name: 'Chiều dài thang', value: '5 m' },
      target: 'Khoảng cách mặt đất = ?',
      note: 'Thang đóng vai trò cạnh huyền'
    },
    options: [
      'd = 5√3 m',
      'd = 4.33 m',
      'd = 2.5 m',
      'd = 3.5 m'
    ],
    correctAnswer: 2,
    explanation: 'Mô hình hóa hình học:\n• Thang đóng vai trò cạnh huyền c = 5 m.\n• Khoảng cách từ chân thang đến tường là cạnh kề với góc 60°.\n• d = 5 · cos(60°) = 5 · 0.5 = 2.5 m.',
    hint: 'Khoảng cách trên mặt đất là cạnh kề của góc hợp bởi thang và mặt đất: d = Chiều dài thang × cos(60°).',
    points: 10,
  },
  {
    id: 'q-4',
    pieceId: 4,
    title: 'Mảnh ghép số 04: Tìm góc nhọn khi biết hai cạnh góc vuông',
    question: 'Cho tam giác ABC vuông tại A có hai cạnh góc vuông AB = 6 cm và AC = 8 cm. Hãy tính số đo góc nhọn B (làm tròn đến độ).',
    diagramType: 'triangle_two_sides',
    triangleData: {
      rightAngleAt: 'A',
      knownSide1: { name: 'AB', value: '6 cm' },
      knownSide2: { name: 'AC', value: '8 cm' },
      target: 'Góc B = ?',
      note: 'tan(B) = AC / AB'
    },
    options: [
      'Góc B ≈ 37°',
      'Góc B ≈ 53°',
      'Góc B = 45°',
      'Góc B ≈ 60°'
    ],
    correctAnswer: 1,
    explanation: 'Trong tam giác vuông ABC:\n• tan(B) = (Cạnh đối AC) / (Cạnh kề AB) = 8 / 6 = 4/3 ≈ 1.3333\n• Tra bảng hoặc bấm máy: B = arctan(4/3) ≈ 53°07\' ≈ 53°.',
    hint: 'Tính tan(B) = Cạnh đối / Cạnh kề, sau đó bấm Shift+tan (hoặc tra bảng lượng giác) để tìm số đo góc.',
    points: 10,
  },
  {
    id: 'q-5',
    pieceId: 5,
    title: 'Mảnh ghép số 05: Bài toán thực tế - Hải đăng & Thuyền trên biển',
    question: 'Một ngọn hải đăng cao 45 m so với mặt nước biển. Người quan sát từ đỉnh hải đăng nhìn thấy một chiếc thuyền với góc hạ 30°. Khoảng cách từ chân hải đăng đến thuyền là bao nhiêu?',
    diagramType: 'shadow_tower',
    triangleData: {
      rightAngleAt: 'Chân hải đăng',
      angleName: 'Góc nhìn từ thuyền',
      angleValue: '30°',
      knownSide1: { name: 'Chiều cao tháp', value: '45 m' },
      target: 'Khoảng cách = ?',
      note: 'Góc hạ = Góc nâng từ thuyền = 30°'
    },
    options: [
      '45√3 m (≈ 77.94 m)',
      '90 m',
      '22.5 m',
      '45/√3 m (≈ 25.98 m)'
    ],
    correctAnswer: 0,
    explanation: 'Theo tính chất góc so le trong, góc nhìn từ thuyền lên đỉnh tháp bằng góc hạ: 30°.\n• Gọi khoảng cách từ chân tháp đến thuyền là d.\n• Ta có: tan(30°) = (Chiều cao tháp) / d = 45 / d\n• Suy ra: d = 45 / tan(30°) = 45 / (1/√3) = 45√3 m ≈ 77.94 m.',
    hint: 'Góc hạ 30° tạo tam giác vuông có cạnh đối là chiều cao ngọn hải đăng (45m) và cạnh kề là khoảng cách cần tìm: d = 45 / tan(30°).',
    points: 10,
  },
  {
    id: 'q-6',
    pieceId: 6,
    title: 'Mảnh ghép số 06: Đường cao trong tam giác vuông',
    question: 'Cho tam giác ABC vuông tại A, kẻ đường cao AH (H thuộc BC). Biết cạnh AB = 9 cm và góc B = 45°. Hãy tính độ dài đường cao AH.',
    diagramType: 'triangle_height',
    triangleData: {
      rightAngleAt: 'A (và AH ⊥ BC)',
      angleName: 'B',
      angleValue: '45°',
      knownSide1: { name: 'AB', value: '9 cm' },
      target: 'AH = ?',
      note: 'Xét tam giác vuông AHB tại H'
    },
    options: [
      'AH = 4.5 cm',
      'AH = 4.5√2 cm (≈ 6.36 cm)',
      'AH = 9√2 cm',
      'AH = 9 cm'
    ],
    correctAnswer: 1,
    explanation: 'Xét tam giác vuông AHB vuông tại H:\n• Cạnh AH đối diện với góc B, cạnh huyền là AB = 9 cm.\n• Do đó: AH = AB · sin(B) = 9 · sin(45°) = 9 · (√2 / 2) = 4.5√2 cm ≈ 6.36 cm.',
    hint: 'Xét riêng tam giác nhỏ AHB vuông tại H: đường cao AH là cạnh góc vuông đối diện góc B, áp dụng AH = AB · sin(B).',
    points: 10,
  },
];
