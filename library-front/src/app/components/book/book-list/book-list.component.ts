import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any[] = [];

  constructor(
    private crudService: CrudService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.crudService.getAll('books').subscribe((result: any) => {
      this.books = result.items;
    });
  }

  get listIsEmpty(): boolean {
    return this.books.length <= 0;
  }

  create(): void {
    this.router.navigate(['books/create']);
  }

  edit(id: number): void {
    this.router.navigate(['books/edit', id]);
  }

  view(id: number): void {
    this.router.navigate(['books/view', id]);
  }

  delete(id: number): void {
    //TO DO: Modal confirmation delete
  }

}
