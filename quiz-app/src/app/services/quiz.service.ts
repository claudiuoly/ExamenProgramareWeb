import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  Question,
  QuestionsData,
  QuizTest,
  TestAttempt,
  TestSession,
} from '../models/quiz.model';

const STORAGE_KEY = 'web-quiz-session';
export const QUESTIONS_PER_TEST = 30;

export function computeTestCount(questionCount: number): number {
  return Math.max(1, Math.round(questionCount / QUESTIONS_PER_TEST));
}

@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly http = inject(HttpClient);
  private session: TestSession | null = null;
  private allQuestions: Question[] = [];

  async loadQuestions(): Promise<QuestionsData> {
    return firstValueFrom(this.http.get<QuestionsData>('/questions.json'));
  }

  async initSession(forceReshuffle = false): Promise<TestSession> {
    const data = await this.loadQuestions();
    this.allQuestions = data.questions;

    if (!forceReshuffle) {
      const stored = this.readStoredSession();
      if (stored && this.isSessionValid(stored)) {
        this.session = this.refreshSessionQuestions(stored, this.allQuestions);
        this.persistSession();
        return this.session;
      }
    }

    this.session = this.createShuffledSession(this.allQuestions);
    this.persistSession();
    return this.session;
  }

  getSession(): TestSession | null {
    return this.session ?? this.readStoredSession();
  }

  getTest(testId: number): QuizTest | undefined {
    return this.getSession()?.tests.find((t) => t.id === testId);
  }

  async reshuffleAll(): Promise<TestSession> {
    if (!this.allQuestions.length) {
      await this.loadQuestions().then((d) => (this.allQuestions = d.questions));
    }
    this.session = this.createShuffledSession(this.allQuestions);
    this.persistSession();
    return this.session;
  }

  resetTestCompletion(testId: number): void {
    const session = this.getSession();
    if (!session) return;

    const test = session.tests.find((t) => t.id === testId);
    if (test) {
      test.completed = false;
      test.score = undefined;
      test.maxScore = undefined;
      test.attempt = undefined;
    }

    session.completedTestIds = session.completedTestIds.filter((id) => id !== testId);
    this.session = session;
    this.persistSession();
  }

  saveTestAttempt(testId: number, attempt: TestAttempt): void {
    const session = this.getSession();
    if (!session) return;

    const test = session.tests.find((t) => t.id === testId);
    if (!test) return;

    test.attempt = attempt;

    if (attempt.submitted) {
      test.completed = true;
      test.score = attempt.score;
      test.maxScore = test.questions.length;

      if (!session.completedTestIds.includes(testId)) {
        session.completedTestIds.push(testId);
      }
    }

    this.session = session;
    this.persistSession();
  }

  allTestsCompleted(): boolean {
    const session = this.getSession();
    return !!session && session.completedTestIds.length >= session.tests.length;
  }

  evaluateAnswer(question: Question, selectedIndices: number[]): boolean {
    const correctIndices = question.options
      .map((o, i) => (o.isCorrect ? i : -1))
      .filter((i) => i >= 0);

    if (selectedIndices.length !== correctIndices.length) return false;
    return correctIndices.every((i) => selectedIndices.includes(i));
  }

  private prepareQuestion(question: Question): Question {
    return {
      ...question,
      options: this.shuffle([...question.options]),
    };
  }

  private createShuffledSession(questions: Question[]): TestSession {
    const prepared = questions.map((q) => this.prepareQuestion(q));
    const shuffled = this.shuffle(prepared);
    const chunks = this.splitIntoTests(shuffled);
    const tests: QuizTest[] = chunks.map((slice, i) => ({
      id: i + 1,
      label: `Test ${i + 1}`,
      questions: slice,
      completed: false,
    }));

    return {
      shuffleVersion: Date.now(),
      optionsShuffled: true,
      questionCount: questions.length,
      tests,
      completedTestIds: [],
    };
  }

  private splitIntoTests(questions: Question[]): Question[][] {
    const testCount = computeTestCount(questions.length);
    const baseSize = Math.floor(questions.length / testCount);
    const extra = questions.length % testCount;
    const chunks: Question[][] = [];
    let offset = 0;

    for (let i = 0; i < testCount; i++) {
      const size = baseSize + (i < extra ? 1 : 0);
      chunks.push(questions.slice(offset, offset + size));
      offset += size;
    }

    return chunks;
  }

  private shuffle<T>(items: T[]): T[] {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  private refreshSessionQuestions(
    session: TestSession,
    sourceQuestions: Question[]
  ): TestSession {
    const byId = new Map(sourceQuestions.map((q) => [q.id, q]));

    for (const test of session.tests) {
      test.questions = test.questions.map((question) => {
        const fresh = byId.get(question.id);
        if (!fresh) return question;

        const options = question.options.map((option) => {
          const match = fresh.options.find((o) => o.text === option.text);
          return match ?? option;
        });

        return {
          ...question,
          category: fresh.category,
          text: fresh.text,
          options,
        };
      });
    }

    return session;
  }

  private readStoredSession(): TestSession | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as TestSession) : null;
    } catch {
      return null;
    }
  }

  private persistSession(): void {
    if (this.session) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.session));
    }
  }

  private isSessionValid(stored: TestSession): boolean {
    const expectedCount = this.allQuestions.length || stored.questionCount;
    const expectedTests = computeTestCount(expectedCount);
    const totalInSession =
      stored.tests?.reduce((sum, test) => sum + test.questions.length, 0) ?? 0;

    return (
      stored.optionsShuffled === true &&
      stored.tests?.length === expectedTests &&
      stored.questionCount === expectedCount &&
      totalInSession === expectedCount &&
      stored.tests.every((t) => t.questions.length > 0)
    );
  }
}
