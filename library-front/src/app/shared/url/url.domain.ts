'use strict';

export const SERVER_URL = 'http://' + document.location.hostname + ':8080/library';

// tslint:disable-next-line: no-namespace
export namespace BookURL {
  export const BASE = 'books';
}

// tslint:disable-next-line: no-namespace
export namespace AuthorURL {
  export const BASE = 'authors';
}

// tslint:disable-next-line: no-namespace
export namespace AuthorBookURL {
  export const BASE = 'author-book-associations';
  export const MULTIPLE = BASE + '/multiple';
}
