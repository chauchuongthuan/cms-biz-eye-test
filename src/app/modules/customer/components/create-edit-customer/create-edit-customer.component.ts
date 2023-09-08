import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../model/customer.model';
import { convertToFormData, convertToFormDataV2 } from 'src/app/shared/helper';

@Component({
  selector: 'app-create-edit-customer',
  templateUrl: './create-edit-customer.component.html',
  styleUrls: ['./create-edit-customer.component.scss']
})
export class CreateEditCustomerComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  profileImage: any = [];
  public customerForm!: UntypedFormGroup;
  public state = 'Tạo mới';
  public visible = false;
  public size: 'large' | 'default' = 'default';
  public genderList = [
    {
      name: "Ông",
      value: "male",
    },
    {
      name: "Bà",
      value: "female",
    },
    {
      name: "Khác",
      value: "other",
    }
  ]
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private customerService: CustomerService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.formControl();
    // this.getCustomer();
  }

  formControl() {
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      name: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      dateOfBirth: new FormControl('',[]),
      profileImage: new FormControl('', []),
   });
  }

  dataInit(data: ICustomer, action: boolean){
    this.isEdit = action;
    this.state = 'Chỉnh sửa';
    if(data.profileImage){
      this.profileImage = [{value: null, preview: data?.profileImage}]
    } else this.profileImage = []
    this.customerForm = this.fb.group({
      email: new FormControl(data.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      name: new FormControl(data.name, [Validators.required]),
      gender: new FormControl(data.gender, [Validators.required]),
      phone: new FormControl(data?.phone, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]),
      dateOfBirth: new FormControl(data.dateOfBirth ? new Date(data?.dateOfBirth) : '', []),
      password: new FormControl('', []),
      confirmPassword: new FormControl('', []),
      profileImage: new FormControl({value: '', preview: data?.profileImage}, []),
    });
    this.idEdit = data.id;
  }

  showDefault(): void {
    this.size = 'default';
    this.open();
  }

  showLarge(): void {
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.resetForm();
  }

  confirmDrawer(){
    this.submitted = true;
    if(this.customerForm.invalid) return;
    this.isLoading = true;
    let dateOfBirth = this.customerForm.controls['dateOfBirth'].value?.toISOString()
    let data = {
      ...this.customerForm.value,      
      dateOfBirth
    }
    let formData = convertToFormDataV2(data, ['profileImage'])
    if(!this.isEdit){
      this.customerService.createCustomer(formData).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.customerForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {      
      this.customerService.editCustomer(formData, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.customerForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  changeFileUpload(data: any, field: string){
    this.customerForm.controls[field].setValue(data);
  }

  resetForm() {
    this.customerForm = this.formControl();
    this.submitted = false;
    this.state = 'Tạo mới';
    this.isEdit = false;
    this.profileImage = [];
  }

}
