import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudService } from './services/crud.service';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [DeleteConfirmationComponent, LoadingComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DeleteConfirmationComponent,
    LoadingComponent
  ],
  providers: [CrudService]
})
export class SharedModule { }
