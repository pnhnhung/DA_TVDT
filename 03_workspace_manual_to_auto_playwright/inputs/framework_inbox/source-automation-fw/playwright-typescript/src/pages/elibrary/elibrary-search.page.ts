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

  get searchForm(): Locator {
    return this.page.getByRole('search');
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

  get noResultsMessage(): Locator {
    return this.page.getByText('Không tìm thấy tài liệu phù hợp');
  }

  get voiceSearchPrompt(): Locator {
    return this.page.getByText('Hãy nói điều bạn muốn tìm kiếm');
  }

  get resultSummary(): Locator {
    return this.page.locator('section[aria-label^="Kết quả tìm kiếm"] p[role="status"]');
  }

  get aiOverviewHeading(): Locator {
    return this.page.getByText('Thông tin tổng quan do AI tạo');
  }

  get aiOverviewLoadingStatus(): Locator {
    return this.page.getByText(/AI đang phản hồi/);
  }

  get aiOverviewMoreButton(): Locator {
    return this.page.getByRole('button', { name: /Hiện thêm/ });
  }

  get searchWarning(): Locator {
    return this.page.getByRole('alert');
  }

  get firstResultTitle(): Locator {
    return this.resultCards.first().getByRole('heading');
  }

  get firstResultMetadataPreview(): Locator {
    return this.resultCards.first().locator('app-search-result-metadata-preview');
  }

  get firstResultStoragePath(): Locator {
    return this.resultCards.first().locator('[aria-label^="Đường dẫn:"]');
  }

  get firstResultMatchDetailsButton(): Locator {
    return this.resultCards.first().getByRole('button', {
      name: /Xem chi tiết để biết kết quả khớp/
    });
  }

  async firstResultHasYellowHighlightsFor(query: string): Promise<boolean> {
    return this.resultCards.first().evaluate((card, searchQuery) => {
      const normalize = (value: string): string =>
        value
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase();

      // Filenames often use underscores and extensions, while the UI may
      // highlight each matching word separately.
      const terms = normalize(searchQuery).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
      // Search matches may be highlighted in the title, filename, or metadata
      // displayed elsewhere inside the result card.
      const elements = [card, ...Array.from(card.querySelectorAll<HTMLElement>('*'))];
      const yellowTexts = elements
        .filter((element) => {
          const classes = element.getAttribute('class')?.split(/\s+/) ?? [];
          if (classes.some((className) => /(?:^|:)bg-yellow-/.test(className))) return true;

          const color = window.getComputedStyle(element).backgroundColor;
          const oklch = color.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
          if (oklch) {
            const [, lightness, chroma, hue] = oklch.map(Number);
            return lightness >= 0.75 && chroma >= 0.08 && hue >= 70 && hue <= 125;
          }

          const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
          if (!channels || channels.length < 3) return false;

          const [red, green, blue] = channels;
          return red >= 200 && green >= 160 && blue <= 200 && red >= green && green > blue;
        })
        .map((element) => normalize(element.textContent ?? ''));

      const highlightedText = yellowTexts
        .filter((text, index) => !yellowTexts.some((other, otherIndex) =>
          otherIndex !== index && other.length > text.length && other.includes(text)
        ))
        .join(' ');

      return terms.length > 0 && terms.every((term) => highlightedText.includes(term));
    }, query);
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }
}
