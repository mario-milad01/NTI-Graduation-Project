import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

function passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };
}

interface StrengthLevel {
  width: string;
  colorClass: string;
  label: string;
}

const STRENGTH_LEVELS: StrengthLevel[] = [
  { width: '0%', colorClass: 'bg-slate-400', label: 'Use 8+ characters with a mix of letters & numbers' },
  { width: '25%', colorClass: 'bg-red-500', label: 'Weak password' },
  { width: '50%', colorClass: 'bg-amber-500', label: 'Fair password' },
  { width: '75%', colorClass: 'bg-yellow-500', label: 'Good password' },
  { width: '100%', colorClass: 'bg-green-500', label: 'Strong password' },
];

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private fb = inject(FormBuilder);

  showPassword = signal(false);
  isSubmitting = signal(false);

  signupForm = this.fb.nonNullable.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
    },
    { validators: passwordsMatchValidator() }
  );

  passwordValue = signal('');

  strength = computed<StrengthLevel>(() => {
    const pw = this.passwordValue();
    if (!pw) return STRENGTH_LEVELS[0];

    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    return STRENGTH_LEVELS[score];
  });

  get fullName() {
    return this.signupForm.controls.fullName;
  }
  get email() {
    return this.signupForm.controls.email;
  }
  get password() {
    return this.signupForm.controls.password;
  }
  get confirmPassword() {
    return this.signupForm.controls.confirmPassword;
  }
  get acceptTerms() {
    return this.signupForm.controls.acceptTerms;
  }

  onPasswordInput(value: string): void {
    this.passwordValue.set(value);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  get passwordsMismatch(): boolean {
    return (
      this.signupForm.hasError('passwordMismatch') &&
      this.confirmPassword.touched &&
      this.confirmPassword.value.length > 0
    );
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const { fullName, email, password } = this.signupForm.getRawValue();

    // TODO: connect to your auth service
    console.log('Sign up attempt:', { fullName, email, password });

    this.isSubmitting.set(false);
  }
}
