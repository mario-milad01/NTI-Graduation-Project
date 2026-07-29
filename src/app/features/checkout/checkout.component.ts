import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface OrderLineItem {
  name: string;
  variant: string;
  price: number;
  imageUrl: string;
}

type DeliveryMethod = 'standard' | 'priority';
type PaymentMethod = 'card' | 'apple-pay' | 'g-pay';

const SUBTOTAL = 1700.0;
const TAXES = 136.0;
const SHIPPING_COST: Record<DeliveryMethod, number> = {
  standard: 0,
  priority: 25.0,
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);

  orderItems: OrderLineItem[] = [
    {
      name: 'Luxe Chrono Limited',
      variant: 'Titanium / 42mm',
      price: 1250.0,
      imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=120&h=120&fit=crop',
    },
    {
      name: 'Signature Headphones',
      variant: 'Matte Silver',
      price: 450.0,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop',
    },
  ];

  contactForm = this.fb.nonNullable.group({
    email: ['alex@example.com', [Validators.required, Validators.email]],
    updates: [false],
  });

  shippingForm = this.fb.nonNullable.group({
    firstName: ['Alex', [Validators.required]],
    lastName: ['Morgan', [Validators.required]],
    streetAddress: ['123 Luxury Ave, Apt 4', [Validators.required]],
    city: ['New York', [Validators.required]],
    postalCode: ['10001', [Validators.required]],
  });

  cardForm = this.fb.nonNullable.group({
    cardNumber: ['', [Validators.required]],
    expiry: ['', [Validators.required]],
    cvv: ['', [Validators.required]],
  });

  promoCode = signal('');
  deliveryMethod = signal<DeliveryMethod>('standard');
  paymentMethod = signal<PaymentMethod>('card');
  isSubmitting = signal(false);

  subtotal = signal(SUBTOTAL);
  taxes = signal(TAXES);

  shippingCost = computed(() => SHIPPING_COST[this.deliveryMethod()]);

  orderTotal = computed(() => this.subtotal() + this.taxes() + this.shippingCost());

  selectDeliveryMethod(method: DeliveryMethod): void {
    this.deliveryMethod.set(method);
  }

  selectExpressPayment(method: 'apple-pay' | 'g-pay'): void {
    this.paymentMethod.set(method);
  }

  selectCardPayment(): void {
    this.paymentMethod.set('card');
  }

  onCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
    this.cardForm.controls.cardNumber.setValue(formatted, { emitEvent: false });
  }

  onExpiryInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) digits = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    this.cardForm.controls.expiry.setValue(digits, { emitEvent: false });
  }

  onCvvInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 4);
    this.cardForm.controls.cvv.setValue(digits, { emitEvent: false });
  }

  applyPromoCode(): void {
    // TODO: connect to your backend promo validation
    console.log('Promo code applied:', this.promoCode());
  }

  completePurchase(): void {
    this.contactForm.markAllAsTouched();
    this.shippingForm.markAllAsTouched();

    if (this.contactForm.invalid || this.shippingForm.invalid) {
      return;
    }

    if (this.paymentMethod() === 'card') {
      this.cardForm.markAllAsTouched();
      if (this.cardForm.invalid) return;
    }

    this.isSubmitting.set(true);

    const order = {
      contact: this.contactForm.getRawValue(),
      shipping: this.shippingForm.getRawValue(),
      deliveryMethod: this.deliveryMethod(),
      paymentMethod: this.paymentMethod(),
      card: this.paymentMethod() === 'card' ? this.cardForm.getRawValue() : null,
      total: this.orderTotal(),
    };

    // TODO: connect to your payment processing endpoint
    console.log('Order submitted:', order);

    this.isSubmitting.set(false);
  }
}
