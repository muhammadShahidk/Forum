import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { UpdateUserInfoDto, UserResponseDto } from '../../Modals/Dtos/userDto';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../Services/Profile.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-update-user-info',
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
  templateUrl: './UpdateUserInfo.component.html',
  styleUrl: './UpdateUserInfo.component.css',
})
export class UpdateUserInfoComponent implements OnChanges {
  isSpinner = signal( false);

  async updateUserInfo() {

    console.log('updateUserInfo');
    console.log(this.UserDetails.value);
    if (this.UserDetails.value) {
      this.isSpinner.set(true);
      const { FirstName, lastName, Email } = this.UserDetails.value;

      const updateUserInfo: UpdateUserInfoDto = {
        firstName: FirstName ?? '',
        lastName: lastName ?? '',
        email: Email ?? '',
      };

      console.log(updateUserInfo);
      try {
        await this.profile.UpdateUserInfo(updateUserInfo);
        this.OnUserUpdate.emit();
        this.isSpinner.set(false);
      } catch (e) {
        alert(e);
        this.isSpinner.set(false);
      }
    }
  }

  @Input() User: UserResponseDto = {
    firstName: '',
    lastName: '',
    email: '',
    rools: [],
    userID: 0,
    username: '',
  };
  @Output() OnUserUpdate: EventEmitter<void> = new EventEmitter<void>();

  UserDetails = this._formBuilder.group({
    FirstName: this.User.firstName,
    lastName: this.User.lastName,
    Email: this.User.email,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private profile: ProfileService
  ) {}

  // initilizig user details from the input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['User']) {
      console.log('user changed');
      console.log(this.User);
      this.UserDetails.setValue({
        FirstName: this.User.firstName,
        lastName: this.User.lastName,
        Email: this.User.email,
      });
    }
  }
}
