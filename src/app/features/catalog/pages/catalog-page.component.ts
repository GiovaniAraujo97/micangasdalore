import { Component, computed, inject, signal } from '@angular/core';

import { CatalogService } from '../../../core/services/catalog.service';
import { CategoryFilterComponent } from '../components/category-filter.component';
import { ProductCardComponent } from '../components/product-card.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CategoryFilterComponent, ProductCardComponent],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.scss'
})
export class CatalogPageComponent {
  private readonly catalogService = inject(CatalogService);

  private readonly productsSignal = signal(this.catalogService.getProducts());
  readonly selectedCategory = signal('Todas');

  readonly categories = computed(() => {
    const categories = this.productsSignal().map(product => product.category);
    return ['Todas', ...Array.from(new Set(categories))];
  });

  readonly visibleProducts = computed(() => {
    const selected = this.selectedCategory();
    const products = this.productsSignal();

    if (selected === 'Todas') {
      return products;
    }

    return products.filter(product => product.category === selected);
  });
}
