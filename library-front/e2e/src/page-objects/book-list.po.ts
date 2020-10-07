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

    editBookElementAt(index: number) {
        return element(by.id(`${EDIT_BOOK_AT_ID}${index}`));
    }

    deleteBookElementAt(index: number) {
        return element(by.id(`${DELETE_BOOK_AT_ID}${index}`));
    }

    async getBookAt(index: number) {
        return {
          id: await this.getIdBookElementAt(index).getText(),
          name: await this.getNameBookElementAt(index).getText(),
          publicationDate: await this.getPublicationDateBookElementAt(index).getText(),
          synopsis: await this.getSynopsisBookElementAt(index).getText(),
          view: this.viewBookElementAt(index),
          edit: this.editBookElementAt(index),
          delete: this.deleteBookElementAt(index),
        };
      }

}
