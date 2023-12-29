import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerComponent } from '../../Components/DatePicker/DatePicker.component';
import { IDateRange } from '../../Interfaces/IRange';
import { BannedUsersService } from '../../Services/BannedUsers.service';
import { BannedUserResponceDTO } from '../../Modals/Dtos/BandUserDto';
import { MatTableModule } from '@angular/material/table';
import { BandUsersListComponent } from '../../Components/band-users-list/band-users-list.component';
import { BandUserComponent } from '../../Components/BandUser/BandUser.component';

@Component({
  selector: 'app-ban-user-page',
  standalone: true,
  imports: [
    CommonModule,
    // custom component
    BandUserComponent,
    // mat components
    MatFormFieldModule,
    DatePickerComponent,
    MatTableModule,
  ],
  templateUrl: './banUserPage.component.html',
  styleUrl: './banUserPage.component.css',
})
export class BanUserPageComponent implements OnInit {
  bannedUsers: BannedUserResponceDTO[] = []; // Replace 'any' with the actual type of your banned users data

  constructor(private bannedUsersService: BannedUsersService) {}

  async ngOnInit(): Promise<void> {
    // Fetch the banned users data from your service
    this.bannedUsers = await this.bannedUsersService.GetAllBannedUsers(); // Replace with the actual method
  }
  NewDate($event: IDateRange) {
    console.log($event);
  }
}
