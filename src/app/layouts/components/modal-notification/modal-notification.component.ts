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
const GET_NOTI = gql`
subscription onNotiAdded{
  notification{
    id,
    type,
    message,
    data,
    seen,
    createdAt
  }
}
`;
const initQuery = gql`
query {
  items(page: 1, limit: 10) {
    id,
    type,
    message,
    data,
    seen,
    createdAt
  }
}`
const seenQuery = gql`
  mutation($id: String!) {
    seen(id: $id){
      id,
      type,
      message,
      data,
      seen,
      createdAt
    }
  }
`;
@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.scss']
})
export class ModalNotificationComponent implements OnInit {
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
      this.queryRef = this.apollo.watchQuery({
        query: initQuery,
      });
    }

  ngOnInit(): void {
    this.getNotification();
    this.queryRef.subscribeToMore({
      document: GET_NOTI,
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        this.listNotification.push(subscriptionData.data.notification)
      },
    })
  }
  getNotification() {
    this.notificationRef = this.apollo.watchQuery({
      query: gql`
      query getAllNoti($page: Int!) {
        items(page: $page, limit: 10) {
          id,
          type,
          message,
          data,
          seen,
          createdAt
        }
      }`,
      context: {
        headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getTokenUser()}`),
      },
      // pollInterval: 500,
    });
    this.notificationRef.setVariables({page: this.page})
    this.notificationRef.valueChanges.subscribe(({ data, loading }: {data: any, loading: any}) => {
      if(data && data['items']){ 
        this.listNotification = data['items'];
        let unSeen = this.listNotification.find((n: any) => n.seen===false);
        if(unSeen) this.isNew.emit(true)
        else this.isNew.emit(false)
      }
    });
  }
  showMore(){
    this.page ++;
    this.notificationRef.fetchMore({variables: {page: this.page}}).then(({data}: any)=>{
      if(data.items.length==0) this.isShowMore = false;
      this.listNotification = [
        ...this.listNotification,
        ...data.items
      ];
      this.isNew.emit(true)
    });
  }
  clickNotification(id: string){
    this.apollo
      .mutate({
        mutation: seenQuery,
        variables: {
          id: id
        },
        context: {
          headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getTokenUser()}`),
        },
      })
      .subscribe(({ data }: any) => {
        this.notificationRef.refetch();
      });
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
    // // Check type use AI
    // let dataType: number = 10;
    // switch (type) {
    //   case CHATTYPES.AW:
    //     dataType = CHATTYPES.AW
    //     break;
    //   case CHATTYPES.IMPROVE:
    //     dataType = CHATTYPES.IMPROVE
    //     break;
    //   case CHATTYPES.TRANSLATE:
    //     dataType = CHATTYPES.TRANSLATE
    //     break;
    //   case CHATTYPES.QA:
    //     dataType = CHATTYPES.QA
    //     break;
    
    //   default:
    //     dataType = 10
    //     break;
    // }
    // // Out data to layouts
    // this.prompt.emit({
    //   type: dataType,
    //   prompt: this.content,
    // });
  }
  onLoadMore(){

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
