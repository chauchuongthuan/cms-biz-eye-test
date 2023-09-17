import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { params, Ipaginator, option, sort } from 'src/app/common/constant/list.model';
import { RouterService } from 'src/app/common/services/router.service';
import { CreateEditCategoryComponent } from '../../category/components/create-edit-category/create-edit-category.component';
import { CategoryOurWorkService } from '../../category/services/category.service';
import { CategoryService } from '../../post-category/services/postCategory.service';
import { AwardService } from '../services/award.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class AwardPagesComponent implements OnInit {

  public tableLoading: boolean = false;
   public checked: boolean = true;
   public expandSet = new Set<number>();
   public filterForm!: UntypedFormGroup;
   public listCategory: any;
   public visible = false;
   public size: "large" | "default" = "default";
   public params: HttpParams = params;
   public checkOptionsOne = [
      { label: "Tên danh mục", value: "name", checked: true },
      { label: "Mô tả", value: "shortDescription", checked: false },
   ];
   public paginator: Ipaginator = {
      option: option,
      limit: 10,
      currentPage: 1,
      total: 0,
      pageCount: 0,
   };
   public sort: sort = {
      order: -1,
      orderBy: "createdAt",
   };
   // public listOfData = [];
   @ViewChild("editForm") editForm: CreateEditCategoryComponent;

   constructor(
      private fb: UntypedFormBuilder,
      private awardService: AwardService,
      private msg: NzMessageService,
      private routerService: RouterService,
   ) {}

   ngOnInit(): void {
      this.initParams();
      this.filterForm = this.fb.group({
         name: new FormControl("", []),
         active: new FormControl("", []),
         date: new FormControl("", []),
      });
      this.getCategory(this.params);
   }

   initParams() {
      // this.params = this.params.set('orderBy', this.sort.orderBy)
      // this.params = this.params.set('order', this.sort.order)

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

   getCategory(params: HttpParams) {
      this.tableLoading = true;
      console.log(params);
      this.awardService.getAward(params).subscribe((data) => {
         this.listCategory = data.list;
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
      this.getCategory(this.params);
   }
   onEdit(data: any) {
      this.editForm.visible = true;
      this.editForm.initData(data);
   }

   onDelete(id: string) {
      this.tableLoading = true;
      this.awardService.deleteAward(id).subscribe(
         (data) => {
            this.getCategory(this.params);
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
      this.getCategory(this.params);
   }
   onSuccess() {
      this.getCategory(this.params);
   }

}
