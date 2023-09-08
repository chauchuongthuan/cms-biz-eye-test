import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/common/services/auth.service';
// import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import Editor from '../../../../../ckeditor5/build/ckeditor';
const { convert } = require('html-to-text');
@Component({
  selector: 'app-digitop-editor',
  templateUrl: './digitop-editor.component.html',
})
export class DigitopEditorComponent implements OnInit { 
  editor: any;
  @Output() onChangeData = new EventEmitter();
  @Output() onChangeText = new EventEmitter();
  @Input() initData: string = '';
  @Input() text: string = '';
  @Input() placeHolder: string;
  public Editor = Editor;
  public isReady: boolean = false;
  // @Output() onChangeEditor = new EventEmitter();
  public config = {
    // width: '100%',  
    placeholder: 'Nội dung',
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: `${environment.BASE_URL}admin/filemanagers/single`,     
      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
          Authorization: `Bearer ${this.authService.getTokenUser()}`
      }
  }
  }
  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.isReady = true;
  }
  ngAfterViewInit(): void {
    // this.config.editorplaceholder = this.placeHolder
  }

  onChange(e: any){
    this.onChangeData.emit(e.editor.getData());
    this.onChangeText.emit(convert(e.editor.getData()))
  }

}
