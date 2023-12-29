import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output, computed, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IDateRange } from '../../Interfaces/IRange';
import { single } from 'rxjs';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  templateUrl: './DatePicker.component.html',
  styleUrl: './DatePicker.component.css',
})
export class DatePickerComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  @Output() OndateRange: EventEmitter<IDateRange> =
    new EventEmitter<IDateRange>();

  UpdateRange(){
    this.OndateRange.emit({
      startDate: this.range.value.start??new Date(),
      endDate: this.range.value.end??new Date(),
    });
  }
}
