import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './sideBar.component.html',
  styleUrl: './sideBar.component.css',
})
export class SideBarComponent { }
