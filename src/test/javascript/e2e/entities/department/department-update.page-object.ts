import { element, by, ElementFinder } from 'protractor';

export default class DepartmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('sicoApp.department.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  departmentNameInput: ElementFinder = element(by.css('input#department-departmentName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDepartmentNameInput(departmentName) {
    await this.departmentNameInput.sendKeys(departmentName);
  }

  async getDepartmentNameInput() {
    return this.departmentNameInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
