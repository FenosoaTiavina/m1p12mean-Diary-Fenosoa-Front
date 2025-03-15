import { CanActivateChildFn, Router} from '@angular/router';
import { AuthService } from './services/auth.service'
import { inject } from '@angular/core'

export const AuthGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.verify().subscribe(val => {
    if (val.ok === false) {
      router.navigateByUrl('/authentication/login')
    }
  })
return true;
};
