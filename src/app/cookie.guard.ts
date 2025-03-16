import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';

export const CookieGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  return true;
};
