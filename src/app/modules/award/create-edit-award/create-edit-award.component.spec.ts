import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAwardComponent } from './create-edit-award.component';

describe('CreateEditAwardComponent', () => {
  let component: CreateEditAwardComponent;
  let fixture: ComponentFixture<CreateEditAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
