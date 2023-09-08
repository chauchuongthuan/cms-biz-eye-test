import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PostService } from '../services/view-post.service';
import { Ipaginator, option, params, sort } from 'src/app/common/constant/list.model';
import { HttpParams } from '@angular/common/http';
import { RouterService } from 'src/app/common/services/router.service';
import { tableData } from 'src/app/common/constant/pageList.constant';
import { IPost } from '../../post/model/post.model';
import { Router } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  public data: IPost;
 
  
  constructor(
    private fb: UntypedFormBuilder,
    private postService: PostService,
    private msg: NzMessageService,
    private routerService: RouterService,
    private router: Router,
    private location: Location,
  ) { 
    
  }

  ngOnInit(): void {
    let urlParams = this.routerService.params;
    if(!urlParams.id) this.router.navigateByUrl('/admin/posts');
    this.postService.getDetailPost(urlParams.id).subscribe((data)=>{
      this.data = data;
    },(error)=>{
      this.router.navigateByUrl('/admin/posts');
    })
    console.log('urlParams---->', urlParams);
  }
  publicPost(){
    this.postService.changeStatus({ id: this.data.id, status: 4 }).subscribe((res: any)=> {
      this.router.navigateByUrl('/admin/posts');
    })
  }

}
