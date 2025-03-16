import { CanActivateChildFn , Router } from '@angular/router';
import { Injectable , inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const AuthGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.verify().subscribe(val => {
    console.log(val);
    if (val.ok === false) {
      router.navigateByUrl('/authentication/login')
    }
  })
  return true;
};
