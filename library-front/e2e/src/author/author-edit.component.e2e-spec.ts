import { AuthorEditPageObject } from '../page-objects/author-edit.po';
import { generateRandomString } from '../utils/string.utils';
import { AUTHORS_CREATE_URL, AUTHORS_EDIT_URL } from '../domain/consts';
import { BookEditPageObject } from '../page-objects/book-edit.po';
import { browser } from 'protractor';
import { AuthorListPageObject } from '../page-objects/author-list.po';

describe('AuthorEditComponent', () => {
  const authorEditPage = new AuthorEditPageObject();
  const authorListPage = new AuthorListPageObject();
  const bookEditPage = new BookEditPageObject();

  beforeAll(() => {
    authorEditPage.navigateToUrl(AUTHORS_CREATE_URL + '/master-detail');
    // authorEditPage.navigateTo();
  });

  it('should create an author successfully', () => {
    authorEditPage.waitForPresence(authorEditPage.nameInput);
    authorEditPage.fillName(generateRandomString(30, false));
    authorEditPage.selectFirstFromBooks();
    authorEditPage.waitToBeClickable(authorEditPage.submitButton);
    authorEditPage.submit();
    authorEditPage.waitForPresence(authorEditPage.toastMessage);
    expect(authorEditPage.hasSuccessToast()).toBeTruthy('No success toast');
  });

  it('should edit an author successfully', async function () {
    authorEditPage.navigateToUrl(AUTHORS_EDIT_URL + '1');
    authorEditPage.waitForPresence(authorEditPage.nameInput);
    let currentName = await authorEditPage.nameInput.getText();
    currentName += generateRandomString(5, true);
    authorEditPage.fillName(currentName);
    authorEditPage.waitToBeClickable(authorEditPage.submitButton);
    authorEditPage.submit();
    authorEditPage.waitForPresence(authorEditPage.toastMessage);
    expect(authorEditPage.hasSuccessToast()).toBeTruthy('No success toast');
  });

  fit('should create an author without adding new books through master-detail', function () {
    browser.waitForAngular();
    authorEditPage.waitForPresence(authorEditPage.nameInput);
    authorEditPage.fillName(generateRandomString(30, false));
    authorEditPage.selectFirstFromBooks();
    authorEditPage.waitForPresence(authorEditPage.getDeleteBookButtonElement(0), 'No book was added');
    authorEditPage.waitToBeClickable(authorEditPage.submitButton);
    authorEditPage.submit();
    authorEditPage.waitForPresence(authorEditPage.toastMessage);
    expect(authorEditPage.hasSuccessToast()).toBeTruthy('No success toast');
    authorEditPage.clickToast();
  });

  fit('should delete from the list a selected book', function () {
    authorEditPage.waitForPresence(authorListPage.createMasterDetailButton);
    authorListPage.createMasterDetailButton.click();
    authorEditPage.waitForPresence(authorEditPage.nameInput);
    authorEditPage.fillName(generateRandomString(30, false));
    authorEditPage.selectFirstFromBooks();
    authorEditPage.waitForPresence(authorEditPage.getDeleteBookButtonElement(0), 'No book was added');
    authorEditPage.deleteAddedBook(0);
    expect(authorEditPage.getDeleteBookButtonElement(0).isPresent()).toBeFalsy();
  });
});
