import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterMailListComponent } from './filter-mail-list.component';

describe('FilterMailListComponent', () => {
  let component: FilterMailListComponent;
  let fixture: ComponentFixture<FilterMailListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterMailListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
