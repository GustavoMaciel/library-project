import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../shared/services/crud.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { isNullOrUndefined } from "util";
import { ModalService } from '../../../shared/services/modal.service';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { EditHandler } from '../../../shared/helpers/edit-handler';
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
  editHandler: EditHandler;

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) {
    this.editHandler = new EditHandler(AuthorURL.BASE, AuthorURL.BASE, true, this);
  }

  ngOnInit() {
    this.editHandler.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.editHandler.getItem(this.getParamId());
    this.searchBooks('');
  }

  initForm() {
    this.editHandler.form = this.editHandler.getFormBuilder().group({
      id: this.editHandler.getFormBuilder().control(undefined, []),
      name: this.editHandler.getFormBuilder().control(undefined, [Validators.required]),
      books: this.editHandler.getFormBuilder().control(undefined, []),
      selectedBook: this.editHandler.getFormBuilder().control(undefined, [])
    });
  }

  get selectedBookControl () {
    return this.editHandler.form.get('selectedBook');
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  searchBooks(term: any) {
    this.booksLoading = true;
    this.editHandler.getCrudService().getAll('books', this.editHandler.generateFilter(term)).subscribe((res: any) => {
      this.books = res.items;
      this.booksLoading = false;
    })
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

  preInsert(): void {
    this.editHandler.form.get('books').setValue(this.selectedBooks);
  }

  preUpdate() {
  }

  postGetItem() {
  }

  postInsert() {
    this.editHandler.notificationService.successMessage('Item created successfully');
  }

  postUpdate() {
    this.editHandler.notificationService.successMessage('Item updated successfully');
  }
}
