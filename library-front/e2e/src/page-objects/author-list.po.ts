import { by, element } from 'protractor';
import { BasePageObject } from './base.po';

export class AuthorListPageObject extends BasePageObject {
  createButton = element(by.id('createButton'));
  createMasterDetailButton = element(by.id('createMasterDetailButton'));

  protected navigateTo() {
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
    return element(by.id(`idAuthor-${index}`));
  }

  getNameAuthorElementAt(index: number) {
    return element(by.id(`nameAuthor-${index}`));
  }

  viewAuthorElementAt(index: number) {
    return element(by.id(`viewAuthor-${index}`));
  }

  editAuthorElementAt(index: number) {
    return element(by.id(`editAuthor-${index}`));
  }

  deleteAuthorElementAt(index: number) {
    return element(by.id(`deleteAuthor-${index}`));
  }


}
