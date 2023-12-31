import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AntdModule } from "src/app/core/antd/ant.module";
import { CoreModule } from "src/app/core/core.module";
import { PagesComponent } from "./pages/pages.component";
import { CreateEditCategoryComponent } from "./components/create-edit-category/create-edit-category.component";
import { FilterCategoryComponent } from "./components/filter-category/filter-category.component";
import { CategoryOurWorkService } from "./services/category.service";

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

const DECLARATIONS = [PagesComponent, CreateEditCategoryComponent, FilterCategoryComponent];

@NgModule({
   declarations: DECLARATIONS,
   exports: [DECLARATIONS],
   providers: [CategoryOurWorkService],
   bootstrap: [],
   imports: IMPORT,
})
export class CategoryModule {}

