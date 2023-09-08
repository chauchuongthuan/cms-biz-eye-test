import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterMailScheduleComponent } from './filter-mail-schedule.component';

describe('FilterMailScheduleComponent', () => {
  let component: FilterMailScheduleComponent;
  let fixture: ComponentFixture<FilterMailScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterMailScheduleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMailScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
