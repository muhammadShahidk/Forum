import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginRegisterNavComponent } from '../../Components/LoginRegisterNav/LoginRegisterNav.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../Services/Profile.service';
import { forgotPasswordRequestDto } from '../../Modals/Dtos/PasswordDto';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertBoxComponent } from '../../Components/AlertBox/AlertBox.component';
@Component({
  selector: 'app-forgot-passowrd-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginRegisterNavComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    AlertBoxComponent
  ],
  templateUrl: './forgotPassowrdPage.component.html',
  styleUrl: './forgotPassowrdPage.component.css',
})
export class ForgotPassowrdPageComponent {
  async onSubmit() {
    this.isRequestInprogress = true;
    console.log(this.forgotRequestForm.value);
    const forgotPasswordRequest: forgotPasswordRequestDto = {
      email: this.forgotRequestForm.value.email ?? '',
    };

    try {
      await this.profileService.ForgotPasswordRequest(forgotPasswordRequest);
      console.log('request sent');
      this.isRequestSent = true;
      this.isRequestInprogress = false;
    } catch (e) {
      console.log(e);
      this.isRequestInprogress = false;

    }
  }

  isRequestSent: boolean = false;
  isRequestInprogress: boolean = false;
  private fb = inject(FormBuilder);
  forgotRequestForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(private profileService: ProfileService) {}
}
