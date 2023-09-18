import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAwardListComponent } from './post-award-list.component';

describe('PostAwardListComponent', () => {
  let component: PostAwardListComponent;
  let fixture: ComponentFixture<PostAwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAwardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
