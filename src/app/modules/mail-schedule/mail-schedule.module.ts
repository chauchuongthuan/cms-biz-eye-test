import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CreateEditMailScheduleComponent } from './components/create-edit-mail-schedule/create-edit-mail-schedule.component';
import { MailScheduleComponent } from './pages/mail-schedule.component';
import { CoreModule } from 'src/app/core/core.module';
import { FilterMailScheduleComponent } from './components/filter-mail-schedule.component/filter-mail-schedule.component';

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
    MailScheduleComponent,
    CreateEditMailScheduleComponent,
    FilterMailScheduleComponent,
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class MailScheduleModule { }
