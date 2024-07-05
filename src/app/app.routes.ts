import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component'),
  },
  // {
  //   path: 'list/:identifier',
  //   loadComponent: () =>
  //     import('./pages/entity-list-page/entity-list-page.component')
  // },
  // {
  //   path: 'detail/:identifier',
  //   loadComponent: () =>
  //     import('./pages/entity-detail-page/entity-detail-page.component'),
  // },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component'),
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];
