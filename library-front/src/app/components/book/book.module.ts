import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { BookViewComponent } from './book-view/book-view.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookEditMasterDetailComponent } from './book-edit-master-detail/book-edit-master-detail.component';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'create',
    component: BookEditComponent
  },
  {
    path: 'create/master-detail',
    component: BookEditMasterDetailComponent
  },
  {
    path: 'edit/:id',
    component: BookEditComponent
  },
  {
    path: 'view/:id',
    component: BookViewComponent
  }
];

@NgModule({
  declarations: [BookViewComponent, BookEditComponent, BookListComponent, BookEditMasterDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PaginationModule
  ],
  exports: [BookViewComponent, BookEditComponent, BookListComponent, BookEditMasterDetailComponent]
})
export class BookModule { }
