import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { CrudService } from '../../services/crud.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-book-simple-edit',
  templateUrl: './book-simple-edit.component.html',
  styleUrls: ['./book-simple-edit.component.css']
})
export class BookSimpleEditComponent implements OnInit {

  isEditMode: boolean;
  form: FormGroup;
  book: any = {};
  loading = false;
  identifier = ModalService.BOOK_SIMPLE_EDIT_ID;
  @Output()
  onSubmitEvent = new EventEmitter<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.isEditMode = this.book.id !== null;
    this.initForm();
    this.getItem();
  }

  initProperties() {
    this.book = {};
    this.loading = false;
  }

  getServiceURL(): string {
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
    return this.book.id;
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

  onSubmit(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.insert();
    }
  }

  insert(): void {
    this.preInsert();
    this.onSubmitEvent.emit(this.form.value);
    this.loading = false;
    this.postInsert();
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
    this.closeModal();
  }

  postGetItem(): void {
    this.getFormControlFromObject(this.form.controls, this.book);
    this.form.get('publicationDate').setValue(new Date(this.book.publicationDate).toISOString().slice(0, 10));
  }

  openModal() {
    this.book = this.modalService.getModalData(this.identifier);
  }

  closeModal() {
    this.modalService.close(this.identifier);
    this.resetComponent();
  }

  resetComponent() {
    this.form.reset();
    this.initProperties();
    this.ngOnInit();
  }
}
