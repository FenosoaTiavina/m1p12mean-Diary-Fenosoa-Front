import { Injectable , inject } from '@angular/core';
import { CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {

  private authService = inject(AuthService);
  constructor(private router: Router) {}
  canActivate(): boolean {
    this.authService.verify().subscribe(val => {
      console.log(val);
      if (val.ok === false) {
        this.router.navigateByUrl('/authentication/login')
      }
    })
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.authService.verify().subscribe(val => {
      console.log(val);
      if (val.ok === false) {
        this.router.navigateByUrl('/authentication/login')
      }
    })
    return true;
  }
}
