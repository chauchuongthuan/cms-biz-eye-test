import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { convertToFormDataV2, strToSlug } from 'src/app/shared/helper';
import { PageService } from '../../services/page.service';
// import { ICategory } from '../../model/category.model';
// import { CategoryService } from '../../services/postCategory.service';

@Component({
  selector: 'app-create-edit-page-category',
  templateUrl: './create-edit-page-category.component.html',
  styleUrls: ['./create-edit-page-category.component.scss']
})
export class CreateEditPageCategoryComponent implements OnInit {
  isLoading = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  dataActive: boolean = true;
  state: string = 'Tạo mới';
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
  @Output() onLeave = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private pageService: PageService,
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

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.onLeave.emit(true)
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
    this.pageService.createCategory(formData).subscribe((data: any) => {
      this.isLoading = false;
      this.visible = false;
      this.onSuccess.emit();
      this.resetForm();
    }, (error: any)=>{
      this.isLoading = false;
    })

  }

  resetForm() {
    this.categoryForm = this.categoryFormControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false
  }

}
