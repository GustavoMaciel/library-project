import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  loading = false;
  items: any[] = [];
  pageSize = 10;
  currentPage = 0;
  totalRecords = 0;
  totalPages = 0;

  constructor(private service: CrudService) { }

  ngOnInit() {
    this.listItems();
  }

  listItems() {
    this.loading = true;
    this.service.get('http://localhost:8080/library/authors').subscribe((res: any) => {
      this.items = res.items;
      this.pageSize = res.pageSize;
      this.currentPage = res.currentPage;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages
      this.loading = false;
      console.log(res);
    }, err => {
      console.log(err);
      this.loading = false;
    })
  }

}
