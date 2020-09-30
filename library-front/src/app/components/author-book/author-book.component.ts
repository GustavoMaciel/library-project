import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-author-book',
  templateUrl: './author-book.component.html',
  styleUrls: ['./author-book.component.css']
})
export class AuthorBookComponent implements OnInit {

  form: FormGroup;
  authors: any[] = [];
  books: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getAuthors();
    this.getBooks();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      authors: this.formBuilder.control(undefined, [Validators.required]),
      books: this.formBuilder.control(undefined, [Validators.required])
    });
  }

  getAuthors(): void {
    this.crudService.getAll('authors').subscribe((res: any) => {
      this.authors  = res.items;
    });
  }

  getBooks(): void {
    this.crudService.getAll('books').subscribe((res: any) => {
      this.books  = res.items;
    });
  }

}
