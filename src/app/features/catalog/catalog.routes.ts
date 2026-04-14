import { Routes } from '@angular/router';

export const catalogRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/catalog-page.component').then(m => m.CatalogPageComponent)
  }
];
