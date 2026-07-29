import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PaymentMethod {
  id: string;
  brand: 'Visa' | 'Mastercard' | 'Amex';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.css',
})
export class PaymentMethods {
  methods: PaymentMethod[] = [
    {
      id: 'pm-1',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: '08',
      expiryYear: '27',
      cardholderName: 'Alex Rivera',
      isDefault: true,
    },
    {
      id: 'pm-2',
      brand: 'Mastercard',
      last4: '8390',
      expiryMonth: '02',
      expiryYear: '26',
      cardholderName: 'Alex Rivera',
      isDefault: false,
    },
  ];

  showAddForm = false;
  errorMessage = '';

  newCardholderName = '';
  newCardNumber = '';
  newExpiry = ''; // MM/YY
  newCvv = '';

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.errorMessage = '';
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addPaymentMethod(): void {
    this.errorMessage = '';

    const digitsOnly = this.newCardNumber.replace(/\s+/g, '');
    const expiryMatch = /^(\d{2})\/(\d{2})$/.exec(this.newExpiry.trim());

    if (!this.newCardholderName.trim()) {
      this.errorMessage = 'Cardholder name is required.';
      return;
    }
    if (!/^\d{13,19}$/.test(digitsOnly)) {
      this.errorMessage = 'Enter a valid card number.';
      return;
    }
    if (!expiryMatch) {
      this.errorMessage = 'Enter expiry as MM/YY.';
      return;
    }
    if (!/^\d{3,4}$/.test(this.newCvv.trim())) {
      this.errorMessage = 'Enter a valid CVV.';
      return;
    }

    const brand = this.detectBrand(digitsOnly);

    this.methods.push({
      id: `pm-${Date.now()}`,
      brand,
      last4: digitsOnly.slice(-4),
      expiryMonth: expiryMatch[1],
      expiryYear: expiryMatch[2],
      cardholderName: this.newCardholderName.trim(),
      isDefault: this.methods.length === 0,
    });

    this.resetForm();
    this.showAddForm = false;
  }

  setDefault(id: string): void {
    this.methods = this.methods.map((m) => ({ ...m, isDefault: m.id === id }));
  }

  removeMethod(id: string): void {
    const wasDefault = this.methods.find((m) => m.id === id)?.isDefault;
    this.methods = this.methods.filter((m) => m.id !== id);
    if (wasDefault && this.methods.length > 0) {
      this.methods[0].isDefault = true;
    }
  }

  private detectBrand(digits: string): PaymentMethod['brand'] {
    if (digits.startsWith('34') || digits.startsWith('37')) return 'Amex';
    if (digits.startsWith('5')) return 'Mastercard';
    return 'Visa';
  }

  private resetForm(): void {
    this.newCardholderName = '';
    this.newCardNumber = '';
    this.newExpiry = '';
    this.newCvv = '';
    this.errorMessage = '';
  }
}
