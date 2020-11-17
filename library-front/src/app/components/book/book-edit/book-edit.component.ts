import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';
import { BookURL } from 'src/app/shared/url/url.domain';
import { EditContext } from '../../../shared/helpers/edit-context';
import { EditHandlerCaller } from '../../../shared/helpers/edit-handler-caller';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, EditHandlerCaller {

  authors: any = [];
  authorsLoading = false;
  editContext: EditContext;

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.editContext = new EditContext(BookURL.BASE, BookURL.BASE, true, this);
  }

  ngOnInit() {
    this.editContext.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.editContext.getItem(this.getParamId());
    this.searchAuthors('');
  }

  initForm(): void {
    this.editContext.form = this.editContext.getFormBuilder().group({
      id: this.editContext.getFormBuilder().control(undefined, []),
      name: this.editContext.getFormBuilder().control(undefined, [Validators.required]),
      synopsis: this.editContext.getFormBuilder().control(undefined, [Validators.required]),
      publicationDate: this.editContext.getFormBuilder().control(undefined, [Validators.required]),
      authors: this.editContext.getFormBuilder().control(undefined, [Validators.required])
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
    this.editContext.form.get('publicationDate').setValue(new Date(this.editContext.item.publicationDate).toISOString().slice(0, 10));
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
