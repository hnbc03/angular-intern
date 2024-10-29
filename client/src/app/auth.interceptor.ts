import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';

// List api không gắn token vào
const excludedUrls = ['/api/login', '/api/register'];

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Không gắn token vào list api loại trừ
  const isExcluded = excludedUrls.some(url => req.url.includes(url));
  if (isExcluded) {
    return next(req);
  }

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Xử lý khi token hết hạn
  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        const refreshToken = authService.getRefreshToken();
        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((newToken: string) => {
              authService.setToken(newToken);
              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next(newAuthReq);
            }),
            catchError(refreshError => {
              authService.logout();
              return throwError(() => new Error(refreshError));
            })
          );
        } else {
          authService.logout();
        }
      }
      return throwError(() => new Error(error));
    })
  );
};
