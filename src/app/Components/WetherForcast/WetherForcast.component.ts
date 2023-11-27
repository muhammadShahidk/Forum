import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-wether-forcast',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './WetherForcast.component.html',
  styleUrl: './WetherForcast.component.css',
})
export class WetherForcastComponent {
items: any;
}
