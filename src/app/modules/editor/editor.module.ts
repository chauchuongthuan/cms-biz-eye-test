import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { EditorComponent } from './pages/pages.component';
import { EditorEditCommentComponent } from './components/comment-edit/edit-comment.component';
import { EditorChatGptComponent } from './components/chatgpt/chat-gpt.component';
import { EditorCreateCommentComponent } from './components/comment-create/create-comment.component';
import { EditorCreatePostCategoryComponent } from './components/create-edit-post-category/create-post-category.component';
import { ResultSeoCheckComponent } from './components/result-seo-check/result-seo-check.component';
import { TagModule } from '../tags/tag.module';


const IMPORT = [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
    CoreModule,
    TagModule
]

const DECLARATIONS = [
    EditorComponent,
    EditorEditCommentComponent,
    EditorChatGptComponent,
    EditorCreateCommentComponent,
    EditorCreatePostCategoryComponent,
    ResultSeoCheckComponent
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class EditorModule { }
