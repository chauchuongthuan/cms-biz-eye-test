import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CHATTYPES } from 'src/app/common/constant/chatGPTType.constant';
import { COUNTRIES } from 'src/app/common/constant/countries';
import { Apollo, gql, QueryRef } from "apollo-angular";
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import * as moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
@Component({
  selector: 'app-modal-chatgpt-response',
  templateUrl: './modal-chatgpt-response.component.html',
  styleUrls: ['./modal-chatgpt-response.component.scss']
})
export class ModalChatgptResponseComponent implements OnInit {
  @Input() content: string;
  @Output() prompt = new EventEmitter();
  @Output() isNew = new EventEmitter();
  @Output() trans = new EventEmitter();
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
    private notification: NzNotificationService,
    private apollo: Apollo,
    private authService: AuthenticationService,

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

  enterPromt(type: number) {
    // Check type use AI
    let dataType: number = 10;
    switch (type) {
      case CHATTYPES.AW:
        dataType = CHATTYPES.AW
        break;
      case CHATTYPES.IMPROVE:
        dataType = CHATTYPES.IMPROVE
        break;
      case CHATTYPES.TRANSLATE:
        dataType = CHATTYPES.TRANSLATE
        break;
      case CHATTYPES.QA:
        dataType = CHATTYPES.QA
        break;
    
      default:
        dataType = 10
        break;
    }
    // Out data to layouts
    this.prompt.emit({
      type: dataType,
      prompt: this.content,
    });
  }

  copyText(text: string) {    
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notification.info("Copied", "Đã sao chép thành công", {nzDuration: 2000})
    return;
  }
  convertToTimeAgo(datetime: string): string {
    const now = moment();
    const timestamp = moment(datetime);
    return timestamp.fromNow();
  }
}
