/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BancoComponentsPage from './banco.page-object';
import { BancoDeleteDialog } from './banco.page-object';
import BancoUpdatePage from './banco-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Banco e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bancoUpdatePage: BancoUpdatePage;
  let bancoComponentsPage: BancoComponentsPage;
  let bancoDeleteDialog: BancoDeleteDialog;

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

  it('should load Bancos', async () => {
    await navBarPage.getEntityPage('banco');
    bancoComponentsPage = new BancoComponentsPage();
    expect(await bancoComponentsPage.getTitle().getText()).to.match(/Bancos/);
  });

  it('should load create Banco page', async () => {
    await bancoComponentsPage.clickOnCreateButton();
    bancoUpdatePage = new BancoUpdatePage();
    expect(await bancoUpdatePage.getPageTitle().getAttribute('id')).to.match(/sicoApp.banco.home.createOrEditLabel/);
  });

  it('should create and save Bancos', async () => {
    const nbButtonsBeforeCreate = await bancoComponentsPage.countDeleteButtons();

    await bancoUpdatePage.setBancoNameInput('bancoName');
    expect(await bancoUpdatePage.getBancoNameInput()).to.match(/bancoName/);
    await waitUntilDisplayed(bancoUpdatePage.getSaveButton());
    await bancoUpdatePage.save();
    await waitUntilHidden(bancoUpdatePage.getSaveButton());
    expect(await bancoUpdatePage.getSaveButton().isPresent()).to.be.false;

    await bancoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await bancoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Banco', async () => {
    await bancoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await bancoComponentsPage.countDeleteButtons();
    await bancoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    bancoDeleteDialog = new BancoDeleteDialog();
    expect(await bancoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sicoApp.banco.delete.question/);
    await bancoDeleteDialog.clickOnConfirmButton();

    await bancoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await bancoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
