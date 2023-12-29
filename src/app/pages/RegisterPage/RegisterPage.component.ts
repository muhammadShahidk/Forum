import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';
import { from } from 'rxjs';
import { LoginRegisterNavComponent } from '../../Components/LoginRegisterNav/LoginRegisterNav.component';

@Component({
  selector: 'app-register',
  templateUrl: './RegisterPage.component.html',
  styleUrls: ['./RegisterPage.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    LoginRegisterNavComponent,
  ],
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(3)]],
    lastName: [null, [Validators.required, Validators.minLength(3)]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(4)]],
    email: [null, [Validators.required,Validators.email]],
  });

  constructor(private _router: Router, private _authService: AuthService) {}

  async onSubmit(): Promise<void> {
    if (this.addressForm.valid) {
      const form = this.addressForm.value;
      const { username, password, firstName, email, lastName } = form;

      console.log(form);
      try {
        await this._authService.Register({
          userName: username ?? '',
          password: password ?? '',
          firstName: firstName ?? '',
          email: email ?? '',
          lastName: lastName ?? '',
        });

        await this._authService.MakeApprovalRequest({
          username: username ?? '',
        });
        console.info(
          'your approval request has been sent to admin please wait for approval'
        );
        this._router.navigate(['/login']);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
