import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudService } from './services/crud.service';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotificationService } from './services/notification.service';
import { ModalService } from './services/modal.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BookSimpleEditComponent } from './components/book-simple-edit/book-simple-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DeleteConfirmationComponent, LoadingComponent, BookSimpleEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxSmartModalModule.forChild(),
    ReactiveFormsModule
  ],
  exports: [
    DeleteConfirmationComponent,
    LoadingComponent,
    BookSimpleEditComponent
  ],
  providers: [CrudService, NotificationService, ModalService]
})
export class SharedModule { }
