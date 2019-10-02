/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClienteComponentsPage from './cliente.page-object';
import { ClienteDeleteDialog } from './cliente.page-object';
import ClienteUpdatePage from './cliente-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Cliente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteUpdatePage: ClienteUpdatePage;
  let clienteComponentsPage: ClienteComponentsPage;
  let clienteDeleteDialog: ClienteDeleteDialog;

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

  it('should load Clientes', async () => {
    await navBarPage.getEntityPage('cliente');
    clienteComponentsPage = new ClienteComponentsPage();
    expect(await clienteComponentsPage.getTitle().getText()).to.match(/Clientes/);
  });

  it('should load create Cliente page', async () => {
    await clienteComponentsPage.clickOnCreateButton();
    clienteUpdatePage = new ClienteUpdatePage();
    expect(await clienteUpdatePage.getPageTitle().getAttribute('id')).to.match(/sicoApp.cliente.home.createOrEditLabel/);
  });

  it('should create and save Clientes', async () => {
    const nbButtonsBeforeCreate = await clienteComponentsPage.countDeleteButtons();

    await clienteUpdatePage.setFirstNameInput('firstName');
    expect(await clienteUpdatePage.getFirstNameInput()).to.match(/firstName/);
    await clienteUpdatePage.setLastNameInput('lastName');
    expect(await clienteUpdatePage.getLastNameInput()).to.match(/lastName/);
    await clienteUpdatePage.setDniInput('dni');
    expect(await clienteUpdatePage.getDniInput()).to.match(/dni/);
    await clienteUpdatePage.setFechaNacimientoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await clienteUpdatePage.getFechaNacimientoInput()).to.contain('2001-01-01T02:30');
    await clienteUpdatePage.setDireccionInput('direccion');
    expect(await clienteUpdatePage.getDireccionInput()).to.match(/direccion/);
    await clienteUpdatePage.setNumeroInput('5');
    expect(await clienteUpdatePage.getNumeroInput()).to.eq('5');
    await clienteUpdatePage.setTelefonoInput('telefono');
    expect(await clienteUpdatePage.getTelefonoInput()).to.match(/telefono/);
    await clienteUpdatePage.setMailInput('mail');
    expect(await clienteUpdatePage.getMailInput()).to.match(/mail/);
    await clienteUpdatePage.sexoSelectLastOption();
    await clienteUpdatePage.setSalaryInput('5');
    expect(await clienteUpdatePage.getSalaryInput()).to.eq('5');
    await clienteUpdatePage.setScoringCreditInput('5');
    expect(await clienteUpdatePage.getScoringCreditInput()).to.eq('5');
    await clienteUpdatePage.departmentSelectLastOption();
    await waitUntilDisplayed(clienteUpdatePage.getSaveButton());
    await clienteUpdatePage.save();
    await waitUntilHidden(clienteUpdatePage.getSaveButton());
    expect(await clienteUpdatePage.getSaveButton().isPresent()).to.be.false;

    await clienteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Cliente', async () => {
    await clienteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await clienteComponentsPage.countDeleteButtons();
    await clienteComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    clienteDeleteDialog = new ClienteDeleteDialog();
    expect(await clienteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sicoApp.cliente.delete.question/);
    await clienteDeleteDialog.clickOnConfirmButton();

    await clienteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
