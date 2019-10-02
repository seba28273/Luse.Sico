import { element, by, ElementFinder } from 'protractor';

export default class CreditDetalleUpdatePage {
  pageTitle: ElementFinder = element(by.id('sicoApp.creditDetalle.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nroCuotaInput: ElementFinder = element(by.css('input#credit-detalle-nroCuota'));
  fechaProgramadaInput: ElementFinder = element(by.css('input#credit-detalle-fechaProgramada'));
  fechaEjecucionInput: ElementFinder = element(by.css('input#credit-detalle-fechaEjecucion'));
  reintentosInput: ElementFinder = element(by.css('input#credit-detalle-reintentos'));
  ejecutadaInput: ElementFinder = element(by.css('input#credit-detalle-ejecutada'));
  observacionesInput: ElementFinder = element(by.css('input#credit-detalle-observaciones'));
  cantidadRenegociadoInput: ElementFinder = element(by.css('input#credit-detalle-cantidadRenegociado'));
  creditSelect: ElementFinder = element(by.css('select#credit-detalle-credit'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNroCuotaInput(nroCuota) {
    await this.nroCuotaInput.sendKeys(nroCuota);
  }

  async getNroCuotaInput() {
    return this.nroCuotaInput.getAttribute('value');
  }

  async setFechaProgramadaInput(fechaProgramada) {
    await this.fechaProgramadaInput.sendKeys(fechaProgramada);
  }

  async getFechaProgramadaInput() {
    return this.fechaProgramadaInput.getAttribute('value');
  }

  async setFechaEjecucionInput(fechaEjecucion) {
    await this.fechaEjecucionInput.sendKeys(fechaEjecucion);
  }

  async getFechaEjecucionInput() {
    return this.fechaEjecucionInput.getAttribute('value');
  }

  async setReintentosInput(reintentos) {
    await this.reintentosInput.sendKeys(reintentos);
  }

  async getReintentosInput() {
    return this.reintentosInput.getAttribute('value');
  }

  getEjecutadaInput() {
    return this.ejecutadaInput;
  }
  async setObservacionesInput(observaciones) {
    await this.observacionesInput.sendKeys(observaciones);
  }

  async getObservacionesInput() {
    return this.observacionesInput.getAttribute('value');
  }

  async setCantidadRenegociadoInput(cantidadRenegociado) {
    await this.cantidadRenegociadoInput.sendKeys(cantidadRenegociado);
  }

  async getCantidadRenegociadoInput() {
    return this.cantidadRenegociadoInput.getAttribute('value');
  }

  async creditSelectLastOption() {
    await this.creditSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async creditSelectOption(option) {
    await this.creditSelect.sendKeys(option);
  }

  getCreditSelect() {
    return this.creditSelect;
  }

  async getCreditSelectedOption() {
    return this.creditSelect.element(by.css('option:checked')).getText();
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
