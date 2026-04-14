import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  private readonly cartService = inject(CartService);

  readonly items = this.cartService.items;
  readonly total = computed(() =>
    this.items().reduce(
      (sum, entry) => sum + entry.product.price * entry.quantity,
      0
    )
  );

  remove(productId: string): void {
    this.cartService.removeProduct(productId);
  }

  clear(): void {
    this.cartService.clear();
  }
}
