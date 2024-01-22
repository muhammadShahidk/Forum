import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './Input.component.html',
  styleUrl: './Input.component.css',
})
export class InputComponent { }
