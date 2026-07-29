import { Injectable, computed, signal } from '@angular/core';

export interface ProfileUser {
  name: string;
}

export interface Order {
  product: string;
  variant: string;
  orderId: string;
  status: 'In Transit' | 'Delivered';
  total: string;
}

export interface PaymentMethod {
  id: string;
  brand: 'Visa' | 'Mastercard' | 'Amex';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  isDefault: boolean;
}

export interface NewPaymentMethodInput {
  cardholderName: string;
  cardNumber: string;
  expiry: string; // MM/YY
  cvv: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly userSignal = signal<ProfileUser>({
    name: 'John Cena',
  });
  readonly user = this.userSignal.asReadonly();

  private readonly ordersSignal = signal<Order[]>([
    { product: 'Premium Leather Tote', variant: 'Black / Medium', orderId: '#LX-99201', status: 'In Transit', total: '$299.00' },
    { product: 'Heritage Low-Top', variant: 'White / 42', orderId: '#LX-98443', status: 'Delivered', total: '$185.00' },
    { product: 'Chronos Series 3', variant: 'Space Grey / 40mm', orderId: '#LX-97002', status: 'Delivered', total: '$450.00' },
  ]);
  readonly orders = this.ordersSignal.asReadonly();

  private readonly paymentMethodsSignal = signal<PaymentMethod[]>([
    {
      id: 'pm-1',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: '08',
      expiryYear: '27',
      cardholderName: 'John CantSeeMe Cena',
      isDefault: true,
    },
    {
      id: 'pm-2',
      brand: 'Mastercard',
      last4: '8390',
      expiryMonth: '11',
      expiryYear: '26',
      cardholderName: 'John CantSeeMe Cena',
      isDefault: false,
    },
  ]);
  readonly paymentMethods = this.paymentMethodsSignal.asReadonly();

  readonly preferredPaymentMethod = computed(
    () => this.paymentMethodsSignal().find((m) => m.isDefault) ?? this.paymentMethodsSignal()[0] ?? null,
  );

  setDefaultPaymentMethod(id: string): void {
    this.paymentMethodsSignal.set(
      this.paymentMethodsSignal().map((m) => ({ ...m, isDefault: m.id === id })),
    );
  }

  removePaymentMethod(id: string): void {
    const wasDefault = this.paymentMethodsSignal().find((m) => m.id === id)?.isDefault;
    const remaining = this.paymentMethodsSignal().filter((m) => m.id !== id);

    if (wasDefault && remaining.length > 0) {
      remaining[0] = { ...remaining[0], isDefault: true };
    }

    this.paymentMethodsSignal.set(remaining);
  }

  addPaymentMethod(input: NewPaymentMethodInput): string | null {
    const digitsOnly = input.cardNumber.replace(/\s+/g, '');
    const expiryMatch = /^(\d{2})\/(\d{2})$/.exec(input.expiry.trim());

    if (!input.cardholderName.trim()) {
      return 'Cardholder name is required.';
    }
    if (!/^\d{13,19}$/.test(digitsOnly)) {
      return 'Enter a valid card number.';
    }
    if (!expiryMatch) {
      return 'Enter expiry as MM/YY.';
    }
    if (!/^\d{3,4}$/.test(input.cvv.trim())) {
      return 'Enter a valid CVV.';
    }

    const current = this.paymentMethodsSignal();
    this.paymentMethodsSignal.set([
      ...current,
      {
        id: `pm-${Date.now()}`,
        brand: this.detectBrand(digitsOnly),
        last4: digitsOnly.slice(-4),
        expiryMonth: expiryMatch[1],
        expiryYear: expiryMatch[2],
        cardholderName: input.cardholderName.trim(),
        isDefault: current.length === 0,
      },
    ]);

    return null;
  }

  private detectBrand(digits: string): PaymentMethod['brand'] {
    if (digits.startsWith('34') || digits.startsWith('37')) return 'Amex';
    if (digits.startsWith('5')) return 'Mastercard';
    return 'Visa';
  }
}