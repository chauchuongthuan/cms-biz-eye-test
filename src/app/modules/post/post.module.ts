import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from 'src/app/core/antd/ant.module';
import { CoreModule } from 'src/app/core/core.module';
import { CreateEditPostComponent } from './components/create-edit-post/create-edit-post.component';
import { FilterPostComponent } from './components/filter-post.component/filter-post.component';
import { PostComponent } from './pages/post.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChatGptComponent } from './components/chatgpt/chat-gpt.component';
import { CreateCommentComponent } from './components/comment-create/create-comment.component';
import { EditCommentComponent } from './components/comment-edit/edit-comment.component';

const IMPORT = [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
    CoreModule,
    DragDropModule
]

const DECLARATIONS = [
    PostComponent,
    CreateEditPostComponent,
    FilterPostComponent,
    ChatGptComponent,
    CreateCommentComponent,
    EditCommentComponent,
]


@NgModule({
    declarations: DECLARATIONS,
    exports: [DECLARATIONS],
    providers: [],
    bootstrap: [],
    imports: IMPORT
})
export class PostModule { }
