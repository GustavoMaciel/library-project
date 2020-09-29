import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../shared/services/crud.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { isNullOrUndefined } from "util";
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-author-master-detail',
  templateUrl: './author-master-detail.component.html',
  styleUrls: ['./author-master-detail.component.css']
})
export class AuthorMasterDetailComponent implements OnInit {

  isEditMode: boolean;
  form: FormGroup;
  book: any;
  books: any = [];
  selectedBooks = [];
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.getItem();
    this.getBooks();
  }

  getServiceURL(): string {
    return 'authors';
  }

  getRouterURL(): string {
    return 'authors';
  }

  updatePartial() {
    return true;
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(undefined, []),
      name: this.formBuilder.control(undefined, [Validators.required]),
      books: this.formBuilder.control(undefined, []),
      selectedBook: this.formBuilder.control(undefined, [])
    });
  }

  get selectedBookControl () {
    return this.form.get('selectedBook');
  }

  get booksControl() {
    return this.form.get('books');
  }

  getItem() {
    if (this.isEditMode) {
      const paramId = this.getParamId();
      this.crudService.getOne(this.getServiceURL(), paramId).subscribe(result => {
        this.book = result;
        this.getFormControlFromObject(this.form.controls, this.book);
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
    this.router.navigate([this.getRouterURL()]).then(_res => {});
  }

  getBooks(): void {
    this.crudService.getAll('books').subscribe((res: any) => {
      this.books = res.items;
    });
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
    }, (_err) => {
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
      }, (_err) => {
        this.loading = false;
      });
    } else {
      this.crudService.update(this.getServiceURL(), this.form.value).subscribe((res: any) => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (_err) => {
        this.loading = false;
      });
    }
  }

  preInsert(): void {
    this.booksControl.setValue(this.selectedBooks);
  }

  preUpdate(): void { }

  postUpdate(): void {
    this.notificationService.updateSucess();
  }

  postInsert(): void {
    this.notificationService.insertedSuccess();
  }

  onBookSelected(book): void {
    this.selectedBooks.push(book);
    this.selectedBookControl.setValue(undefined);
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
}
