import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-page.component').then(m => m.ProductPageComponent)
  }
];
