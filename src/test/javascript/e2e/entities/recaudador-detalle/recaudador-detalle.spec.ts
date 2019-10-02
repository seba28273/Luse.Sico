/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RecaudadorDetalleComponentsPage from './recaudador-detalle.page-object';
import { RecaudadorDetalleDeleteDialog } from './recaudador-detalle.page-object';
import RecaudadorDetalleUpdatePage from './recaudador-detalle-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('RecaudadorDetalle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recaudadorDetalleUpdatePage: RecaudadorDetalleUpdatePage;
  let recaudadorDetalleComponentsPage: RecaudadorDetalleComponentsPage;
  let recaudadorDetalleDeleteDialog: RecaudadorDetalleDeleteDialog;

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

  it('should load RecaudadorDetalles', async () => {
    await navBarPage.getEntityPage('recaudador-detalle');
    recaudadorDetalleComponentsPage = new RecaudadorDetalleComponentsPage();
    expect(await recaudadorDetalleComponentsPage.getTitle().getText()).to.match(/Recaudador Detalles/);
  });

  it('should load create RecaudadorDetalle page', async () => {
    await recaudadorDetalleComponentsPage.clickOnCreateButton();
    recaudadorDetalleUpdatePage = new RecaudadorDetalleUpdatePage();
    expect(await recaudadorDetalleUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /sicoApp.recaudadorDetalle.home.createOrEditLabel/
    );
  });

  it('should create and save RecaudadorDetalles', async () => {
    const nbButtonsBeforeCreate = await recaudadorDetalleComponentsPage.countDeleteButtons();

    await recaudadorDetalleUpdatePage.setEjecutadaInput('5');
    expect(await recaudadorDetalleUpdatePage.getEjecutadaInput()).to.eq('5');
    await recaudadorDetalleUpdatePage.setFechaEjecucionInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await recaudadorDetalleUpdatePage.getFechaEjecucionInput()).to.contain('2001-01-01T02:30');
    await recaudadorDetalleUpdatePage.setFechaProgramadaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await recaudadorDetalleUpdatePage.getFechaProgramadaInput()).to.contain('2001-01-01T02:30');
    await recaudadorDetalleUpdatePage.setNroCuotaInput('5');
    expect(await recaudadorDetalleUpdatePage.getNroCuotaInput()).to.eq('5');
    await recaudadorDetalleUpdatePage.setObservacionesInput('observaciones');
    expect(await recaudadorDetalleUpdatePage.getObservacionesInput()).to.match(/observaciones/);
    await recaudadorDetalleUpdatePage.setReintentosInput('5');
    expect(await recaudadorDetalleUpdatePage.getReintentosInput()).to.eq('5');
    await recaudadorDetalleUpdatePage.recaudadorSelectLastOption();
    await waitUntilDisplayed(recaudadorDetalleUpdatePage.getSaveButton());
    await recaudadorDetalleUpdatePage.save();
    await waitUntilHidden(recaudadorDetalleUpdatePage.getSaveButton());
    expect(await recaudadorDetalleUpdatePage.getSaveButton().isPresent()).to.be.false;

    await recaudadorDetalleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await recaudadorDetalleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last RecaudadorDetalle', async () => {
    await recaudadorDetalleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await recaudadorDetalleComponentsPage.countDeleteButtons();
    await recaudadorDetalleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    recaudadorDetalleDeleteDialog = new RecaudadorDetalleDeleteDialog();
    expect(await recaudadorDetalleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sicoApp.recaudadorDetalle.delete.question/);
    await recaudadorDetalleDeleteDialog.clickOnConfirmButton();

    await recaudadorDetalleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await recaudadorDetalleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
