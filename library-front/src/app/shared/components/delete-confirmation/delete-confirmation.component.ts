import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit, OnDestroy {

  @Output()
  onOk = new EventEmitter<any>();

  @ViewChild('closeButton', null)
  closeButton: ElementRef;

  constructor() { }

  ngOnInit() {
    this.listenForPop();
  }

  ngOnDestroy() {
    window.removeEventListener('popstate', this.closeModal);
  }

  listenForPop() {
    window.addEventListener('popstate', this.closeModal)
  }

  closeModal() {
    this.closeButton.nativeElement.click();
    console.log(this.closeButton);
  }

  onDeleteOk() {
    this.closeModal();
    this.onOk.emit();
  }

}
