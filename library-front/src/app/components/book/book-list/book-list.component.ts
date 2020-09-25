import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any[] = [];

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.crudService.getAll('books').subscribe((result: any) => {
      this.books = result;
    });
  }

}
