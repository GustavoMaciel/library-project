import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';
import {
  AUTHOR_NAV_LINK_ID,
  AUTHORS_CREATE_URL,
  BACK_BUTTON,
  BOOK_SELECT_AUTHOR_ID,
  NAME_AUTHOR_ID,
  SUBMIT_BUTTON, VISUAL_WAIT, ADD_AUTHOR_BUTTON_ID, NEW_BOOK_BUTTON_ID
} from '../domain/consts';

export class AuthorEditPageObject extends BasePageObject {
    submitButton = element(by.id(SUBMIT_BUTTON));
    backButton = element(by.id(BACK_BUTTON));
    nameInput = element(by.id(NAME_AUTHOR_ID));
    newBookButton = element(by.id(NEW_BOOK_BUTTON_ID));
    authorNavLink = element(by.id(AUTHOR_NAV_LINK_ID));
    addAuthorButton = element(by.id(ADD_AUTHOR_BUTTON_ID));

    navigateToAuthors() {
      return this.authorNavLink.click();
    }

    navigateTo() {
      return browser.get(AUTHORS_CREATE_URL);
    }

    fillName(name: string) {
      return this.nameInput.sendKeys(name);
    }

    selectFirstFromBooks() {
      return this.selectFromNgSelect(BOOK_SELECT_AUTHOR_ID, true);
    }

    selectFromBooks(first: boolean = true, text: string = '') {
      return this.selectFromNgSelect(BOOK_SELECT_AUTHOR_ID, first, text);
    }

    submit() {
      return this.submitButton.click();
    }

    clickAddAuthorButton() {
      return this.addAuthorButton.click();
    }

    getDeleteBookButtonElement(index: number) {
      return element(by.id(`removeAddedBook-${index}`));
    }

    deleteAddedBook(index: number) {
      return this.getDeleteBookButtonElement(index).click();
    }

    openNewBookModal() {
      return this.newBookButton.click();
    }
}
