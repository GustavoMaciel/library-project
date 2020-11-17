import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../shared/services/crud.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { isNullOrUndefined } from "util";
import { ModalService } from '../../../shared/services/modal.service';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { EditContext } from '../../../shared/helpers/edit-context';
import { EditHandlerCaller } from '../../../shared/helpers/edit-handler-caller';

@Component({
  selector: 'app-author-master-detail',
  templateUrl: './author-master-detail.component.html',
  styleUrls: ['./author-master-detail.component.css']
})
export class AuthorMasterDetailComponent implements OnInit, EditHandlerCaller {

  books: any = [];
  booksLoading = false;
  selectedBooks = [];
  editContext: EditContext;

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) {
    this.editContext = new EditContext(AuthorURL.BASE, AuthorURL.BASE, true, this);
  }

  ngOnInit() {
    this.editContext.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.editContext.getItem(this.getParamId());
    this.searchBooks('');
  }

  initForm() {
    this.editContext.form = this.editContext.getFormBuilder().group({
      id: this.editContext.getFormBuilder().control(undefined, []),
      name: this.editContext.getFormBuilder().control(undefined, [Validators.required]),
      books: this.editContext.getFormBuilder().control(undefined, []),
      selectedBook: this.editContext.getFormBuilder().control(undefined, [])
    });
  }

  get selectedBookControl () {
    return this.editContext.form.get('selectedBook');
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  preInsert(): void {
    this.editContext.form.get('books').setValue(this.selectedBooks);
  }

  preUpdate() {
  }

  postGetItem() {
  }

  postInsert() {
  }

  postUpdate() {
  }

  searchBooks(term: any) {
    this.booksLoading = true;
    this.crudService.getAll('books', this.generateFilter(term)).subscribe((res: any) => {
      this.books = res.items;
      this.booksLoading = false;
    })
  }

  generateFilter(term: any) {
    if (!term) {
      term = '';
    }
    return {
      search: term.term,
      pageSize: 10,
      currentPage: 0,
      sort: {
        order: "ASC"
      }
    }
  }

  alreadyIncluded(book: any): boolean {
    for (const b of this.selectedBooks) {
      if ((book.id && b.id) && (book.id === b.id)) {
        return true;
      }
    }
    return false;
  }

  onBookSelected(book): void {
    if (!this.alreadyIncluded(book)) {
      this.selectedBooks.push(book);
      this.selectedBookControl.setValue(undefined);
      this.searchBooks('');
    } else {
      this.selectedBookControl.setValue(undefined);
      this.notificationService.errorMessage('Book is already added.');
    }
  }

  removeBook(book): void {
    this.selectedBooks = this.selectedBooks.filter(_book => _book !== book)
  }

  openCreateBookModal() {
    this.modalService.open(ModalService.BOOK_SIMPLE_EDIT_ID);
  }

  newBookSubmitted(book: any) {
    this.selectedBooks.push(book);
  }
}
