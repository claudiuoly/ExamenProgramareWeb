import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgClass],
  template: `<span [ngClass]="['material-symbols-outlined', className]">{{ name }}</span>`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      white-space: nowrap;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() className = '';
}
