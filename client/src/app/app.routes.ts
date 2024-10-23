import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/homepage' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'homepage', component: HomepageComponent, canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    ]
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '**', redirectTo: '' }
];
