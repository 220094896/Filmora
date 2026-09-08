import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { MoviesComponent } from './pages/movies/movies.component';

import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';

import { CartComponent } from './pages/cart/cart.component';

import { RentalsComponent } from './pages/rentals/rentals.component';

import { AdminComponent } from './pages/admin/admin.component';

import { authGuard } from './core/guards/auth.guard';

import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'movies',
    component: MoviesComponent,
  },

  {
    path: 'movies/:id',
    component: MovieDetailComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
  },

  {
    path: 'rentals',
    component: RentalsComponent,
    canActivate: [authGuard],
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
