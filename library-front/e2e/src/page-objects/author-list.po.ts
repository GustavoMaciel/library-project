import { by, element } from 'protractor';
import { BasePageObject } from './base.po';
import {
  CREATE_BUTTON, CREATE_MASTER_DETAIL_BUTTON,
  DELETE_AUTHOR_AT_ID,
  EDIT_AUTHOR_AT_ID,
  ID_AUTHOR_AT_ID,
  NAME_AUTHOR_AT_ID,
  VIEW_AUTHOR_AT_ID
} from '../domain/consts';

export class AuthorListPageObject extends BasePageObject {
  createButton = element(by.id(CREATE_BUTTON));
  createMasterDetailButton = element(by.id(CREATE_MASTER_DETAIL_BUTTON));

  navigateTo() {
    return super.navigateToAuthors();
  }

  clickCreateNewAuthor() {
    return this.createButton.click();
  }

  clickCreateMasterDetailNewAuthor() {
    return this.createMasterDetailButton.click();
  }

  async getAuthorAt(index: number) {
    return {
      id: await this.getIdAuthorElementAt(index).getText(),
      name: await this.getNameAuthorElementAt(index).getText(),
      view: this.viewAuthorElementAt(index),
      edit: this.editAuthorElementAt(index),
      delete: this.deleteAuthorElementAt(index),
    };
  }

  getIdAuthorElementAt(index: number) {
    return element(by.id(`${ID_AUTHOR_AT_ID}${index}`));
  }

  getNameAuthorElementAt(index: number) {
    return element(by.id(`${NAME_AUTHOR_AT_ID}${index}`));
  }

  viewAuthorElementAt(index: number) {
    return element(by.id(`${VIEW_AUTHOR_AT_ID}${index}`));
  }

  editAuthorElementAt(index: number) {
    return element(by.id(`${EDIT_AUTHOR_AT_ID}${index}`));
  }

  deleteAuthorElementAt(index: number) {
    return element(by.id(`${DELETE_AUTHOR_AT_ID}${index}`));
  }


}
