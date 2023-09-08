import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { MailListService } from "../../services/mail-list.service";
import { IMailList } from "../../model/mail-list.model";
import { removeSignVietnamese } from "src/app/shared/helper";

@Component({
   selector: "app-create-edit-mail-list",
   templateUrl: "./create-edit-mail-list.component.html",
   styleUrls: ["./create-edit-mail-list.component.scss"],
})
export class CreateEditMailListComponent implements OnInit {
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
   public mailListForm!: UntypedFormGroup;
   public state = "Tạo mới";
   public visible = false;
   public size: "large" | "default" = "default";

   @Output() onSuccess = new EventEmitter<any>();
   constructor(
      private fb: UntypedFormBuilder,
      private mailListService: MailListService,
      private msg: NzMessageService,
   ) {}

   ngOnInit(): void {
      this.mailListForm = this.formControl();
      // this.getMailList();
      this.mailListService.getInterest().subscribe((data) => {
         this.interests = data;
      });
   }

   formControl() {
      return this.fb.group({
         status: new FormControl(true, [Validators.required]),
         email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
         name: new FormControl("", [Validators.required]),
         interests: new FormControl([], []),
      });
   }

   dataInit(data: IMailList, action: boolean) {
      this.isEdit = action;
      this.dataStatus = data.status;
      this.state = "Chỉnh sửa";
      this.mailListForm = this.fb.group({
         status: new FormControl(data.status, [Validators.required]),
         email: new FormControl(data.email, [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
         ]),
         name: new FormControl(data.name, [Validators.required]),
         interests: new FormControl(data?.interests.map((item: any) => item.name), []),
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
      if (this.mailListForm.invalid) return;
      this.isLoading = true;
      let data = {
         ...this.mailListForm.value,
      };
      if (!this.isEdit) {
         this.mailListService.createMailList(data).subscribe(
            (data) => {
               if (data) {
                  this.isLoading = false;
                  this.onSuccess.emit();
                  this.mailListForm = this.formControl();
                  this.submitted = false;
                  this.close();
               }
            },
            (error) => {
               this.isLoading = false;
            },
         );
      } else {
         this.mailListService.editMailList(data, this.idEdit).subscribe(
            (data) => {
               if (data) {
                  this.isLoading = false;
                  this.onSuccess.emit();
                  this.mailListForm = this.formControl();
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
      this.mailListForm = this.formControl();
      this.submitted = false;
      this.state = "Tạo mới";
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

