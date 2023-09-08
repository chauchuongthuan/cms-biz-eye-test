import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { convertToFormDataV2 } from "src/app/shared/helper";
import { PostService } from "../../services/post.service";
import { IComment } from "../../model/post.model";
import { AuthenticationService } from "src/app/common/services/auth.service";

@Component({
  selector: "app-edit-comment",
  templateUrl: "./edit-comment.component.html",
  styleUrls: ["./edit-comment.component.scss"],
})
export class EditCommentComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = "";
  hGutter = 16;
  vGutter = 8;
  isEdit: boolean = false;
  idEdit: string = "";
  dataEditor: string = "";
  @Input() idPost: string = "";
  @Input() user: any;
  @Output() onClose = new EventEmitter<any>();
  public commentForm!: UntypedFormGroup;
  public size: "large" | "default" = "default";

  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private postService: PostService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formControl();
    // this.getComment();
  }
  formControl() {
    return this.fb.group({
      content: new FormControl("", [Validators.required]),
      post: new FormControl("", [Validators.required]),
    });
  }

  dataInit(data: IComment, action: boolean) {
    console.log("data Comment::", data)
    this.isEdit = action;
    this.commentForm = this.fb.group({
      content: new FormControl(data.content, [Validators.required]),
      post: new FormControl(data.post.id || data.post._id, [Validators.required]),
    });
    setTimeout(() => {
      this.dataEditor = data.content;
    }, 200);
    this.idEdit = data.id;
  }

  confirmDrawer() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      console.log("error");
      return;
    }
    this.isLoading = true;
    let formData = new FormData();
    formData.append("content", this.commentForm.value.content);
    formData.append("post", this.commentForm.value.post);

    this.postService.editComment(formData, this.idEdit).subscribe(
      (data: any) => {
        if (data) {
          this.isLoading = false;
          this.onSuccess.emit();
          this.commentForm = this.formControl();
          this.submitted = false;
          this.resetForm();
        }
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  resetForm() {
    this.commentForm = this.formControl();
    this.submitted = false;
    this.isEdit = false;
    setTimeout(() => {
      this.dataEditor = "";
    }, 200);
  }

  onChangeEditor(data: any) {
    this.commentForm.controls["content"].setValue(data);
    this.dataEditor = data;
  }

  close() {
    this.onClose.emit();
  }

  // exportFile(url: any){
  //   console.log("url::", url)
  //   if(url){
  //     this.postService.exportFile(url.preview);
  //   }
  //   else{
  //     return;
  //   }
  // }
}
