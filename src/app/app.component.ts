import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink } from '@angular/router';
import { LoginComponent } from "./Components/Login/Login.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WetherForcastComponent } from "./Components/WetherForcast/WetherForcast.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        LoginComponent,
        RouterLink,
        MatToolbarModule,
        MatIconModule,
        MatButtonToggleModule,
        WetherForcastComponent
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
