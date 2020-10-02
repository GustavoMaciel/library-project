import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BookURL } from 'src/app/shared/url/url.domain';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  isEditMode: boolean;
  form: FormGroup;
  book: any;
  authors: any = [];
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
    this.getAuthors();
  }

  getServiceURL(): string {
    return BookURL.BASE;
  }

  getRouterURL(): string {
    return 'books';
  }

  updatePartial(): boolean {
    return true;
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(undefined, []),
      name: this.formBuilder.control(undefined, [Validators.required]),
      synopsis: this.formBuilder.control(undefined, [Validators.required]),
      publicationDate: this.formBuilder.control(undefined, [Validators.required]),
      authors: this.formBuilder.control(undefined, [Validators.required])
    });
  }

  getItem(): void {
    if (this.isEditMode) {
      const paramId = this.getParamId();
      this.crudService.getOne('books', paramId).subscribe(result => {
        this.book = result;
        this.postGetItem();
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

  backToList(): void {
    this.router.navigate(['books']);
  }

  getAuthors(): void {
    this.crudService.getAll('authors').subscribe((res: any) => {
      this.authors = res.items;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.insert();
    }
  }

  insert(): void {
    this.preInsert();
    this.crudService.post(this.getServiceURL(), this.form.value).subscribe((res: any) => {
      this.loading = false;
      this.postInsert();
      this.backToList();
    }, (err) => {
      this.loading = false;
      this.notificationService.error();
    });
  }

  update(): void {
    this.loading = true;
    this.preUpdate();
    if (this.updatePartial()) {
      this.crudService.updatePartial(this.getServiceURL(), this.form.value).subscribe((res: any) => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (err) => {
        this.loading = false;
        this.notificationService.error();
      });
    } else {
      this.crudService.update(this.getServiceURL(), this.form.value).subscribe((res: any) => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (err) => {
        this.loading = false;
        this.notificationService.error();
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

  postGetItem(): void {
    this.getFormControlFromObject(this.form.controls, this.book);
    this.form.get('publicationDate').setValue(new Date(this.book.publicationDate).toISOString().slice(0, 10));
  }
}
