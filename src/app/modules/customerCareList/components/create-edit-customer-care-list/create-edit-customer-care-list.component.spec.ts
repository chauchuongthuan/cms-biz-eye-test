import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditContactComponent } from './create-edit-customer-care-list.component';

describe('CreateEditContactComponent', () => {
  let component: CreateEditContactComponent;
  let fixture: ComponentFixture<CreateEditContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
