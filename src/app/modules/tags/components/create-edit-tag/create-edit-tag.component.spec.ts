import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPostCategoryComponent } from './create-edit-tag.component';

describe('CreateEditPostCategoryComponent', () => {
  let component: CreateEditPostCategoryComponent;
  let fixture: ComponentFixture<CreateEditPostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPostCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditPostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
