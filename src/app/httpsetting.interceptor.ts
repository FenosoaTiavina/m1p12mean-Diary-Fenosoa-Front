import { HttpInterceptorFn , HttpHeaders} from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const HttpSettingInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService);
  const authReq = req.clone({
    withCredentials: true,
    headers: new HttpHeaders({
      'Authorization': `bearer ${cookie.get("accessToken")} `
    })
  });
  return next(authReq);
};
