import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { ViewHandler } from 'src/app/shared/helpers/view-handler';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.css']
})
export class AuthorViewComponent implements OnInit {

  viewHandler: ViewHandler;

  constructor(private activatedRoute: ActivatedRoute) {
    this.viewHandler = new ViewHandler(AuthorURL.BASE, AuthorURL.BASE);
  }

  hasBooks(author) {
    return author.books && author.books.length > 0
  }

  ngOnInit() {
   this.viewHandler.getItem(this.getParamId());
  }

  getParamId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  postGetItem(): void {

  }

}
