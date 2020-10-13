import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { BookURL } from 'src/app/shared/url/url.domain';
import { ViewContext } from 'src/app/shared/helpers/view-context';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  viewContext: ViewContext;

  constructor(private activatedRoute: ActivatedRoute) {
    this.viewContext = new ViewContext(BookURL.BASE, BookURL.BASE);
  }

  ngOnInit() {
    this.viewContext.getItem(this.getParamId());
    this.viewContext.postGetItem = this.postGetItem;
  }

  postGetItem(item): void {
    item.publicationDate = new Date(item.publicationDate).toISOString().slice(0, 10);
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

}
