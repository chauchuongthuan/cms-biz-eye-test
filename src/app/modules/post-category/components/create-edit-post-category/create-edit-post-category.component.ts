import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { convertToFormDataV2, strToSlug } from 'src/app/shared/helper';
import { ICategory } from '../../model/category.model';
import { CategoryService } from '../../services/postCategory.service';

@Component({
  selector: 'app-create-edit-post-category',
  templateUrl: './create-edit-post-category.component.html',
  styleUrls: ['./create-edit-post-category.component.scss']
})
export class CreateEditPostCategoryComponent implements OnInit {
  isLoading = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  dataActive: boolean = true;
  state: string = 'Create';
  id: string = '';
  hGutter = 16;
  vGutter = 8;
  metaImage: any = [];
  public titleSlug: string = '';
  public expandSet = new Set<number>();
  public categoryForm!: UntypedFormGroup;

  public visible = false;
  public size: 'large' | 'default' = 'large';
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.categoryFormControl();
    // this.getCategory();
  }

  categoryFormControl() {
    return this.fb.group({
      active: new FormControl(true, [Validators.required]),
      sortOrder: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      slug: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      metaTitle: new FormControl('', []),
      metaDescription: new FormControl('', []),
      metaKeyword: new FormControl('', []),
      metaImage: new FormControl({ value: '', preview: null }, []),
   });
  }
  initData(data: ICategory){
    this.state = 'Câp nhật';
    this.id = data.id;
    this.isEdit = true;
    this.dataActive = data.active;
    if(data.metaImage)
      this.metaImage = [{ value: '', preview: data.metaImage }];
    else this.metaImage = []
    this.categoryForm = this.fb.group({
      active: new FormControl(data.active, [Validators.required]),
      sortOrder: new FormControl(data.sortOrder, [Validators.required]),
      title: new FormControl(data.title, [Validators.required]),
      slug: new FormControl(data.slug, [Validators.required]),
      shortDescription: new FormControl(data.shortDescription, [Validators.required]),
      metaTitle: new FormControl(data.metaTitle ? data.metaTitle : '', []),
      metaDescription: new FormControl(data.metaDescription ? data.metaDescription : '', []),
      metaKeyword: new FormControl(data.metaKeyword ? data.metaKeyword : '', []),
      metaImage: new FormControl({ value: '', preview: data.metaImage }, []),
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

  onChangeTitle(locale: string){
    if(this.categoryForm.controls[`title`].value){
      let slug = strToSlug(this.categoryForm.controls[`title`].value);
      this.categoryForm.controls[`slug`].setValue(slug);
    }
  }

  changeFileUpload(data: any, field: string){
    this.categoryForm.controls[field].setValue(data);
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.categoryForm.invalid) return;
    this.isLoading = true;

    let formData = convertToFormDataV2(this.categoryForm.value, ['metaImage'])

    if(this.isEdit)
      this.categoryService.editCategory(formData, this.id).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })
    else
      this.categoryService.createCategory(formData).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })

  }

  resetForm() {
    this.categoryForm = this.categoryFormControl();
    this.submitted = false;
    this.state = 'Create';
    this.isEdit = false
  }

}
