import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { CreateEditPageCategoryComponent } from './components/create-category/create-edit-page-category.component';
import { CreateEditPageComponent } from './components/create-edit-page/create-edit-page.component';
import { PageComponent } from './pages/page.component';
import { PageHomeComponent } from './components/page-home/page-home.component';

const IMPORT = [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
    CoreModule,
]

const DECLARATIONS = [
    PageComponent,
    CreateEditPageComponent,
    CreateEditPageCategoryComponent,
    PageHomeComponent
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class PageWebModule { }
