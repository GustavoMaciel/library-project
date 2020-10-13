import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../shared/services/crud.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { isNullOrUndefined } from 'util';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { EditContext } from '../../../shared/helpers/edit-context';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  books: any = [];
  booksLoading = false;
  editContext: EditContext;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private notificationService: NotificationService
  ) {
    this.editContext = new EditContext(AuthorURL.BASE, AuthorURL.BASE);
  }

  ngOnInit() {
    this.editContext.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.editContext.getItem(this.getParamId());
    this.searchBooks('');
    this.editContext.postInsert = this.postInsert;
    this.editContext.postUpdate = this.postUpdate;
  }

  initForm() {
    this.editContext.form = this.formBuilder.group({
      id: this.formBuilder.control(undefined, []),
      name: this.formBuilder.control(undefined, [Validators.required]),
      books: this.formBuilder.control(undefined, [])
    });
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  postUpdate(): void {
    this.notificationService.updateSucess();
  }

  postInsert(): void {
    this.notificationService.insertedSuccess();
  }

  searchBooks(term: any) {
    this.booksLoading = true;
    const filter = this.generateFilter(term);
    this.crudService.getAll('books', filter).subscribe((res: any) => {
      this.books = res.items;
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
}
