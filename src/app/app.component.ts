import { Component, OnDestroy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/LoginPage/Login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { WetherForcastComponent } from './Components/WetherForcast/WetherForcast.component';
import { MainComponent } from './pages/mainPage/main.component';
import { HomePageComponent } from './pages/HomePage/HomePage.component';
import { LoginRegisterNavComponent } from './Components/LoginRegisterNav/LoginRegisterNav.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ToastService } from './Services/Utl/Toast.service';
import { timeInterval } from 'rxjs';
import { MessageArchivedComponentComponent } from './Components/MessageArchivedComponent/MessageArchivedComponent.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    LoginComponent,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    WetherForcastComponent,
    MainComponent,
    RouterOutlet,
    LoginRegisterNavComponent,
  ],
})
export class AppComponent   {

  // UpdateNumber() {
  //   this.number.update((value) => value + 1);
  //   this.mystate.set(this.number() + 2);
  // }
  title = 'Forum';
  mystate = signal(0);
  toastStatus = computed(() => {
    if (this.toast.isOpen() == true) {
     this. _snackBar.openFromComponent(MessageArchivedComponentComponent, {
        data: 'some data',

      });
      // this.toast.isOpen.set(false);
      return true;
    } else {
      return false;
    }
  });

  number = signal(this.toast.isOpen);

  constructor(private toast: ToastService, private _snackBar: MatSnackBar) {
   
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
