import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  inject,
  ɵZoneAwareQueueingScheduler,
} from '@angular/core';
import {
  BannedUserResponceDTO,
  bandUserStatus,
} from '../../../Modals/Dtos/BandUserDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BannedUsersService } from '../../../Services/BannedUsers.service';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-ban-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,

    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,

    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
  ],
  templateUrl: './BanUserDialog.component.html',
  styleUrl: './BanUserDialog.component.css',
})
export class BanUserDialogComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  User: bandUserStatus = { status: 0, userId: '', userName: '' };
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
  }

  async ngOnInit(): Promise<void> {
    await this.Inintilize();
  }
  async Inintilize() {
    this.userHistory = await this.bannedUsersService.GetBannedUserHistory(
      this.User.userId
    );
  }

  calculateRemainingDays(endDate: Date): number {
    // Implement logic to calculate remaining days
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
