import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-create-author-modal',
  templateUrl: './create-author-modal.component.html',
  styleUrls: ['./create-author-modal.component.css']
})
export class CreateAuthorModalComponent implements OnInit {

  @Output() submitted = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private modalService: ModalService,
    private crudService: CrudService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  close() {
    this.modalService.close(ModalService.CREATE_AUTHOR_MODAL);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(undefined),
      name: this.formBuilder.control(undefined, [Validators.required])
    });
  }

  onSubmit(): void {
    this.submitted.emit(this.form.value);
    this.close();
  }

}
