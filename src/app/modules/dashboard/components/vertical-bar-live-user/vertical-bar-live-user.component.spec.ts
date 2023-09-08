import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBarLiveUserComponent } from './vertical-bar-live-user.component';

describe('VerticalBarLiveUserComponent', () => {
  let component: VerticalBarLiveUserComponent;
  let fixture: ComponentFixture<VerticalBarLiveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalBarLiveUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalBarLiveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
