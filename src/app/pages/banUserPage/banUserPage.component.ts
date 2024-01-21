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
import { BannedStatus, bandUserStatus } from '../../Modals/Dtos/BandUserDto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BandUsersListComponent } from '../../Components/band-users-list/band-users-list.component';
import { BandUserComponent } from '../../Components/BandUser/BandUser.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BanUserDialogComponent } from '../../Components/Dialog/BanUserDialog/BanUserDialog.component';

@Component({
  selector: 'app-ban-user-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './banUserPage.component.html',
  styleUrl: './banUserPage.component.css',
})
export class BanUserPageComponent implements OnInit {
  Change(user: bandUserStatus) {
    const dialogRef = this.dialog.open(BanUserDialogComponent, {
      data: {
        User:user,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await this.Initilize();
    });
  }


  bannedUsers: bandUserStatus[] = []; // Replace 'any' with the actual type of your banned users data
  displayedColumns: string[] = ['userName', 'status', 'action'];
  dataSource = new MatTableDataSource([
    { status: 0, userId: '', userName: '' },
  ] as bandUserStatus[]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private bannedUsersService: BannedUsersService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    // Fetch the banned users data from your service
    await this.Initilize();
  }
  private async Initilize() {
    this.bannedUsers = await this.bannedUsersService.GetAllBannedUsers(); // Replace with the actual method
    this.dataSource.data = this.bannedUsers.map((x) => {
      return {
        ...x,
        statusText: BannedStatus[x.status],
      };
    });
    console.log('bannedUsers');
    console.log(this.bannedUsers);
  }

  NewDate($event: IDateRange) {
    console.log($event);
  }
}
