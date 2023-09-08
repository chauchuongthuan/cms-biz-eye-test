import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSeoCheckComponent } from './result-seo-check.component';

describe('ResultSeoCheckComponent', () => {
  let component: ResultSeoCheckComponent;
  let fixture: ComponentFixture<ResultSeoCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultSeoCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultSeoCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
