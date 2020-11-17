import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Validators } from '@angular/forms';
import { BookURL } from 'src/app/shared/url/url.domain';
import { EditHandler } from '../../../shared/helpers/edit-handler';
import { EditHandlerCaller } from '../../../shared/helpers/edit-handler-caller';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, EditHandlerCaller {

  editHandler: EditHandler;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.editHandler = new EditHandler(BookURL.BASE, BookURL.BASE, true, this);
  }

  ngOnInit() {
    this.editHandler.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.editHandler.getItem(this.getParamId());
    this.editHandler.searchItems('authors', '');
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
