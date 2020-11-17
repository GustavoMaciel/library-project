import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';
import { BookURL } from 'src/app/shared/url/url.domain';
import { EditHandler } from '../../../shared/helpers/edit-handler';
import { EditHandlerCaller } from '../../../shared/helpers/edit-handler-caller';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, EditHandlerCaller {

  authors: any = [];
  authorsLoading = false;
  editHandler: EditHandler;

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.editHandler = new EditHandler(BookURL.BASE, BookURL.BASE, true, this);
  }

  ngOnInit() {
    this.editHandler.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.editHandler.getItem(this.getParamId());
    this.searchAuthors('');
  }

  initForm(): void {
    this.editHandler.form = this.editHandler.getFormBuilder().group({
      id: this.editHandler.getFormBuilder().control(undefined, []),
      name: this.editHandler.getFormBuilder().control(undefined, [Validators.required]),
      synopsis: this.editHandler.getFormBuilder().control(undefined, [Validators.required]),
      publicationDate: this.editHandler.getFormBuilder().control(undefined, [Validators.required]),
      authors: this.editHandler.getFormBuilder().control(undefined, [Validators.required])
    });
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  searchAuthors(term: any): void {
    this.authorsLoading = true;
    this.crudService.getAll('authors', this.generateFilter(term)).subscribe((res: any) => {
      this.authors = res.items;
      this.authorsLoading = false;
    }, _err => {
      this.authorsLoading = false;
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

  postGetItem(): void {
    this.editHandler.form.get('publicationDate').setValue(new Date(this.editHandler.item.publicationDate).toISOString().slice(0, 10));
  }


  preInsert(): void {
  }

  preUpdate() {
  }

  postInsert() {
  }

  postUpdate() {
  }
}
