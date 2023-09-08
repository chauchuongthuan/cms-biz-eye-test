import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChatgptResponseComponent } from './modal-chatgpt-response.component';

describe('ModalChatgptResponseComponent', () => {
  let component: ModalChatgptResponseComponent;
  let fixture: ComponentFixture<ModalChatgptResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChatgptResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalChatgptResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
