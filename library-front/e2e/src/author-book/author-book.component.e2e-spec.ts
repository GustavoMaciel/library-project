import { AuthorEditPageObject } from '../page-objects/author-edit.po';
import { generateRandomString } from '../utils/string.utils';
import { AUTHORS_EDIT_URL } from '../domain/consts';
import { BookEditPageObject } from '../page-objects/book-edit.po';
import { AuthorBookPageObject } from '../page-objects/author-book.po';
import { browser } from 'protractor';

describe('AuthorEditComponent', () => {
  const authorBookPage = new AuthorBookPageObject();

  beforeAll(() => {
    authorBookPage.navigateTo();
    authorBookPage.waitForPresence(authorBookPage.authorsSelect);
    authorBookPage.waitForPresence(authorBookPage.booksSelect);
  });

  it('should associate an author with a book', () => {
    browser.sleep(80000);
    authorBookPage.selectFirstFromAuthors();
    browser.sleep(80000);
    authorBookPage.selectFirstFromBooks();
    browser.sleep(80000);
    authorBookPage.waitToBeClickable(authorBookPage.associateButton);
    authorBookPage.submit();
    authorBookPage.waitForPresence(authorBookPage.toastMessage);
    expect(authorBookPage.hasSuccessToast()).toBeTruthy('No success toast');
  });
});
