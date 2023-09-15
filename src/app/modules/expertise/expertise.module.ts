import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AntdModule } from "src/app/core/antd/ant.module";
import { CoreModule } from "src/app/core/core.module";
import { PagesExpertiseComponent } from "./pages/pages.component";
import { ExpertiseService } from "./services/expertise.service";
import { CreateEditExpertiseComponent } from "./components/create-edit-expertise/create-edit-expertise.component";
import { FilterExpertiseComponent } from "./components/filter-expertise/filter-expertise.component";

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

const DECLARATIONS = [PagesExpertiseComponent, CreateEditExpertiseComponent, FilterExpertiseComponent];

@NgModule({
   declarations: DECLARATIONS,
   exports: [DECLARATIONS],
   providers: [ExpertiseService],
   bootstrap: [],
   imports: IMPORT,
})
export class ExpertiseModule {}

