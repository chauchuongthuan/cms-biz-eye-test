import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionByCountriesComponent } from './session-by-countries.component';

describe('SessionByCountriesComponent', () => {
  let component: SessionByCountriesComponent;
  let fixture: ComponentFixture<SessionByCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionByCountriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionByCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
