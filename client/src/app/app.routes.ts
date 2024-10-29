import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './shared/guards/auth.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/homepage' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'homepage', component: HomepageComponent, canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard], data: { expectedRole: 'user' } },
    ]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  { path: '**', redirectTo: '/homepage' }
];
