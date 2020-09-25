import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudService } from './services/crud.service';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';


@NgModule({
  declarations: [DeleteConfirmationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DeleteConfirmationComponent
  ],
  providers: [CrudService]
})
export class SharedModule { }
