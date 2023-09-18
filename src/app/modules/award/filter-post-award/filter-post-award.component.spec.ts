import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPostAwardComponent } from './filter-post-award.component';

describe('FilterPostAwardComponent', () => {
  let component: FilterPostAwardComponent;
  let fixture: ComponentFixture<FilterPostAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPostAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPostAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
