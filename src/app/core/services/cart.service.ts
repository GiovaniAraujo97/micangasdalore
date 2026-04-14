import { Injectable, signal } from '@angular/core';

import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>([]);
  readonly items = this.itemsSignal.asReadonly();

  addProduct(product: Product, quantity = 1, personalizationName = ''): void {
    if (quantity <= 0) {
      return;
    }

    const normalizedName = personalizationName.trim();
    const items = this.itemsSignal();
    const existing = items.find(
      item =>
        item.product.id === product.id &&
        (item.personalizationName ?? '') === normalizedName
    );

    if (existing) {
      this.itemsSignal.update(current =>
        current.map(item =>
          item.product.id === product.id &&
          (item.personalizationName ?? '') === normalizedName
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      return;
    }

    this.itemsSignal.update(current => [
      ...current,
      { product, quantity, personalizationName: normalizedName || undefined }
    ]);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    this.itemsSignal.update(current =>
      current.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  removeProduct(productId: string): void {
    this.itemsSignal.update(current =>
      current.filter(item => item.product.id !== productId)
    );
  }

  clear(): void {
    this.itemsSignal.set([]);
  }
}
