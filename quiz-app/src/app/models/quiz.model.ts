export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  category: string;
  text: string;
  options: QuestionOption[];
}

export interface QuestionsData {
  title: string;
  totalQuestions: number;
  questions: Question[];
}

export interface QuizTest {
  id: number;
  label: string;
  questions: Question[];
  completed: boolean;
  score?: number;
  maxScore?: number;
}

export interface TestSession {
  shuffleVersion: number;
  optionsShuffled: boolean;
  questionCount: number;
  tests: QuizTest[];
  completedTestIds: number[];
}

export interface QuestionAnswer {
  questionId: number;
  selectedIndices: number[];
}
