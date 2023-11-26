import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { single } from 'rxjs';
import { LoginComponent } from "./Components/Login/Login.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, LoginComponent]
})
export class AppComponent {
  UpdateNumber() {
    this.number.update((value)=>value+1);
    this.mystate.set(this.number() + 2);
  }
  title = 'Forum';
  mystate = signal(0);
  cal = computed(() => {
    if(this.number() > 10){
      this.mystate() + 2;

    }
    else{
      this.mystate() + 1;
    }
  });

  number = signal(0);
}
