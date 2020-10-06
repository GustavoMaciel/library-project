import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';
import {
  AUTHOR_NAV_LINK_ID,
  AUTHORS_CREATE_URL,
  BACK_BUTTON,
  BOOK_SELECT_AUTHOR_ID,
  NAME_AUTHOR_ID,
  SUBMIT_BUTTON, VISUAL_WAIT, ADD_AUTHOR_BUTOTN_ID
} from '../domain/consts';

export class AuthorEditPageObject extends BasePageObject {
    submitButton = element(by.id(SUBMIT_BUTTON));
    backButton = element(by.id(BACK_BUTTON));
    nameInput = element(by.id(NAME_AUTHOR_ID));
    booksNgSelect = element(by.id(BOOK_SELECT_AUTHOR_ID));
    authorNavLink = element(by.id(AUTHOR_NAV_LINK_ID));
    addAuthorButton = element(by.id(ADD_AUTHOR_BUTOTN_ID));

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
      return this.selectFromNgSelect(BOOK_SELECT_AUTHOR_ID, true);
    }

    async selectFromBooks(first: boolean = true, text: string = '') {
      return this.selectFromNgSelect(BOOK_SELECT_AUTHOR_ID, first, text);
    }

    submit() {
      return this.submitButton.click();
    }

    clickAddAuthorButton() {
      return this.addAuthorButton.click();
    }
}
