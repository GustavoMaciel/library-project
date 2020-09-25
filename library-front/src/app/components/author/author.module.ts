import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: AuthorComponent
  }
];

@NgModule({
  declarations: [AuthorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule
  ],
  exports: [AuthorComponent]
})
export class AuthorModule { }
