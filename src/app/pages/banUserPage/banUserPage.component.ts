import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-ban-user-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatNativeDateModule,
  ],
  templateUrl: './banUserPage.component.html',
  styleUrl: './banUserPage.component.css',
})
export class BanUserPageComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
