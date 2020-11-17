import { CrudService } from '../services/crud.service';
import { ModalService } from '../services/modal.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { AppInjector } from './app.injector';
import { ListHandlerCaller } from './list-handler-caller';

export class ListHandler{

  service: CrudService;
  router: Router;
  notificationService: NotificationService;
  modalService: ModalService;

  loading: boolean;
  items: any[];
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  totalPages: number;
  removeItem: any;
  currentSearch: string;

  get listIsEmpty() {
    return this.items.length <= 0;
  }

  constructor(
      private serviceUrl: string,
      private routerUrl: string,
      private callingContext: ListHandlerCaller = undefined
    ) {
    this.initProperties();
    this.service = AppInjector.get(CrudService);
    this.router = AppInjector.get(Router);
    this.notificationService = AppInjector.get(NotificationService);
    this.modalService = AppInjector.get(ModalService);
  }

  initProperties() {
    this.loading = false;
    this.items = [];
    this.pageSize = 10;
    this.currentPage = 0;
    this.totalRecords = 0;
    this.totalPages = 0;
    this.removeItem = null;
    this.currentSearch = '';
  }

  listItems(customUrl?: string) {
    this.loading = true;
    this.service.getAll(customUrl ? customUrl : this.serviceUrl, this.generatePagination()).subscribe((res: any) => {
      this.items = res.items;
      this.pageSize = res.pageSize;
      this.currentPage = res.currentPage;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages;
      if (this.callingContext) {
        this.callingContext.postGetItems();
      }
      this.loading = false;
    }, _err => {
      this.loading = false;
    });
  }

  view(item: any) {
    return this.router.navigate([this.routerUrl, 'view', item.id]);
  }

  edit(item: any) {
    return this.router.navigate([this.routerUrl, 'edit', item.id]);
  }

  create() {
    return this.router.navigate([this.routerUrl, 'create']);
  }

  generatePagination() {
    return {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      search: this.currentSearch
    };
  }

  setRemove(item: any) {
    this.removeItem = item;
    this.modalService.open(ModalService.DELETE_MODAL_ID);
  }

  remove(customUrl?: string) {
    this.service.delete(customUrl ? customUrl : this.serviceUrl, this.removeItem).subscribe(_res => {
      if (this.callingContext) {
        this.callingContext.postDelete();
      }
      this.listItems();
      this.removeItem = null;
    }, (err: any) => {
      this.notificationService.errorMessage(err.error ? err.error.message : err.message, 'Delete Error');
    });
  }

  onChangePaginator(page: number): void {
    this.currentPage = page - 1;
    this.listItems();
  }

  onChangePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 0;
    this.listItems();
  }

  onSearch(searchText: string): void {
    this.currentPage = 0;
    this.currentSearch = searchText;
    this.listItems();
  }
}
