# Angular Components — Login, Signup, Cart, Checkout

Four standalone Angular components (Angular 17+/18 syntax: signals, the new
`@if` / `@for` control-flow blocks, reactive forms). Drop the folders under
`src/app/features/` in your project.

## Structure

```
src/app/features/
├── auth/
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.css
│   └── signup/
│       ├── signup.component.ts
│       ├── signup.component.html
│       └── signup.component.css
├── cart/
│   ├── cart.component.ts
│   ├── cart.component.html
│   └── cart.component.css
└── checkout/
    ├── checkout.component.ts
    ├── checkout.component.html
    └── checkout.component.css
```

## Requirements

- **Angular 17+** (standalone components, `@if`/`@for` control flow).
  If your project is on an older Angular version, swap the `@if`/`@for`
  blocks for `*ngIf`/`*ngFor` and add `NgIf`/`NgFor` to each component's
  `imports` array instead.
- **Tailwind CSS** configured in the project (all layout/spacing/color
  utility classes are Tailwind). The rest (glass card backdrop blur, sky
  gradient, cloud shapes, etc.) lives in each component's own `.css` file
  since Tailwind alone can't express those effects.
- **Angular Router**, for the `routerLink` navigation between login ↔ signup
  and cart → checkout. See `app.routes.example.ts` for how to wire these up
  — merge the relevant routes into your existing `app.routes.ts`.

## What's wired up vs. what's a placeholder

**Working out of the box:**
- Reactive form validation (login, signup, checkout contact/shipping)
- Password visibility toggles
- Live password-strength meter + confirm-password match check (signup)
- Cart quantity +/-, remove, live subtotal/tax/total recalculation (signals + `computed()`)
- Delivery method and payment method selection with live total updates (checkout)
- Card number / expiry / CVV auto-formatting

**You'll need to connect:**
- `onSubmit()` in login/signup — call your actual auth service instead of `console.log`
- `applyPromoCode()` in cart/checkout — call your backend promo validation
- `completePurchase()` in checkout — call your payment processing endpoint
- Product data in cart/checkout is hardcoded as example state — replace with
  data from your cart service / API

## Notes

- Login and signup link to each other via `routerLink="/login"` /
  `routerLink="/signup"` — update the paths if your routes differ.
- Cart's "Checkout Now" and checkout header's "LUXE" logo link via
  `routerLink="/checkout"` and `routerLink="/cart"` respectively.
- Currency values use Angular's built-in `currency` pipe (defaults to USD —
  pass a currency code if you need a different locale, e.g. `{{ total() | currency:'EGP' }}`).
