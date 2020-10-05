import { browser, by, element, protractor } from 'protractor';
import { BASE_URL, TOAST_ERROR, TOAST_MESSAGE, TOAST_SUCCESS, VISUAL_WAIT } from '../domain/consts';

export class BasePageObject {
  toastSuccess = element(by.css(TOAST_SUCCESS));
  toastError = element(by.css(TOAST_ERROR));
  toastMessage = element(by.css(TOAST_MESSAGE));
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

  async selectFirstFromNgSelect(id: string) {
    return this.selectFromNgSelect(id, true);
  }

  async selectFromNgSelect(id: string, first: boolean = true, text: string = '') {
    const ngSelect = element(by.id(id));
    await this.waitForPresence(ngSelect, 'Ng select not found');
    await this.waitToBeClickable(ngSelect, 'Ng select not clickable');
    await ngSelect.click();
    await this.waitForPresence(element.all(by.css('.ng-option')), 'ng-option not found');
    await this.selectNgSelectOption(first, text);
  }

  async selectNgSelectOption(first: boolean = false, text: string = '') {
    const options = element.all(by.css('.ng-option'));
    if (first) {
      return options.first().click();
    } else {
      for (const el of await options.getWebElements()) {
        if ((await el.getText()).toLowerCase().indexOf(text.toLowerCase()) > -1) {
          return el.click();
        }
      }
    }
    fail('No element was found');
  }

}
