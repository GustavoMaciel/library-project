import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { EditHandler } from '../../../shared/helpers/edit-handler';
import { EditHandlerCaller } from '../../../shared/helpers/edit-handler-caller';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit, EditHandlerCaller {

  editHandler: EditHandler;

  // Books
  booksLoading = false;
  books: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
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
      books: this.editHandler.getFormBuilder().control(undefined, [])
    });
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  preInsert(): void {
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

  searchBooks(term: any) {
    this.booksLoading = true;
    this.editHandler.getCrudService().getAll('books', this.editHandler.generateFilter(term)).subscribe((res: any) => {
      this.books = res.items;
      this.booksLoading = false;
    })
  }
}
