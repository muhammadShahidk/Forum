import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';
import { UserLoginDto } from '../../Modals/Dtos/UserLoginDto';
import { LoginRegisterNavComponent } from '../../Components/LoginRegisterNav/LoginRegisterNav.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RegisterPageComponent } from '../registerPage/registerPage.component';

// import

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <!-- nav -->
    <app-login-register-nav />
    <!-- login page container -->
    <div class="m-auto mt-5 sm:p-5 md:w-4/6  bg-gray-100  ">
      <!-- header title -->
      <h1 class="text-4xl text-blue-700 font-extrabold mb-4">
        We’ve missed you!
      </h1>
      <p class="text-sm text-green-900">
        More than 150 questions are waiting for your wise suggestions!
      </p>

      <!-- login Form Container  -->
      <div class="flex flex-col sm:flex-row p-2 md:h-[500px]">
        <mat-card class="min-w-[400px]">
          <!-- login header -->
          <mat-card-header class="d-flex justify-between mb-3">
            <mat-card-title>Login</mat-card-title>
            <a mat-raised-button routerLink="/register">register</a>
          </mat-card-header>

          <!-- login Content -->
          <mat-card-content>
            <form [formGroup]="loginForm" novalidate (ngSubmit)="onSubmit()">
              <mat-form-field class="w-[100%]">
                <input
                  matInput
                  placeholder="Username"
                  autocomplete="username"
                  formControlName="username"
                />
                <!-- handle user Required Error -->
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

                <!-- handle password Required Error -->
                @if (loginForm.controls['password'].hasError('required')) {
                <mat-error>Password is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </form>
          </mat-card-content>

          <!-- Actions -->
          <mat-card-actions>
            <button
              mat-raised-button
              color="primary"
              (click)="onSubmit()"
              type="submit"
              class="w-full"
              [disabled]="!loginForm.valid"
            >
              login
            </button>
            <!-- show the loding progress barr wheile loging  -->

            <!-- forgot password button -->
            <a mat-button routerLink="/forgot-password" class="w-full">
              forgot password?
            </a>
          </mat-card-actions>
          @if (isInprogress()) {
          <mat-progress-bar
            mode="indeterminate"
            class="w-full"
          ></mat-progress-bar
          >}
        </mat-card>

        <!-- login Image -->
        <div
          class="image-container w-11/12 bg-cover bg-center"
          style="background-image: url('../../assets/images/LoginImag.png')"
        ></div>
      </div>

      <!-- Api Response Error -->
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
    RegisterPageComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterLink,
    MatProgressBarModule,
    LoginRegisterNavComponent,
  ],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  ErrorMessage = signal(''); //) ;
  isInprogress = signal(false);

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    this.isInprogress.set(true);
    try {
      const userLoginDto: UserLoginDto = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || '',
      };

      const user = await this.authService.Login(userLoginDto);

      // Do something with the user object
      this.isInprogress.set(false);
      console.log('login response');
      console.log(user);
      this.router.navigate(['/forum']);
    } catch (error) {
      // Handle the error
      this.ErrorMessage.set(error as any);
      console.error('login error');
      this.isInprogress.set(false);
      console.log('error message' + this.ErrorMessage());
    }
  }

  async onSubmit(): Promise<void> {
    await this.login();
  }
}
