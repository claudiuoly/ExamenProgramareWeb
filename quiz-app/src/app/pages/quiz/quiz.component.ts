import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Question, QuizTest } from '../../models/quiz.model';

interface QuestionState {
  question: Question;
  selected: Set<number>;
  revealed: boolean;
  isCorrect: boolean | null;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly quizService = inject(QuizService);

  test: QuizTest | null = null;
  questionStates: QuestionState[] = [];
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

    this.questionStates = this.test.questions.map((q) => ({
      question: q,
      selected: new Set<number>(),
      revealed: false,
      isCorrect: null,
    }));

    if (this.test.completed && this.test.score !== undefined) {
      this.submitted = true;
      this.score = this.test.score;
    }

    this.loading = false;
  }

  toggleOption(state: QuestionState, index: number): void {
    if (this.submitted) return;

    if (state.selected.has(index)) {
      state.selected.delete(index);
    } else {
      state.selected.add(index);
    }
  }

  isSelected(state: QuestionState, index: number): boolean {
    return state.selected.has(index);
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
    this.quizService.markTestCompleted(
      this.test.id,
      correct,
      this.questionStates.length
    );

    if (this.quizService.allTestsCompleted()) {
      sessionStorage.setItem('web-quiz-all-done', '1');
    }
  }

  retry(): void {
    if (!this.test) return;
    this.quizService.resetTestCompletion(this.test.id);
    this.submitted = false;
    this.score = 0;
    this.questionStates = this.test.questions.map((q) => ({
      question: q,
      selected: new Set<number>(),
      revealed: false,
      isCorrect: null,
    }));
  }
}
