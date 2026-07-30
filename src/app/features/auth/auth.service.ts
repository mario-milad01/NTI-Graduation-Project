import { Injectable, computed, signal } from '@angular/core';

export interface AuthUser {
  fullName: string;
  email: string;
}

interface StoredAccount extends AuthUser {
  password: string;
}

const ACCOUNTS_KEY = 'shoppy-auth-accounts';
const SESSION_KEY = 'shoppy-auth-session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accounts: StoredAccount[] = this.loadAccounts();

  private readonly currentUserSignal = signal<AuthUser | null>(this.loadSession());
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isLoggedIn = computed(() => this.currentUserSignal() !== null);

  /** Registers a new account and logs the user in. Returns an error message or null. */
  signup(fullName: string, email: string, password: string): string | null {
    const normalizedEmail = email.trim().toLowerCase();
    if (this.accounts.some((account) => account.email === normalizedEmail)) {
      return 'An account with this email already exists.';
    }

    const account: StoredAccount = {
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,
    };
    this.accounts = [...this.accounts, account];
    this.saveAccounts();
    this.setSession({ fullName: account.fullName, email: account.email });
    return null;
  }

  /** Logs the user in. Returns an error message or null. */
  login(email: string, password: string): string | null {
    const normalizedEmail = email.trim().toLowerCase();
    const account = this.accounts.find(
      (a) => a.email === normalizedEmail && a.password === password,
    );
    if (!account) {
      return 'Invalid email or password.';
    }

    this.setSession({ fullName: account.fullName, email: account.email });
    return null;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // localStorage unavailable
    }
  }

  private setSession(user: AuthUser): void {
    this.currentUserSignal.set(user);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch {
      // localStorage unavailable
    }
  }

  private loadAccounts(): StoredAccount[] {
    try {
      const raw = localStorage.getItem(ACCOUNTS_KEY);
      return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
    } catch {
      return [];
    }
  }

  private saveAccounts(): void {
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(this.accounts));
    } catch {
      // localStorage unavailable
    }
  }

  private loadSession(): AuthUser | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}
