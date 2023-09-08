import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { convertToFormDataV2, strToSlug } from 'src/app/shared/helper';
import { EditorEditCommentComponent } from '../components/comment-edit/edit-comment.component';
import * as moment from 'moment';
import { EditorCreatePostCategoryComponent } from '../components/create-edit-post-category/create-post-category.component';
import 'moment/locale/vi';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/common/services/router.service';
import { ResultSeoCheckComponent } from '../components/result-seo-check/result-seo-check.component';
import { CreateEditTagComponent } from '../../tags/components/create-edit-tag/create-edit-tag.component';
moment.locale('vi');

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild("editComment") editComment: EditorEditCommentComponent;
  @ViewChild("createCategory") createCategory: EditorCreatePostCategoryComponent;
  @ViewChild("createTag") createTag: CreateEditTagComponent;

  @ViewChild("resultModal") resultModal: ResultSeoCheckComponent;

  public content: any;
  isLoading = false;
  submitted: boolean = false;
  isEdit: boolean = false;
  isCollapsed: boolean = false;
  isLoadingSEO: boolean = false;
  openeEditComment: string = "";
  dataEditor: string = "";
  state: string = "Tạo mới";
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
  contentText: string = '';
  public titleSlug: string = "";
  public expandSet = new Set<number>();
  public postForm!: UntypedFormGroup;
  public visible = false;
  public visibleSEO = false;
  public user: any;
  public size: "large" | "default" = "large";
  @Output() onSuccess = new EventEmitter<any>();
  constructor(
    private fb: UntypedFormBuilder,
    private postService: PostService,
    private msg: NzMessageService,
    private auth: AuthenticationService,
    private router: Router,
    private routerService: RouterService,
  ) { 
    let user = this.auth.currentUserValue;
    this.user = user;
  }

  
  ngOnInit(): void {
    this.postForm = this.postFormControl();
    // this.getPost();
    this.getTag();
    this.postService.getUser().subscribe((data) => {
      this.assignList = data;
    });
    this.getCategories()
    setTimeout(() => {
      this.dataEditor = "";
    }, 200);
    let param = this.routerService.params;
    if(param.id){
      // this.isEdit = true;
      this.postService.getDetail(param.id).subscribe((data: any)=> {
        this.initData(data)
      }, (error)=>{
        this.isEdit = false;
      })
    }
  }

  getTag() {
    this.postService.getTag().subscribe((data) => {
      this.tags = data;
    });
  }

  openTag() {
    this.createTag.open();
  }

  getCategories(){
    this.postService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  onCreateCategory(){
    this.createCategory.open();
  }
  onChangeText(data: any){
    this.contentText = data;
  }
  postFormControl() {
    return this.fb.group({
      image: new FormControl({ value: '', preview: null }, []),
      imageMb: new FormControl({ value: '', preview: null }, []),
      feature: new FormControl(true, []),
      postCategory: new FormControl("", [Validators.required]),
      status: new FormControl("1", [Validators.required]),
      tags: new FormControl([], []),
      readTime: new FormControl("", [Validators.required]),
      assigned: new FormControl([], []),
      content: new FormControl("", []),
      publishedAt: new FormControl("", []),
      sortOrder: new FormControl("1", []),
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
    console.log('data---->', data);
    this.state = "Cập nhật";
    this.idPost = data.id;
    this.isEdit = true;
    // this.visible = true;
    this.getComment();
    this.postForm = this.fb.group({
      feature: new FormControl(data.feature, []),
      status: new FormControl(data.status + "", []),
      readTime: new FormControl(data?.readTime, [Validators.required]),
      image: new FormControl({ value: '', preview: data.image }, []),
      imageMb: new FormControl({ value: '', preview: data.imageMb }, []),
      sortOrder: new FormControl(data.sortOrder, [Validators.required]),
      postCategory: new FormControl(data.postCategory, [
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
    console.log('this.image---->', this.image);

    setTimeout(() => {
      this.dataEditor = data.content;
    }, 350);
  }
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
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

  onSEO() {
    this.submitted = true;
    if(!this.postForm.value.content) {
      this.msg.create('error', 'Vui lòng nhập nội dung');
      return
    }
    let message = `"${this.contentText}"`;
    let formData = new FormData();

      formData.append('message', message);
      formData.append('dataTypes', '50');
      this.isLoadingSEO = true;
      this.postService.chatGPT(formData).subscribe((data: any) => {
        this.isLoadingSEO = false;
        this.resultModal.showModal();
        this.content = data?.data.content;
      }, (error)=> {
        console.log('error---->', error);
        this.isLoadingSEO = false;
      })
  }
  toggleResultModal(){
    this.resultModal.toggle();

  }
  onSave(type: string) {
    this.submitted = true;
    if (this.postForm.invalid && type!=='view') {
      Object.keys(this.postForm.controls).map(key => {
        if(this.postForm.controls[key]?.status==="INVALID"){
          this.msg.create('error', 'Vui lòng nhập '+key)
        }
      })
      return;
    }
    this.isLoading = true;
    let publishedAt = "";
    // let status = "1";
    // if(type=='published'){
    //   publishedAt = new Date().toISOString();
    //   status="4"
    // }  
    let data = {
      ...this.postForm.value,      
      publishedAt,
      // status
    }
    console.log("data submit::", data)
    let formData = convertToFormDataV2(data, [
      "metaImage",
      "image",
      "imageMb",
    ]);

    if (this.isEdit)
      this.postService.editPost(formData, this.idPost).subscribe(
        (data) => {
          this.isLoading = false;
          this.visible = false;
          // this.onSuccess.emit();
          // this.resetForm();
          if(type==='view') window.open(window.location.origin+'/view-post?id='+data.id, '_blank');
          else
          this.router.navigateByUrl('/admin/posts');
        },
        (error) => {
          this.isLoading = false;
        }
      );
    else
      this.postService.createPost(formData).subscribe(
        (data) => {
          this.isLoading = false;
          this.visible = false;
          // this.onSuccess.emit();
          // this.resetForm();
          if(type==='view') window.open(window.location.origin+'/view-post?id='+data.id, '_blank');
          else
          this.router.navigateByUrl('/admin/posts');
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  resetForm() {
    this.postForm = this.postFormControl();
    this.submitted = false;
    this.state = "Tạo mới";
    this.isEdit = false;
    this.image = [];
    this.imageMb = [];
    this.metaImage = [];
    setTimeout(() => {
      this.dataEditor = "";
    }, 200);
  }

  getComment() {
    this.onSuccess.emit();
    this.openeEditComment = "";
    this.postService.getCommentByPostId(this.idPost).subscribe((data: any) => {
      this.commentList = data.map((item: any) => {
        return {
          ...item,
          createdAt: this.convertToTimeAgo(item.createdAt),
          updatedAt: this.convertToTimeAgo(item.updatedAt),
        };
      });
    });
  }

  onEditComment(data: any, index: number) {
    this.openeEditComment = index + "";
    setTimeout(() => {
      this.editComment.dataInit(data, true);
    }, 0);
  }

  onDeleteComment(id: string) {
    this.postService.deleteComment(id).subscribe((data) => {
      this.getComment();
    });
  }

  convertToTimeAgo(datetime: string): string {
    const now = moment();
    const timestamp = moment(datetime);
    return timestamp.fromNow();
  }

}
