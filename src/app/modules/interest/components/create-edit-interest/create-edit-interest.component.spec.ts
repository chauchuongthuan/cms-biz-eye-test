import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditInterestComponent } from './create-edit-interest.component';

describe('CreateEditInterestComponent', () => {
  let component: CreateEditInterestComponent;
  let fixture: ComponentFixture<CreateEditInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
