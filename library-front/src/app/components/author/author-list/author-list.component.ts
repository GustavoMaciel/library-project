import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorURL } from 'src/app/shared/url/url.domain';
import { ListContext } from '../../../shared/helpers/list-context';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  listContext: ListContext;

  constructor(private router: Router) {
    this.listContext = new ListContext(AuthorURL.BASE, AuthorURL.BASE)
  }

  ngOnInit() {
    this.listContext.listItems();
  }

  createMasterDetail() {
    return this.router.navigate([AuthorURL.BASE, 'create', 'master-detail']);
  }
}
