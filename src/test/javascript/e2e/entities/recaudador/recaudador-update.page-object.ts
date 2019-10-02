import { element, by, ElementFinder } from 'protractor';

export default class RecaudadorUpdatePage {
  pageTitle: ElementFinder = element(by.id('sicoApp.recaudador.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  activoInput: ElementFinder = element(by.css('input#recaudador-activo'));
  cantCuotasInput: ElementFinder = element(by.css('input#recaudador-cantCuotas'));
  cantidadRenegociadoInput: ElementFinder = element(by.css('input#recaudador-cantidadRenegociado'));
  capitalPrestamoInput: ElementFinder = element(by.css('input#recaudador-capitalPrestamo'));
  cuotaCobradaInput: ElementFinder = element(by.css('input#recaudador-cuotaCobrada'));
  cuotaPuraInput: ElementFinder = element(by.css('input#recaudador-cuotaPura'));
  cuotaRecuperoCapitalInput: ElementFinder = element(by.css('input#recaudador-cuotaRecuperoCapital'));
  diaHoraEjecucionInput: ElementFinder = element(by.css('input#recaudador-diaHoraEjecucion'));
  esPersonalInput: ElementFinder = element(by.css('input#recaudador-esPersonal'));
  excluirFindeSemanasInput: ElementFinder = element(by.css('input#recaudador-excluirFindeSemanas'));
  fechaCreacionInput: ElementFinder = element(by.css('input#recaudador-fechaCreacion'));
  fechaInicioInput: ElementFinder = element(by.css('input#recaudador-fechaInicio'));
  fechaVencimientoInput: ElementFinder = element(by.css('input#recaudador-fechaVencimiento'));
  incobrableInput: ElementFinder = element(by.css('input#recaudador-incobrable'));
  interesesCuotaInput: ElementFinder = element(by.css('input#recaudador-interesesCuota'));
  interesesPrestamosInput: ElementFinder = element(by.css('input#recaudador-interesesPrestamos'));
  montoInput: ElementFinder = element(by.css('input#recaudador-monto'));
  observacionesInput: ElementFinder = element(by.css('input#recaudador-observaciones'));
  pagoManualInput: ElementFinder = element(by.css('input#recaudador-pagoManual'));
  periodicidadSelect: ElementFinder = element(by.css('select#recaudador-periodicidad'));
  porcParticipacionInput: ElementFinder = element(by.css('input#recaudador-porcParticipacion'));
  tipoCobroSelect: ElementFinder = element(by.css('select#recaudador-tipoCobro'));
  idClienteInput: ElementFinder = element(by.css('input#recaudador-idCliente'));

  getPageTitle() {
    return this.pageTitle;
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

  async setCantidadRenegociadoInput(cantidadRenegociado) {
    await this.cantidadRenegociadoInput.sendKeys(cantidadRenegociado);
  }

  async getCantidadRenegociadoInput() {
    return this.cantidadRenegociadoInput.getAttribute('value');
  }

  async setCapitalPrestamoInput(capitalPrestamo) {
    await this.capitalPrestamoInput.sendKeys(capitalPrestamo);
  }

  async getCapitalPrestamoInput() {
    return this.capitalPrestamoInput.getAttribute('value');
  }

  async setCuotaCobradaInput(cuotaCobrada) {
    await this.cuotaCobradaInput.sendKeys(cuotaCobrada);
  }

  async getCuotaCobradaInput() {
    return this.cuotaCobradaInput.getAttribute('value');
  }

  async setCuotaPuraInput(cuotaPura) {
    await this.cuotaPuraInput.sendKeys(cuotaPura);
  }

  async getCuotaPuraInput() {
    return this.cuotaPuraInput.getAttribute('value');
  }

  async setCuotaRecuperoCapitalInput(cuotaRecuperoCapital) {
    await this.cuotaRecuperoCapitalInput.sendKeys(cuotaRecuperoCapital);
  }

  async getCuotaRecuperoCapitalInput() {
    return this.cuotaRecuperoCapitalInput.getAttribute('value');
  }

  async setDiaHoraEjecucionInput(diaHoraEjecucion) {
    await this.diaHoraEjecucionInput.sendKeys(diaHoraEjecucion);
  }

  async getDiaHoraEjecucionInput() {
    return this.diaHoraEjecucionInput.getAttribute('value');
  }

  getEsPersonalInput() {
    return this.esPersonalInput;
  }
  getExcluirFindeSemanasInput() {
    return this.excluirFindeSemanasInput;
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

  getIncobrableInput() {
    return this.incobrableInput;
  }
  async setInteresesCuotaInput(interesesCuota) {
    await this.interesesCuotaInput.sendKeys(interesesCuota);
  }

  async getInteresesCuotaInput() {
    return this.interesesCuotaInput.getAttribute('value');
  }

  async setInteresesPrestamosInput(interesesPrestamos) {
    await this.interesesPrestamosInput.sendKeys(interesesPrestamos);
  }

  async getInteresesPrestamosInput() {
    return this.interesesPrestamosInput.getAttribute('value');
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

  async setPagoManualInput(pagoManual) {
    await this.pagoManualInput.sendKeys(pagoManual);
  }

  async getPagoManualInput() {
    return this.pagoManualInput.getAttribute('value');
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
  async setPorcParticipacionInput(porcParticipacion) {
    await this.porcParticipacionInput.sendKeys(porcParticipacion);
  }

  async getPorcParticipacionInput() {
    return this.porcParticipacionInput.getAttribute('value');
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
  async setIdClienteInput(idCliente) {
    await this.idClienteInput.sendKeys(idCliente);
  }

  async getIdClienteInput() {
    return this.idClienteInput.getAttribute('value');
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
