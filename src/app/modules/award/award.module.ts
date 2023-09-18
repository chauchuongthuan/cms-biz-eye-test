import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AntdModule } from "src/app/core/antd/ant.module";
import { CoreModule } from "src/app/core/core.module";
import { AwardPagesComponent } from "./pages/pages.component";
import { CreateEditAwardComponent } from "./create-edit-award/create-edit-award.component";
import { FilterAwardComponent } from "./filter-award/filter-award.component";
import { AwardService } from "./services/award.service";
import { PostAwardComponent } from "./post-award/post-award.component";
import { PostAwardListComponent } from "./post-award-list/post-award-list.component";

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
   AwardPagesComponent,
   CreateEditAwardComponent,
   FilterAwardComponent,
   PostAwardComponent,
   PostAwardListComponent,
];

@NgModule({
   declarations: DECLARATIONS,
   exports: [DECLARATIONS],
   providers: [AwardService],
   bootstrap: [],
   imports: IMPORT,
})
export class AwardModule {}

