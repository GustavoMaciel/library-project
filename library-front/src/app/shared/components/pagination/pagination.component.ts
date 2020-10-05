import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output()
  pageChanged = new EventEmitter<any>();

  @Output()
  pageSizeChanged = new EventEmitter<any>();

  @Input() totalRecords: number;

  @Input()
  set setTotalPages(value) {
    this.totalPages = value;
    this.updatePages();
  }

  totalPages = 1;

  readonly firstPage: number = 1;

  maxPages = 5;

  currentPage = 1;

  last = 1;

  pages = [];

  constructor() { }

  ngOnInit() {
    this.updatePages();
  }

  updatePages(): void {
    this.last = this.totalPages;

    const fitAll = this.totalPages <= this.maxPages;

    let firstIndex = fitAll ? 1 : this.currentPage - 2;
    let lastIndex = fitAll ? this.totalPages : this.currentPage + 2;

    if (this.totalPages === 1) {
      this.currentPage = 1;
    }

    if (firstIndex < this.firstPage) {
      firstIndex = this.firstPage;
      lastIndex = lastIndex + (lastIndex - this.firstPage);
    } else if (lastIndex > this.totalPages) {
      firstIndex = firstIndex - (lastIndex - this.totalPages);
      lastIndex = this.totalPages;
    }

    let index = firstIndex;
    this.pages = [];

    for (let i = 0; i < this.maxPages; i++) {
      if (index <= lastIndex) {
        this.pages[i] = index++;
      }
    }
  }

  changePage(page) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.updatePages();

      this.pageChanged.emit(page);
    }
  }

  changeToFirstPage() {
    this.changePage(this.firstPage);
  }

  changeToLastPage() {
    this.changePage(this.last);
  }

  pageSizeChange(pageSize: number) {
    this.pageSizeChanged.emit(pageSize);
  }

}
