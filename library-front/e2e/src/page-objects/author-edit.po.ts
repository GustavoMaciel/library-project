import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';
import {
  AUTHOR_NAV_LINK_ID,
  AUTHORS_CREATE_URL,
  BACK_BUTTON,
  BOOK_SELECT_AUTHOR_ID,
  NAME_AUTHOR_ID,
  SUBMIT_BUTTON, VISUAL_WAIT
} from '../domain/consts';

export class AuthorEditPageObject extends BasePageObject {
    submitButton = element(by.id(SUBMIT_BUTTON));
    backButton = element(by.id(BACK_BUTTON));
    nameInput = element(by.id(NAME_AUTHOR_ID));
    booksNgSelect = element(by.id(BOOK_SELECT_AUTHOR_ID));
    authorNavLink = element(by.id(AUTHOR_NAV_LINK_ID));

    navigateToAuthors() {
      return this.authorNavLink.click();
    }

    navigateTo() {
      return browser.get(AUTHORS_CREATE_URL);
    }

    fillName(name: string) {
      return this.nameInput.sendKeys(name);
    }

    async selectFirstFromBooks() {
      return this.selectFromBooks(true);
    }

    async selectFromBooks(first: boolean = true, text: string = '') {
      await this.waitForPresence(this.booksNgSelect, 'Ng select not found');
      await this.waitToBeClickable(this.booksNgSelect, 'Ng select not clickable');
      await this.booksNgSelect.click();
      await this.waitForPresence(element.all(by.css('.ng-option')), 'ng-option not found');
      await this.selectNgSelectOption(first, text);
      await browser.sleep(VISUAL_WAIT);
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

    submit() {
      return this.submitButton.click();
    }
}
