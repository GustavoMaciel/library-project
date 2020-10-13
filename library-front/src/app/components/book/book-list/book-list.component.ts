import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BookURL } from 'src/app/shared/url/url.domain';
import { ModalService } from '../../../shared/services/modal.service';
import { ListContext } from '../../../shared/utils/list-context';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  listContext: ListContext;

  constructor(
      private crudService: CrudService,
      private router: Router,
      private notificationService: NotificationService,
      private modalService: ModalService
    ) {
    this.listContext = new ListContext(crudService, router, notificationService, modalService, BookURL.BASE, BookURL.BASE);
  }

  ngOnInit() {
    this.listContext.listItems();
  }

  createMasterDetail(): void {
    this.router.navigate(['books/create/master-detail']);
  }

}
