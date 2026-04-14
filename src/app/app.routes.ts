import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./features/catalog/catalog.routes').then(m => m.catalogRoutes)
	},
	{
		path: 'product/:id',
		loadChildren: () =>
			import('./features/product/product.routes').then(m => m.productRoutes)
	},
	{
		path: 'cart',
		loadChildren: () =>
			import('./features/cart/cart.routes').then(m => m.cartRoutes)
	},
	{
		path: 'checkout',
		loadChildren: () =>
			import('./features/checkout/checkout.routes').then(m => m.checkoutRoutes)
	},
	{ path: '**', redirectTo: '' }
];
