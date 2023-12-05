import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/mainPage/main.component';
import { PostViewComponent } from './Components/PostView/PostView.component';
import { authGuardGuard } from './routes/AuthGuard.guard';
import { LoginComponent } from './pages/LoginPage/Login.component';
import { RegisterComponent } from './pages/registerPage/register.component';
import { PostListPageComponent } from './Pages/PostListPage/PostListPage.component';

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
