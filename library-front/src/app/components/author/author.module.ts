import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorViewComponent } from './author-view/author-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthorMasterDetailComponent } from './author-master-detail/author-master-detail.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';

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
  },
  {
    path: 'create/master-detail',
    component: AuthorMasterDetailComponent
  }
];

@NgModule({
  declarations: [AuthorListComponent, AuthorEditComponent, AuthorViewComponent, AuthorMasterDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSmartModalModule.forChild(),
    PaginationModule
  ],
  exports: [AuthorListComponent, AuthorEditComponent, AuthorViewComponent]
})
export class AuthorModule { }
