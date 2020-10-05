import { browser, by, element, protractor } from 'protractor';
import { BASE_URL } from '../domain/consts';

export class BasePageObject {
  toastSuccess = element(by.css('.toast-success'));
  toastError = element(by.css('.toast-error'));
  toastMessage = element(by.css('toast-message'));
  EC = protractor.ExpectedConditions;
  protected standardTimeout = 8000;

  navigateTo() {
    return this.navigateToHome();
  }

  navigateToUrl(url: string) {
    return browser.get(url);
  }

  navigateToHome() {
    return browser.get(BASE_URL);
  }

  waitForPresence(element, msg: string = 'Element not found') {
    browser.wait(this.EC.presenceOf(element), this.standardTimeout, msg);
  }

  waitToBeClickable(element, msg: string = 'Element not clickable') {
    browser.wait(this.EC.elementToBeClickable(element), this.standardTimeout, msg);
  }

  getToastMessage() {
    return this.toastMessage.getText();
  }

  hasErrorToast() {
    return this.toastError.isPresent();
  }

  hasSuccessToast() {
    return this.toastSuccess.isPresent();
  }


}
