import type { Locator, Page } from '@playwright/test';

export type LocatorScope = Page | Locator;

export type LocatorSpec =
  | {
      strategy: 'role';
      role: string;
      name?: string | RegExp;
      exact?: boolean;
      description?: string;
    }
  | {
      strategy: 'label';
      label: string | RegExp;
      exact?: boolean;
      description?: string;
    }
  | {
      strategy: 'placeholder';
      text: string | RegExp;
      exact?: boolean;
      description?: string;
    }
  | {
      strategy: 'text';
      text: string | RegExp;
      exact?: boolean;
      description?: string;
    }
  | {
      strategy: 'testId';
      testId: string;
      description?: string;
    }
  | {
      strategy: 'css';
      selector: string;
      description?: string;
    }
  | {
      strategy: 'xpath';
      selector: string;
      description?: string;
    };

export function by(scope: LocatorScope, spec: LocatorSpec): Locator {
  switch (spec.strategy) {
    case 'role':
      return scope.getByRole(spec.role as never, {
        name: spec.name,
        exact: spec.exact
      });
    case 'label':
      return scope.getByLabel(spec.label, { exact: spec.exact });
    case 'placeholder':
      return scope.getByPlaceholder(spec.text, { exact: spec.exact });
    case 'text':
      return scope.getByText(spec.text, { exact: spec.exact });
    case 'testId':
      return scope.getByTestId(spec.testId);
    case 'css':
      return scope.locator(spec.selector);
    case 'xpath':
      return scope.locator(`xpath=${spec.selector}`);
    default: {
      const neverSpec: never = spec;
      throw new Error(`Unsupported locator strategy: ${JSON.stringify(neverSpec)}`);
    }
  }
}
