import { Injectable } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService extends NgxSmartModalService {

  public static DELETE_MODAL_ID = 'deleteModal';

  public static CREATE_AUTHOR_MODAL = 'authorModal';
}
