/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CountryComponentsPage from './country.page-object';
import { CountryDeleteDialog } from './country.page-object';
import CountryUpdatePage from './country-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Country e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let countryUpdatePage: CountryUpdatePage;
  let countryComponentsPage: CountryComponentsPage;
  let countryDeleteDialog: CountryDeleteDialog;

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

  it('should load Countries', async () => {
    await navBarPage.getEntityPage('country');
    countryComponentsPage = new CountryComponentsPage();
    expect(await countryComponentsPage.getTitle().getText()).to.match(/Countries/);
  });

  it('should load create Country page', async () => {
    await countryComponentsPage.clickOnCreateButton();
    countryUpdatePage = new CountryUpdatePage();
    expect(await countryUpdatePage.getPageTitle().getAttribute('id')).to.match(/sicoApp.country.home.createOrEditLabel/);
  });

  it('should create and save Countries', async () => {
    const nbButtonsBeforeCreate = await countryComponentsPage.countDeleteButtons();

    await countryUpdatePage.setCountryNameInput('countryName');
    expect(await countryUpdatePage.getCountryNameInput()).to.match(/countryName/);
    await countryUpdatePage.regionSelectLastOption();
    await waitUntilDisplayed(countryUpdatePage.getSaveButton());
    await countryUpdatePage.save();
    await waitUntilHidden(countryUpdatePage.getSaveButton());
    expect(await countryUpdatePage.getSaveButton().isPresent()).to.be.false;

    await countryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await countryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Country', async () => {
    await countryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await countryComponentsPage.countDeleteButtons();
    await countryComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    countryDeleteDialog = new CountryDeleteDialog();
    expect(await countryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sicoApp.country.delete.question/);
    await countryDeleteDialog.clickOnConfirmButton();

    await countryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await countryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
