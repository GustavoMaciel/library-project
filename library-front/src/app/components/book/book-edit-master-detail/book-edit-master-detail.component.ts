import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { isNullOrUndefined } from 'util';
import { ModalService } from 'src/app/shared/services/modal.service';
import { EditHandler } from '../../../shared/helpers/edit-handler';
import { BookURL } from '../../../shared/url/url.domain';
import { EditHandlerCaller } from '../../../shared/helpers/edit-handler-caller';

@Component({
  selector: 'app-book-edit-master-detail',
  templateUrl: './book-edit-master-detail.component.html',
  styleUrls: ['./book-edit-master-detail.component.css']
})
export class BookEditMasterDetailComponent implements OnInit, EditHandlerCaller {

  authors: any = [];
  authorsLoading = false;
  selectedAuthors: any[] = [];
  editHandler: EditHandler;

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) {
    this.editHandler = new EditHandler(BookURL.BASE, BookURL.BASE, true, this);
  }

  ngOnInit() {
    this.editHandler.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.editHandler.getItem(this.getParamId());
    this.searchAuthors('');
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  initForm(): void {
    this.editHandler.form = this.editHandler.getFormBuilder().group({
      id: this.editHandler.getFormBuilder().control(undefined, []),
      name: this.editHandler.getFormBuilder().control(undefined, [Validators.required]),
      synopsis: this.editHandler.getFormBuilder().control(undefined, [Validators.required]),
      publicationDate: this.editHandler.getFormBuilder().control(undefined, [Validators.required]),
      authors: this.editHandler.getFormBuilder().control(undefined, [Validators.required]),
      selectedAuthor: this.editHandler.getFormBuilder().control(undefined, [])
    });
  }

  searchAuthors(term: any): void {
    this.authorsLoading = true;
    this.crudService.getAll('authors', this.generateFilter(term)).subscribe((res: any) => {
      this.authors = res.items;
      this.authorsLoading = false;
    });
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

  onAuthorSelected(author) {
    let exist = false;
    this.selectedAuthors.forEach(item => {
      if (item.id === author.id) {
        exist = true;
        return;
      }
    });
    if (!exist) {
      this.selectedAuthors.push(author);
      this.editHandler.form.get('authors').setValue(this.selectedAuthors);
      this.editHandler.form.get('selectedAuthor').setValue(undefined);
    } else {
      this.notificationService.errorMessage('Author is already added.');
    }
  }

  removeAuthor(author) {
    this.selectedAuthors = this.selectedAuthors.filter(item => item.id !== author.id);
  }

  openCreateAuthorModal() {
    this.modalService.open(ModalService.CREATE_AUTHOR_MODAL);
  }

  newAuthorSubmitted(author: any) {
    this.selectedAuthors.push(author);
  }

  preUpdate() {
  }

  preInsert() {
    this.editHandler.form.get('authors').setValue(this.selectedAuthors);
  }

  postGetItem() {
  }

  postInsert() {
  }

  postUpdate() {
  }

}
