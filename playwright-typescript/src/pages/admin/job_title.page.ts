import { BasePage } from '@pages/base.page';
import { jobTitleLocators } from '@locators/admin/job_title.locators';
import { expect, type Locator } from '@playwright/test';

export class JobTitlePage extends BasePage {
  // Locators
  get adminMenu() { return this.by(jobTitleLocators.adminMenu); }
  get topNavJobMenu() { return this.by(jobTitleLocators.topNavJobMenu); }
  get jobTitlesMenuItem() { return this.by(jobTitleLocators.jobTitlesMenuItem); }
  get addButton() { return this.by(jobTitleLocators.addButton); }
  get jobTitleInput() { return this.by(jobTitleLocators.jobTitleInput); }
  get jobDescriptionTextarea() { return this.by(jobTitleLocators.jobDescriptionTextarea); }
  get jobNoteTextarea() { return this.by(jobTitleLocators.jobNoteTextarea); }
  get saveButton() { return this.by(jobTitleLocators.saveButton); }
  get cancelButton() { return this.by(jobTitleLocators.cancelButton); }
  get successToast() { return this.by(jobTitleLocators.successToast); }
  get confirmDeleteButton() { return this.by(jobTitleLocators.confirmDeleteButton); }
  get errorMessage() { return this.by(jobTitleLocators.errorMessage); }

  // Actions
  async openJobTitles(): Promise<void> {
    await this.adminMenu.click();
    // Chờ top nav Job menu xuất hiện và click
    await this.topNavJobMenu.waitFor({ state: 'visible' });
    await this.topNavJobMenu.click();
    await this.jobTitlesMenuItem.click();
    await this.expectUrlContains(/viewJobTitle/);
    // Đợi list load xong hoàn toàn bằng cách đợi bảng xuất hiện
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async startAddJobTitle(): Promise<void> {
    await this.addButton.click();
    await this.expectUrlContains(/saveJobTitle/);
  }

  async fillJobTitleForm(data: { name: string; description?: string; note?: string }): Promise<void> {
    await this.clearAndFill(this.jobTitleInput, data.name);
    if (data.description) {
      await this.clearAndFill(this.jobDescriptionTextarea, data.description);
    }
    if (data.note) {
      await this.clearAndFill(this.jobNoteTextarea, data.note);
    }
  }

  async save(): Promise<void> {
    // Đợi response của API save (chỉ nếu có trigger)
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/job-titles') && resp.status() === 200,
      { timeout: 3000 }
    ).catch(() => null); // Không fail nếu không có response (ví dụ validation error)

    await this.saveButton.click();
    await savePromise;
    // Không đợi redirect cứng ở đây để hỗ trợ các case validation
  }

  async deleteJobTitle(name: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(jobTitleLocators.deleteIcon.selector!).click();
    await this.confirmDeleteButton.click();
    await this.waitForHidden(this.confirmDeleteButton);
  }

  async editJobTitle(name: string, newName: string): Promise<void> {
    const row = await this.findRowByName(name);
    await row.locator(jobTitleLocators.editIcon.selector!).click();
    await this.expectUrlContains(/saveJobTitle/);
    await this.clearAndFill(this.jobTitleInput, newName);
    await this.save();
  }

  // Helpers
  /**
   * Finds a row by name. OrangeHRM table rows use role="row".
   */
  async findRowByName(name: string): Promise<Locator> {
    // Chờ bảng load xong
    await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });

    // Luôn quay về trang 1 trước để đảm bảo tìm thấy trên toàn bộ danh sách (theo rule 02-3)
    const firstPageBtn = this.page.locator('.oxd-pagination-page-item--page').filter({ hasText: '1' });
    if (await firstPageBtn.isVisible() && !(await firstPageBtn.getAttribute('class'))?.includes('selected')) {
      await firstPageBtn.click();
      await this.page.waitForLoadState('networkidle');
    }

    let attempts = 0;
    const maxPages = 15; 

    while (attempts < maxPages) {
      // Tìm row có chứa text là name (OrangeHRM dùng div trong cell)
      const row = this.page.locator('.oxd-table-row').filter({ hasText: name });
      if (await row.count() > 0) {
        await row.first().scrollIntoViewIfNeeded();
        return row.first();
      }
      
      // Sử dụng locator chính xác cho nút Next (bi-chevron-right)
      const nextBtn = this.page.locator('button.oxd-pagination-page-item--previous-next:has(i.bi-chevron-right)');
      if (await nextBtn.isVisible() && await nextBtn.isEnabled()) {
        await nextBtn.click();
        await this.page.waitForLoadState('networkidle');
        // Đợi nội dung bảng thay đổi
        await this.page.waitForTimeout(500); 
        attempts++;
      } else {
        break;
      }
    }
    
    throw new Error(`Job Title "${name}" not found after searching ${attempts + 1} pages.`);
  }

  async isJobTitleInList(name: string): Promise<boolean> {
    try {
      await this.findRowByName(name);
      return true;
    } catch {
      return false;
    }
  }
}
