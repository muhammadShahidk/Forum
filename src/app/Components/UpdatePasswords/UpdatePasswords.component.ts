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
import { AlertBoxComponent } from '../AlertBox/AlertBox.component';
import { RouterLink } from '@angular/router';

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
    AlertBoxComponent,
    RouterLink
  ],
  templateUrl: './UpdatePasswords.component.html',
  styleUrl: './UpdatePasswords.component.css',
})
export class UpdatePasswordsComponent {
  isSpinner = signal(false);
  isComplete = signal(false);
  async UpdatePassword() {
    const { OldPassword, NewPassword } = this.PasswordChange.value;
    const passwordDetails:ChangePasswordDto = {
      currentPassword: OldPassword??"",
      newPassword: NewPassword??"",
    }

      try
      {
        await this.profile.ChangePassword(passwordDetails);
        this.isComplete.set(true);
      }
      catch(e)
      {
        console.log(e);
      }
      finally
      {
        this.isSpinner.set(false);
      }

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
