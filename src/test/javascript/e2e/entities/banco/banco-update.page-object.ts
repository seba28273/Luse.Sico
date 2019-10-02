import { element, by, ElementFinder } from 'protractor';

export default class BancoUpdatePage {
  pageTitle: ElementFinder = element(by.id('sicoApp.banco.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bancoNameInput: ElementFinder = element(by.css('input#banco-bancoName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBancoNameInput(bancoName) {
    await this.bancoNameInput.sendKeys(bancoName);
  }

  async getBancoNameInput() {
    return this.bancoNameInput.getAttribute('value');
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
