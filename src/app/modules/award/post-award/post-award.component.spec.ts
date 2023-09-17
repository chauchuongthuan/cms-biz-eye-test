import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAwardComponent } from './post-award.component';

describe('PostAwardComponent', () => {
  let component: PostAwardComponent;
  let fixture: ComponentFixture<PostAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
