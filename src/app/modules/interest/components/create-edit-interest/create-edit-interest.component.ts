import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { InterestService } from "../../services/interest.service";
import { IInterest } from "../../model/interest.model";
import { removeSignVietnamese, strToSlug } from "src/app/shared/helper";

@Component({
   selector: "app-create-edit-interest",
   templateUrl: "./create-edit-interest.component.html",
   styleUrls: ["./create-edit-interest.component.scss"],
})
export class CreateEditInterestComponent implements OnInit {
   isLoading = false;
   loading = false;
   submitted: boolean = false;
   dataActive: boolean = true;
   avatarUrl?: string = "";
   hGutter = 16;
   vGutter = 8;
   isEdit: boolean = false;
   idEdit: string = "";
   messageFile: any = [];
   public interestForm!: UntypedFormGroup;
   public state = "Create";
   public visible = false;
   public size: "large" | "default" = "default";

   @Output() onSuccess = new EventEmitter<any>();
   constructor(
      private fb: UntypedFormBuilder,
      private interestService: InterestService,
      private msg: NzMessageService,
   ) {}

   ngOnInit(): void {
      this.interestForm = this.formControl();
      // this.getInterest();
   }

   formControl() {
      return this.fb.group({
         active: new FormControl(true, [Validators.required]),
         name: new FormControl("", [Validators.required]),
      });
   }

   dataInit(data: IInterest, action: boolean) {
      this.isEdit = action;
      this.state = "Chỉnh sửa";
      this.dataActive = data.active;
      this.interestForm = this.fb.group({
         active: new FormControl(data.active, [Validators.required]),
         name: new FormControl(data.name, [Validators.required]),
      });
      console.log(data);
      
      this.idEdit = data.id;
   }

   showDefault(): void {
      this.size = "default";
      this.open();
   }

   showLarge(): void {
      this.size = "large";
      this.open();
   }

   open(): void {
      this.visible = true;
   }

   close(): void {
      this.visible = false;
      this.resetForm();
   }

   confirmDrawer() {
      this.submitted = true;
      if (this.interestForm.invalid) return;
      this.isLoading = true;
      let data = {
         ...this.interestForm.value,
      };
      if (!this.isEdit) {
         this.interestService.createInterest(data).subscribe(
            (data) => {
               if (data) {
                  this.isLoading = false;
                  this.onSuccess.emit();
                  this.interestForm = this.formControl();
                  this.submitted = false;
                  this.close();
               }
            },
            (error) => {
               this.isLoading = false;
            },
         );
      } else {
         this.interestService.editInterest(data, this.idEdit).subscribe(
            (data) => {
               if (data) {
                  this.isLoading = false;
                  this.onSuccess.emit();
                  this.interestForm = this.formControl();
                  this.submitted = false;
                  this.close();
               }
            },
            (error) => {
               this.isLoading = false;
            },
         );
      }
   }

   resetForm() {
      this.interestForm = this.formControl();
      this.submitted = false;
      this.state = "Create";
      this.isEdit = false;
   }

}

