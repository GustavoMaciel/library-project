import { AuthorEditPageObject } from '../page-objects/author-edit.po';
import { AuthorListPageObject } from '../page-objects/author-list.po';

describe('AuthorEditComponent', () => {
  const authorListPage = new AuthorListPageObject();
  const authorEditPage = new AuthorEditPageObject();

  beforeAll(() => {
    authorEditPage.navigateTo();
    authorEditPage.waitForPresence(authorEditPage.nameInput);
  });

  it('should create an author successfully', () => {
    authorEditPage.fillName('Testing');
    authorEditPage.selectFirstFromBooks();
    authorEditPage.waitToBeClickable(authorEditPage.submitButton);
    authorEditPage.submit();
  });
});
