import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardPagesComponent } from './pages.component';

describe('AwardPagesComponent', () => {
  let component: AwardPagesComponent;
  let fixture: ComponentFixture<AwardPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
