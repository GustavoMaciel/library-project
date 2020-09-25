import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookViewComponent } from './book-view/book-view.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
    path: 'edit/:id',
    component: BookEditComponent
  },
  {
    path: 'view/:id',
    component: BookViewComponent
  }
];

@NgModule({
  declarations: [BookViewComponent, BookEditComponent, BookListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [BookViewComponent, BookEditComponent, BookListComponent]
})
export class BookModule { }
