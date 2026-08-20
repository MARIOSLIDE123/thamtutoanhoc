import { Question } from '../types';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    pieceId: 1,
    title: 'Mảnh ghép 01: Tính cạnh góc vuông đối diện',
    question: 'Cho tam giác $ABC$ vuông tại $A$, có góc $\\widehat{B} = 30^\\circ$ và cạnh huyền $BC = 12\\text{ cm}$. Hãy tính độ dài cạnh góc vuông $AC$.',
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
      '$AC = 6\\text{ cm}$',
      '$AC = 6\\sqrt{3}\\text{ cm}$',
      '$AC = 8\\text{ cm}$',
      '$AC = 24\\text{ cm}$'
    ],
    correctAnswer: 0,
    explanation: 'Trong tam giác vuông $ABC$ vuông tại $A$:\n• Cạnh góc vuông = Cạnh huyền $\\times \\sin(\\text{góc đối})$\n• Ta có: $AC = BC \\cdot \\sin(B) = 12 \\cdot \\sin(30^\\circ)$\n• Vì $\\sin(30^\\circ) = \\frac{1}{2}$ nên $AC = 12 \\cdot \\frac{1}{2} = 6\\text{ cm}$.',
    hint: 'Trong tam giác vuông, cạnh góc vuông đối diện với một góc bằng cạnh huyền nhân sin góc đó: $b = a \\cdot \\sin(B)$.',
    points: 10,
  },
  {
    id: 'q-2',
    pieceId: 2,
    title: 'Mảnh ghép 02: Tính cạnh góc vuông qua cạnh kề và góc',
    question: 'Cho tam giác $ABC$ vuông tại $A$, có góc $\\widehat{C} = 60^\\circ$ và cạnh góc vuông $AC = 8\\text{ cm}$. Hãy tính độ dài cạnh góc vuông $AB$.',
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
      '$AB = 4\\text{ cm}$',
      '$AB = 8\\sqrt{3}\\text{ cm}$',
      '$AB = 16\\text{ cm}$',
      '$AB = \\frac{8}{\\sqrt{3}}\\text{ cm}$'
    ],
    correctAnswer: 1,
    explanation: 'Trong tam giác vuông $ABC$ vuông tại $A$:\n• Cạnh góc vuông này bằng cạnh góc vuông kia nhân $\\tan$ góc đối: $AB = AC \\cdot \\tan(C)$\n• Thay số: $AB = 8 \\cdot \\tan(60^\\circ) = 8\\sqrt{3}\\text{ cm} \\approx 13{,}86\\text{ cm}$.',
    hint: 'Sử dụng hệ thức giữa các cạnh góc vuông: Cạnh đối = Cạnh kề $\\times \\tan(\\text{góc nhọn kề})$.',
    points: 10,
  },
  {
    id: 'q-3',
    pieceId: 3,
    title: 'Mảnh ghép 03: Bài toán thực tế - Chiếc thang dựa tường',
    question: 'Một chiếc thang dài $5\\text{ m}$ được dựng dựa vào một bức tường thẳng đứng, tạo với mặt đất một góc $60^\\circ$. Khoảng cách từ chân thang đến chân tường là bao nhiêu mét?',
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
      '$d = 5\\sqrt{3}\\text{ m}$',
      '$d = 4{,}33\\text{ m}$',
      '$d = 2{,}5\\text{ m}$',
      '$d = 3{,}5\\text{ m}$'
    ],
    correctAnswer: 2,
    explanation: 'Mô hình hóa hình học:\n• Thang đóng vai trò cạnh huyền $c = 5\\text{ m}$.\n• Khoảng cách từ chân thang đến tường là cạnh kề với góc $60^\\circ$.\n• Ta có: $d = 5 \\cdot \\cos(60^\\circ) = 5 \\cdot \\frac{1}{2} = 2{,}5\\text{ m}$.',
    hint: 'Khoảng cách trên mặt đất là cạnh kề của góc hợp bởi thang và mặt đất: $d = c \\cdot \\cos(60^\\circ)$.',
    points: 10,
  },
  {
    id: 'q-4',
    pieceId: 4,
    title: 'Mảnh ghép 04: Tìm góc nhọn khi biết hai cạnh góc vuông',
    question: 'Cho tam giác $ABC$ vuông tại $A$ có hai cạnh góc vuông $AB = 6\\text{ cm}$ và $AC = 8\\text{ cm}$. Hãy tính số đo góc nhọn $\\widehat{B}$ (làm tròn đến độ).',
    diagramType: 'triangle_two_sides',
    triangleData: {
      rightAngleAt: 'A',
      knownSide1: { name: 'AB', value: '6 cm' },
      knownSide2: { name: 'AC', value: '8 cm' },
      target: 'Góc B = ?',
      note: 'tan(B) = AC / AB'
    },
    options: [
      '$\\widehat{B} \\approx 37^\\circ$',
      '$\\widehat{B} \\approx 53^\\circ$',
      '$\\widehat{B} = 45^\\circ$',
      '$\\widehat{B} \\approx 60^\\circ$'
    ],
    correctAnswer: 1,
    explanation: 'Trong tam giác vuông $ABC$:\n• $\\tan(B) = \\frac{\\text{Cạnh đối } AC}{\\text{Cạnh kề } AB} = \\frac{8}{6} = \\frac{4}{3} \\approx 1{,}3333$\n• Tra bảng hoặc bấm máy tính: $\\widehat{B} = \\arctan\\left(\\frac{4}{3}\\right) \\approx 53^\\circ 07\' \\approx 53^\\circ$.',
    hint: 'Tính $\\tan(B) = \\frac{\\text{đối}}{\\text{kề}}$, sau đó bấm $\\text{Shift}+\\tan$ để tìm số đo góc.',
    points: 10,
  },
  {
    id: 'q-5',
    pieceId: 5,
    title: 'Mảnh ghép 05: Bài toán thực tế - Hải đăng & Thuyền trên biển',
    question: 'Một ngọn hải đăng cao $45\\text{ m}$ so với mặt nước biển. Người quan sát từ đỉnh nhìn thấy một chiếc thuyền với góc hạ $30^\\circ$. Khoảng cách từ chân hải đăng đến thuyền là bao nhiêu?',
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
      '$d = 45\\sqrt{3}\\text{ m} \\approx 77{,}94\\text{ m}$',
      '$d = 90\\text{ m}$',
      '$d = 22{,}5\\text{ m}$',
      '$d = \\frac{45}{\\sqrt{3}}\\text{ m} \\approx 25{,}98\\text{ m}$'
    ],
    correctAnswer: 0,
    explanation: 'Theo tính chất góc so le trong, góc nhìn từ thuyền lên đỉnh tháp bằng góc hạ: $30^\\circ$.\n• Gọi khoảng cách từ chân tháp đến thuyền là $d$.\n• Ta có: $\\tan(30^\\circ) = \\frac{\\text{Chiều cao tháp}}{d} = \\frac{45}{d}$\n• Suy ra: $d = \\frac{45}{\\tan(30^\\circ)} = \\frac{45}{\\frac{1}{\\sqrt{3}}} = 45\\sqrt{3}\\text{ m} \\approx 77{,}94\\text{ m}$.',
    hint: 'Góc hạ $30^\\circ$ tạo tam giác vuông có cạnh đối $h = 45\\text{ m}$ và cạnh kề là khoảng cách: $d = \\frac{45}{\\tan(30^\\circ)}$.',
    points: 10,
  },
  {
    id: 'q-6',
    pieceId: 6,
    title: 'Mảnh ghép 06: Đường cao trong tam giác vuông',
    question: 'Cho tam giác $ABC$ vuông tại $A$, kẻ đường cao $AH$ ($H \\in BC$). Biết cạnh $AB = 9\\text{ cm}$ và $\\widehat{B} = 45^\\circ$. Hãy tính độ dài đường cao $AH$.',
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
      '$AH = 4{,}5\\text{ cm}$',
      '$AH = 4{,}5\\sqrt{2}\\text{ cm} \\approx 6{,}36\\text{ cm}$',
      '$AH = 9\\sqrt{2}\\text{ cm}$',
      '$AH = 9\\text{ cm}$'
    ],
    correctAnswer: 1,
    explanation: 'Xét tam giác vuông $AHB$ vuông tại $H$:\n• Cạnh $AH$ đối diện với góc $\\widehat{B}$, cạnh huyền là $AB = 9\\text{ cm}$.\n• Do đó: $AH = AB \\cdot \\sin(B) = 9 \\cdot \\sin(45^\\circ) = 9 \\cdot \\frac{\\sqrt{2}}{2} = 4{,}5\\sqrt{2}\\text{ cm} \\approx 6{,}36\\text{ cm}$.',
    hint: 'Xét riêng tam giác $AHB$ vuông tại $H$: đường cao $AH$ là cạnh đối diện góc $B$, áp dụng $AH = AB \\cdot \\sin(B)$.',
    points: 10,
  },
];
