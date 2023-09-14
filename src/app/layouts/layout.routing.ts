import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostCategoryComponent } from "../modules/post-category/pages/post-category.component";
import { PostComponent } from "../modules/post/pages/post.component";
import { TagComponent } from "../modules/tags/pages/tag.component";
import { SettingComponent } from "../pages/settings/setting/page/setting.component";
import { LayoutsComponent } from "./layouts/layouts.component";
import { ContactComponent } from "../modules/contact/pages/contact.component";
import { SubscriberComponent } from "../modules/subscriber/pages/subscriber.component";
import { MailListComponent } from "../modules/mail-list/pages/mail-list.component";
import { MailScheduleComponent } from "../modules/mail-schedule/pages/mail-schedule.component";
import { UserComponent } from "../modules/user/pages/user.component";
import { RoleComponent } from "../modules/role/pages/role.component";
import { ActivityComponent } from "../modules/activities/pages/activity.component";
import { PageComponent } from "../modules/pages/pages/page.component";
import { CustomerComponent } from "../modules/customer/pages/customer.component";
import { CustomerCareTypeComponent } from "../modules/customerCareType/pages/customer-care-type.component";
import { CustomerCareListComponent } from "../modules/customerCareList/pages/customer-care-list.component";
import { DashboardComponent } from "../modules/dashboard/pages/pages.component";
import { EditorComponent } from "../modules/editor/pages/pages.component";
import { HistoryComponent } from "../modules/history/pages/pages.component";
import { ViewPostComponent } from "../modules/view-post/pages/view-post.component";
import { MenuDNDComponent } from "../modules/menu/pages/pages.component";
import { InterestComponent } from "../modules/interest/pages/interest.component";
import { PageHomeComponent } from "../modules/pages/components/page-home/page-home.component";
import { PageAboutComponent } from "../modules/pages/components/page-about/page-about.component";
import { PagesComponent } from "../modules/category/pages/pages.component";

const routes: Routes = [
   {
      path: "",
      loadChildren: () => import("../pages/login/login.module").then((m) => m.LoginModule),
   },
   {
      path: "admin",
      component: LayoutsComponent,
      children: [
         {
            path: "",
            component: DashboardComponent,
         },
         {
            path: "setting",
            component: SettingComponent,
         },
         {
            path: "post-category",
            component: PostCategoryComponent,
         },
         {
            path: "tags",
            component: TagComponent,
         },
         {
            path: "posts",
            component: PostComponent,
         },
         {
            path: "contacts",
            component: ContactComponent,
         },
         {
            path: "subscribers",
            component: SubscriberComponent,
         },
         {
            path: "mail-lists",
            component: MailListComponent,
         },
         {
            path: "mail-schedules",
            component: MailScheduleComponent,
         },
         {
            path: "interests",
            component: InterestComponent,
         },
         {
            path: "users",
            component: UserComponent,
         },
         {
            path: "roles",
            component: RoleComponent,
         },
         {
            path: "activities",
            component: ActivityComponent,
         },
         {
            path: "pages",
            component: PageComponent,
         },
         {
            path: "page-home",
            component: PageHomeComponent,
         },
         {
            path: "page-about",
            component: PageAboutComponent,
         },
         {
            path: "category-work",
            component: PagesComponent,
         },
         {
            path: "customers",
            component: CustomerComponent,
         },
         {
            path: "customer-care-types",
            component: CustomerCareTypeComponent,
         },
         {
            path: "customer-care-lists",
            component: CustomerCareListComponent,
         },
         {
            path: "news",
            component: EditorComponent,
         },
         {
            path: "history",
            component: HistoryComponent,
         },
         {
            path: "menus",
            component: MenuDNDComponent,
         },
      ],
   },
   {
      path: "view-post",
      component: ViewPostComponent,
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class LayoutRoutingModule {}

