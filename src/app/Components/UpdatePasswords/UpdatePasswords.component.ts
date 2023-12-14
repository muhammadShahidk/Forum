import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProfileService } from '../../Services/Profile.service';
import { ChangePasswordDto } from '../../Modals/Dtos/PasswordDto';

@Component({
  selector: 'app-update-passwords',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './UpdatePasswords.component.html',
  styleUrl: './UpdatePasswords.component.css',
})
export class UpdatePasswordsComponent {
  isSpinner = signal(false);

  async UpdatePassword() {
    const { OldPassword, NewPassword } = this.PasswordChange.value;
    const passwordDetails:ChangePasswordDto = {
      currentPassword: OldPassword??"",
      newPassword: NewPassword??"",
    }

    await this.profile.ChangePassword(passwordDetails);

  }

  PasswordChange = this._formBuilder.group({
    OldPassword: '',
    NewPassword: '',
  });

  constructor(
    private _formBuilder: FormBuilder,
    private profile: ProfileService
  ) {}
}
