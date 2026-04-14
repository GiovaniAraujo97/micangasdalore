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

  readonly selectedPayment = signal<'pix' | 'cash'>('pix');
  readonly isConfirmed = signal(false);
  readonly whatsappNumber = '5511951010254';
  readonly deliveryMethod = signal<'pickup' | 'delivery'>('pickup');
  readonly changeFor = signal('');
  readonly address = signal('');

  readonly items = this.cartService.items;
  readonly total = computed(() =>
    this.items().reduce(
      (sum, entry) => sum + entry.product.price * entry.quantity,
      0
    )
  );

  readonly canConfirm = computed(() => {
    if (this.deliveryMethod() === 'delivery') {
      return this.address().trim().length > 0;
    }

    return true;
  });

  readonly whatsappLink = computed(() => {
    const itemsText = this.items()
      .map(entry => {
        const personal = entry.personalizationName
          ? ` | Nome: ${entry.personalizationName}`
          : '';
        const image = entry.selectedImage ? ` | Foto: ${entry.selectedImage}` : '';
        return `- ${entry.product.name} x${entry.quantity}${personal}${image}`;
      })
      .join('\n');
    const paymentLabel = this.selectedPayment() === 'pix' ? 'Pix' : 'Dinheiro';
    const deliveryLabel = this.deliveryMethod() === 'pickup' ? 'Retirada' : 'Entrega';
    const changeNote =
      this.selectedPayment() === 'cash' && this.changeFor().trim()
        ? ` Troco para: ${this.changeFor().trim()}.`
        : '';
    const addressNote =
      this.deliveryMethod() === 'delivery' && this.address().trim()
        ? ` Endereco: ${this.address().trim()}.`
        : '';
    const message = `Oi! Quero confirmar meu pedido.\n\nItens:\n${itemsText}\n\nTotal: ${
      this.total()
    }\nPagamento: ${paymentLabel}.${changeNote}\nEntrega: ${deliveryLabel}.${addressNote}`;

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  });

  selectPayment(method: 'pix' | 'cash'): void {
    this.selectedPayment.set(method);
  }

  confirmOrder(): void {
    this.isConfirmed.set(true);
  }

  selectDelivery(method: 'pickup' | 'delivery'): void {
    this.deliveryMethod.set(method);
  }
}
