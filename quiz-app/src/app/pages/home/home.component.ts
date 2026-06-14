import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService, TEST_COUNT } from '../../services/quiz.service';
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
export class HomeComponent implements OnInit {
  private readonly quizService = inject(QuizService);

  session: TestSession | null = null;
  loading = true;
  reshuffling = false;
  testCount = TEST_COUNT;

  async ngOnInit(): Promise<void> {
    const allDone = sessionStorage.getItem('web-quiz-all-done') === '1';
    this.session = await this.quizService.initSession(allDone);
    if (allDone) {
      sessionStorage.removeItem('web-quiz-all-done');
    }
    this.loading = false;
  }

  async reshuffle(): Promise<void> {
    this.reshuffling = true;
    this.session = await this.quizService.reshuffleAll();
    this.reshuffling = false;
  }

  completedCount(): number {
    return this.session?.completedTestIds.length ?? 0;
  }

  totalQuestions(test: QuizTest): number {
    return test.questions.length;
  }

  progressPercent(): number {
    if (!this.session) return 0;
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
