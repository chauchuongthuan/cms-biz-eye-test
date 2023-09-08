import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCreatePostCategoryComponent } from './create-post-category.component';

describe('EditorCreatePostCategoryComponent', () => {
  let component: EditorCreatePostCategoryComponent;
  let fixture: ComponentFixture<EditorCreatePostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorCreatePostCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorCreatePostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
