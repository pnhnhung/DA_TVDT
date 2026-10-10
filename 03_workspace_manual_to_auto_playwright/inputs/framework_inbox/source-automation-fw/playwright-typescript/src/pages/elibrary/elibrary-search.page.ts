import type { Locator, Page } from '@playwright/test';
import { elibraryLocators } from '@locators/elibrary/elibrary.locators';
import { BasePage } from '@pages/base.page';

export class ElibrarySearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get searchInput(): Locator {
    return this.by(elibraryLocators.searchInput);
  }

  get searchButton(): Locator {
    return this.by(elibraryLocators.searchButton);
  }

  get voiceSearchButton(): Locator {
    return this.by(elibraryLocators.voiceSearchButton);
  }

  get resultCards(): Locator {
    return this.by(elibraryLocators.resultCards);
  }

  get resultCount(): Locator {
    return this.by(elibraryLocators.resultCount);
  }

  get firstResultTitle(): Locator {
    return this.resultCards.first().getByRole('heading');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }
}
