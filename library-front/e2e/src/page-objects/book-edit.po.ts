import { BasePageObject } from './base.po';
import { element, by, browser } from 'protractor';
import {
    SUBMIT_BUTTON, BACK_BUTTON, NAME_BOOK_ID, AUTHOR_SELECT_BOOK_ID,
    PUBLICATION_DATE_BOOK_ID, SYNOPSIS_BOOK_ID, BOOK_NAV_LINK_ID, BOOKS_CREATE_URL, CREATE_AUTHOR_BUTTON_ID
} from '../domain/consts';

export class BookEditPageObject extends BasePageObject {
    submitButton = element(by.id(SUBMIT_BUTTON));
    backButton = element(by.id(BACK_BUTTON));
    nameInput = element(by.id(NAME_BOOK_ID));
    authorsNgSelect = element(by.id(AUTHOR_SELECT_BOOK_ID));
    publicationDateInput = element(by.id(PUBLICATION_DATE_BOOK_ID));
    synopsisInput = element(by.id(SYNOPSIS_BOOK_ID));
    bookNavLink = element(by.id(BOOK_NAV_LINK_ID));
    createAuthorButton = element(by.id(CREATE_AUTHOR_BUTTON_ID));

    navigateToBooks() {
        return this.bookNavLink.click();
    }

    navigateTo() {
        return browser.get(BOOKS_CREATE_URL);
    }

    fillName(name: string) {
        return this.nameInput.sendKeys(name);
    }

    async selectFirstFromAuthors() {
        return this.selectFromNgSelect(AUTHOR_SELECT_BOOK_ID, true);
    }

    async selectFromAuthors(first: boolean = true, text: string = '') {
        return this.selectFromNgSelect(AUTHOR_SELECT_BOOK_ID, first, text);
    }

    fillPublicationDate(date: string) {
        return this.publicationDateInput.sendKeys(date);
    }

    fillSynopsisInput(synopsis: string) {
        return this.synopsisInput.sendKeys(synopsis);
    }

    clickCreateAuthor() {
        return this.createAuthorButton.click();
    }

    submit() {
        return this.submitButton.click();
    }
}
