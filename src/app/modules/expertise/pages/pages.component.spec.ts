import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PagesExpertiseComponent } from "./pages.component";

describe("PagesComponent", () => {
   let component: PagesExpertiseComponent;
   let fixture: ComponentFixture<PagesExpertiseComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [PagesExpertiseComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PagesExpertiseComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it("should create", () => {
      expect(component).toBeTruthy();
   });
});

