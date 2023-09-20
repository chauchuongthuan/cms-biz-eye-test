import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AntdModule } from "src/app/core/antd/ant.module";
import { CoreModule } from "src/app/core/core.module";
import { CreateEditPageCategoryComponent } from "./components/create-category/create-edit-page-category.component";
import { CreateEditPageComponent } from "./components/create-edit-page/create-edit-page.component";
import { PageComponent } from "./pages/page.component";
import { PageHomeComponent } from "./components/page-home/page-home.component";
import { PageAboutComponent } from "./components/page-about/page-about.component";
import { PageAwardComponent } from "./components/page-award/page-award.component";
import { PageWorkComponent } from "./components/page-work/page-work.component";
import { PageNewsComponent } from "./components/page-news/page-news.component";
import { PageContactComponent } from "./components/page-contact/page-contact.component";

const IMPORT = [
   ReactiveFormsModule,
   FormsModule,
   BrowserModule,
   FormsModule,
   HttpClientModule,
   BrowserAnimationsModule,
   AntdModule,
   CoreModule,
];

const DECLARATIONS = [
   PageComponent,
   CreateEditPageComponent,
   CreateEditPageCategoryComponent,
   PageHomeComponent,
   PageAboutComponent,
   PageAwardComponent,
   PageWorkComponent,
   PageNewsComponent,
   PageContactComponent
];

@NgModule({
   declarations: DECLARATIONS,
   exports: [DECLARATIONS],
   providers: [],
   bootstrap: [],
   imports: IMPORT,
})
export class PageWebModule {}

