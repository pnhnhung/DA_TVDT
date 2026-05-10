import { BasePage } from '@pages/base.page';
import { orgStructureLocators } from '@locators/admin/org_structure.locators';
import { expect, type Locator } from '@playwright/test';

export class OrgStructurePage extends BasePage {
  // Locators
  get adminMenu() { return this.by(orgStructureLocators.adminMenu); }
  get topNavOrgMenu() { return this.page.locator(orgStructureLocators.topNavOrgMenu.selector!).filter({ hasText: 'Organization' }); }
  get structureMenuItem() { return this.by(orgStructureLocators.structureMenuItem); }
  get editSwitch() { return this.by(orgStructureLocators.editSwitch); }
  get unitIdInput() { return this.by(orgStructureLocators.unitIdInput); }
  get nameInput() { return this.by(orgStructureLocators.nameInput); }
  get descriptionTextarea() { return this.by(orgStructureLocators.descriptionTextarea); }
  get saveButton() { return this.by(orgStructureLocators.saveButton); }
  get successToast() { return this.by(orgStructureLocators.successToast); }
  get confirmDeleteButton() { return this.by(orgStructureLocators.confirmDeleteButton); }
  get errorMessage() { return this.by(orgStructureLocators.errorMessage); }

  // Actions
  async openStructure(): Promise<void> {
    await this.adminMenu.click();
    await this.topNavOrgMenu.waitFor({ state: 'visible' });
    await this.topNavOrgMenu.click();
    await this.structureMenuItem.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('.org-container', { state: 'visible' }).catch(() => null);
  }

  async toggleEdit(enable: boolean): Promise<void> {
    const input = this.editSwitch.locator('input[type="checkbox"]');
    const isChecked = await input.isChecked();
    if (isChecked !== enable) {
      await this.editSwitch.click();
      await this.page.waitForTimeout(500); 
    }
  }

  async findNodeByName(name: string): Promise<Locator> {
    const node = this.page.locator(orgStructureLocators.treeNode.selector!)
      .filter({ has: this.page.locator(orgStructureLocators.nodeTitle.selector!, { hasText: name }) })
      .first();
    return node;
  }

  async addNodeUnder(parentName?: string): Promise<void> {
    if (parentName) {
      const parent = await this.findNodeByName(parentName);
      await parent.locator(orgStructureLocators.addNodeIcon.selector!).click();
    } else {
      await this.page.locator(orgStructureLocators.addNodeIcon.selector!).first().click();
    }
    await this.page.waitForSelector('.oxd-dialog-container-default', { state: 'visible' });
  }

  async editNode(name: string): Promise<void> {
    const node = await this.findNodeByName(name);
    await node.locator(orgStructureLocators.editNodeIcon.selector!).click();
    await this.page.waitForSelector('.oxd-dialog-container-default', { state: 'visible' });
  }

  async deleteNode(name: string): Promise<void> {
    const node = await this.findNodeByName(name);
    await node.locator(orgStructureLocators.deleteNodeIcon.selector!).click();
    await this.confirmDeleteButton.click();
    await this.waitForHidden(this.confirmDeleteButton);
  }

  async fillForm(data: { unitId?: string; name: string; description?: string }): Promise<void> {
    if (data.unitId) {
      await this.clearAndFill(this.unitIdInput, data.unitId);
    }
    await this.nameInput.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.nameInput.pressSequentially(data.name, { delay: 10 });
    await this.page.keyboard.press('Tab');
    
    if (data.description) {
      await this.clearAndFill(this.descriptionTextarea, data.description);
    }
  }

  async save(): Promise<void> {
    const savePromise = this.page.waitForResponse(resp => 
      resp.url().includes('/admin/subunits') && resp.url().includes('api') || resp.url().includes('/organization/structure'),
      { timeout: 3000 }
    ).catch(() => null);

    await this.page.waitForTimeout(500); // Wait for Vue reactivity
    await this.saveButton.click();
    await savePromise;
    await this.page.waitForSelector('.oxd-dialog-container-default', { state: 'hidden' });
  }

  async isNodeVisible(name: string): Promise<boolean> {
    const node = await this.findNodeByName(name);
    return await node.isVisible();
  }
}
