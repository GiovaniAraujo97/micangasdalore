import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CartService } from '../../../core/services/cart.service';
import { CatalogService } from '../../../core/services/catalog.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  private readonly catalogService = inject(CatalogService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly productId = signal(this.route.snapshot.paramMap.get('id'));
  personalizationName = '';
  private readonly selectedImage = signal<string | null>(null);
  quantity = 1;

  readonly product = computed<Product | null>(() => {
    const id = this.productId();
    if (!id) {
      return null;
    }

    return this.catalogService.getProducts().find(item => item.id === id) ?? null;
  });

  readonly displayImage = computed(() => {
    const item = this.product();
    if (!item) {
      return '';
    }

    return this.selectedImage() ?? item.images[0] ?? '';
  });

  selectImage(image: string): void {
    this.selectedImage.set(image);
  }

  increaseQuantity(): void {
    this.quantity += 1;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addToCart(): void {
    const item = this.product();

    if (!item) {
      return;
    }

    const image = this.selectedImage() ?? item.images[0] ?? '';
    this.cartService.addProduct(item, this.quantity, this.personalizationName, image);
    this.router.navigate(['/cart']);
  }
}
