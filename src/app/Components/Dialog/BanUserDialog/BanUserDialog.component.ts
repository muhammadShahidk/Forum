import { CommonModule, JsonPipe } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import {
  BannedUserRequestDTO,
  BannedUserResponceDTO,
  bandUserStatus,
} from '../../../Modals/Dtos/BandUserDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BannedUsersService } from '../../../Services/BannedUsers.service';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePickerComponent } from '../../DatePicker/DatePicker.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HistoryItemComponent } from '../../HistoryItem/HistoryItem.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { provideNativeDateAdapter } from '@angular/material/core';
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-ban-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    HistoryItemComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
  ],
  templateUrl: './BanUserDialog.component.html',
  styleUrl: './BanUserDialog.component.css',
})
export class BanUserDialogComponent implements OnInit {
  async UnBanUser() {
    try {
      const result = await this.bannedUsersService.UnBanUser(this.User.userId);
      console.log('unBanning user result');
      console.log(result);
      this.isBanned = false;
    } catch (error) {
      console.log(error);
    }
  }
  onDateChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  async BanUser() {
    const banRequest: BannedUserRequestDTO = {
      userId: this.User.userId,
      startDate: this.range.value.start ?? new Date(),
      endDate: this.range.value.end ?? new Date(),
    };

    banRequest.endDate.setDate(banRequest.startDate.getDate() + 5);

    try {
      const result = await this.bannedUsersService.BanUser(banRequest);
      console.log('baning user result');
      console.log(result);
      this.isBanned = true;
    } catch (error) {
      console.log(error);
      this.isBanned = false;
    }
  }
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  User: bandUserStatus = { status: 0, userId: '', userName: '' };
  isBanned = false;
  userHistory: BannedUserResponceDTO[] = [];
  private fb = inject(FormBuilder);

  banStatusForm = this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    status: [null, Validators.required],
  });
  dateRange = this.fb.group({
    start: new Date(year, month, 13),
    end: new Date(year, month, 16),
  });

  changeStatus = new FormControl('', Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { User: bandUserStatus },
    private bannedUsersService: BannedUsersService
  ) {
    this.User = data.User;
    this.isBanned = this.User.status === 1 ? true : false;
  }

  async ngOnInit(): Promise<void> {
    await this.Inintilize();
  }
  async Inintilize() {
    const userHistory = await this.bannedUsersService.GetBannedUserHistory(
      this.User.userId
    );

    this.userHistory = userHistory;

    // this.userHistory = userHistory.map((x) => {
    //   return {
    //     ...x,
    //     remainingDays: this.calculateRemainingDays(x.endDate),
    //     duration: this.calculateDuration(x.startDate, x.endDate),
    //     };
    // }
    // );

    console.log('user histroy');
    console.log(this.userHistory);
  }

  calculateRemainingDays(endDate: Date): number {
    // Implement logic to calculate remaining days
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateDuration(start: Date, end: Date): number {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    console.log('start date', startDateObj);
    console.log('end date', endDateObj);
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffInMilliseconds = Math.abs(
      endDateObj.getTime() - startDateObj.getTime()
    );
    return Math.round(diffInMilliseconds / oneDay);
  }
}

interface ExtendedBannedUserResponceDTO extends BannedUserResponceDTO {
  remainingDays: number;
  duration: number;
}
