import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/LoginPage/Login.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { WetherForcastComponent } from "./Components/WetherForcast/WetherForcast.component";
import { MainComponent } from './pages/mainPage/main.component';
import { HomePageComponent } from './pages/HomePage/HomePage.component';
import { LoginRegisterNavComponent } from './Components/LoginRegisterNav/LoginRegisterNav.component';
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
    ]
})
export class AppComponent {
  UpdateNumber() {
    this.number.update((value) => value + 1);
    this.mystate.set(this.number() + 2);
  }
  title = 'Forum';
  mystate = signal(0);
  cal = computed(() => {
    if (this.number() > 10) {
      this.mystate() + 2;
    } else {
      this.mystate() + 1;
    }
  });

  number = signal(0);
}
