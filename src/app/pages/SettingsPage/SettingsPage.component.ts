import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './SettingsPage.component.html',
  styleUrl: './SettingsPage.component.css',
})
export class SettingsPageComponent { }
