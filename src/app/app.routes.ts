import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/client',
        pathMatch: 'full',
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./pages/client/clients.routes').then((m) => m.PagesRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: () => {
      const auth = inject(AuthService);
      let redirect_route = 'auth/login'
      auth.verify().subscribe((response : any) => {
          console.log('response', response);
      });
      return redirect_route;
    },
  },

];
