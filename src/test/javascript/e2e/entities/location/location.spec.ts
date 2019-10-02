/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LocationComponentsPage from './location.page-object';
import { LocationDeleteDialog } from './location.page-object';
import LocationUpdatePage from './location-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Location e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let locationUpdatePage: LocationUpdatePage;
  let locationComponentsPage: LocationComponentsPage;
  let locationDeleteDialog: LocationDeleteDialog;

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

  it('should load Locations', async () => {
    await navBarPage.getEntityPage('location');
    locationComponentsPage = new LocationComponentsPage();
    expect(await locationComponentsPage.getTitle().getText()).to.match(/Locations/);
  });

  it('should load create Location page', async () => {
    await locationComponentsPage.clickOnCreateButton();
    locationUpdatePage = new LocationUpdatePage();
    expect(await locationUpdatePage.getPageTitle().getAttribute('id')).to.match(/sicoApp.location.home.createOrEditLabel/);
  });

  it('should create and save Locations', async () => {
    const nbButtonsBeforeCreate = await locationComponentsPage.countDeleteButtons();

    await locationUpdatePage.setStreetAddressInput('streetAddress');
    expect(await locationUpdatePage.getStreetAddressInput()).to.match(/streetAddress/);
    await locationUpdatePage.setPostalCodeInput('postalCode');
    expect(await locationUpdatePage.getPostalCodeInput()).to.match(/postalCode/);
    await locationUpdatePage.setCityInput('city');
    expect(await locationUpdatePage.getCityInput()).to.match(/city/);
    await locationUpdatePage.setStateProvinceInput('stateProvince');
    expect(await locationUpdatePage.getStateProvinceInput()).to.match(/stateProvince/);
    await waitUntilDisplayed(locationUpdatePage.getSaveButton());
    await locationUpdatePage.save();
    await waitUntilHidden(locationUpdatePage.getSaveButton());
    expect(await locationUpdatePage.getSaveButton().isPresent()).to.be.false;

    await locationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await locationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Location', async () => {
    await locationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await locationComponentsPage.countDeleteButtons();
    await locationComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    locationDeleteDialog = new LocationDeleteDialog();
    expect(await locationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sicoApp.location.delete.question/);
    await locationDeleteDialog.clickOnConfirmButton();

    await locationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await locationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
