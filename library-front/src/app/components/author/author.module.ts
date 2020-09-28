import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorViewComponent } from './author-view/author-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: AuthorListComponent
  },
  {
    path: 'edit/:id',
    component: AuthorEditComponent
  },
  {
    path: 'view/:id',
    component: AuthorViewComponent
  },
  {
    path: 'create',
    component: AuthorEditComponent
  }
];

@NgModule({
  declarations: [AuthorListComponent, AuthorEditComponent, AuthorViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [AuthorListComponent, AuthorEditComponent, AuthorViewComponent]
})
export class AuthorModule { }
