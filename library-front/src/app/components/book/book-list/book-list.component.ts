import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BookURL } from 'src/app/shared/url/url.domain';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any[] = [];
  removeItem: any;
  pageSize = 10;
  currentPage = 0;
  totalRecords = 0;
  totalPages = 0;
  currentSearch = '';
  loading = false;

  constructor(
    private crudService: CrudService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.listItems();
  }

  getServiceURL(): string {
    return BookURL.BASE;
  }

  getRouterURL(): string {
    return 'books';
  }

  postGetItems(): void {
  }

  listItems(): void {
    this.crudService.getAll(this.getServiceURL(), this.generatePagination()).subscribe((res: any) => {
      this.books = res.items;
      this.pageSize = res.pageSize;
      this.currentPage = res.currentPage;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages;
      this.loading = false;
      this.postGetItems();
    }, (err) => {
      this.loading = false;
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

  delete(): void {
    this.crudService.delete('/books', this.removeItem).subscribe(result => {
      this.postDelete();
    });
  }

  confirmDelete(book: any): void {
    this.removeItem = book;
  }

  postDelete(): void {
    this.listItems();
    this.notificationService.deletedSucess();
  }

  createMasterDetail(): void {
    this.router.navigate(['books/create/master-detail']);
  }

  onChangePaginator(page: number): void {
    this.currentPage = page - 1;
    this.listItems();
  }

  onChangePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 0;
    this.listItems();
  }

  onSearch(searchText: string): void {
    this.currentPage = 0;
    this.currentSearch = searchText;
    this.listItems();
  }

  generatePagination(): object {
    return {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      search: this.currentSearch
    };
  }

}
