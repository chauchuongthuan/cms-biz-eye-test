import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWorkComponent } from './page-work.component';

describe('PageWorkComponent', () => {
  let component: PageWorkComponent;
  let fixture: ComponentFixture<PageWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
