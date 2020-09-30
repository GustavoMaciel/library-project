import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { isNullOrUndefined } from 'util';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-book-edit-master-detail',
  templateUrl: './book-edit-master-detail.component.html',
  styleUrls: ['./book-edit-master-detail.component.css']
})
export class BookEditMasterDetailComponent implements OnInit {

  form: FormGroup;
  book: any;
  authors: any = [];
  selectedAuthors: any[] = [];
  loading = false;
  isEditMode: boolean;

  constructor(
    private crudService: CrudService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.getAuthors();
  }

  getServiceURL(): string {
    return 'books';
  }

  getRouterURL(): string {
    return 'books';
  }

  updatePartial(): boolean {
    return true;
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(undefined, []),
      name: this.formBuilder.control(undefined, [Validators.required]),
      synopsis: this.formBuilder.control(undefined, [Validators.required]),
      publicationDate: this.formBuilder.control(undefined, [Validators.required]),
      authors: this.formBuilder.control(undefined, [Validators.required]),
      selectedAuthor: this.formBuilder.control(undefined, [])
    });
  }

  getAuthors(): void {
    this.crudService.getAll('authors').subscribe((res: any) => {
      this.authors = res.items;
    });
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
      this.form.get('authors').setValue(this.selectedAuthors);
      this.form.get('selectedAuthor').setValue(undefined);
    } else {
      this.notificationService.errorMessage('Auhtor is already added.');
    }
  }

  removeAuthor(author) {
    this.selectedAuthors = this.selectedAuthors.filter(item => item.id !== author.id);
  }

  backToList(): void {
    this.router.navigate([this.getRouterURL()]);
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

  openCreateAuthorModal() {
    this.modalService.open(ModalService.CREATE_AUTHOR_MODAL);
  }

  newAuthorSubmitted(author: any) {
    this.selectedAuthors.push(author);
    this.form.get('authors').setValue(this.selectedAuthors);
  }

}
