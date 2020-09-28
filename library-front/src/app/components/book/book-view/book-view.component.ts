import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  item: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.getItem();
  }

  getServiceURL(): string {
    return 'books';
  }

  getRouterURL(): string {
    return 'books';
  }

  backToList(): void {
    this.router.navigate([this.getRouterURL()]);
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  getItem(): void {
    const id = this.getParamId();
    this.crudService.getOne(this.getServiceURL(), id).subscribe((res => {
      this.item = res;
      this.postGetItem();
    }));
  }

  postGetItem(): void {
    this.item.publicationDate = new Date(this.item.publicationDate).toISOString().slice(0, 10);
    console.log(this.item.publicationDate)
  }

}
