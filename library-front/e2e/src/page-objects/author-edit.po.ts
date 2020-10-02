import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';

export class AuthorEditPageObject extends BasePageObject {
    submitButton = element(by.id('submitButton'));
    backButton = element(by.id('backButton'));
    nameInput = element(by.id('nameAuthor'));
    booksNgSelect = element(by.id('booksAuthor'));

    fillName(name: string) {
      return this.nameInput.sendKeys(name);
    }

    async selectFirstFromBooks() {
      await this.booksNgSelect.click();
    }

    submit() {
      return this.submitButton.click();
    }
}
