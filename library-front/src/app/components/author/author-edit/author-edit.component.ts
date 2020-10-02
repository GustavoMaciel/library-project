import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../shared/services/crud.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { isNullOrUndefined } from 'util';
import { AuthorURL } from 'src/app/shared/url/url.domain';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {


  isEditMode: boolean;
  form: FormGroup;
  author: any;
  books: any = [];
  booksLoading = false;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.getItem();
    this.searchBooks('');
  }

  getServiceURL(): string {
    return AuthorURL.BASE;
  }

  getRouterURL(): string {
    return 'authors';
  }

  updatePartial() {
    return false;
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(undefined, []),
      name: this.formBuilder.control(undefined, [Validators.required]),
      books: this.formBuilder.control(undefined, [])
    });
  }

  getItem() {
    if (this.isEditMode) {
      const paramId = this.getParamId();
      this.crudService.getOne(this.getServiceURL(), paramId).subscribe(result => {
        this.author = result;
        this.getFormControlFromObject(this.form.controls, this.author);
      }, (err: any) => {
        this.notificationService.errorMessage(err.error ? err.error.message : err.message);
      });
    }
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  getFormControlFromObject(controls, obj): any {
    Object.keys(controls).forEach(key => {
      if (controls[key] instanceof FormGroup) {
        if (obj[key]) {
          this.getFormControlFromObject(controls[key].controls, obj[key]);
        }
      } else {
        controls[key].patchValue(obj[key]);
      }
    });
    return controls;
  }

  backToList() {
    this.router.navigate([this.getRouterURL()]).then(res => {});
  }

  onSubmit() {
    if (this.isEditMode) {
      this.update();
    } else {
      this.insert();
    }
  }

  insert() {
    this.preInsert();
    this.crudService.post(this.getServiceURL(), this.form.value).subscribe((res: any) => {
      this.loading = false;
      this.postInsert();
      this.backToList();
    }, (err) => {
      this.loading = false;
    });
  }

  update() {
    this.loading = true;
    this.preUpdate();
    if (this.updatePartial()) {
      this.crudService.updatePartial(this.getServiceURL(), this.form.value).subscribe((res: any) => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (err) => {
        this.loading = false;
      });
    } else {
      this.crudService.update(this.getServiceURL(), this.form.value).subscribe((res: any) => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (err) => {
        this.loading = false;
      });
    }
  }

  preInsert(): void { }

  preUpdate(): void { }

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
