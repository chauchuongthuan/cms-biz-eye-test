import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SubscriberService } from '../../services/subscriber.service';
import { ISubscriber } from '../../model/subscriber.model';

@Component({
  selector: 'app-create-edit-subscriber',
  templateUrl: './create-edit-subscriber.component.html',
  styleUrls: ['./create-edit-subscriber.component.scss']
})
export class CreateEditSubscriberComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = '';
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  messageFile: any = [];
  public subscriberForm!: UntypedFormGroup;
  public state = 'Create';
  public visible = false;
  public size: 'large' | 'default' = 'default';
 
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private subscriberService: SubscriberService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.subscriberForm = this.formControl();
    // this.getSubscriber();
  }

  formControl() {
    return this.fb.group({
      email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
   });
  }

  dataInit(data: ISubscriber, action: boolean){
    this.isEdit = action;
    this.state = 'Edit';
    this.subscriberForm = this.fb.group({
      email: new FormControl(data.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
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
    if(this.subscriberForm.invalid) return;
    this.isLoading = true;
    let data = {
      email: this.subscriberForm.controls['email'].value,   
    };
    if(!this.isEdit){
      this.subscriberService.createSubscriber(data).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.subscriberForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
    else {
      this.subscriberService.editSubscriber(data, this.idEdit).subscribe((data) => {
        if(data){
          this.isLoading = false;
          this.onSuccess.emit()
          this.subscriberForm = this.formControl()
          this.submitted = false
          this.close()
        }
      }, (error)=>{
        this.isLoading = false;
      })
    }
  }

  resetForm() {
    this.subscriberForm = this.formControl();
    this.submitted = false;
    this.state = 'Create';
    this.isEdit = false
  }

}
