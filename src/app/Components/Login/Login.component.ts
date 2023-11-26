import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCheckboxModule],
  template: `
    <p>Login works!</p>
    <h1>Login page start</h1>
    <mat-checkbox>Check me!</mat-checkbox>
    <button mat-button>Click me!</button>
  `,
  styleUrl: './Login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
