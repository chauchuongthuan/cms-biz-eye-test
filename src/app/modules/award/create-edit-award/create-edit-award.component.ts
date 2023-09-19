import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { strToSlug, convertToFormDataV2 } from 'src/app/shared/helper';
import { CategoryOurWorkService } from '../../category/services/category.service';
import { ICategory } from '../../post-category/model/category.model';
import { CategoryService } from '../../post-category/services/postCategory.service';
import { AwardService } from '../services/award.service';

@Component({
  selector: 'app-create-edit-award',
  templateUrl: './create-edit-award.component.html',
  styleUrls: ['./create-edit-award.component.scss']
})
export class CreateEditAwardComponent implements OnInit {
  isLoading = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  dataActive: boolean = true;
  state: string = "Tạo mới";
  id: string = "";
  hGutter = 16;
  vGutter = 8;
  metaImage: any = [];
  public titleSlug: string = "";
  public expandSet = new Set<number>();
  public categoryForm!: UntypedFormGroup;

  public visible = false;
  public size: "large" | "default" = "large";
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
     private fb: UntypedFormBuilder,
     private awardService: AwardService,
     private categoryOurWorkService: CategoryOurWorkService,
     private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
     this.categoryForm = this.categoryFormControl();
     // this.getCategory();
  }

  categoryFormControl() {
     return this.fb.group({
        image: new FormControl({ value: "", preview: null }, []),
        active: new FormControl(true, [Validators.required]),
        sortOrder: new FormControl("", [Validators.required]),
        title: new FormControl("", [Validators.required]),
        client: new FormControl("", [Validators.required]),
        year: new FormControl("", [Validators.required]),
        subTitle: new FormControl("", [Validators.required]),
        slug: new FormControl("", [Validators.required]),
        metaTitle: new FormControl("", []),
        metaDescription: new FormControl("", []),
        metaKeyword: new FormControl("", []),
        metaImage: new FormControl({ value: "", preview: null }, []),
     });
  }
  initData(data: any) {
   console.log("init data::", data)
     this.state = "Câp nhật";
     this.id = data.id;
     this.isEdit = true;
     this.dataActive = data.active;
     if (data.metaImage) this.metaImage = [{ value: "", preview: data.metaImage }];
     else this.metaImage = [];
     this.categoryForm = this.fb.group({
        active: new FormControl(data.active, [Validators.required]),
        image: new FormControl({ value: "", preview: data?.image }, []),
        sortOrder: new FormControl(data.sortOrder, [Validators.required]),
        client: new FormControl(data.client, [Validators.required]),
        year: new FormControl(data.year, [Validators.required]),
        subTitle: new FormControl(data.subTitle, [Validators.required]),
        title: new FormControl(data.title, [Validators.required]),
        slug: new FormControl(data.slug, [Validators.required]),
        shortDescription: new FormControl(data.shortDescription, [Validators.required]),
        metaTitle: new FormControl(data.metaTitle ? data.metaTitle : "", []),
        metaDescription: new FormControl(data.metaDescription ? data.metaDescription : "", []),
        metaKeyword: new FormControl(data.metaKeyword ? data.metaKeyword : "", []),
        metaImage: new FormControl({ value: "", preview: data.metaImage }, []),
     });
  }
  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }
  get title(): string {
     return `Thêm mới danh mục bài viết`;
  }

  open(): void {
     this.visible = true;
  }

  close(): void {
     this.visible = false;
     this.resetForm();
  }

  onChangeTitle(locale: string) {
     if (this.categoryForm.controls[`title`].value) {
        let slug = strToSlug(this.categoryForm.controls[`title`].value);
        this.categoryForm.controls[`slug`].setValue(slug);
     }
  }

  changeFileUpload(data: any, field: string) {
     this.categoryForm.controls[field].setValue(data);
  }

  confirmDrawer() {
   console.log("this.cate::", this.categoryForm.value)
     this.submitted = true;
     if (this.categoryForm.invalid) return;
     this.isLoading = true;
     let formData = convertToFormDataV2(this.categoryForm.value, ["metaImage"]);

     console.log(formData);
     if (this.isEdit)
        this.awardService.editAward(formData, this.id).subscribe(
           (data) => {
              this.isLoading = false;
              this.visible = false;
              this.onSuccess.emit();
              this.resetForm();
           },
           (error) => {
              this.isLoading = false;
           },
        );
     else
        this.awardService.createAward(formData).subscribe(
           (data) => {
              this.isLoading = false;
              this.visible = false;
              this.onSuccess.emit();
              this.resetForm();
           },
           (error) => {
              this.isLoading = false;
           },
        );
  }

  resetForm() {
     this.categoryForm = this.categoryFormControl();
     this.submitted = false;
     this.state = "Tạo mới";
     this.isEdit = false;
  }
}
