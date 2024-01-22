import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../Components/Header/Header.component';
import { UpdateUserInfoComponent } from '../../Components/UpdateUserInfo/UpdateUserInfo.component';
import { UpdatePasswordsComponent } from '../../Components/UpdatePasswords/UpdatePasswords.component';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';
import { UserResponseDto } from '../../Modals/Dtos/userDto';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertBoxComponent } from '../../Components/AlertBox/AlertBox.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    UpdateUserInfoComponent,
    UpdatePasswordsComponent,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,

  ],
  templateUrl: './SettingsPage.component.html',
  styleUrl: './SettingsPage.component.css',
})
export class SettingsPageComponent implements OnInit {
  OnUserUpdate() {
  }
  user = signal<UserResponseDto>({
    email: '',
    firstName: '',
    rools: [],
    lastName: '',
    userID: 0,
    username: '',
  } as UserResponseDto);


  constructor(private router: Router, private authservice: AuthService) {}
  async ngOnInit(): Promise<void> {
    this.user.set(await this.authservice.getUserDetails());
    console.log(this.user());
  }
}
