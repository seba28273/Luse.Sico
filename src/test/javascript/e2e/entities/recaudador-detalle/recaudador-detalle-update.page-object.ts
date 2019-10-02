import { element, by, ElementFinder } from 'protractor';

export default class RecaudadorDetalleUpdatePage {
  pageTitle: ElementFinder = element(by.id('sicoApp.recaudadorDetalle.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  ejecutadaInput: ElementFinder = element(by.css('input#recaudador-detalle-ejecutada'));
  fechaEjecucionInput: ElementFinder = element(by.css('input#recaudador-detalle-fechaEjecucion'));
  fechaProgramadaInput: ElementFinder = element(by.css('input#recaudador-detalle-fechaProgramada'));
  nroCuotaInput: ElementFinder = element(by.css('input#recaudador-detalle-nroCuota'));
  observacionesInput: ElementFinder = element(by.css('input#recaudador-detalle-observaciones'));
  reintentosInput: ElementFinder = element(by.css('input#recaudador-detalle-reintentos'));
  recaudadorSelect: ElementFinder = element(by.css('select#recaudador-detalle-recaudador'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEjecutadaInput(ejecutada) {
    await this.ejecutadaInput.sendKeys(ejecutada);
  }

  async getEjecutadaInput() {
    return this.ejecutadaInput.getAttribute('value');
  }

  async setFechaEjecucionInput(fechaEjecucion) {
    await this.fechaEjecucionInput.sendKeys(fechaEjecucion);
  }

  async getFechaEjecucionInput() {
    return this.fechaEjecucionInput.getAttribute('value');
  }

  async setFechaProgramadaInput(fechaProgramada) {
    await this.fechaProgramadaInput.sendKeys(fechaProgramada);
  }

  async getFechaProgramadaInput() {
    return this.fechaProgramadaInput.getAttribute('value');
  }

  async setNroCuotaInput(nroCuota) {
    await this.nroCuotaInput.sendKeys(nroCuota);
  }

  async getNroCuotaInput() {
    return this.nroCuotaInput.getAttribute('value');
  }

  async setObservacionesInput(observaciones) {
    await this.observacionesInput.sendKeys(observaciones);
  }

  async getObservacionesInput() {
    return this.observacionesInput.getAttribute('value');
  }

  async setReintentosInput(reintentos) {
    await this.reintentosInput.sendKeys(reintentos);
  }

  async getReintentosInput() {
    return this.reintentosInput.getAttribute('value');
  }

  async recaudadorSelectLastOption() {
    await this.recaudadorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async recaudadorSelectOption(option) {
    await this.recaudadorSelect.sendKeys(option);
  }

  getRecaudadorSelect() {
    return this.recaudadorSelect;
  }

  async getRecaudadorSelectedOption() {
    return this.recaudadorSelect.element(by.css('option:checked')).getText();
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
