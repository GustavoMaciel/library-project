import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../shared/services/crud.service';
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

  books: any = [];
  booksLoading = false;
  editHandler: EditHandler;

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
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

  searchBooks(term: any) {
    this.booksLoading = true;
    this.crudService.getAll('books', this.generateFilter(term)).subscribe((res: any) => {
      this.books = res.items;
      this.booksLoading = false;
    }, _err => {
      this.booksLoading = false;
    });
  }

  generateFilter(term: any) {
    return {
      search: term.term,
      pageSize: 10,
      currentPage: 0,
      sort: {
        order: 'ASC'
      }
    };
  }


  preInsert(): void {
  }

  preUpdate() {
  }

  postGetItem() {
  }

  postInsert() {
  }

  postUpdate() {
  }
}
