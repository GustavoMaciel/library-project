import { browser, by, element, protractor } from 'protractor';

export class BasePageObject {
  protected baseUrl = 'http://localhost:4200/';
  authorNavLink = element(by.id('authorNavLink'));
  bookNavLink = element(by.id('bookNavLink'));
  EC = protractor.ExpectedConditions;
  protected standardTimeout = 8000;

  protected navigateTo() {
    return this.navigateToHome();
  }

  navigateToUrl(url: string) {
    return browser.get(url);
  }

  navigateToHome() {
    return browser.get(this.baseUrl);
  }

  navigateToBooks() {
    return this.authorNavLink.click();
  }

  navigateToAuthors() {
    return this.bookNavLink.click();
  }

  waitForPresence(element, msg: string = 'Element not found') {
    browser.wait(this.EC.presenceOf(element), this.standardTimeout, msg);
  }

  waitToBeClickable(element, msg: string = 'Element not clickable') {
    browser.wait(this.EC.elementToBeClickable(element), this.standardTimeout, msg);
  }


}
