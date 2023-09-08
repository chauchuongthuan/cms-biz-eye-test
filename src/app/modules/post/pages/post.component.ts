import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PostService } from '../services/post.service';
import { IPost } from '../model/post.model';
import { Ipaginator, option, params, sort } from 'src/app/common/constant/list.model';
import { HttpParams } from '@angular/common/http';
import { RouterService } from 'src/app/common/services/router.service';
import { CreateEditPostComponent } from '../components/create-edit-post/create-edit-post.component';
import {moveItemInArray, transferArrayItem, CdkDragPlaceholder} from '@angular/cdk/drag-drop';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public tableLoading: boolean = false;
  public checked: boolean = true;
  public expandSet = new Set<number>();
  public filterForm!: UntypedFormGroup;
  public listPost: any;
  public categories: any = [];
  public assignList: Array<any> = [];
  public newPostList: Array<any> = [];
  public reviewPostList: Array<any> = [];
  public censorshipPostList: Array<any> = [];
  public publishPostList: Array<any> = [];
  public changeStatus: boolean = true;
  public currentUser: any;
  public visible = false;
  public isSpin = false;
  public size: 'large' | 'default' = 'default';
  public params: HttpParams = params;
  public isList: boolean = true;
  public checkOptionsOne = [
    { label: 'Tên danh mục', value: 'name', checked: true },
    { label: 'Mô tả', value: 'shortDescription', checked: false },
  ];
  public paginator: Ipaginator = {
    option: option,
    limit: 10,
    currentPage: 1,
    total: 0,
    pageCount: 0
  };
  public sort: sort = {
    order: -1,
    orderBy: 'createdAt'
  }
  public listOfData = [];
  @ViewChild('editForm') editForm: CreateEditPostComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private postService: PostService,
    private msg: NzMessageService,
    private routerService: RouterService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.initParams();
    this.currentUser = this.authenticationService.currentUserValue;
    // if(Object.keys(this.currentUser?.role?.permissions).includes('post_change_status')){ 
    //   this.changeStatus = true;
    // }
    this.filterForm = this.fb.group({
      name: new FormControl('', []),
      active: new FormControl('', []),
      date: new FormControl('', []),
    });
    // this.getPost(this.params);
    this.getAllPost();
    this.postService.getCategory().subscribe(data => {
      // console.log(`Category: ${data}`);
      this.categories = data;
    })
  }

  initParams(){
    this.params = this.params.set('orderBy', this.sort.orderBy)
    this.params = this.params.set('order', this.sort.order)

    let urlParams = this.routerService.params
    let keys = Object.keys(urlParams)
    keys.forEach((key, index) => {
      this.params = this.params.set(key, urlParams[key])
    })
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  getPost(params: HttpParams) {
    this.tableLoading = true;
    this.postService.getPost(params).subscribe(data => {
      this.listPost = data.list;
      this.paginator = {
        ...data.paginator,
        option
      }
      this.tableLoading = false;
      this.routerService.replaceParams(this.params);
    })
  }

  changeMode() {
    this.isList = !this.isList;
  }

  onFilter(filters: any){    
    if(filters){
      let keys = Object.keys(filters)
      let values = Object.values(filters)
      keys.forEach((key, index) => {
        if(!values[index]){
          this.params = this.params.set(key, '')
        }else if(['number', 'boolean', 'string'].includes(typeof values[index])){
          this.params = this.params.set(key, `${values[index]}`)
        }
      })
    }
    this.getPost(this.params)
  }
  onEdit(data: IPost){
    // this.editForm.visible = true;
    this.editForm.initData(data);
  }

  onDelete(id: string){
    this.isSpin = true
    this.postService.deletePost(id).subscribe(data => {
        this.getAllPost();
        this.getPost(this.params);
        this.isSpin = false;
      },
      error => this.isSpin = false
    )
  }
  // onExport(){
  //   this.postService.exportPost(this.params)
  // }

  // get title(): string {
  //   return `${this.size} Drawer`;
  // }

  tableChange(e: any){
    let arraySort = e.sort as Array<any>;
    let fieldSort = arraySort.find((item) => item.value != null)

    let page = e.pageIndex;
    let limit = e.pageSize;
    let sort: sort = {
      orderBy: fieldSort ? fieldSort.key : 'createdAt',
      order: fieldSort?.value == 'ascend' ? 1 : -1
    }
    this.onChange(page, limit, sort)
  }

  onChange(page: number, limit: number, sort: sort){
    this.params = this.params.set('page', page)
    this.params = this.params.set('limit', limit)
    this.params = this.params.set('orderBy', sort.orderBy)
    this.params = this.params.set('order', sort.order)
    this.getPost(this.params)
  }

  onSuccess(){
    this.getAllPost();
    this.getPost(this.params);
  }

  getAllPost(){
    this.newPostList = []
    this.reviewPostList = []
    this.censorshipPostList = []
    this.publishPostList = []
    this.postService.getAllPost(1).subscribe((item: any) => {
      this.newPostList = item;
    })
    this.postService.getAllPost(2).subscribe((item: any) => {
      this.reviewPostList = item;
    })
    this.postService.getAllPost(3).subscribe((item: any) => {
      this.censorshipPostList = item;
    })
    this.postService.getAllPost(4).subscribe((item: any) => {
      this.publishPostList = item;
    })
    
  }
  drop(event: any) {  
    const newListLength = this.newPostList.length;
    const reviewListLength = this.reviewPostList.length;
    const censorshipListLength = this.censorshipPostList.length;
    const publishListLength = this.publishPostList.length;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {     
      // this.isSpin = true
      const draggedItem = event.previousContainer.data[event.previousIndex]   
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if(this.newPostList.length > newListLength){
        this.postService.changeStatus({id: draggedItem.id, status: "1"}).subscribe(() => {
          // this.getAllPost();
          // this.isSpin = false;
          draggedItem.status = "1";
        });
      }
      else if(this.reviewPostList.length > reviewListLength){
        this.postService.changeStatus({id: draggedItem.id, status: "2"}).subscribe(() => {
          // this.getAllPost();
          // this.isSpin = false;
          draggedItem.status = "2";
        });
      }
      else if(this.censorshipPostList.length > censorshipListLength){
        this.postService.changeStatus({id: draggedItem.id, status: "3"}).subscribe(() => {
          // this.getAllPost();
          // this.isSpin = false;
          draggedItem.status = "3";
        });
      }
      else if(this.publishPostList.length > publishListLength){
        this.postService.changeStatus({id: draggedItem.id, status: "4"}).subscribe(() => {
          // this.getAllPost();
          // this.isSpin = false;
          draggedItem.status = "4";
        });
      }    
    }
  }
  handleClick(event: any){
    this.onEdit(event);
  }
  goToDetail(id: string){
    this.router.navigateByUrl(`/admin/news?id=${id}`)
  }
}
