import { Component, OnInit, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';
import { UserRequestDto, UserResponseDto } from '../../Modals/Dtos/userDto';
import { MatChipsModule } from '@angular/material/chips';
import { PostComponent } from '../../Components/PostComponents/Post/Post.component';
import {MatMenuModule} from '@angular/material/menu';
import { SideBarComponent } from '../../Components/sideBar/sideBar.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    SideBarComponent,
    MatMenuModule,
    MatChipsModule,
    MatIconModule,
    RouterLink,
    PostComponent,
    RouterOutlet,
    AsyncPipe,
  ],
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private authservice: AuthService) {}
  async ngOnInit(): Promise<void> {
    this.user.set(await this.authservice.getUserDetails());
    console.log(this.user().email)
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  user= signal<UserRequestDto>({firstName:"",lastName:"",username:"",rools:[],email:""}) ;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
