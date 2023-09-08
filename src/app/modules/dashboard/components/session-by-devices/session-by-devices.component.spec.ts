import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionByDevicesComponent } from './session-by-devices.component';

describe('SessionByDevicesComponent', () => {
  let component: SessionByDevicesComponent;
  let fixture: ComponentFixture<SessionByDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionByDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionByDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
