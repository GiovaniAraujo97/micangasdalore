import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent {
  private readonly cartService = inject(CartService);
  private readonly moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  readonly selectedPayment = signal<'pix' | 'cash'>('pix');
  readonly isConfirmed = signal(false);
  readonly whatsappNumber = '5511951010254';
  readonly changeFor = signal('');

  readonly items = this.cartService.items;
  readonly total = computed(() =>
    this.items().reduce(
      (sum, entry) => sum + entry.product.price * entry.quantity,
      0
    )
  );

  readonly canConfirm = computed(() => true);

  readonly whatsappLink = computed(() => {
    const toCurrency = (value: number): string => this.moneyFormatter.format(value);
    const parseMoneyInput = (value: string): number | null => {
      const normalized = value.replace(/\./g, '').replace(',', '.').trim();
      if (!normalized) {
        return null;
      }

      const parsed = Number(normalized);
      return Number.isFinite(parsed) ? parsed : null;
    };
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    const itemsText = this.items()
      .map(entry => {
        const personal = entry.personalizationName
          ? ` | Nome: ${entry.personalizationName}`
          : '';
        const selectedImage = entry.selectedImage || entry.product.images[0] || '';
        const fullImageUrl = selectedImage
          ? selectedImage.startsWith('http')
            ? selectedImage
            : `${baseUrl}${selectedImage}`
          : '';
        const image = fullImageUrl ? ` | Foto: ${fullImageUrl}` : '';
        const itemTotal = entry.product.price * entry.quantity;
        return `- ${entry.product.name} x${entry.quantity} (${toCurrency(itemTotal)})${personal}${image}`;
      })
      .join('\n');
    const paymentLabel = this.selectedPayment() === 'pix' ? 'Pix' : 'Dinheiro';
    const changeValue = parseMoneyInput(this.changeFor());
    const changeNote =
      this.selectedPayment() === 'cash' && this.changeFor().trim().length > 0
        ? ` Troco para: ${changeValue === null ? this.changeFor().trim() : toCurrency(changeValue)}.`
        : '';
    const message = `Oi! Quero confirmar meu pedido.\n\nItens:\n${itemsText}\n\nTotal: ${
      toCurrency(this.total())
    }\nPagamento: ${paymentLabel}.${changeNote}\nEntrega: a combinar pelo Whats.`;

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  });

  selectPayment(method: 'pix' | 'cash'): void {
    this.selectedPayment.set(method);
  }

  confirmOrder(): void {
    this.isConfirmed.set(true);
  }
}
