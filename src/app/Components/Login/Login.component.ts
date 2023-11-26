import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from '../register/register.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';
import { UserLoginDto } from '../../Modals/Dtos/UserLoginDto';

// import

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="m-auto w-12/12 sm:w-9/12 min-md:w-8">
      <mat-card class="">
        <mat-card-header class="d-flex justify-between mb-3">
          <mat-card-title>Login</mat-card-title>
          <!-- <button mat-raised-button type="submit">Register</button> -->
          <a mat-raised-button routerLink="/register">register</a>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" novalidate (ngSubmit)="onSubmit()">
            <!-- username -->
            <mat-form-field class="w-[100%]">
              <input
                matInput
                placeholder="Username"
                autocomplete="username"
                formControlName="username"
              />
              @if (loginForm.controls['username'].hasError('required')) {
              <mat-error>Username is <strong>required</strong></mat-error>
              }
            </mat-form-field>

            <!-- password -->
            <mat-form-field class="w-[100%]">
              <input
                matInput
                placeholder="Password"
                formControlName="password"
                autocomplete="current-password"
                type="password"
              />
              @if (loginForm.controls['password'].hasError('required')) {
              <mat-error>Password is <strong>required</strong></mat-error>
              }
            </mat-form-field>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button
            mat-raised-button
            color="primary"
            (click)="onSubmit()"
            type="submit"
          >
            login
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- show the erro message if we have in good looking way -->
      <div class="text-red-500 text-center mt-3">
        @if (ErrorMessage()) {
        <mat-error>{{ ErrorMessage() }}</mat-error>
        }
      </div>
    </div>
  `,
  styleUrl: './Login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    RegisterComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterLink,
  ],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    email: [null, Validators.required],
  });

  ErrorMessage = signal(''); //) ;

  // login method using auth service
  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    try {
      const userLoginDto: UserLoginDto = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || '',
      };

      const user = await this.authService.Login(userLoginDto);
      // Do something with the user object
      console.log('login response');
      console.log(user);
      this.router.navigate(['/home']);
    } catch (error) {
      // Handle the error
      this.ErrorMessage.set(error as any);
      console.error('login error');
      console.log('error message' + this.ErrorMessage());
    }
  }

  async onSubmit(): Promise<void> {
    await this.login();
  }
}
