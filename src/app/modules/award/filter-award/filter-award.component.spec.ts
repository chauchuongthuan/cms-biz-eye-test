import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAwardComponent } from './filter-award.component';

describe('FilterAwardComponent', () => {
  let component: FilterAwardComponent;
  let fixture: ComponentFixture<FilterAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
