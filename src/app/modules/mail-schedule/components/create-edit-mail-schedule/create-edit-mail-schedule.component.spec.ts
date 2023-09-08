import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMailScheduleComponent } from './create-edit-mail-schedule.component';

describe('CreateEditMailScheduleComponent', () => {
  let component: CreateEditMailScheduleComponent;
  let fixture: ComponentFixture<CreateEditMailScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditMailScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditMailScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
