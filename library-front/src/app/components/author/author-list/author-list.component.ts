import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { Router } from '@angular/router';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { NotificationService } from '../../../shared/services/notification.service';
import { ModalService } from '../../../shared/services/modal.service';
import { ListContext } from '../../../shared/utils/list-context';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  listContext: ListContext;

  constructor(
      private service: CrudService,
      private router: Router,
      private notificationService: NotificationService,
      private modalService: ModalService
    ) {
    this.listContext = new ListContext(service, router, notificationService, modalService, AuthorURL.BASE, AuthorURL.BASE)
  }

  ngOnInit() {
    this.listContext.listItems();
  }

  createMasterDetail() {
    return this.router.navigate([AuthorURL.BASE, 'create', 'master-detail']);
  }
}
