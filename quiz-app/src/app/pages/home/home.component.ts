import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { QuizTest, TestSession } from '../../models/quiz.model';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeToggleComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly quizService = inject(QuizService);

  session: TestSession | null = null;
  loading = true;
  reshuffling = false;
  shuffleConfirmed = false;

  private shuffleConfirmTimer: ReturnType<typeof setTimeout> | null = null;

  get testCount(): number {
    return this.session?.tests.length ?? 0;
  }

  async ngOnInit(): Promise<void> {
    this.session = await this.quizService.initSession();
    this.loading = false;
  }

  async reshuffle(): Promise<void> {
    this.reshuffling = true;
    this.shuffleConfirmed = false;
    this.session = await this.quizService.reshuffleAll();
    this.reshuffling = false;
    this.showShuffleConfirmation();
  }

  private showShuffleConfirmation(): void {
    if (this.shuffleConfirmTimer) {
      clearTimeout(this.shuffleConfirmTimer);
    }

    this.shuffleConfirmed = true;
    this.shuffleConfirmTimer = setTimeout(() => {
      this.shuffleConfirmed = false;
      this.shuffleConfirmTimer = null;
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.shuffleConfirmTimer) {
      clearTimeout(this.shuffleConfirmTimer);
    }
  }

  completedCount(): number {
    return this.session?.completedTestIds.length ?? 0;
  }

  totalQuestions(test: QuizTest): number {
    return test.questions.length;
  }

  progressPercent(): number {
    if (!this.session || this.testCount === 0) return 0;
    const done = this.completedCount();
    return Math.round((done / this.testCount) * 100);
  }

  totalQuestionsCount(): number {
    return this.session?.tests.reduce((s, t) => s + t.questions.length, 0) ?? 0;
  }

  totalCorrect(): number {
    return (
      this.session?.tests
        .filter((t) => t.completed && t.score !== undefined)
        .reduce((sum, t) => sum + (t.score ?? 0), 0) ?? 0
    );
  }

  totalWrong(): number {
    return (
      this.session?.tests
        .filter(
          (t) =>
            t.completed &&
            t.score !== undefined &&
            t.maxScore !== undefined
        )
        .reduce((sum, t) => sum + t.maxScore! - t.score!, 0) ?? 0
    );
  }

  correctCount(test: QuizTest): number {
    return test.completed && test.score !== undefined ? test.score : 0;
  }

  wrongCount(test: QuizTest): number {
    if (!test.completed || test.score === undefined || test.maxScore === undefined) {
      return 0;
    }
    return test.maxScore - test.score;
  }
}
