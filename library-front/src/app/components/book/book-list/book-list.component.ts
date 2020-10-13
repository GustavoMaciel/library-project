import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BookURL } from 'src/app/shared/url/url.domain';
import { ModalService } from '../../../shared/services/modal.service';
import { ListUtils } from '../../../shared/utils/list-utils';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  listUtils: ListUtils;

  constructor(
      private crudService: CrudService,
      private router: Router,
      private notificationService: NotificationService,
      private modalService: ModalService
    ) {
    this.listUtils = new ListUtils(crudService, router, notificationService, modalService, BookURL.BASE, BookURL.BASE);
  }

  ngOnInit() {
    this.listUtils.listItems();
  }

  createMasterDetail(): void {
    this.router.navigate(['books/create/master-detail']);
  }

}
