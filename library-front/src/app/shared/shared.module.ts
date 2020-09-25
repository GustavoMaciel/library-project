import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudService } from './services/crud.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [CrudService]
})
export class SharedModule { }
