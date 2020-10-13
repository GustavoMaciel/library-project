import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { BookURL } from 'src/app/shared/url/url.domain';
import { ViewContext } from 'src/app/shared/utils/view-context';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  viewContext: ViewContext;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.viewContext = new ViewContext(this.crudService, this.router, BookURL.BASE, BookURL.BASE, this.activatedRoute, this.postGetItem);
  }

  ngOnInit() {
    this.viewContext.getItem();
  }

  postGetItem(item): void {
    item.publicationDate = new Date(item.publicationDate).toISOString().slice(0, 10);
  }

}
