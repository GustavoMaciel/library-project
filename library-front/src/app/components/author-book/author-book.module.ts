import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorBookComponent } from './author-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: AuthorBookComponent
  }
];

@NgModule({
  declarations: [AuthorBookComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    RouterModule,
    NgSelectModule
  ]
})
export class AuthorBookModule { }
