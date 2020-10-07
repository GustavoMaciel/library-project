
import { browser } from 'protractor';
import { BOOKS_CREATE_URL } from '../domain/consts';
import { BookListPageObject } from '../page-objects/book-list.po';
import { BookEditPageObject } from '../page-objects/book-edit.po';
import { generateRandomString } from '../utils/string.utils';

describe('BookListComponent', () => {
  const bookListPage = new BookListPageObject();
  const bookEditPage = new BookEditPageObject();

  beforeAll(() => {
    bookListPage.navigateTo();
    bookListPage.waitForPresence(bookListPage.createButton);
  });

  it('should be listing a book', async () => {
    const book = await bookListPage.getBookAt(0);
    expect(book).toBeDefined();
  });

  it('should delete a book', async () => {
    const book = await await bookListPage.getBookAt(0);
    book.delete.click();
    bookListPage.waitForPresence(bookListPage.confirmButton, 'Modal didn\'t open');
    bookListPage.confirmModal();
    bookListPage.waitForPresence(bookListPage.createButton);
  });

  it('should edit a book', async () => {
    const book = await await bookListPage.getBookAt(0);
    book.edit.click();
    bookListPage.waitForPresence(bookEditPage.submitButton, 'Button is not present');
    bookEditPage.nameInput.clear();
    bookEditPage.fillName(generateRandomString(10, false));
    bookEditPage.submit();
    expect(bookEditPage.hasSuccessToast()).toBeTruthy('No success toast');
  });

  it('should go to create book', () => {
    bookListPage.waitToBeClickable(bookListPage.createButton);
    bookListPage.clickCreateNewBook();
    expect(browser.getCurrentUrl()).toContain(BOOKS_CREATE_URL);
  });
});
