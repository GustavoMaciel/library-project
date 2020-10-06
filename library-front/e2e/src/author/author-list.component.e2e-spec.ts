
import { AuthorListPageObject } from '../page-objects/author-list.po';
import { browser } from 'protractor';
import { AUTHORS_CREATE_URL, VISUAL_WAIT } from '../domain/consts';

describe('AuthorEditComponent', () => {
  const authorListPage = new AuthorListPageObject();

  beforeAll(() => {
    authorListPage.navigateTo();
    authorListPage.waitForPresence(authorListPage.createButton);
  });

  it('should be listing an author', async function () {
    const author = await authorListPage.getAuthorAt(0);
    expect(author).toBeDefined();
  });

  it('should delete an author', async function () {
    const author = await authorListPage.getAuthorAt(0);
    author.delete.click();
    authorListPage.waitForPresence(authorListPage.confirmButton, 'Modal didn\'t open');
    authorListPage.confirmModal();
    authorListPage.waitForPresence(authorListPage.createButton);
  });

  it('should go to create author', () => {
    authorListPage.waitToBeClickable(authorListPage.createButton);
    authorListPage.clickCreateNewAuthor();
    expect(browser.getCurrentUrl()).toContain(AUTHORS_CREATE_URL);
  });
});
