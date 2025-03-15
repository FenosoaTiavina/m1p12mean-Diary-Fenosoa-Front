import { CanActivateChildFn,ActivatedRoute, Router} from '@angular/router';
import { UserService } from './services/user.service'
import { inject } from '@angular/core'

export const RoleGuard: CanActivateChildFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  userService.getCurrentUser().subscribe(val => {
    if (val.role_id.role_name === 'client' && router.url.split('/')[1] !== 'client') {
      router.navigateByUrl('/client')
      return true;
    }

    if (val.role_id.role_name === 'manager' && router.url.split('/')[1] !== 'manager') {
      router.navigateByUrl('/manager')
      return true;
    }

    if (val.role_id.role_name === 'mechanics' && router.url.split('/')[1] !== 'mechanics') {
      router.navigateByUrl('/mechanics')
      return true;
    }
    return false;

  })
  return true;
};
