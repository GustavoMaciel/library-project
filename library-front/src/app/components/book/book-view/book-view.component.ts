import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookURL } from 'src/app/shared/url/url.domain';
import { ViewHandler } from 'src/app/shared/helpers/view-handler';
import { ViewHandlerCaller } from '../../../shared/helpers/view-handler-caller';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit, ViewHandlerCaller {

  viewHandler: ViewHandler;

  constructor(private activatedRoute: ActivatedRoute) {
    this.viewHandler = new ViewHandler(BookURL.BASE, BookURL.BASE, this);
  }

  ngOnInit() {
    this.viewHandler.getItem(this.getParamId());
    this.viewHandler.postGetItem = this.postGetItem;
  }

  postGetItem(): void {
    this.viewHandler.item.publicationDate = new Date(this.viewHandler.item.publicationDate).toISOString().slice(0, 10);
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

}
