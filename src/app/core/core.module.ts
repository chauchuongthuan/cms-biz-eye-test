import { NgModule } from '@angular/core';
import { AntdModule } from './antd/ant.module';
import { IconsProviderModule } from './antd/icons-provider.module';
import { DigitopDrawerComponent } from './components/digitop-drawer/digitop-drawer.component';
import { DigitopUploadComponent } from './components/digitop-upload/digitop-upload.component';
import { OutsideDirective } from './directives/outside.directive';
import { CommonModule } from '@angular/common';
import { DigitopEditorComponent } from './components/digitop-editor/digitop-editor.component';
// import { CKEditorModule } from 'ckeditor4-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-simple-upload';
const DECLARATIONS = [
    OutsideDirective,
    DigitopDrawerComponent,
    DigitopUploadComponent,
    DigitopEditorComponent,
    UploadFileComponent
]
@NgModule({
    declarations: [ 
        ...DECLARATIONS,
    ],
    imports: [
        CommonModule,
        AntdModule,
        IconsProviderModule,
        CKEditorModule,
        FormsModule
    ],
    exports: [...DECLARATIONS],
    providers: [
        // { provide: 'CKEditorSimpleUploadAdapter', useFactory: SimpleUploadAdapter.factory }
    ]
})
export class CoreModule { }
