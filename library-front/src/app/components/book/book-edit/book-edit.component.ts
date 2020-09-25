import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  isEditMode: boolean;
  form: FormGroup;
  book: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isEditMode = !isNullOrUndefined(this.getParamId());
    this.initForm();
    this.getItem();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(undefined, []),
      name: this.formBuilder.control(undefined, [Validators.required]),
      synopsis: this.formBuilder.control(undefined, [Validators.required]),
      publicationDate: this.formBuilder.control(undefined, [Validators.required]),
      authors: this.formBuilder.control(undefined, [Validators.required])
    });
  }

  getItem() {
    if (this.isEditMode) {
      const paramId = this.getParamId();
      this.crudService.getOne('books', paramId).subscribe(result => {
        this.book = result;
        this.getFormControlFromObject(this.form.controls, this.book);
      });
    }
  }

  getParamId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  getFormControlFromObject(controls, obj): any {
    Object.keys(controls).forEach(key => {
      if (controls[key] instanceof FormGroup) {
        if (obj[key]) {
          this.getFormControlFromObject(controls[key].controls, obj[key]);
        }
      } else {
        controls[key].patchValue(obj[key]);
      }
    });
    return controls;
  }

  backToList() {
    this.router.navigate(['books']);
  }

}
