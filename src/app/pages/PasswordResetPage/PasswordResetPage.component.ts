import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../../Components/Header/Header.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../Services/Profile.service';
import { forgotPasswordUpdateDto } from '../../Modals/Dtos/PasswordDto';
import { AlertBoxComponent } from '../../Components/AlertBox/AlertBox.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-password-reset-page',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    AlertBoxComponent,
    MatProgressBarModule
  ],
  templateUrl: './PasswordResetPage.component.html',
  styleUrl: './PasswordResetPage.component.css',
})
export class PasswordResetPageComponent implements OnInit {
  async onSubmit() {
    this.IsInprogress = true;
    console.log(this.resetPasswordForm.value);
    const forgotPasswordUpdate:forgotPasswordUpdateDto = {
      newPassword: this.resetPasswordForm.value.newPassword?? '',
      confirmPassword: this.resetPasswordForm.value.conformPassword?? '',
      userId: this.Id?? '',
      token: this.Token?? '',
    };

    try {
      await this.profileService.ForgotPasswordUpdate(forgotPasswordUpdate);
      console.log('request sent');
      this.IsResetComplete = true;
      this.IsInprogress = false;
    }
    catch (e) {
      console.log(e);
      this.IsInprogress = false;
    }
  }
  private fb = inject(FormBuilder);
  resetPasswordForm = this.fb.group({
    newPassword: [null, Validators.required],
    conformPassword: [null, Validators.required],
  });

  IsResetComplete: boolean = false;
  IsInprogress: boolean = false;

  Id: string = '';
  Token: string = '';

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {
    this.Id = this.route.snapshot.params['userId'];
    this.Token = this.route.snapshot.params['token'];
  }

  // ...

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // e.g. { "query": "shoes", "min_price": "10", "max_price": "75" }
      this.Id = params['userId'];
      this.Token = params['token'];
    });
  }
}
