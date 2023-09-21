import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { convertToFormDataV2, strToSlug } from 'src/app/shared/helper';
import { ITag } from '../../model/tag.model';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-create-edit-tag',
  templateUrl: './create-edit-tag.component.html',
  styleUrls: ['./create-edit-tag.component.scss']
})
export class CreateEditTagComponent implements OnInit {
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
  @Input() isCreate: boolean = false;
  constructor(
    private fb: UntypedFormBuilder,
    private categoryService: TagService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.categoryFormControl();
    // this.getTag();
  }

  categoryFormControl() {
    return this.fb.group({
      active: new FormControl(true, [Validators.required]),
      sortOrder: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      slug: new FormControl('', [Validators.required]),
   });
  }
  initData(data: ITag){
    this.state = 'Câp nhật';
    this.id = data.id;
    this.isEdit = true;
    this.dataActive = data.active;
    this.categoryForm = this.fb.group({
      active: new FormControl(data.active, [Validators.required]),
      sortOrder: new FormControl(data.sortOrder, [Validators.required]),
      slug: new FormControl(data.slug, [Validators.required]),
      name: new FormControl(data.name, [Validators.required]),
   });
  }
  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.resetForm();
  }

  onChangeTitle(locale: string){
    if(this.categoryForm.controls[`name`].value){
      let slug = strToSlug(this.categoryForm.controls[`name`].value);
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

    // let formData = convertToFormDataV2(this.categoryForm.value, [])

    if(this.isEdit)
      this.categoryService.editTag(this.categoryForm.value, this.id).subscribe((data) => {
        this.isLoading = false;
        this.visible = false;
        this.onSuccess.emit();
        this.resetForm();
      }, (error)=>{
        this.isLoading = false;
      })
    else
      this.categoryService.createTag(this.categoryForm.value).subscribe((data) => {
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
