import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-register-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonToggleModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    

  ],
  templateUrl: './LoginRegisterNav.component.html',
  styleUrl: './LoginRegisterNav.component.css',
})
export class LoginRegisterNavComponent { }
