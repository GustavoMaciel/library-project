import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorMasterDetailComponent } from './author-master-detail.component';

describe('AuthorMasterDetailComponent', () => {
  let component: AuthorMasterDetailComponent;
  let fixture: ComponentFixture<AuthorMasterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorMasterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
