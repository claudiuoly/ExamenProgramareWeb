import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const input = readFileSync(join(root, 'Toate Grilele.txt'), 'utf-8');

const questions = [];
let currentCategory = '';
let currentQuestion = null;

const isSeparator = (line) => /^[-=]{10,}$/.test(line.trim());
const isCategoryLine = (line) => /^[🌐💻📡🔄🐘☕🛡️]/.test(line.trim());

for (const rawLine of input.split('\n')) {
  const trimmed = rawLine.trim();

  if (!trimmed || isSeparator(trimmed)) continue;

  if (isCategoryLine(trimmed)) {
    currentCategory = trimmed.replace(/^[^\w\s]+\s*/, '').trim();
    continue;
  }

  const qMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
  if (qMatch) {
    if (currentQuestion) questions.push(currentQuestion);
    currentQuestion = {
      id: parseInt(qMatch[1], 10),
      category: currentCategory,
      text: qMatch[2].trim(),
      options: [],
    };
    continue;
  }

  if (trimmed.startsWith('- ') && currentQuestion) {
    const optText = trimmed.slice(2);
    const isCorrect = /^\[X\]\s*/.test(optText);
    const text = optText.replace(/^\[X\]\s*/, '').trim();
    currentQuestion.options.push({ text, isCorrect });
    continue;
  }

  if (currentQuestion && !trimmed.startsWith('-')) {
    currentQuestion.text += '\n' + trimmed;
  }
}

if (currentQuestion) questions.push(currentQuestion);

const output = {
  title: 'Grile Programare Web',
  totalQuestions: questions.length,
  questions,
};

const outPath = join(root, 'quiz-app', 'public', 'questions.json');
writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

const empty = questions.filter((q) => q.options.length === 0);
console.log(`Parsed ${questions.length} questions -> ${outPath}`);
if (empty.length) console.warn('Questions without options:', empty.map((q) => q.id));
