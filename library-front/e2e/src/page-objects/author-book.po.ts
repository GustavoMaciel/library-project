import { browser, by, element } from 'protractor';
import { BasePageObject } from './base.po';
import {
    BOOK_SELECT_AUTHOR_ID,
    AUTHORS_SELECT, BOOKS_SELECT, ASSOCIATE_BUTTON, ASSOCIATE_URL
} from '../domain/consts';

export class AuthorBookPageObject extends BasePageObject {
    authorsSelect = element(by.id(AUTHORS_SELECT));
    booksSelect = element(by.id(BOOKS_SELECT));
    associateButton = element(by.id(ASSOCIATE_BUTTON));

    navigateTo() {
        return browser.get(ASSOCIATE_URL);
    }


    async selectFirstFromBooks() {
        return this.selectFromNgSelect(BOOKS_SELECT, true);
    }

    async selectFromBooks(first: boolean = true, text: string = '') {
        return this.selectFromNgSelect(BOOKS_SELECT, first, text);
    }

    async selectFirstFromAuthors() {
        return this.selectFromNgSelect(AUTHORS_SELECT, true);
    }

    async selectFromAuthors(first: boolean = true, text: string = '') {
        return this.selectFromNgSelect(AUTHORS_SELECT, first, text);
    }

    submit() {
        return this.associateButton.click();
    }
}
