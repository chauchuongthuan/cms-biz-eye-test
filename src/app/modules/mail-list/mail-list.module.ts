import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditMailListComponent } from './components/create-edit-mail-list/create-edit-mail-list.component';
import { MailListComponent } from './pages/mail-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterMailListComponent } from './components/filter-mail-list.component/filter-mail-list.component';
import { ImportDataComponent } from './components/import-data/import-data.component';

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
    MailListComponent,
    CreateEditMailListComponent,
    FilterMailListComponent,
    ImportDataComponent,
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class MailListModule { }
