import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NZ_I18N, vi_VN } from "ng-zorro-antd/i18n";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiService } from "./common/services/api.service";
import { AuthenticationService } from "./common/services/auth.service";
import { CommonService } from "./common/services/common.service";
import { LocalService } from "./common/services/local.service";
import { ToastService } from "./common/services/notification.service";
import { RouterService } from "./common/services/router.service";
import { CoreModule } from "./core/core.module";
import { LayoutModule } from "./layouts/layout.module";
import { PageModule } from "./pages/page.module";
import vi from "@angular/common/locales/vi";
import { PostCategoryModule } from "./modules/post-category/postCategory.module";
import { ContactModule } from "./modules/contact/contact.module";
import { SubscriberModule } from "./modules/subscriber/subscriber.module";
import { MailListModule } from "./modules/mail-list/mail-list.module";
import { MailScheduleModule } from "./modules/mail-schedule/mail-schedule.module";
import { InterestModule } from "./modules/interest/interest.module";
import { TagModule } from "./modules/tags/tag.module";
import { UserModule } from "./modules/user/user.module";
import { RoleModule } from "./modules/role/role.module";
import { PostModule } from "./modules/post/post.module";
import { ActivityModule } from "./modules/activities/activity.module";
import { PageWebModule } from "./modules/pages/page.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { CustomerCareTypeModule } from "./modules/customerCareType/CustomerCareType.module";
import { CustomerCareListModule } from "./modules/customerCareList/CustomerCareList.module";
import { TokenDrawModule } from "./modules/token-draw/token-draw.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { EditorModule } from "./modules/editor/editor.module";
import { HistoryChatGPTModule } from "./modules/history/history.module";
import { ViewPostModule } from "./modules/view-post/view-post.module";
import { MenuDNDModule } from "./modules/menu/menudnd.module";
import { CategoryModule } from "./modules/category/category.module";
import { ExpertiseModule } from "./modules/expertise/expertise.module";
import { AwardModule } from "./modules/award/award.module";
registerLocaleData(vi);

@NgModule({
   declarations: [AppComponent],
   imports: [
      //angular
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,

      //page module
      CoreModule,
      // LayoutModule,
      AppRoutingModule,
      PageModule,

      // News module
      PostCategoryModule,
      TagModule,
      PostModule,

      // Contact module
      ContactModule,

      //Subscriber
      SubscriberModule,

      //Mail List
      MailListModule,

      //Mail Schedule
      MailScheduleModule,

      //Interest
      InterestModule,

      //User
      UserModule,

      //Role
      RoleModule,

      ActivityModule,
      PageWebModule,

      //Customer
      CustomerModule,

      //CustomerCare
      CustomerCareTypeModule,
      CustomerCareListModule,

      // TokenDraw
      TokenDrawModule,

      // Chart
      DashboardModule,
      NgxChartsModule,

      // Editor
      EditorModule,
      ViewPostModule,
      // HistoryChatGPTModule

      // Menu
      MenuDNDModule,

      // Our work category
      CategoryModule,

      //
      ExpertiseModule,

      // Award
      AwardModule
   ],
   providers: [
      { provide: NZ_I18N, useValue: vi_VN },
      AuthenticationService,
      ApiService,
      CommonService,
      LocalService,
      ToastService,
      RouterService,
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}

