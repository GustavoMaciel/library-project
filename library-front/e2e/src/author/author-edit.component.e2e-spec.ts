import { AuthorEditPageObject } from '../page-objects/author-edit.po';
import { generateRandomString } from '../utils/string.utils';
import { AUTHORS_CREATE_URL, AUTHORS_EDIT_URL } from '../domain/consts';

describe('AuthorEditComponent', () => {
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

  fit('should create an author through master-detail', function () {
    authorEditPage.navigateToUrl(AUTHORS_CREATE_URL + '/master-detail');
    authorEditPage.waitForPresence(authorEditPage.nameInput);
    authorEditPage.fillName(generateRandomString(30, false));
  });
});
