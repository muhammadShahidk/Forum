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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    LoginRegisterNavComponent
  ],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    email: [null, Validators.required],
  });

  constructor(private _router: Router, private _authService: AuthService) {}

  onSubmit(): void {
    if (this.addressForm.valid) {
      const form = this.addressForm.value;
      const { username, password, firstName, email, lastName } = form;
      
      console.log(form);
      this._authService.Register({
        userName: username ?? "",
        password: password ?? "",
        firstName: firstName ?? "",
        email: email ?? "",
        lastName: lastName ?? "",
      });
    }
  }
}
