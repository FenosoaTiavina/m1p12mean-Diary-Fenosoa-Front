import { CanActivateFn , Router} from '@angular/router';
import { UserService } from './services/user.service'
import { inject } from '@angular/core'

export const RoleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  userService.getCurrentUser().subscribe(val => {
    const current_route = state.url.replace("/","")
    if (val.role_id.role_name == current_route) {
      return true;
    }
    router.navigateByUrl(`/${val.role_id.role_name}`)
    return true
  })
  return true;
};
