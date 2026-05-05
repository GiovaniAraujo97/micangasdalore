import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly products: Product[] = [
    {
      id: 'p1',
      name: 'Perolas Doce',
      category: 'Coloridas',
      price: 6.9,
      images: [
        '/bracelets/coloridas/perolas-doce.jpg',
        '/bracelets/coloridas/perolas-doce2.jpg',
        '/bracelets/coloridas/perolas-doce3.jpg'
      ]
    },
    {
      id: 'p2',
      name: 'Perolas Flor',
      category: 'Coloridas',
      price: 7,
      images: [
        '/bracelets/coloridas/perolas-flor.jpg',
        '/bracelets/coloridas/perolas-flor2.jpg',
        '/bracelets/coloridas/perolas-flor3.jpg'
      ]
    },
    {
      id: 'p3',
      name: 'Perolas Star',
      category: 'Coloridas',
      price: 8.5,
      images: [
        '/bracelets/coloridas/perolas-star.jpg',
        '/bracelets/coloridas/perolas-star2.jpg',
        '/bracelets/coloridas/perolas-star3.jpg'
      ]
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
