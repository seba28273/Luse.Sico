/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CreditComponentsPage from './credit.page-object';
import { CreditDeleteDialog } from './credit.page-object';
import CreditUpdatePage from './credit-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Credit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let creditUpdatePage: CreditUpdatePage;
  let creditComponentsPage: CreditComponentsPage;
  let creditDeleteDialog: CreditDeleteDialog;

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

  it('should load Credits', async () => {
    await navBarPage.getEntityPage('credit');
    creditComponentsPage = new CreditComponentsPage();
    expect(await creditComponentsPage.getTitle().getText()).to.match(/Credits/);
  });

  it('should load create Credit page', async () => {
    await creditComponentsPage.clickOnCreateButton();
    creditUpdatePage = new CreditUpdatePage();
    expect(await creditUpdatePage.getPageTitle().getAttribute('id')).to.match(/sicoApp.credit.home.createOrEditLabel/);
  });

  it('should create and save Credits', async () => {
    const nbButtonsBeforeCreate = await creditComponentsPage.countDeleteButtons();

    await creditUpdatePage.periodicidadSelectLastOption();
    await creditUpdatePage.setDiaHoraEjecucionInput('5');
    expect(await creditUpdatePage.getDiaHoraEjecucionInput()).to.eq('5');
    await creditUpdatePage.tipoCobroSelectLastOption();
    await creditUpdatePage.setMontoInput('5');
    expect(await creditUpdatePage.getMontoInput()).to.eq('5');
    await creditUpdatePage.setObservacionesInput('observaciones');
    expect(await creditUpdatePage.getObservacionesInput()).to.match(/observaciones/);
    const selectedActivo = await creditUpdatePage.getActivoInput().isSelected();
    if (selectedActivo) {
      await creditUpdatePage.getActivoInput().click();
      expect(await creditUpdatePage.getActivoInput().isSelected()).to.be.false;
    } else {
      await creditUpdatePage.getActivoInput().click();
      expect(await creditUpdatePage.getActivoInput().isSelected()).to.be.true;
    }
    await creditUpdatePage.setCantCuotasInput('5');
    expect(await creditUpdatePage.getCantCuotasInput()).to.eq('5');
    await creditUpdatePage.setCuotaCobradaInput('5');
    expect(await creditUpdatePage.getCuotaCobradaInput()).to.eq('5');
    await creditUpdatePage.setFechaCreacionInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await creditUpdatePage.getFechaCreacionInput()).to.contain('2001-01-01T02:30');
    await creditUpdatePage.setFechaInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await creditUpdatePage.getFechaInicioInput()).to.contain('2001-01-01T02:30');
    await creditUpdatePage.setFechaVencimientoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await creditUpdatePage.getFechaVencimientoInput()).to.contain('2001-01-01T02:30');
    const selectedExcluirFindeSemanas = await creditUpdatePage.getExcluirFindeSemanasInput().isSelected();
    if (selectedExcluirFindeSemanas) {
      await creditUpdatePage.getExcluirFindeSemanasInput().click();
      expect(await creditUpdatePage.getExcluirFindeSemanasInput().isSelected()).to.be.false;
    } else {
      await creditUpdatePage.getExcluirFindeSemanasInput().click();
      expect(await creditUpdatePage.getExcluirFindeSemanasInput().isSelected()).to.be.true;
    }
    await creditUpdatePage.setPorcParticipacionInput('5');
    expect(await creditUpdatePage.getPorcParticipacionInput()).to.eq('5');
    await creditUpdatePage.setCapitalPrestamoInput('5');
    expect(await creditUpdatePage.getCapitalPrestamoInput()).to.eq('5');
    await creditUpdatePage.setInteresesPrestamosInput('5');
    expect(await creditUpdatePage.getInteresesPrestamosInput()).to.eq('5');
    await creditUpdatePage.setCuotaPuraInput('5');
    expect(await creditUpdatePage.getCuotaPuraInput()).to.eq('5');
    await creditUpdatePage.setInteresesCuotaInput('5');
    expect(await creditUpdatePage.getInteresesCuotaInput()).to.eq('5');
    await creditUpdatePage.setCuotaRecuperoCapitalInput('5');
    expect(await creditUpdatePage.getCuotaRecuperoCapitalInput()).to.eq('5');
    await creditUpdatePage.setCantidadRenegociadoInput('5');
    expect(await creditUpdatePage.getCantidadRenegociadoInput()).to.eq('5');
    const selectedIncobrable = await creditUpdatePage.getIncobrableInput().isSelected();
    if (selectedIncobrable) {
      await creditUpdatePage.getIncobrableInput().click();
      expect(await creditUpdatePage.getIncobrableInput().isSelected()).to.be.false;
    } else {
      await creditUpdatePage.getIncobrableInput().click();
      expect(await creditUpdatePage.getIncobrableInput().isSelected()).to.be.true;
    }
    const selectedPagoManual = await creditUpdatePage.getPagoManualInput().isSelected();
    if (selectedPagoManual) {
      await creditUpdatePage.getPagoManualInput().click();
      expect(await creditUpdatePage.getPagoManualInput().isSelected()).to.be.false;
    } else {
      await creditUpdatePage.getPagoManualInput().click();
      expect(await creditUpdatePage.getPagoManualInput().isSelected()).to.be.true;
    }
    const selectedEsPersonal = await creditUpdatePage.getEsPersonalInput().isSelected();
    if (selectedEsPersonal) {
      await creditUpdatePage.getEsPersonalInput().click();
      expect(await creditUpdatePage.getEsPersonalInput().isSelected()).to.be.false;
    } else {
      await creditUpdatePage.getEsPersonalInput().click();
      expect(await creditUpdatePage.getEsPersonalInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(creditUpdatePage.getSaveButton());
    await creditUpdatePage.save();
    await waitUntilHidden(creditUpdatePage.getSaveButton());
    expect(await creditUpdatePage.getSaveButton().isPresent()).to.be.false;

    await creditComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await creditComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Credit', async () => {
    await creditComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await creditComponentsPage.countDeleteButtons();
    await creditComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    creditDeleteDialog = new CreditDeleteDialog();
    expect(await creditDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sicoApp.credit.delete.question/);
    await creditDeleteDialog.clickOnConfirmButton();

    await creditComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await creditComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
