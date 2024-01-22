import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../../Services/Auth.service';
import { UserResponseDto } from '../../Modals/Dtos/userDto';
import { USER_ROOLS } from '../../Modals/Enum/USER_ROOLS';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.css',
})
export class HeaderComponent {
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private router: Router, private authservice: AuthService) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // async ngOnInit(): Promise<void> {
  //   this.user.set(await this.authservice.getUserDetails());
  //   console.log(this.user());
  // }

  // user = signal<UserResponseDto>({
  //   email: '',
  //   firstName: '',
  //   rools: [],
  //   lastName: '',
  //   userID: 0,
  //   username: '',
  // } as UserResponseDto);

  // getUserRool(): string {
  //   const userRools = this.user().rools.map((rool) => {
  //     return rool.toLowerCase();
  //   });
  //   switch (true) {
  //     case userRools.includes(USER_ROOLS.Admin.toLocaleLowerCase()):
  //       return USER_ROOLS.Admin;
  //     case userRools.includes(USER_ROOLS.Moderator.toLocaleLowerCase()):
  //       return USER_ROOLS.Moderator;
  //     default:
  //       return USER_ROOLS.User;
  //   }
  // }
}
