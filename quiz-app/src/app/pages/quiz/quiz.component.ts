import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Question, QuizTest, TestAttempt } from '../../models/quiz.model';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { IconComponent } from '../../components/icon/icon.component';

interface QuestionState {
  question: Question;
  selected: Set<number>;
  revealed: boolean;
  isCorrect: boolean | null;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ThemeToggleComponent, IconComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly quizService = inject(QuizService);

  test: QuizTest | null = null;
  questionStates: QuestionState[] = [];
  currentIndex = 0;
  submitted = false;
  score = 0;
  loading = true;

  async ngOnInit(): Promise<void> {
    await this.quizService.initSession();
    const testId = Number(this.route.snapshot.paramMap.get('id'));

    if (!testId) {
      this.router.navigate(['/']);
      return;
    }

    this.test = this.quizService.getTest(testId) ?? null;
    if (!this.test) {
      this.router.navigate(['/']);
      return;
    }

    this.restoreAttempt(this.test.attempt);

    this.loading = false;
  }

  ngOnDestroy(): void {
    this.persistProgress();
  }

  get currentState(): QuestionState | null {
    return this.questionStates[this.currentIndex] ?? null;
  }

  toggleOption(state: QuestionState, index: number): void {
    if (this.submitted) return;

    if (state.selected.has(index)) {
      state.selected.delete(index);
    } else {
      state.selected.add(index);
    }

    this.persistProgress();
  }

  isSelected(state: QuestionState, index: number): boolean {
    return state.selected.has(index);
  }

  isAnswered(state: QuestionState): boolean {
    return state.selected.size > 0;
  }

  answeredCount(): number {
    return this.questionStates.filter((s) => s.selected.size > 0).length;
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questionStates.length) {
      this.currentIndex = index;
      this.persistProgress();
    }
  }

  prevQuestion(): void {
    this.goToQuestion(this.currentIndex - 1);
  }

  nextQuestion(): void {
    this.goToQuestion(this.currentIndex + 1);
  }

  allAnswered(): boolean {
    return this.questionStates.every((s) => s.selected.size > 0);
  }

  submit(): void {
    if (!this.test || this.submitted) return;

    let correct = 0;
    for (const state of this.questionStates) {
      const indices = [...state.selected].sort((a, b) => a - b);
      const ok = this.quizService.evaluateAnswer(state.question, indices);
      state.revealed = true;
      state.isCorrect = ok;
      if (ok) correct++;
    }

    this.score = correct;
    this.submitted = true;
    this.quizService.saveTestAttempt(this.test.id, this.buildAttempt(true));
  }

  retry(): void {
    if (!this.test) return;
    this.quizService.resetTestCompletion(this.test.id);
    this.submitted = false;
    this.score = 0;
    this.currentIndex = 0;
    this.questionStates = this.test.questions.map((q) => ({
      question: q,
      selected: new Set<number>(),
      revealed: false,
      isCorrect: null,
    }));
  }

  splitQuestionText(text: string): { prompt: string; code: string | null } {
    const newlineIndex = text.indexOf('\n');
    if (newlineIndex === -1) {
      return { prompt: text, code: null };
    }

    const prompt = text.slice(0, newlineIndex).trim();
    const code = text.slice(newlineIndex + 1).trim();
    const looksLikeCode = /[<>{}]/.test(code) || code.includes('<table');

    return looksLikeCode ? { prompt, code } : { prompt: text, code: null };
  }

  private restoreAttempt(attempt?: TestAttempt): void {
    if (!this.test) return;

    this.questionStates = this.test.questions.map((q) => {
      const saved = attempt?.questions.find((s) => s.questionId === q.id);
      return {
        question: q,
        selected: new Set(saved?.selectedIndices ?? []),
        revealed: saved?.revealed ?? false,
        isCorrect: saved?.isCorrect ?? null,
      };
    });

    if (attempt) {
      this.submitted = attempt.submitted;
      this.score = attempt.score;
      this.currentIndex = Math.min(
        attempt.currentIndex,
        Math.max(this.questionStates.length - 1, 0)
      );
      return;
    }

    if (this.test.completed && this.test.score !== undefined) {
      this.submitted = true;
      this.score = this.test.score;
    }
  }

  private buildAttempt(submitted: boolean): TestAttempt {
    return {
      submitted,
      score: this.score,
      currentIndex: this.currentIndex,
      questions: this.questionStates.map((state) => ({
        questionId: state.question.id,
        selectedIndices: [...state.selected].sort((a, b) => a - b),
        revealed: state.revealed,
        isCorrect: state.isCorrect,
      })),
    };
  }

  private persistProgress(): void {
    if (!this.test) return;
    this.quizService.saveTestAttempt(this.test.id, this.buildAttempt(this.submitted));
  }
}
