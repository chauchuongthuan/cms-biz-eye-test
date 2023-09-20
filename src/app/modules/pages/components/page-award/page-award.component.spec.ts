import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAwardComponent } from './page-award.component';

describe('PageAwardComponent', () => {
  let component: PageAwardComponent;
  let fixture: ComponentFixture<PageAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
