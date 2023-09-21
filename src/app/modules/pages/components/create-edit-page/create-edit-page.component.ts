import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { Observable, Observer } from "rxjs";
import { convertToFormDataV2, strToSlug } from "src/app/shared/helper";
import { PageService } from "../../services/page.service";
// import { EditCommentComponent } from "../comment-edit/edit-comment.component";
import { AuthenticationService } from "src/app/common/services/auth.service";
import * as moment from 'moment';
import 'moment/locale/vi';
import { CreateEditPageCategoryComponent } from "../create-category/create-edit-page-category.component";
moment.locale('vi');
@Component({
  selector: "app-create-edit-page",
  templateUrl: "./create-edit-page.component.html",
  styleUrls: ["./create-edit-page.component.scss"],
})
export class CreateEditPageComponent implements OnInit {
  @ViewChild("createCategory") createCategory: CreateEditPageCategoryComponent;
  isLoading = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  openeEditComment: string = "";
  dataEditor: string = "";
  state: string = "Create";
  idPost: string = "";
  hGutter = 16;
  vGutter = 8;
  metaImage: any = [];
  image: any = [];
  imageMb: any = [];
  categories: any = [];
  tags: any = [];
  assignList: Array<any> = [];
  commentList: any = [];
  public titleSlug: string = "";
  public expandSet = new Set<number>();
  public postForm!: UntypedFormGroup;
  public visible = false;
  public visibleCategory = true;
  public user: any;
  public size: "large" | "default" = "large";
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private pageService: PageService,
    private msg: NzMessageService,
    private auth: AuthenticationService
  ) {
    let user = this.auth.currentUserValue;
    this.user = user;
  }

  ngOnInit(): void {
    this.postForm = this.postFormControl();
    // this.getPost();
    this.getCategory();
    this.pageService.getTag().subscribe((data) => {
      this.tags = data;
    });
    this.pageService.getUser().subscribe((data) => {
      this.assignList = data;
    });
    setTimeout(() => {
      this.dataEditor = "";
    }, 200);
  }
  successCreateCategory(){
    this.getCategory();
    this.visibleCategory=true;
  }
  leaveCreateCategory(){
    this.visibleCategory=true;
  }
  openCreateCategory(){
    this.visibleCategory=false;
    this.createCategory.open()
  }
  getCategory(){
    this.pageService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }
  postFormControl() {
    return this.fb.group({
      image: new FormControl({ value: '', preview: null }, []),
      imageMb: new FormControl({ value: '', preview: null }, []),
      feature: new FormControl(true, []),
      postCategory: new FormControl("", [Validators.required]),
      status: new FormControl("1", [Validators.required]),
      tags: new FormControl([], []),
      assigned: new FormControl([], []),
      content: new FormControl("", []),
      publishedAt: new FormControl("", []),
      sortOrder: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      slug: new FormControl("", [Validators.required]),
      shortDescription: new FormControl("", []),
      metaTitle: new FormControl("", []),
      metaDescription: new FormControl("", []),
      metaKeyword: new FormControl("", []),
      metaImage: new FormControl({ value: '', preview: null }, []),
    });
  }
  initData(data: any) {
    this.state = "Cập nhật";
    this.idPost = data.id;
    this.isEdit = true;
    this.visible = true;
    // this.getComment();
    this.postForm = this.fb.group({
      feature: new FormControl(data.feature, []),
      status: new FormControl(data.status + "", []),
      image: new FormControl({ value: '', preview: data.image }, []),
      imageMb: new FormControl({ value: '', preview: data.imageMb }, []),
      sortOrder: new FormControl(data.sortOrder, [Validators.required]),
      postCategory: new FormControl(data.postCategory.id, [
        Validators.required,
      ]),
      tags: new FormControl(
        data.tags.map((item: any) => item.name),
        []
      ),
      assigned: new FormControl(
        data?.assigned.map((item: any) => item.id),
        []
      ),
      title: new FormControl(data.title, [Validators.required]),
      slug: new FormControl(data.slug, [Validators.required]),
      content: new FormControl(data.content, []),
      publishedAt: new FormControl(data.publishedAt ? new Date(data?.publishedAt) : '', []),
      shortDescription: new FormControl(data.shortDescription, []),
      metaTitle: new FormControl(data.metaTitle ? data.metaTitle : "", []),
      metaDescription: new FormControl(
        data.metaDescription ? data.metaDescription : "",
        []
      ),
      metaKeyword: new FormControl(
        data.metaKeyword ? data.metaKeyword : "",
        []
      ),
      metaImage: new FormControl({ value: '', preview: data.metaImage }, []),
    });
    if (data.metaImage)
      this.metaImage = [{ value: '', preview: data.metaImage }];
    else this.metaImage = [];

    if (data.image) this.image = [{ value: '', preview: data.image }];
    else this.image = [];

    if (data.imageMb) this.imageMb = [{ value: '', preview: data.imageMb }];
    else this.imageMb = [];

    setTimeout(() => {
      this.dataEditor = data.content;
    }, 350);
  }
  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }
  get title(): string {
    return `Thêm mới bài viết`;
  }

  open(): void {
    this.visible = true;
    this.resetForm();
    setTimeout(() => {
      this.dataEditor = "";
    }, 200);
  }

  close(): void {
    this.resetForm();
    this.visible = false;
    this.idPost = "";
    setTimeout(() => {
      this.dataEditor = "";
    }, 200);
  }

  onChangeTitle(locale: string) {
    if (this.postForm.controls[`title`].value) {
      let slug = strToSlug(this.postForm.controls[`title`].value);
      this.postForm.controls[`slug`].setValue(slug);
    }
  }
  onChangeEditor(data: any) {
    this.postForm.controls["content"].setValue(data);
    this.dataEditor = data;
  }
  changeFileUpload(data: any, field: string) {
    this.postForm.controls[field].setValue(data);
  }

  confirmDrawer() {
    this.submitted = true;
    if (this.postForm.invalid) return;
    this.isLoading = true;
    let publishedAt = "";
    if(this.postForm.controls['publishedAt']?.value){
      publishedAt = this.postForm.controls['publishedAt']?.value?.toISOString();
    }  
    let data = {
      ...this.postForm.value,      
      publishedAt
    }
    console.log("data submit::", data)
    let formData = convertToFormDataV2(data, [
      "metaImage",
      "image",
      "imageMb",
    ]);

    if (this.isEdit)
      this.pageService.editPage(formData, this.idPost).subscribe(
        (data: any) => {
          this.isLoading = false;
          this.visible = false;
          this.onSuccess.emit();
          this.resetForm();
        },
        (error: any) => {
          this.isLoading = false;
        }
      );
    else
      this.pageService.createPage(formData).subscribe(
        (data: any) => {
          this.isLoading = false;
          this.visible = false;
          this.onSuccess.emit();
          this.resetForm();
        },
        (error: any) => {
          this.isLoading = false;
        }
      );
  }

  resetForm() {
    this.postForm = this.postFormControl();
    this.submitted = false;
    this.state = "Create";
    this.isEdit = false;
    this.image = [];
    this.imageMb = [];
    this.metaImage = [];
    setTimeout(() => {
      this.dataEditor = "";
    }, 200);
  }

  // getComment() {
  //   this.onSuccess.emit();
  //   this.openeEditComment = "";
  //   this.pageService.getCommentByPostId(this.idPost).subscribe((data: any) => {
  //     this.commentList = data.map((item: any) => {
  //       return {
  //         ...item,
  //         createdAt: this.convertToTimeAgo(item.createdAt),
  //         updatedAt: this.convertToTimeAgo(item.updatedAt),
  //       };
  //     });
  //   });
  // }

  // onEditComment(data: any, index: number) {
  //   this.openeEditComment = index + "";
  //   setTimeout(() => {
  //     this.editComment.dataInit(data, true);
  //   }, 0);
  // }

  // onDeleteComment(id: string) {
  //   this.pageService.deleteComment(id).subscribe((data: any) => {
  //     this.getComment();
  //   });
  // }

  convertToTimeAgo(datetime: string): string {
    const now = moment();
    const timestamp = moment(datetime);
    return timestamp.fromNow();
  }
}
