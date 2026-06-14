import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  Question,
  QuestionsData,
  QuizTest,
  TestSession,
} from '../models/quiz.model';

const STORAGE_KEY = 'web-quiz-session';
export const TEST_COUNT = 6;

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
        this.session = stored;
        return stored;
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
    }

    session.completedTestIds = session.completedTestIds.filter((id) => id !== testId);
    sessionStorage.removeItem('web-quiz-all-done');
    this.session = session;
    this.persistSession();
  }

  markTestCompleted(testId: number, score: number, maxScore: number): void {
    const session = this.getSession();
    if (!session) return;

    const test = session.tests.find((t) => t.id === testId);
    if (test) {
      test.completed = true;
      test.score = score;
      test.maxScore = maxScore;
    }

    if (!session.completedTestIds.includes(testId)) {
      session.completedTestIds.push(testId);
    }

    this.session = session;
    this.persistSession();
  }

  allTestsCompleted(): boolean {
    const session = this.getSession();
    return !!session && session.completedTestIds.length >= TEST_COUNT;
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
    const chunkSize = Math.ceil(shuffled.length / TEST_COUNT);
    const tests: QuizTest[] = [];

    for (let i = 0; i < TEST_COUNT; i++) {
      const slice = shuffled.slice(i * chunkSize, (i + 1) * chunkSize);
      if (slice.length === 0) continue;
      tests.push({
        id: i + 1,
        label: `Test ${i + 1}`,
        questions: slice,
        completed: false,
      });
    }

    return {
      shuffleVersion: Date.now(),
      optionsShuffled: true,
      tests,
      completedTestIds: [],
    };
  }

  private shuffle<T>(items: T[]): T[] {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
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
    return (
      stored.optionsShuffled === true &&
      stored.tests?.length === TEST_COUNT &&
      stored.tests.every((t) => t.questions.length > 0)
    );
  }
}
