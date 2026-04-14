import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly products: Product[] = [
    {
      id: 'p1',
      name: 'Arco-iris doce',
      category: 'Coloridas',
      price: 12,
      images: ['/bracelets/coloridas/rainbow-1.jpg', '/bracelets/coloridas/rainbow-2.jpg']
    },
    {
      id: 'p2',
      name: 'Flor lilas',
      category: 'Coloridas',
      price: 10,
      images: ['/bracelets/coloridas/flower-1.jpg']
    },
    {
      id: 'p3',
      name: 'Meu nome em perolas',
      category: 'Nome Personalizado',
      price: 15,
      images: [
        '/bracelets/nome-personalizado/name-1.jpg',
        '/bracelets/nome-personalizado/name-2.jpg'
      ]
    },
    {
      id: 'p4',
      name: 'Cora de amizade',
      category: 'Amizade',
      price: 9,
      images: ['/bracelets/amizade/heart-1.jpg']
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
