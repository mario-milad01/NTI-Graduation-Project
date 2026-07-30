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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

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
  color: string;
  label: string;
}

const STRENGTH_LEVELS: StrengthLevel[] = [
  { width: '0%', color: '#94a3b8', label: 'Use 8+ characters with a mix of letters & numbers' },
  { width: '25%', color: '#ef4444', label: 'Weak password' },
  { width: '50%', color: '#f59e0b', label: 'Fair password' },
  { width: '75%', color: '#eab308', label: 'Good password' },
  { width: '100%', color: '#22c55e', label: 'Strong password' },
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
  private authService = inject(AuthService);
  private router = inject(Router);

  showPassword = signal(false);
  isSubmitting = signal(false);
  authError = signal<string | null>(null);

  signupForm = this.fb.nonNullable.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator() },
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
    this.authError.set(null);
    const { fullName, email, password } = this.signupForm.getRawValue();

    const error = this.authService.signup(fullName, email, password);
    this.isSubmitting.set(false);

    if (error) {
      this.authError.set(error);
      return;
    }

    this.router.navigate(['/home']);
  }
}
