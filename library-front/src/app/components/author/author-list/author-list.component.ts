import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  removeItem: any;

  constructor(private service: CrudService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.listItems();
  }

  getServiceURL(): string {
    return `http://localhost:8080/library/authors`
  }

  getRouterURL(): string {
    return 'authors';
  }

  listItems() {
    this.loading = true;
    this.service.get(this.getServiceURL()).subscribe((res: any) => {
      this.items = res.items;
      this.pageSize = res.pageSize;
      this.currentPage = res.currentPage;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    })
  }

  isEmpty() {
    return this.items.length > 0;
  }

  view(item: any) {
    return this.router.navigate([this.getRouterURL(), 'view', item.id]);
  }

  edit(item: any) {
    return this.router.navigate([this.getRouterURL(), 'edit', item.id]);
  }

  setRemove(item: any) {
    this.removeItem = item;
    // this.remove();
  }

  remove() {
    this.service.delete(`${this.getServiceURL()}/${this.removeItem.id}`, {}).subscribe(_res => {
      this.listItems();
    this.removeItem = null;
    }, (error: any) => {
    })
  }
}