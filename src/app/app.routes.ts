import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/mainPage/main.component';
import { PostViewComponent } from './Components/PostComponents/PostView/PostView.component';
import { authGuardGuard } from './routes/AuthGuard.guard';
import { LoginComponent } from './pages/LoginPage/Login.component';
import { RegisterComponent } from './pages/registerPage/register.component';
import { PostListComponent } from './Components/PostComponents/PostList/PostList.component';
import { PostsComponent } from './Pages/PostsPage/PostsPage.component';
import { YourPostsComponent } from './Pages/YourPostsPage/YourPostsPage.component';
import { NewPostPageComponent } from './Pages/NewPostPage/NewPostPage.component';
import { ApprovalRequestPageComponent } from './Pages/ApprovalRequestPage/ApprovalRequestPage.component';
import { SettingsPageComponent } from './Pages/SettingsPage/SettingsPage.component';
import { FourOFourPageComponent } from './Pages/FourOFourPage/FourOFourPage.component';
import { PasswordResetPageComponent } from './Pages/PasswordResetPage/PasswordResetPage.component';
import { ForgotPassowrdPageComponent } from './Pages/forgotPassowrdPage/forgotPassowrdPage.component';
import { BanUserPageComponent } from './Pages/banUserPage/banUserPage.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'user/settings',
    component: SettingsPageComponent,
    canActivate: [authGuardGuard],
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
        component: PostsComponent,
      },
      {
        path: 'User/posts',
        component: YourPostsComponent,
      },
      {
        path: 'User/NewPost',
        component: NewPostPageComponent,
      },
      {
        path: 'User/ApprovalRequest',
        component: ApprovalRequestPageComponent,
      },
      {
        path: 'banuser',
        component: BanUserPageComponent,
      },
      {
        path: 'notFound',
        component: FourOFourPageComponent,
      },
    ],
  },
  // create password-reaset route with userid and token
  {
    path: 'reset-password',
    component: PasswordResetPageComponent,
  },
  // forgot password route
  {
    path: 'forgot-password',
    component: ForgotPassowrdPageComponent,
  },

  // create 404 page

  { path: '', redirectTo: '/forum/posts', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/forum/notFound',
  },
];
