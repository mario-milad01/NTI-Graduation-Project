import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../cart-page/cart.service';
import { AuthService } from '../auth/auth.service';
import { ProfileService, Order } from '../../profile-page/profile.service';

interface SummaryItem {
  name: string;
  variant: string;
  price: number;
  imageUrl: string;
}

type DeliveryMethod = 'standard' | 'priority';
type PaymentSelection = 'card' | 'saved';

const TAX_RATE = 0.08;
const SHIPPING_COST: Record<DeliveryMethod, number> = {
  standard: 0,
  priority: 25.0,
};

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  readonly cartItems = this.cartService.items;
  readonly savedMethods = this.profileService.paymentMethods;

  readonly summaryItems = computed<SummaryItem[]>(() =>
    this.cartItems().map((item) => ({
      name: item.name,
      variant: this.variantLabel(item),
      price: item.price * item.quantity,
      imageUrl: item.image,
    })),
  );

  contactForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    updates: [false],
  });

  shippingForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    streetAddress: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
  });

  cardForm = this.fb.nonNullable.group({
    cardNumber: ['', [Validators.required]],
    expiry: ['', [Validators.required]],
    cvv: ['', [Validators.required]],
  });

  deliveryMethod = signal<DeliveryMethod>('standard');
  paymentSelection = signal<PaymentSelection>('card');
  selectedSavedMethodId = signal<string | null>(null);
  saveCard = signal(false);
  isSubmitting = signal(false);

  subtotal = computed(() => this.cartService.subtotal);
  taxes = computed(() => this.subtotal() * TAX_RATE);

  shippingCost = computed(() => SHIPPING_COST[this.deliveryMethod()]);

  orderTotal = computed(() => this.subtotal() + this.taxes() + this.shippingCost());

  constructor() {
    this.prefillFromUserAndProfile();

    const preferred = this.profileService.preferredPaymentMethod();
    if (preferred) {
      this.paymentSelection.set('saved');
      this.selectedSavedMethodId.set(preferred.id);
    }
  }

  selectDeliveryMethod(method: DeliveryMethod): void {
    this.deliveryMethod.set(method);
  }

  selectSavedMethod(id: string): void {
    this.paymentSelection.set('saved');
    this.selectedSavedMethodId.set(id);
  }

  selectCardPayment(): void {
    this.paymentSelection.set('card');
  }

  isSavedMethodSelected(id: string): boolean {
    return this.paymentSelection() === 'saved' && this.selectedSavedMethodId() === id;
  }

  onSaveCardChange(event: Event): void {
    this.saveCard.set((event.target as HTMLInputElement).checked);
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

  completePurchase(): void {
    this.contactForm.markAllAsTouched();
    this.shippingForm.markAllAsTouched();

    if (this.contactForm.invalid || this.shippingForm.invalid) {
      return;
    }

    if (this.paymentSelection() === 'card') {
      this.cardForm.markAllAsTouched();
      if (this.cardForm.invalid) return;
    }

    if (this.cartItems().length === 0) {
      return;
    }

    this.isSubmitting.set(true);

    const savedMethod =
      this.paymentSelection() === 'saved'
        ? (this.savedMethods().find((m) => m.id === this.selectedSavedMethodId()) ?? null)
        : null;

    const order = {
      contact: this.contactForm.getRawValue(),
      shipping: this.shippingForm.getRawValue(),
      deliveryMethod: this.deliveryMethod(),
      payment: savedMethod
        ? { type: 'saved' as const, brand: savedMethod.brand, last4: savedMethod.last4 }
        : { type: 'card' as const, ...this.cardForm.getRawValue() },
      total: this.orderTotal(),
    };

    console.log('Order submitted:', order);

    if (this.saveCard() && this.paymentSelection() === 'card') {
      const { firstName, lastName } = this.shippingForm.getRawValue();
      const card = this.cardForm.getRawValue();
      this.profileService.addPaymentMethod({
        cardholderName: `${firstName} ${lastName}`.trim(),
        cardNumber: card.cardNumber,
        expiry: card.expiry,
        cvv: card.cvv,
      });
    }

    // Record the purchase in the profile's order history and empty the cart.
    this.profileService.addOrders(this.buildProfileOrders());
    this.cartService.clear();

    this.isSubmitting.set(false);
    this.router.navigate(['/profile', 'orders']);
  }

  private buildProfileOrders(): Order[] {
    const orderId = `#LX-${Math.floor(10000 + Math.random() * 90000)}`;
    return this.cartItems().map((item) => ({
      product: item.name,
      variant: this.variantLabel(item),
      orderId,
      status: 'In Transit',
      total: `$${(item.price * item.quantity).toFixed(2)}`,
    }));
  }

  private variantLabel(item: CartItem): string {
    const parts = [item.color, item.size].filter(Boolean).join(' / ');
    if (!parts) {
      return `Qty ${item.quantity}`;
    }
    return item.quantity > 1 ? `${parts} · Qty ${item.quantity}` : parts;
  }

  private prefillFromUserAndProfile(): void {
    const user = this.authService.currentUser();
    if (user) {
      const [firstName, ...rest] = user.fullName.trim().split(/\s+/);
      this.contactForm.patchValue({ email: user.email });
      this.shippingForm.patchValue({
        firstName,
        lastName: rest.join(' ') || firstName,
      });
    }

    const address = this.profileService.defaultAddress();
    if (address) {
      this.shippingForm.patchValue({
        streetAddress: address.line1,
        city: address.city,
        postalCode: address.postalCode,
      });
    }
  }
}
