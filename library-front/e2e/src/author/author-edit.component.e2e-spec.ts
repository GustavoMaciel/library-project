import { AuthorEditPageObject } from '../page-objects/author-edit.po';
import { AuthorListPageObject } from '../page-objects/author-list.po';
import { generateRandomString } from '../utils/string.utils';

describe('AuthorEditComponent', () => {
  const authorListPage = new AuthorListPageObject();
  const authorEditPage = new AuthorEditPageObject();

  beforeAll(() => {
    authorEditPage.navigateTo();
    authorEditPage.waitForPresence(authorEditPage.nameInput);
  });

  it('should create an author successfully', () => {
    authorEditPage.fillName(generateRandomString(30, false));
    authorEditPage.selectFirstFromBooks();
    authorEditPage.waitToBeClickable(authorEditPage.submitButton);
    authorEditPage.submit();
    authorEditPage.waitForPresence(authorEditPage.toastMessage);
    expect(authorEditPage.hasSuccessToast()).toBeTruthy('No success toast');
  });
});
