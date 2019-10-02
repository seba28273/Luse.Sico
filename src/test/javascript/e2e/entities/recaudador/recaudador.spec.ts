/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RecaudadorComponentsPage from './recaudador.page-object';
import { RecaudadorDeleteDialog } from './recaudador.page-object';
import RecaudadorUpdatePage from './recaudador-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Recaudador e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recaudadorUpdatePage: RecaudadorUpdatePage;
  let recaudadorComponentsPage: RecaudadorComponentsPage;
  let recaudadorDeleteDialog: RecaudadorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Recaudadors', async () => {
    await navBarPage.getEntityPage('recaudador');
    recaudadorComponentsPage = new RecaudadorComponentsPage();
    expect(await recaudadorComponentsPage.getTitle().getText()).to.match(/Recaudadors/);
  });

  it('should load create Recaudador page', async () => {
    await recaudadorComponentsPage.clickOnCreateButton();
    recaudadorUpdatePage = new RecaudadorUpdatePage();
    expect(await recaudadorUpdatePage.getPageTitle().getAttribute('id')).to.match(/sicoApp.recaudador.home.createOrEditLabel/);
  });

  it('should create and save Recaudadors', async () => {
    const nbButtonsBeforeCreate = await recaudadorComponentsPage.countDeleteButtons();

    const selectedActivo = await recaudadorUpdatePage.getActivoInput().isSelected();
    if (selectedActivo) {
      await recaudadorUpdatePage.getActivoInput().click();
      expect(await recaudadorUpdatePage.getActivoInput().isSelected()).to.be.false;
    } else {
      await recaudadorUpdatePage.getActivoInput().click();
      expect(await recaudadorUpdatePage.getActivoInput().isSelected()).to.be.true;
    }
    await recaudadorUpdatePage.setCantCuotasInput('5');
    expect(await recaudadorUpdatePage.getCantCuotasInput()).to.eq('5');
    await recaudadorUpdatePage.setCantidadRenegociadoInput('5');
    expect(await recaudadorUpdatePage.getCantidadRenegociadoInput()).to.eq('5');
    await recaudadorUpdatePage.setCapitalPrestamoInput('5');
    expect(await recaudadorUpdatePage.getCapitalPrestamoInput()).to.eq('5');
    await recaudadorUpdatePage.setCuotaCobradaInput('5');
    expect(await recaudadorUpdatePage.getCuotaCobradaInput()).to.eq('5');
    await recaudadorUpdatePage.setCuotaPuraInput('5');
    expect(await recaudadorUpdatePage.getCuotaPuraInput()).to.eq('5');
    await recaudadorUpdatePage.setCuotaRecuperoCapitalInput('5');
    expect(await recaudadorUpdatePage.getCuotaRecuperoCapitalInput()).to.eq('5');
    await recaudadorUpdatePage.setDiaHoraEjecucionInput('5');
    expect(await recaudadorUpdatePage.getDiaHoraEjecucionInput()).to.eq('5');
    const selectedEsPersonal = await recaudadorUpdatePage.getEsPersonalInput().isSelected();
    if (selectedEsPersonal) {
      await recaudadorUpdatePage.getEsPersonalInput().click();
      expect(await recaudadorUpdatePage.getEsPersonalInput().isSelected()).to.be.false;
    } else {
      await recaudadorUpdatePage.getEsPersonalInput().click();
      expect(await recaudadorUpdatePage.getEsPersonalInput().isSelected()).to.be.true;
    }
    const selectedExcluirFindeSemanas = await recaudadorUpdatePage.getExcluirFindeSemanasInput().isSelected();
    if (selectedExcluirFindeSemanas) {
      await recaudadorUpdatePage.getExcluirFindeSemanasInput().click();
      expect(await recaudadorUpdatePage.getExcluirFindeSemanasInput().isSelected()).to.be.false;
    } else {
      await recaudadorUpdatePage.getExcluirFindeSemanasInput().click();
      expect(await recaudadorUpdatePage.getExcluirFindeSemanasInput().isSelected()).to.be.true;
    }
    await recaudadorUpdatePage.setFechaCreacionInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await recaudadorUpdatePage.getFechaCreacionInput()).to.contain('2001-01-01T02:30');
    await recaudadorUpdatePage.setFechaInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await recaudadorUpdatePage.getFechaInicioInput()).to.contain('2001-01-01T02:30');
    await recaudadorUpdatePage.setFechaVencimientoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await recaudadorUpdatePage.getFechaVencimientoInput()).to.contain('2001-01-01T02:30');
    const selectedIncobrable = await recaudadorUpdatePage.getIncobrableInput().isSelected();
    if (selectedIncobrable) {
      await recaudadorUpdatePage.getIncobrableInput().click();
      expect(await recaudadorUpdatePage.getIncobrableInput().isSelected()).to.be.false;
    } else {
      await recaudadorUpdatePage.getIncobrableInput().click();
      expect(await recaudadorUpdatePage.getIncobrableInput().isSelected()).to.be.true;
    }
    await recaudadorUpdatePage.setInteresesCuotaInput('5');
    expect(await recaudadorUpdatePage.getInteresesCuotaInput()).to.eq('5');
    await recaudadorUpdatePage.setInteresesPrestamosInput('5');
    expect(await recaudadorUpdatePage.getInteresesPrestamosInput()).to.eq('5');
    await recaudadorUpdatePage.setMontoInput('5');
    expect(await recaudadorUpdatePage.getMontoInput()).to.eq('5');
    await recaudadorUpdatePage.setObservacionesInput('observaciones');
    expect(await recaudadorUpdatePage.getObservacionesInput()).to.match(/observaciones/);
    await recaudadorUpdatePage.setPagoManualInput('5');
    expect(await recaudadorUpdatePage.getPagoManualInput()).to.eq('5');
    await recaudadorUpdatePage.periodicidadSelectLastOption();
    await recaudadorUpdatePage.setPorcParticipacionInput('5');
    expect(await recaudadorUpdatePage.getPorcParticipacionInput()).to.eq('5');
    await recaudadorUpdatePage.tipoCobroSelectLastOption();
    await recaudadorUpdatePage.setIdClienteInput('5');
    expect(await recaudadorUpdatePage.getIdClienteInput()).to.eq('5');
    await waitUntilDisplayed(recaudadorUpdatePage.getSaveButton());
    await recaudadorUpdatePage.save();
    await waitUntilHidden(recaudadorUpdatePage.getSaveButton());
    expect(await recaudadorUpdatePage.getSaveButton().isPresent()).to.be.false;

    await recaudadorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await recaudadorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Recaudador', async () => {
    await recaudadorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await recaudadorComponentsPage.countDeleteButtons();
    await recaudadorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    recaudadorDeleteDialog = new RecaudadorDeleteDialog();
    expect(await recaudadorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sicoApp.recaudador.delete.question/);
    await recaudadorDeleteDialog.clickOnConfirmButton();

    await recaudadorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await recaudadorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
