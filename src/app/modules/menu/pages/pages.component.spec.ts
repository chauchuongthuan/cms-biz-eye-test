import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDNDComponent } from './pages.component';

describe('MenuDNDComponent', () => {
  let component: MenuDNDComponent;
  let fixture: ComponentFixture<MenuDNDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDNDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDNDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
