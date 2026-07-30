import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AuthService } from '../features/auth/auth.service';

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

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface NewAddressInput {
  label: string;
  recipientName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

const ORDERS_KEY = 'shoppy-profile-orders';
const PAYMENT_METHODS_KEY = 'shoppy-profile-payment-methods';
const ADDRESSES_KEY = 'shoppy-profile-addresses';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly authService = inject(AuthService);

  readonly user = computed<ProfileUser>(() => {
    const authUser = this.authService.currentUser();
    return { name: authUser?.fullName ?? 'Guest' };
  });

  private readonly ordersSignal = signal<Order[]>(this.loadPersisted<Order>(ORDERS_KEY));
  readonly orders = this.ordersSignal.asReadonly();

  addOrders(newOrders: Order[]): void {
    this.ordersSignal.set([...newOrders, ...this.ordersSignal()]);
  }

  private readonly paymentMethodsSignal = signal<PaymentMethod[]>(
    this.loadPersisted<PaymentMethod>(PAYMENT_METHODS_KEY),
  );
  readonly paymentMethods = this.paymentMethodsSignal.asReadonly();

  readonly preferredPaymentMethod = computed(
    () =>
      this.paymentMethodsSignal().find((m) => m.isDefault) ??
      this.paymentMethodsSignal()[0] ??
      null,
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

  private readonly addressesSignal = signal<Address[]>(this.loadPersisted<Address>(ADDRESSES_KEY));
  readonly addresses = this.addressesSignal.asReadonly();

  readonly defaultAddress = computed(
    () => this.addressesSignal().find((a) => a.isDefault) ?? this.addressesSignal()[0] ?? null,
  );

  setDefaultAddress(id: string): void {
    this.addressesSignal.set(this.addressesSignal().map((a) => ({ ...a, isDefault: a.id === id })));
  }

  removeAddress(id: string): void {
    const wasDefault = this.addressesSignal().find((a) => a.id === id)?.isDefault;
    const remaining = this.addressesSignal().filter((a) => a.id !== id);

    if (wasDefault && remaining.length > 0) {
      remaining[0] = { ...remaining[0], isDefault: true };
    }

    this.addressesSignal.set(remaining);
  }

  addAddress(input: NewAddressInput): string | null {
    if (!input.recipientName.trim()) {
      return 'Recipient name is required.';
    }
    if (!input.line1.trim()) {
      return 'Address line 1 is required.';
    }
    if (!input.city.trim()) {
      return 'City is required.';
    }
    if (!input.state.trim()) {
      return 'State is required.';
    }
    if (!input.postalCode.trim()) {
      return 'Postal code is required.';
    }
    if (!input.country.trim()) {
      return 'Country is required.';
    }

    const current = this.addressesSignal();
    this.addressesSignal.set([
      ...current,
      {
        id: `addr-${Date.now()}`,
        label: input.label.trim() || 'Address',
        recipientName: input.recipientName.trim(),
        line1: input.line1.trim(),
        line2: input.line2?.trim() || undefined,
        city: input.city.trim(),
        state: input.state.trim(),
        postalCode: input.postalCode.trim(),
        country: input.country.trim(),
        phone: input.phone?.trim() || undefined,
        isDefault: current.length === 0,
      },
    ]);

    return null;
  }

  constructor() {
    this.persistOnChange(ORDERS_KEY, this.ordersSignal);
    this.persistOnChange(PAYMENT_METHODS_KEY, this.paymentMethodsSignal);
    this.persistOnChange(ADDRESSES_KEY, this.addressesSignal);
  }

  private loadPersisted<T>(key: string): T[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T[]) : [];
    } catch {
      return [];
    }
  }

  private persistOnChange<T>(key: string, source: () => T[]): void {
    effect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(source()));
      } catch {}
    });
  }
}
