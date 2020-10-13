import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { ViewContext } from 'src/app/shared/helpers/view-context';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.css']
})
export class AuthorViewComponent implements OnInit {

  viewContext: ViewContext;

  constructor(private activatedRoute: ActivatedRoute) {
    this.viewContext = new ViewContext(AuthorURL.BASE, AuthorURL.BASE);
  }

  hasBooks(author) {
    return author.books && author.books.length > 0
  }

  ngOnInit() {
   this.viewContext.getItem(this.getParamId());
  }

  getParamId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  postGetItem(): void {

  }

}
