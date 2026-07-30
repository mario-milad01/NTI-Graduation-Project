import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../profile-page/profile.service';

@Component({
  selector: 'app-addresses-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addresses-page.html',
  styleUrl: './addresses-page.css',
})
export class AddressesPage {
  private readonly profileService = inject(ProfileService);
  readonly addresses = this.profileService.addresses;

  showAddForm = false;
  errorMessage = '';

  newLabel = '';
  newRecipientName = '';
  newLine1 = '';
  newLine2 = '';
  newCity = '';
  newState = '';
  newPostalCode = '';
  newCountry = '';
  newPhone = '';

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.errorMessage = '';
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addAddress(): void {
    const error = this.profileService.addAddress({
      label: this.newLabel,
      recipientName: this.newRecipientName,
      line1: this.newLine1,
      line2: this.newLine2,
      city: this.newCity,
      state: this.newState,
      postalCode: this.newPostalCode,
      country: this.newCountry,
      phone: this.newPhone,
    });

    if (error) {
      this.errorMessage = error;
      return;
    }

    this.resetForm();
    this.showAddForm = false;
  }

  setDefault(id: string): void {
    this.profileService.setDefaultAddress(id);
  }

  removeAddress(id: string): void {
    this.profileService.removeAddress(id);
  }

  private resetForm(): void {
    this.newLabel = '';
    this.newRecipientName = '';
    this.newLine1 = '';
    this.newLine2 = '';
    this.newCity = '';
    this.newState = '';
    this.newPostalCode = '';
    this.newCountry = '';
    this.newPhone = '';
    this.errorMessage = '';
  }
}
