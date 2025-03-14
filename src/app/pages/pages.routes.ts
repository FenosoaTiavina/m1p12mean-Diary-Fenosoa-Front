import { Routes } from '@angular/router';
import { ClientComponent } from './client/home/home.component.ts';

export const PagesRoutes: Routes = [
  {
    path: 'home',
    component: ClientComponent,
  },
];
