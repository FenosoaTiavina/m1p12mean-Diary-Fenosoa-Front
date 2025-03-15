import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { AppointementComponent } from './appointement/appointement.component'
import { CarsComponent } from './cars/cars.component'

export const PagesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'cars',
        component: CarsComponent,
      },
      {
        path: 'appointement',
        component: AppointementComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      }
    ],

  },
];
