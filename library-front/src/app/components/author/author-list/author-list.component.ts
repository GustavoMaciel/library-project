import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  loading: boolean;
  items: any[];
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  totalPages: number;
  removeItem: any;

  constructor(private service: CrudService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initProperties();
    this.listItems();
  }

  initProperties() {
    this.loading = false;
    this.items = [];
    this.pageSize = 10;
    this.currentPage = 0;
    this.totalRecords = 0;
    this.totalPages = 0;
    this.removeItem = null;
  }

  getServiceURL(): string {
    return `authors`;
  }

  getRouterURL(): string {
    return 'authors';
  }

  listItems() {
    this.loading = true;
    this.service.getAll(this.getServiceURL()).subscribe((res: any) => {
      this.items = res.items;
      this.pageSize = res.pageSize;
      this.currentPage = res.currentPage;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages;
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });
  }

  get listIsEmpty() {
    return this.items.length < 0;
  }

  view(item: any) {
    return this.router.navigate([this.getRouterURL(), 'view', item.id]);
  }

  edit(item: any) {
    return this.router.navigate([this.getRouterURL(), 'edit', item.id]);
  }

  create() {
    return this.router.navigate([this.getRouterURL(), 'create']);
  }

  createMasterDetail() {
    return this.router.navigate([this.getRouterURL(), 'create', 'master-detail']);
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
