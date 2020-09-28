import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.css']
})
export class AuthorViewComponent implements OnInit {

  loading: boolean;
  author: any;

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
  }

  hasBooks(author) {
    return author.books && author.books.length > 0
  }

  ngOnInit() {
    this.initProperties();
    this.fetchItem();
  }

  initProperties() {
    this.loading = false;
    this.author = {}
  }

  getUrlParam(param: string) {
    return this.activatedRoute.snapshot.paramMap.get(param);
  }

  fetchItem() {
    this.loading = true;
    this.crudService.getOne(this.getServiceUrl(), this.getUrlParam('id')).subscribe((res: any) => {
      this.author = res;
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      this.notificationService.errorMessage(err.error ? err.error.message : err.message);
    })
  }

  backToList() {
    return this.router.navigate([this.getRouterUrl()]);
  }

  getServiceUrl(): string {
    return `authors`;
  }

  getRouterUrl(): string {
    return `authors`;
  }

}
