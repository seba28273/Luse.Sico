import { element, by, ElementFinder } from 'protractor';

export default class ClienteUpdatePage {
  pageTitle: ElementFinder = element(by.id('sicoApp.cliente.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#cliente-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#cliente-lastName'));
  dniInput: ElementFinder = element(by.css('input#cliente-dni'));
  fechaNacimientoInput: ElementFinder = element(by.css('input#cliente-fechaNacimiento'));
  direccionInput: ElementFinder = element(by.css('input#cliente-direccion'));
  numeroInput: ElementFinder = element(by.css('input#cliente-numero'));
  telefonoInput: ElementFinder = element(by.css('input#cliente-telefono'));
  mailInput: ElementFinder = element(by.css('input#cliente-mail'));
  sexoSelect: ElementFinder = element(by.css('select#cliente-sexo'));
  salaryInput: ElementFinder = element(by.css('input#cliente-salary'));
  scoringCreditInput: ElementFinder = element(by.css('input#cliente-scoringCredit'));
  departmentSelect: ElementFinder = element(by.css('select#cliente-department'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setDniInput(dni) {
    await this.dniInput.sendKeys(dni);
  }

  async getDniInput() {
    return this.dniInput.getAttribute('value');
  }

  async setFechaNacimientoInput(fechaNacimiento) {
    await this.fechaNacimientoInput.sendKeys(fechaNacimiento);
  }

  async getFechaNacimientoInput() {
    return this.fechaNacimientoInput.getAttribute('value');
  }

  async setDireccionInput(direccion) {
    await this.direccionInput.sendKeys(direccion);
  }

  async getDireccionInput() {
    return this.direccionInput.getAttribute('value');
  }

  async setNumeroInput(numero) {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput() {
    return this.numeroInput.getAttribute('value');
  }

  async setTelefonoInput(telefono) {
    await this.telefonoInput.sendKeys(telefono);
  }

  async getTelefonoInput() {
    return this.telefonoInput.getAttribute('value');
  }

  async setMailInput(mail) {
    await this.mailInput.sendKeys(mail);
  }

  async getMailInput() {
    return this.mailInput.getAttribute('value');
  }

  async setSexoSelect(sexo) {
    await this.sexoSelect.sendKeys(sexo);
  }

  async getSexoSelect() {
    return this.sexoSelect.element(by.css('option:checked')).getText();
  }

  async sexoSelectLastOption() {
    await this.sexoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setSalaryInput(salary) {
    await this.salaryInput.sendKeys(salary);
  }

  async getSalaryInput() {
    return this.salaryInput.getAttribute('value');
  }

  async setScoringCreditInput(scoringCredit) {
    await this.scoringCreditInput.sendKeys(scoringCredit);
  }

  async getScoringCreditInput() {
    return this.scoringCreditInput.getAttribute('value');
  }

  async departmentSelectLastOption() {
    await this.departmentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
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
