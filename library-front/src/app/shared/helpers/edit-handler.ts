import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { NotificationService } from '../services/notification.service';
import { AppInjector } from './app.injector';
import { EditHandlerCaller } from './edit-handler-caller';

export class EditHandler {
  service: CrudService;
  router: Router;
  notificationService: NotificationService;
  formBuilder: FormBuilder;

  isEditMode: boolean;
  form: FormGroup;
  item: any;
  items: any[] = [];
  loading = false;
  searchLoading = false;

  constructor(
    private serviceUrl: string,
    private routerUrl: string,
    private isUpdatePartial: boolean,
    private callingContext: EditHandlerCaller
  ) {
    this.service = AppInjector.get(CrudService);
    this.router = AppInjector.get(Router);
    this.notificationService = AppInjector.get(NotificationService);
    this.formBuilder = AppInjector.get(FormBuilder);
  }

  getFormBuilder() {
    return this.formBuilder;
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
      this.service.getOne(this.serviceUrl, id).subscribe(result => {
        this.item = result;
        this.getFormControlFromObject(this.form.controls, this.item);
        if (this.callingContext) {
          this.callingContext.postGetItem();
        }
      }, (err: any) => {
        this.notificationService.errorMessage(err.error ? err.error.message : err.message);
      });
    }
  }

  backToList() {
    this.router.navigate([this.routerUrl]).then(_res => {});
  }

  onSubmit() {
    if (this.isEditMode) {
      this.update();
    } else {
      this.insert();
    }
  }

  insert() {
    if (this.callingContext) {
      this.callingContext.preInsert();
    }
    this.service.post(this.serviceUrl, this.form.value).subscribe(_res => {
      this.loading = false;
      if (this.callingContext) {
        this.callingContext.postInsert();
      }
      this.backToList();
    }, (err: any) => {
      this.notificationService.errorMessage(err.error ? err.error.message : err.message);
      this.loading = false;
    });
  }

  update() {
    this.loading = true;
    if (this.callingContext) {
      this.callingContext.preUpdate();
    }
    const callback = (_res) => {
      this.loading = false;
      if (this.callingContext) {
        this.callingContext.postUpdate();
      }
      this.backToList();
    }
    const errCallback = (err: any) => {
      this.notificationService.errorMessage(err.error ? err.error.message : err.message);
      this.loading = false;
    }
    if (this.isUpdatePartial) {
      this.service.updatePartial(this.serviceUrl, this.form.value).subscribe(callback, errCallback);
    } else {
      this.service.update(this.serviceUrl, this.form.value).subscribe(callback, errCallback);
    }
  }

  searchItems(url: string, term: any, pageSize?: number, currentPage?: number, order?: string): void {
    this.searchLoading = true;
    this.service.getAll(url, this.generateFilter(term, pageSize, currentPage, order)).subscribe((res: any) => {
      this.items = res.items;
      this.searchLoading = false;
    }, _err => {
      this.searchLoading = false;
    });
  }

  generateFilter(term: any, pageSize = 10, currentPage = 0, order = 'ASC') {
    return {
      search: term.term,
      pageSize,
      currentPage,
      sort: {
        order
      }
    };
  }
}
