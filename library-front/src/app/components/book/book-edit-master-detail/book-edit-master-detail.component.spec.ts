import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditMasterDetailComponent } from './book-edit-master-detail.component';

describe('BookEditMasterDetailComponent', () => {
  let component: BookEditMasterDetailComponent;
  let fixture: ComponentFixture<BookEditMasterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditMasterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
