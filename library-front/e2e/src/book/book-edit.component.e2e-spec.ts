import { BookListPageObject } from '../page-objects/book-list.po';
import { BookEditPageObject } from '../page-objects/book-edit.po';
import { generateRandomString } from '../utils/string.utils';

describe('BookEditComponent', () => {
    const bookListPage = new BookListPageObject();
    const bookEditPage = new BookEditPageObject();

    beforeAll(() => {
        bookEditPage.navigateTo();
        bookEditPage.waitForPresence(bookEditPage.nameInput);
    });

    it('should create a book successfully', () => {
        bookEditPage.fillName(generateRandomString(30, false));
        bookEditPage.selectFirstFromAuthors();
        bookEditPage.fillPublicationDate('10/10/2019');
        bookEditPage.fillSynopsisInput(generateRandomString(50, false));
        bookEditPage.waitToBeClickable(bookEditPage.submitButton);
        bookEditPage.submit();
        bookEditPage.waitForPresence(bookEditPage.toastMessage);
        expect(bookEditPage.hasSuccessToast()).toBeTruthy('No success toast');
    });
});
