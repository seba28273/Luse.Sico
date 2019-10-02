/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CreditDetalleComponentsPage from './credit-detalle.page-object';
import { CreditDetalleDeleteDialog } from './credit-detalle.page-object';
import CreditDetalleUpdatePage from './credit-detalle-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('CreditDetalle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let creditDetalleUpdatePage: CreditDetalleUpdatePage;
  let creditDetalleComponentsPage: CreditDetalleComponentsPage;
  let creditDetalleDeleteDialog: CreditDetalleDeleteDialog;

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

  it('should load CreditDetalles', async () => {
    await navBarPage.getEntityPage('credit-detalle');
    creditDetalleComponentsPage = new CreditDetalleComponentsPage();
    expect(await creditDetalleComponentsPage.getTitle().getText()).to.match(/Credit Detalles/);
  });

  it('should load create CreditDetalle page', async () => {
    await creditDetalleComponentsPage.clickOnCreateButton();
    creditDetalleUpdatePage = new CreditDetalleUpdatePage();
    expect(await creditDetalleUpdatePage.getPageTitle().getAttribute('id')).to.match(/sicoApp.creditDetalle.home.createOrEditLabel/);
  });

  it('should create and save CreditDetalles', async () => {
    const nbButtonsBeforeCreate = await creditDetalleComponentsPage.countDeleteButtons();

    await creditDetalleUpdatePage.setNroCuotaInput('5');
    expect(await creditDetalleUpdatePage.getNroCuotaInput()).to.eq('5');
    await creditDetalleUpdatePage.setFechaProgramadaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await creditDetalleUpdatePage.getFechaProgramadaInput()).to.contain('2001-01-01T02:30');
    await creditDetalleUpdatePage.setFechaEjecucionInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await creditDetalleUpdatePage.getFechaEjecucionInput()).to.contain('2001-01-01T02:30');
    await creditDetalleUpdatePage.setReintentosInput('5');
    expect(await creditDetalleUpdatePage.getReintentosInput()).to.eq('5');
    const selectedEjecutada = await creditDetalleUpdatePage.getEjecutadaInput().isSelected();
    if (selectedEjecutada) {
      await creditDetalleUpdatePage.getEjecutadaInput().click();
      expect(await creditDetalleUpdatePage.getEjecutadaInput().isSelected()).to.be.false;
    } else {
      await creditDetalleUpdatePage.getEjecutadaInput().click();
      expect(await creditDetalleUpdatePage.getEjecutadaInput().isSelected()).to.be.true;
    }
    await creditDetalleUpdatePage.setObservacionesInput('observaciones');
    expect(await creditDetalleUpdatePage.getObservacionesInput()).to.match(/observaciones/);
    await creditDetalleUpdatePage.setCantidadRenegociadoInput('5');
    expect(await creditDetalleUpdatePage.getCantidadRenegociadoInput()).to.eq('5');
    await creditDetalleUpdatePage.creditSelectLastOption();
    await waitUntilDisplayed(creditDetalleUpdatePage.getSaveButton());
    await creditDetalleUpdatePage.save();
    await waitUntilHidden(creditDetalleUpdatePage.getSaveButton());
    expect(await creditDetalleUpdatePage.getSaveButton().isPresent()).to.be.false;

    await creditDetalleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await creditDetalleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last CreditDetalle', async () => {
    await creditDetalleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await creditDetalleComponentsPage.countDeleteButtons();
    await creditDetalleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    creditDetalleDeleteDialog = new CreditDetalleDeleteDialog();
    expect(await creditDetalleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sicoApp.creditDetalle.delete.question/);
    await creditDetalleDeleteDialog.clickOnConfirmButton();

    await creditDetalleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await creditDetalleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
