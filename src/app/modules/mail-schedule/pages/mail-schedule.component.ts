import { CreateEditMailScheduleComponent } from "../components/create-edit-mail-schedule/create-edit-mail-schedule.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { MailScheduleService } from "../services/mail-schedule.service";
import { Ipaginator, option, params, sort } from "src/app/common/constant/list.model";
import { HttpParams } from "@angular/common/http";
import { RouterService } from "src/app/common/services/router.service";
import { tableData } from "src/app/common/constant/pageList.constant";

@Component({
   selector: "app-mail-schedule",
   templateUrl: "./mail-schedule.component.html",
   styleUrls: ["./mail-schedule.component.scss"],
})
export class MailScheduleComponent implements OnInit {
   @ViewChild("actionComponent") actionComponent: CreateEditMailScheduleComponent;

   public tableLoading: boolean = false;
   public checked: boolean = true;
   public statusValue: boolean;
   public expandSet = new Set<number>();
   public filterForm: UntypedFormGroup;
   public createForm!: UntypedFormGroup;
   public listMailSchedule: any;
   public visible = false;
   public size: "large" | "default" = "default";
   public params: HttpParams = params;
   public paginator: Ipaginator = {
      option: option,
      limit: 10,
      currentPage: 1,
      total: 0,
      pageCount: 0,
   };

   public data: tableData = {
      column: [
         {
            dataIndex: "name",
            name: "Tên",
         },
         {
            dataIndex: "status",
            name: "Trạng thái",
            isActive: true,
         },
         {
            dataIndex: "statusSent",
            name: "Trạng thái gửi",
            isHTML: true,
         },
         {
            dataIndex: "createdAt",
            name: "Ngày tạo",
         },
         {
            dataIndex: "action",
            name: "Hành động",
            listButton: true,
         },
      ],
      data: [],
   };
   constructor(
      private fb: UntypedFormBuilder,
      private mailScheduleService: MailScheduleService,
      private msg: NzMessageService,
      private routerService: RouterService,
   ) {}

   ngOnInit(): void {
      this.initParams();
      this.getMailSchedule(this.params);
   }

   initParams() {
      let urlParams = this.routerService.params;
      let keys = Object.keys(urlParams);
      keys.forEach((key, index) => {
         this.params = this.params.set(key, urlParams[key]);
      });
   }

   onExpandChange(id: number, checked: boolean): void {
      if (checked) {
         this.expandSet.add(id);
      } else {
         this.expandSet.delete(id);
      }
   }

   getMailSchedule(params: HttpParams) {
      this.tableLoading = true;
      this.mailScheduleService.getMailSchedule(params).subscribe((data) => {
         this.data.data = data.list?.map((item: any) => {
            let action = [
               {
                  icon: "edit",
                  fn: () => this.onEdit(item),
               },
               {
                  icon: "delete",
                  isDanger: true,
                  isComfirm: true,
                  tip: "Bạn có chắc muốn xóa?",
                  fn: () => this.onDelete(item.id || item._id),
               },
            ];

            let createdAt = new Date(item.createdAt).toLocaleString("en-GB", {
               timeZone: "Asia/Ho_Chi_Minh",
            });
            return {
               ...item,
               action,
               createdAt,
            };
         });
         this.paginator = {
            ...data.paginator,
            option,
         };
         this.tableLoading = false;
         this.routerService.replaceParams(this.params);
      });
   }

   onFilter(filters: any) {
      if (filters) {
         let keys = Object.keys(filters);
         let values = Object.values(filters);
         keys.forEach((key, index) => {
            if (!values[index]) {
               this.params = this.params.set(key, "");
            } else if (["number", "boolean", "string"].includes(typeof values[index])) {
               this.params = this.params.set(key, `${values[index]}`);
            }
         });
      }
      this.getMailSchedule(this.params);
   }

   onEdit(data: any) {
      this.actionComponent.showLarge();
      this.actionComponent.dataInit(data, true);
   }

   onDelete(id: string) {
      this.tableLoading = true;
      this.mailScheduleService.deleteMailSchedule(id).subscribe(
         (data) => {
            this.getMailSchedule(this.params);
         },
         (error) => (this.tableLoading = false),
      );
   }

   get title(): string {
      return `${this.size} Drawer`;
   }

   tableChange(e: any) {
      let arraySort = e.sort as Array<any>;
      let fieldSort = arraySort.find((item) => item.value != null);

      let page = e.pageIndex;
      let limit = e.pageSize;
      let sort: sort = {
         orderBy: fieldSort ? fieldSort.key : "createdAt",
         order: fieldSort?.value == "ascend" ? 1 : -1,
      };
      this.onChange(page, limit, sort);
   }

   onChange(page: number, limit: number, sort: sort) {
      this.params = this.params.set("page", page);
      this.params = this.params.set("limit", limit);
      this.params = this.params.set("orderBy", sort.orderBy);
      this.params = this.params.set("order", sort.order);
      this.getMailSchedule(this.params);
   }

   onSuccess() {
      this.getMailSchedule(this.params);
   }

   exportExcel() {
      this.mailScheduleService.exportMailSchedule(this.params);
   }

   changeStatus(id: any, $event: any) {
      this.tableLoading = true;
      this.mailScheduleService.changeStatus(id, $event).subscribe(
         (data) => {
            this.getMailSchedule(this.params);
         },
         (error) => (this.tableLoading = false),
      );
   }
}

