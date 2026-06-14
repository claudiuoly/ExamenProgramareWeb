import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      type="button"
      class="theme-toggle"
      (click)="themeService.toggle()"
      [attr.aria-label]="theme() === 'dark' ? 'Mod luminos' : 'Mod întunecat'"
      [title]="theme() === 'dark' ? 'Mod luminos' : 'Mod întunecat'"
    >
      <app-icon [name]="theme() === 'dark' ? 'light_mode' : 'dark_mode'" className="btn-icon" />
    </button>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }

    .theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.35rem;
      height: 2.35rem;
      padding: 0;
      margin: 0;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      cursor: pointer;
      line-height: 0;
      transition: background 0.15s;

      &:hover {
        background: rgba(255, 255, 255, 0.22);
      }
    }
  `,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  readonly theme = this.themeService.theme;
}
