import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../profile-page/profile.service';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.css',
})
export class PaymentMethods {
  private readonly profileService = inject(ProfileService);
  readonly methods = this.profileService.paymentMethods;

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
    const error = this.profileService.addPaymentMethod({
      cardholderName: this.newCardholderName,
      cardNumber: this.newCardNumber,
      expiry: this.newExpiry,
      cvv: this.newCvv,
    });

    if (error) {
      this.errorMessage = error;
      return;
    }

    this.resetForm();
    this.showAddForm = false;
  }

  setDefault(id: string): void {
    this.profileService.setDefaultPaymentMethod(id);
  }

  removeMethod(id: string): void {
    this.profileService.removePaymentMethod(id);
  }

  private resetForm(): void {
    this.newCardholderName = '';
    this.newCardNumber = '';
    this.newExpiry = '';
    this.newCvv = '';
    this.errorMessage = '';
  }
}