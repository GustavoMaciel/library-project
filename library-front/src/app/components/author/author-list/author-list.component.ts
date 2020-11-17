import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { ListHandler } from '../../../shared/helpers/list-handler';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  listHandler: ListHandler;

  constructor(private router: Router) {
    this.listHandler = new ListHandler(AuthorURL.BASE, AuthorURL.BASE)
  }

  ngOnInit() {
    this.listHandler.listItems();
  }

  createMasterDetail() {
    return this.router.navigate([AuthorURL.BASE, 'create', 'master-detail']);
  }
}
