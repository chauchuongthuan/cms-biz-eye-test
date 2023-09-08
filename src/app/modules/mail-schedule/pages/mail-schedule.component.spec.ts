import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailScheduleComponent } from './mail-schedule.component';

describe('MailScheduleComponent', () => {
  let component: MailScheduleComponent;
  let fixture: ComponentFixture<MailScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
