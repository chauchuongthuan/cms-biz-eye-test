import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChatgptComponent } from './modal-chatgpt.component';

describe('ModalChatgptComponent', () => {
  let component: ModalChatgptComponent;
  let fixture: ComponentFixture<ModalChatgptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChatgptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalChatgptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
