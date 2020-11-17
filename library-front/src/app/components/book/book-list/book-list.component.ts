import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookURL } from 'src/app/shared/url/url.domain';
import { ListHandler } from '../../../shared/helpers/list-handler';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit /*, ListHandlerCaller */ {

  listHandler: ListHandler;

  constructor(private router: Router) {
    this.listHandler = new ListHandler(BookURL.BASE, BookURL.BASE);
  }

  ngOnInit() {
    this.listHandler.listItems();
  }

  createMasterDetail() {
    return this.router.navigate(['books/create/master-detail']);
  }

}
