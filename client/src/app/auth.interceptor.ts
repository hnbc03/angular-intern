import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = new AuthService();
  const token = authService.getToken();

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedReq);
  }

  return next(req);
};
