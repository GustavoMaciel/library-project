import { BasePageObject } from './base.po';
import { element, by } from 'protractor';
import {
    CREATE_BUTTON, CREATE_MASTER_DETAIL_BUTTON, ID_BOOK_AT_ID,
    NAME_BOOK_AT_ID, SYNOPSIS_BOOK_AT_ID, PUBLICATION_DATE_BOOK_AT_ID,
    VIEW_BOOK_AT_ID, EDIT_BOOK_AT_ID, DELETE_BOOK_AT_ID
} from '../domain/consts';

export class BookListPageObject extends BasePageObject {

    createButton = element(by.id(CREATE_BUTTON));
    createMasterDetailButton = element(by.id(CREATE_MASTER_DETAIL_BUTTON));

    navigateTo() {
        return super.navigateToUrl('books');
    }

    clickCreateNewBook() {
        return this.createButton.click();
    }

    clickCreateMasterDetailNewBook() {
        return this.createMasterDetailButton.click();
    }

    getIdBookElementAt(index: number) {
        return element(by.id(`${ID_BOOK_AT_ID}${index}`));
    }

    getNameBookElementAt(index: number) {
        return element(by.id(`${NAME_BOOK_AT_ID}${index}`));
    }

    getSynopsisBookElementAt(index: number) {
        return element(by.id(`${SYNOPSIS_BOOK_AT_ID}${index}`));
    }

    getPublicationDateBookElementAt(index: number) {
        return element(by.id(`${PUBLICATION_DATE_BOOK_AT_ID}${index}`));
    }

    viewBookElementAt(index: number) {
        return element(by.id(`${VIEW_BOOK_AT_ID}${index}`));
    }

    editAuthorElementAt(index: number) {
        return element(by.id(`${EDIT_BOOK_AT_ID}${index}`));
    }

    deleteAuthorElementAt(index: number) {
        return element(by.id(`${DELETE_BOOK_AT_ID}${index}`));
    }

}
