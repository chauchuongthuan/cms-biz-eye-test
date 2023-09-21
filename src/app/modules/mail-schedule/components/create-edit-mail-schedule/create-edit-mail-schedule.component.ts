import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { MailScheduleService } from "../../services/mail-schedule.service";
import { IMailSchedule } from "../../model/mail-schedule.model";
import { removeSignVietnamese } from "src/app/shared/helper";

const moment = require("moment");

@Component({
   selector: "app-create-edit-mail-schedule",
   templateUrl: "./create-edit-mail-schedule.component.html",
   styleUrls: ["./create-edit-mail-schedule.component.scss"],
})
export class CreateEditMailScheduleComponent implements OnInit {
   isLoading = false;
   loading = false;
   submitted: boolean = false;
   dataStatus: boolean = true;
   avatarUrl?: string = "";
   hGutter = 16;
   vGutter = 8;
   isEdit: boolean = false;
   idEdit: string = "";
   messageFile: any = [];
   interests: Array<any> = [];
   assignList: Array<any> = [];
   public mailScheduleForm!: UntypedFormGroup;
   public state = "Create";
   public visible = false;
   public size: "large" | "default" = "default";

   @Output() onSuccess = new EventEmitter<any>();
   constructor(
      private fb: UntypedFormBuilder,
      private mailScheduleService: MailScheduleService,
      private msg: NzMessageService,
   ) {}

   ngOnInit(): void {
      this.mailScheduleForm = this.formControl();
      // this.getMailSchedule();
      this.mailScheduleService.getInterest().subscribe((data) => {
         this.interests = data;
      });
      this.mailScheduleService.getUser().subscribe((data) => {
         this.assignList = data;
      });
   }

   formControl() {
      return this.fb.group({
         status: new FormControl(true, [Validators.required]),
         name: new FormControl("", [Validators.required]),
         sendAt: new FormControl("", [Validators.required]),
         interests: new FormControl([], []),
         assigned: new FormControl([], []),
      });
   }

   dataInit(data: IMailSchedule, action: boolean) {
      this.isEdit = action;
      this.dataStatus = data.status;
      this.state = "Chỉnh sửa";
      this.mailScheduleForm = this.fb.group({
         status: new FormControl(data.status, [Validators.required]),
         name: new FormControl(data.name, [Validators.required]),
         sendAt: new FormControl(data?.sendAt ? moment(data.sendAt, "DD-MM-YYYY").isValid() ? new Date(data.sendAt) : '' : '', [Validators.required]),
         interests: new FormControl(data?.interests.map((item: any) => item.id), []),
         assigned: new FormControl(data?.assigned.map((item: any) => item.id), []),
      });

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
      if (this.mailScheduleForm.invalid) return;
      this.isLoading = true;
      let data = {
         ...this.mailScheduleForm.value,
      };
      console.log(data);
      
      if (!this.isEdit) {
         this.mailScheduleService.createMailSchedule(data).subscribe(
            (data) => {
               if (data) {
                  this.isLoading = false;
                  this.onSuccess.emit();
                  this.mailScheduleForm = this.formControl();
                  this.submitted = false;
                  this.close();
               }
            },
            (error) => {
               this.isLoading = false;
            },
         );
      } else {
         this.mailScheduleService.editMailSchedule(data, this.idEdit).subscribe(
            (data) => {
               if (data) {
                  this.isLoading = false;
                  this.onSuccess.emit();
                  this.mailScheduleForm = this.formControl();
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
      this.mailScheduleForm = this.formControl();
      this.submitted = false;
      this.state = "Create";
      this.isEdit = false;
   }

   nzFilterOption(inputValue: string, item: any) {
      inputValue = removeSignVietnamese(inputValue);
      inputValue = inputValue.toLowerCase();

      let label = item.nzLabel;

      label = label.toLowerCase();
      label = removeSignVietnamese(label);

      return label.indexOf(inputValue) > -1;
   }
}

