import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardComponent } from './pages/pages.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SessionByCountriesComponent } from './components/session-by-countries/session-by-countries.component';
import { SessionByDevicesComponent } from './components/session-by-devices/session-by-devices.component';
import { TopLinkComponent } from './components/top-link/top-link.component';
import { VerticalBarLiveUserComponent } from './components/vertical-bar-live-user/vertical-bar-live-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { HistoryActivityComponent } from './components/history-activity/history-activity.component';
import { GraphQLModule } from './graphql.module';
import { ApolloModule } from 'apollo-angular';

const IMPORT = [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
    CoreModule,
    NgxChartsModule,
    GraphQLModule,
    ApolloModule
]

const DECLARATIONS = [
    DashboardComponent,
    SessionByCountriesComponent,
    SessionByDevicesComponent,
    TopLinkComponent,
    VerticalBarLiveUserComponent,
    RegisterUserComponent,
    HistoryActivityComponent
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class DashboardModule { }
