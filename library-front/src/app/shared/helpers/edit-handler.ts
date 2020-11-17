import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { NotificationService } from '../services/notification.service';
import { AppInjector } from './app.injector';

export class EditHandler {
  callingContext: any;
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

  postUpdate: Function = () => {
    this.notificationService.updateSucess();
  };
  postInsert: Function = () => {
    this.notificationService.insertedSuccess();
  };
  postGetItem: Function = () => {};
  preInsert: Function = (callingContext: any) => {};
  preUpdate: Function = (callingContext: any) => {};

  constructor(
    private serviceUrl: string,
    private routerUrl: string,
    private isUpdatePartial: boolean
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
        this.postGetItem();
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
    this.preInsert(this.callingContext);
    this.service.post(this.serviceUrl, this.form.value).subscribe(_res => {
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
    this.preUpdate(this.callingContext);
    if (this.isUpdatePartial) {
      this.service.updatePartial(this.serviceUrl, this.form.value).subscribe(_res => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (err) => {
        this.notificationService.errorMessage(err.error ? err.error.message : err.message);
        this.loading = false;
      });
    } else {
      this.service.update(this.serviceUrl, this.form.value).subscribe(_res => {
        this.loading = false;
        this.postUpdate();
        this.backToList();
      }, (err) => {
        this.notificationService.errorMessage(err.error ? err.error.message : err.message);
        this.loading = false;
      });
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
