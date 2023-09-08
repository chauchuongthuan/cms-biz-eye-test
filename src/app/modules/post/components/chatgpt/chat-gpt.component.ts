import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.scss']
})
export class ChatGptComponent implements OnInit {
  isLoading = false;
  submitted: boolean = false;
  public isChat: boolean = false;
  dataEditor: string = '';
  hGutter = 16;
  vGutter = 8;

  public titleSlug: string = '';
  public expandSet = new Set<number>();
  public postForm!: UntypedFormGroup;
  public visible = false;
  public size: 'large' | 'default' = 'large';
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private postService: PostService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.postForm = this.postFormControl();
    // this.getPost();
    setTimeout(() => { 
      this.dataEditor = '';
    }, 200)
  }

  postFormControl() {
    return this.fb.group({
      message: new FormControl('', []),
      content: new FormControl('', [Validators.required]),
   });
   
  }

  open(): void {
    this.visible = true;
    this.resetForm();
    setTimeout(() => { 
      this.dataEditor = '';
    }, 200)

  }

  close(): void {
    this.resetForm();
    this.visible = false;
    setTimeout(() => { 
      this.dataEditor = '';
    }, 200)
  }

  onChangeEditor(data: any){
    this.postForm.controls['content'].setValue(data);
    this.dataEditor =data;
  }
  chat(){
      if(!this.postForm.value.message){
        this.notification.error("Error", "Vui lòng nhập câu hỏi", {nzDuration: 2000})
        return;
      }
      let formData = new FormData();
      formData.append('message', this.postForm.value.message);
      this.isChat = true;
      this.postService.chat(formData).subscribe(res => {
        this.isChat = false;
        this.postForm.controls['message'].setValue('');
        let content = res?.data?.content.replace(/\n/g, "<br />");
        this.dataEditor = content;
        this.postForm.controls['content'].setValue(content);
      })
    // else {
    //   if(!this.postForm.value.message_en){
    //     this.toastService.show("Thất bại!",'Vui lòng nhập lời nhắn!', 'error');
    //     return;
    //   }
    //   let formData = new FormData();
    //   formData.append('message', this.postForm.value.message_en);
    //   this.isChat = true;
    //   this.postService.chat(formData).subscribe(res => {
    //     this.isChat = false;
    //     this.postForm.controls['message_en'].setValue('');
    //     let content = res?.data?.content.replace(/\n/g, "<br />");
    //     this.dataEditor_en = content;
    //     this.postForm.controls['content_en'].setValue(content);
    //   })
    // }
    
  }
  confirmDrawer(){
    // this.submitted = true;
    // if(this.postForm.invalid) return;
    // this.isLoading = true;
    // let formData = convertToFormDataV2(this.postForm.value, ['metaImage', 'image', 'imageMb'])

    // if(this.isEdit)
    //   this.postService.editPost(formData, this.id).subscribe((data) => {
    //     this.isLoading = false;
    //     this.visible = false;
    //     this.onSuccess.emit();
    //     this.resetForm();
    //   }, (error)=>{
    //     this.isLoading = false;
    //   })
    // else
    //   this.postService.createPost(formData).subscribe((data) => {
    //     this.isLoading = false;
    //     this.visible = false;
    //     this.onSuccess.emit();
    //     this.resetForm();
    //   }, (error)=>{
    //     this.isLoading = false;
    //   })

  }

  resetForm() {
    this.postForm = this.postFormControl();
    this.submitted = false;
    setTimeout(() => {
      this.dataEditor = '';
    }, 200);
  }

}
