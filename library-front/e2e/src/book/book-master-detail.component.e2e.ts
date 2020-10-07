import { BookEditPageObject } from '../page-objects/book-edit.po';
import { generateRandomString } from '../utils/string.utils';
import { AuthorEditPageObject } from '../page-objects/author-edit.po';

describe('BookMasterComponent', () => {
    const bookEditPage = new BookEditPageObject();
    const authorEditPage = new AuthorEditPageObject();

    beforeAll(() => {
        bookEditPage.navigateToUrl('/books/create/master-detail');
        bookEditPage.waitForPresence(bookEditPage.nameInput);
    });

    it('should create a book successfully', () => {
        bookEditPage.fillName(generateRandomString(30, false));
        bookEditPage.fillPublicationDate('10/10/2019');
        bookEditPage.fillSynopsisInput(generateRandomString(50, false));
        bookEditPage.selectFirstFromAuthors();
        bookEditPage.clickCreateAuthor();
        authorEditPage.fillName(generateRandomString(10, false));
        bookEditPage.waitToBeClickable(authorEditPage.addAuthorButton);
        authorEditPage.clickAddAuthorButton();
        bookEditPage.waitToBeClickable(bookEditPage.submitButton);
        bookEditPage.submit();
        bookEditPage.waitForPresence(bookEditPage.toastMessage);
        expect(bookEditPage.hasSuccessToast()).toBeTruthy('No success toast');
    });
});
