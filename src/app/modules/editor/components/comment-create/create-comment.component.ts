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

@Component({
  selector: "app-editor-create-comment",
  templateUrl: "./create-comment.component.html",
  styleUrls: ["./create-comment.component.scss"],
})
export class EditorCreateCommentComponent implements OnInit {
  isLoading = false;
  loading = false;
  submitted: boolean = false;
  avatarUrl?: string = "";
  hGutter = 16;
  vGutter = 8;
  idEdit: string = "";
  dataEditor: string = "";
  @Input() idPost: string = "";
  @Input() user: any;
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
      post: new FormControl(this.idPost, [Validators.required]),
    });
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
    this.postService.createComment(formData).subscribe(
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

  changeFileUpload(data: any, field: string) {
    this.commentForm.controls[field].setValue(data);
  }

  resetForm() {
    this.commentForm = this.formControl();
    this.submitted = false;
    setTimeout(() => {
      this.dataEditor = "";
    }, 200);
  }

  onChangeEditor(data: any) {
    this.commentForm.controls["content"].setValue(data);
    this.dataEditor = data;
  }
}
