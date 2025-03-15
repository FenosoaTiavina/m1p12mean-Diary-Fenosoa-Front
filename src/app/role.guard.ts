import { CanActivateFn } from '@angular/router';
import { UserService } from './services/user.service'
import { inject } from '@angular/core'

export const RoleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  userService.getCurrentUser().subscribe(val => {
    console.log(val);
    return true;
  })

  return true;
};
