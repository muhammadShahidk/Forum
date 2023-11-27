import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forum',
    component: MainComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
