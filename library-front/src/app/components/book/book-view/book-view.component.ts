import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookURL } from 'src/app/shared/url/url.domain';
import { ViewHandler } from 'src/app/shared/helpers/view-handler';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  viewHandler: ViewHandler;

  constructor(private activatedRoute: ActivatedRoute) {
    this.viewHandler = new ViewHandler(BookURL.BASE, BookURL.BASE);
  }

  ngOnInit() {
    this.viewHandler.getItem(this.getParamId());
    this.viewHandler.postGetItem = this.postGetItem;
  }

  postGetItem(item): void {
    item.publicationDate = new Date(item.publicationDate).toISOString().slice(0, 10);
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

}
