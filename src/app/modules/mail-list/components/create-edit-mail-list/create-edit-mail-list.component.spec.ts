import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMailListComponent } from './create-edit-mail-list.component';

describe('CreateEditMailListComponent', () => {
  let component: CreateEditMailListComponent;
  let fixture: ComponentFixture<CreateEditMailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditMailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditMailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
