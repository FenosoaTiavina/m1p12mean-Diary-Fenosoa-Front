import { HttpInterceptorFn } from '@angular/common/http';

export const HttpSettingInterceptor: HttpInterceptorFn = (req, next) => {
<<<<<<< ours
  const authReq = req.clone({
    withCredentials: true
=======
  const cookieService = inject(CookieService);
  const cookie = cookieService.getAll()
  const x_cookie = `accessToken=${cookie["accessToken"]}; refreshToken=${cookie["refreshToken"]}`;
  const authReq = req.clone({
    withCredentials: true,
    headers: new HttpHeaders({
      'Authorization': `bearer ${cookie["accessToken"]}`,
      'x-cookie': x_cookie,
    })
>>>>>>> theirs
  });

  return next(authReq);
};
