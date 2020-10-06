import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  @Output()
  onOk = new EventEmitter<any>();
  identifier = ModalService.DELETE_MODAL_ID;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }


  closeModal() {
    this.modalService.close(this.identifier);
  }

  onDeleteOk() {
    this.closeModal();
    this.onOk.emit();
  }

}
