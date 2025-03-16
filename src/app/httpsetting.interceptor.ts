import { HttpInterceptorFn , HttpHeaders} from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const HttpSettingInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService);
  const auth_bearer = cookie.get("accessToken");
  console.log(auth_bearer);

  const authReq = req.clone({
    withCredentials: true,
    headers: new HttpHeaders({
      'Authorization': `bearer ${auth_bearer}`
    })
  });
  return next(authReq);
};
