import { element, by, ElementFinder } from 'protractor';

export default class CreditUpdatePage {
  pageTitle: ElementFinder = element(by.id('sicoApp.credit.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  periodicidadSelect: ElementFinder = element(by.css('select#credit-periodicidad'));
  diaHoraEjecucionInput: ElementFinder = element(by.css('input#credit-diaHoraEjecucion'));
  tipoCobroSelect: ElementFinder = element(by.css('select#credit-tipoCobro'));
  montoInput: ElementFinder = element(by.css('input#credit-monto'));
  observacionesInput: ElementFinder = element(by.css('input#credit-observaciones'));
  activoInput: ElementFinder = element(by.css('input#credit-activo'));
  cantCuotasInput: ElementFinder = element(by.css('input#credit-cantCuotas'));
  cuotaCobradaInput: ElementFinder = element(by.css('input#credit-cuotaCobrada'));
  fechaCreacionInput: ElementFinder = element(by.css('input#credit-fechaCreacion'));
  fechaInicioInput: ElementFinder = element(by.css('input#credit-fechaInicio'));
  fechaVencimientoInput: ElementFinder = element(by.css('input#credit-fechaVencimiento'));
  excluirFindeSemanasInput: ElementFinder = element(by.css('input#credit-excluirFindeSemanas'));
  porcParticipacionInput: ElementFinder = element(by.css('input#credit-porcParticipacion'));
  capitalPrestamoInput: ElementFinder = element(by.css('input#credit-capitalPrestamo'));
  interesesPrestamosInput: ElementFinder = element(by.css('input#credit-interesesPrestamos'));
  cuotaPuraInput: ElementFinder = element(by.css('input#credit-cuotaPura'));
  interesesCuotaInput: ElementFinder = element(by.css('input#credit-interesesCuota'));
  cuotaRecuperoCapitalInput: ElementFinder = element(by.css('input#credit-cuotaRecuperoCapital'));
  cantidadRenegociadoInput: ElementFinder = element(by.css('input#credit-cantidadRenegociado'));
  incobrableInput: ElementFinder = element(by.css('input#credit-incobrable'));
  pagoManualInput: ElementFinder = element(by.css('input#credit-pagoManual'));
  esPersonalInput: ElementFinder = element(by.css('input#credit-esPersonal'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPeriodicidadSelect(periodicidad) {
    await this.periodicidadSelect.sendKeys(periodicidad);
  }

  async getPeriodicidadSelect() {
    return this.periodicidadSelect.element(by.css('option:checked')).getText();
  }

  async periodicidadSelectLastOption() {
    await this.periodicidadSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setDiaHoraEjecucionInput(diaHoraEjecucion) {
    await this.diaHoraEjecucionInput.sendKeys(diaHoraEjecucion);
  }

  async getDiaHoraEjecucionInput() {
    return this.diaHoraEjecucionInput.getAttribute('value');
  }

  async setTipoCobroSelect(tipoCobro) {
    await this.tipoCobroSelect.sendKeys(tipoCobro);
  }

  async getTipoCobroSelect() {
    return this.tipoCobroSelect.element(by.css('option:checked')).getText();
  }

  async tipoCobroSelectLastOption() {
    await this.tipoCobroSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setMontoInput(monto) {
    await this.montoInput.sendKeys(monto);
  }

  async getMontoInput() {
    return this.montoInput.getAttribute('value');
  }

  async setObservacionesInput(observaciones) {
    await this.observacionesInput.sendKeys(observaciones);
  }

  async getObservacionesInput() {
    return this.observacionesInput.getAttribute('value');
  }

  getActivoInput() {
    return this.activoInput;
  }
  async setCantCuotasInput(cantCuotas) {
    await this.cantCuotasInput.sendKeys(cantCuotas);
  }

  async getCantCuotasInput() {
    return this.cantCuotasInput.getAttribute('value');
  }

  async setCuotaCobradaInput(cuotaCobrada) {
    await this.cuotaCobradaInput.sendKeys(cuotaCobrada);
  }

  async getCuotaCobradaInput() {
    return this.cuotaCobradaInput.getAttribute('value');
  }

  async setFechaCreacionInput(fechaCreacion) {
    await this.fechaCreacionInput.sendKeys(fechaCreacion);
  }

  async getFechaCreacionInput() {
    return this.fechaCreacionInput.getAttribute('value');
  }

  async setFechaInicioInput(fechaInicio) {
    await this.fechaInicioInput.sendKeys(fechaInicio);
  }

  async getFechaInicioInput() {
    return this.fechaInicioInput.getAttribute('value');
  }

  async setFechaVencimientoInput(fechaVencimiento) {
    await this.fechaVencimientoInput.sendKeys(fechaVencimiento);
  }

  async getFechaVencimientoInput() {
    return this.fechaVencimientoInput.getAttribute('value');
  }

  getExcluirFindeSemanasInput() {
    return this.excluirFindeSemanasInput;
  }
  async setPorcParticipacionInput(porcParticipacion) {
    await this.porcParticipacionInput.sendKeys(porcParticipacion);
  }

  async getPorcParticipacionInput() {
    return this.porcParticipacionInput.getAttribute('value');
  }

  async setCapitalPrestamoInput(capitalPrestamo) {
    await this.capitalPrestamoInput.sendKeys(capitalPrestamo);
  }

  async getCapitalPrestamoInput() {
    return this.capitalPrestamoInput.getAttribute('value');
  }

  async setInteresesPrestamosInput(interesesPrestamos) {
    await this.interesesPrestamosInput.sendKeys(interesesPrestamos);
  }

  async getInteresesPrestamosInput() {
    return this.interesesPrestamosInput.getAttribute('value');
  }

  async setCuotaPuraInput(cuotaPura) {
    await this.cuotaPuraInput.sendKeys(cuotaPura);
  }

  async getCuotaPuraInput() {
    return this.cuotaPuraInput.getAttribute('value');
  }

  async setInteresesCuotaInput(interesesCuota) {
    await this.interesesCuotaInput.sendKeys(interesesCuota);
  }

  async getInteresesCuotaInput() {
    return this.interesesCuotaInput.getAttribute('value');
  }

  async setCuotaRecuperoCapitalInput(cuotaRecuperoCapital) {
    await this.cuotaRecuperoCapitalInput.sendKeys(cuotaRecuperoCapital);
  }

  async getCuotaRecuperoCapitalInput() {
    return this.cuotaRecuperoCapitalInput.getAttribute('value');
  }

  async setCantidadRenegociadoInput(cantidadRenegociado) {
    await this.cantidadRenegociadoInput.sendKeys(cantidadRenegociado);
  }

  async getCantidadRenegociadoInput() {
    return this.cantidadRenegociadoInput.getAttribute('value');
  }

  getIncobrableInput() {
    return this.incobrableInput;
  }
  getPagoManualInput() {
    return this.pagoManualInput;
  }
  getEsPersonalInput() {
    return this.esPersonalInput;
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
