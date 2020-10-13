import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookURL } from 'src/app/shared/url/url.domain';
import { ListContext } from '../../../shared/utils/list-context';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  listContext: ListContext;

  constructor(private router: Router) {
    this.listContext = new ListContext(BookURL.BASE, BookURL.BASE);
  }

  ngOnInit() {
    this.listContext.listItems();
  }

  createMasterDetail() {
    return this.router.navigate(['books/create/master-detail']);
  }

}
