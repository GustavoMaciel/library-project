import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudService } from './services/crud.service';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotificationService } from './services/notification.service';
import { ModalService } from './services/modal.service';
import { CreateAuthorModalComponent } from './components/create-author-modal/create-author-modal.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DeleteConfirmationComponent, LoadingComponent, CreateAuthorModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  exports: [
    DeleteConfirmationComponent,
    LoadingComponent,
    CreateAuthorModalComponent,
    NgxSmartModalModule
  ],
  providers: [CrudService, NotificationService, ModalService]
})
export class SharedModule { }
