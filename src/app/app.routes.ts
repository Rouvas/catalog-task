import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component')
      .then(c => c.UsersComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/user/user.component')
      .then(c => c.UserComponent)
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];
