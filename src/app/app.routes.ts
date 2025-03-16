import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';


export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'client',
        canActivate: [AuthGuard , RoleGuard],
        loadChildren: () =>
          import('./pages/client/clients.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'manager',
        canActivate: [AuthGuard , RoleGuard],
        loadChildren: () =>
          import('./pages/manager/manager.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'mechanics',
        canActivate: [AuthGuard , RoleGuard],
        loadChildren: () =>
          import('./pages/mechanics/mechanics.routes').then((m) => m.PagesRoutes),
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
    redirectTo: ''  },

];
