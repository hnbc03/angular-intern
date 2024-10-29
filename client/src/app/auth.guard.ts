import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const userRole = authService.getUserRole();

    const expectedRole = route.data['expectedRole'];

    if (expectedRole && userRole !== expectedRole) {
      console.log("Không có quyền truy cập");
      router.navigate(['/access-denied']);
      return false;
    }

    return true;
  } else {
    console.log("Chuyển về trang đăng nhập");
    router.navigate(['/login']);
    return false;
  }
};
