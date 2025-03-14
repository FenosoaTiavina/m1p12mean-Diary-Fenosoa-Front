import { Injectable , inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  constructor(private router: Router) {}
  canActivate(): boolean {
    console.log('Guard');
    this.authService.verify().subscribe(val => {
      if (val.ok === false) {
        this.router.navigateByUrl('/authentication/login')
      }
    })
    return true;
  }
}
