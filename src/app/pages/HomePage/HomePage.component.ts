import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

  ],
  templateUrl: './HomePage.component.html',
  styleUrl: './HomePage.component.css',
})
export class HomePageComponent { }
