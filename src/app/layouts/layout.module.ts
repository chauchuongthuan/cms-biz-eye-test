import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AntdModule } from '../core/antd/ant.module';
import { IconsProviderModule } from '../core/antd/icons-provider.module';
import { CoreModule } from '../core/core.module';
import { LayoutRoutingModule } from './layout.routing';
import { LayoutsComponent } from './layouts/layouts.component';
import { ModalChatgptComponent } from './components/modal-chatgpt/modal-chatgpt.component';
import { LayoutService } from './layout.service';
import { ModalChatgptResponseComponent } from './components/modal-chatgpt-response/modal-chatgpt-response.component';
import { ModalNotificationComponent } from './components/modal-notification/modal-notification.component';
@NgModule({
    declarations: [
        LayoutsComponent,
        ModalChatgptComponent,
        ModalChatgptResponseComponent,
        ModalNotificationComponent
    ],
    imports: [
        NzLayoutModule,
        FormsModule,
        NzMenuModule,
        LayoutRoutingModule,
        AntdModule,
        CommonModule,
        IconsProviderModule,
        CoreModule,
        ReactiveFormsModule
    ],
    providers: [LayoutService],
    exports: [
        LayoutsComponent
    ],
})
export class LayoutModule { }
