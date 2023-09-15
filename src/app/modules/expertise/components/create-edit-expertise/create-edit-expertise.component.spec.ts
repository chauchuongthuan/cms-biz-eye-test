import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditExpertiseComponent } from './create-edit-expertise.component';

describe('CreateEditExpertiseComponent', () => {
  let component: CreateEditExpertiseComponent;
  let fixture: ComponentFixture<CreateEditExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditExpertiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
