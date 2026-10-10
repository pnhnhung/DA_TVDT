import type { LocatorSpec } from '@core/locator';

export const loginLocators = {
  usernameInput: {
    strategy: 'placeholder',
    text: 'Username',
    exact: true,
    description: 'Login form username input'
  },
  passwordInput: {
    strategy: 'placeholder',
    text: 'Password',
    exact: true,
    description: 'Login form password input'
  },
  loginButton: {
    strategy: 'role',
    role: 'button',
    name: 'Login',
    exact: true,
    description: 'Submit login button'
  },
  invalidCredentialAlert: {
    strategy: 'text',
    text: 'Invalid credentials',
    exact: false,
    description: 'Invalid login error message'
  }
} satisfies Record<string, LocatorSpec>;
