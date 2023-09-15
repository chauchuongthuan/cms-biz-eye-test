import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterExpertiseComponent } from './filter-expertise.component';

describe('FilterExpertiseComponent', () => {
  let component: FilterExpertiseComponent;
  let fixture: ComponentFixture<FilterExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterExpertiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
