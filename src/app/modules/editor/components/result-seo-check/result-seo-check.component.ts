import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueryRef, Apollo } from 'apollo-angular';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CHATTYPES } from 'src/app/common/constant/chatGPTType.constant';
import { COUNTRIES } from 'src/app/common/constant/countries';
import { AuthenticationService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-result-seo-check',
  templateUrl: './result-seo-check.component.html',
  styleUrls: ['./result-seo-check.component.scss']
})
export class ResultSeoCheckComponent implements OnInit {

  @Input() content: string;
  optionList: any = COUNTRIES;
  public language: string = '';
  selectedValue: any;
  public isVisible = false;
  public isOkLoading = false;
  public isShowMore = true;
  queryRef: QueryRef<any>;
  public notificationRef: QueryRef<any>;
  listNotification: any = [];
  page: number = 1;

  public initLoading = false;
  constructor(


    ) { 
    }

  ngOnInit(): void {
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  log(value: any): void {
    this.language = value;
  }
  
  showModal(): void {
    this.isVisible = true;
  }
  toggle(): void {
    this.isVisible = !this.isVisible;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }


}
