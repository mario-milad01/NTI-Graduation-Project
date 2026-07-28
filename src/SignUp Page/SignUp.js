  // Toggle password visibility
  const toggleBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');

  const eyeOpen = `<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />`;
  const eyeClosed = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />`;

  toggleBtn.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    eyeIcon.innerHTML = isHidden ? eyeClosed : eyeOpen;
  });

  // Password strength meter
  const strengthFill = document.getElementById('strength-fill');
  const strengthLabel = document.getElementById('strength-label');

  function getStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  passwordInput.addEventListener('input', () => {
    const pw = passwordInput.value;
    const score = getStrength(pw);
    const levels = [
      { width: '0%',   color: '#94a3b8', label: 'Use 8+ characters with a mix of letters & numbers' },
      { width: '25%',  color: '#ef4444', label: 'Weak password' },
      { width: '50%',  color: '#f59e0b', label: 'Fair password' },
      { width: '75%',  color: '#eab308', label: 'Good password' },
      { width: '100%', color: '#22c55e', label: 'Strong password' },
    ];
    const level = pw.length === 0 ? levels[0] : levels[score];
    strengthFill.style.width = level.width;
    strengthFill.style.background = level.color;
    strengthLabel.textContent = level.label;
  });

  // Confirm password match check
  const confirmInput = document.getElementById('confirm-password');
  const matchError = document.getElementById('match-error');

  function checkMatch() {
    if (confirmInput.value.length === 0) {
      matchError.classList.add('hidden');
      return true;
    }
    const matches = passwordInput.value === confirmInput.value;
    matchError.classList.toggle('hidden', matches);
    return matches;
  }
  confirmInput.addEventListener('input', checkMatch);
  passwordInput.addEventListener('input', checkMatch);

  // Submit handler (placeholder — wire up to your backend)
  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkMatch()) return;

    const data = {
      fullname: document.getElementById('fullname').value,
      email: document.getElementById('email').value,
      password: passwordInput.value,
    };
    console.log('Sign up attempt:', data);
    // TODO: connect to your backend auth endpoint
  });