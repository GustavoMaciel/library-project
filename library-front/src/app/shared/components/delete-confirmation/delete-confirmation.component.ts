import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit, OnDestroy {

  @Output()
  onOk = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.listenForPop();
  }

  ngOnDestroy() {
  }

  listenForPop() {
  }

  closeModal() {
  }

  onDeleteOk() {
    this.closeModal();
    this.onOk.emit();
  }

}
