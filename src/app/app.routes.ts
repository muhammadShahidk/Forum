import { Routes } from '@angular/router';
import { LoginComponent } from './pages/LoginPage/Login.component';
import { RegisterComponent } from './pages/registerPage/register.component';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/mainPage/main.component';
import { HomePageComponent } from './pages/HomePage/HomePage.component';
import { PostViewComponent } from './Components/PostView/PostView.component';
import { PostListPageComponent } from './pages/PostListPage/PostListPage.component';
import { authGuardGuard } from './routes/AuthGuard.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
    canActivate: [authGuardGuard],
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
    canActivate: [authGuardGuard],
    children: [
      {
        path: 'PostDetails/:id',
        component: PostViewComponent,
      },
      {
        path: 'posts',
        component: PostListPageComponent,
      },
    ]
  },
  
  { path: '', redirectTo: '/forum/posts', pathMatch: 'full' },
];
