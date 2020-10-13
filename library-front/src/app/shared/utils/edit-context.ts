import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { NotificationService } from '../services/notification.service';

export class EditContext {
  isEditMode: boolean;
  form: FormGroup;
  item: any;
  loading = false;
  isUpdatePartial = false;
  postUpdate: Function = () => {};
  postInsert: Function = () => {};
  preInsert: Function = () => {};
  preUpdate: Function = () => {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private notificationService: NotificationService,
    private serviceUrl,
    private routerUrl
  ) {
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

  getItem(id: any) {
    if (this.isEditMode) {
      this.crudService.getOne(this.serviceUrl, id).subscribe(result => {
        this.item = result;
        this.getFormControlFromObject(this.form.controls, this.item);
      }, (err: any) => {
        this.notificationService.errorMessage(err.error ? err.error.message : err.message);
      });
    }
  }

  backToList() {
    this.router.navigate([this.routerUrl]).then(res => {});
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
    this.crudService.post(this.serviceUrl, this.form.value).subscribe(_res => {
      this.loading = false;
      this.postInsert();
      this.backToList();
    }, (err: any) => {
      this.notificationService.errorMessage(err.error ? err.error.message : err.message);
      this.loading = false;
    });
  }

  update() {
    this.loading = true;
    this.preUpdate();
    if (this.isUpdatePartial) {
      this.crudService.updatePartial(this.serviceUrl, this.form.value).subscribe(_res => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (err) => {
        this.notificationService.errorMessage(err.error ? err.error.message : err.message);
        this.loading = false;
      });
    } else {
      this.crudService.update(this.serviceUrl, this.form.value).subscribe(_res => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (err) => {
        this.notificationService.errorMessage(err.error ? err.error.message : err.message);
        this.loading = false;
      });
    }
  }
}
