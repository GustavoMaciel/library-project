import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AuthorBookURL } from 'src/app/shared/url/url.domain';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-book',
  templateUrl: './author-book.component.html',
  styleUrls: ['./author-book.component.css']
})
export class AuthorBookComponent implements OnInit {

  form: FormGroup;
  authors: any[] = [];
  books: any[] = [];
  authorBookList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.getAuthors();
    this.getBooks();
  }

  getServiceURL(): string {
    return AuthorBookURL.MULTIPLE;
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(undefined),
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

  insert(): void {
    this.preInsert();
    this.crudService.post(this.getServiceURL(), this.authorBookList).subscribe((res: any) => {
      this.postResult();
    }, (err) => {
      this.notificationService.error();
    });
  }

  preInsert(): void {
    const authors = [];
    const books = [];
    for (const author of this.form.get('authors').value) {
      authors.push(author);
    }
    for (const book of this.form.get('books').value) {
      books.push(book);
    }
    authors.forEach(author => {
      books.forEach(book => {
        const authorBook = {
          author,
          book
        };
        this.authorBookList.push(authorBook);
      });
    });
  }

  postResult(): void {
    this.notificationService.insertedSuccess();
    this.authorBookList = [];
    this.router.navigate(['books']);
  }

  onSubmit(): void {
    this.insert();
  }


}
