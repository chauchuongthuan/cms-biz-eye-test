import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '../../../common/constant/countries'
import { CHATTYPES } from 'src/app/common/constant/chatGPTType.constant';
@Component({
  selector: 'app-modal-chatgpt',
  templateUrl: './modal-chatgpt.component.html',
  styleUrls: ['./modal-chatgpt.component.scss']
})
export class ModalChatgptComponent implements OnInit {
  @Output() prompt = new EventEmitter();
  public isVisible = false;
  public isOkLoading = false;
  public promtForm: FormGroup;
  optionList: any = COUNTRIES;
  public language: string = '';
  selectedValue: any;
  constructor(private fb: FormBuilder) {
    this.promtForm = this.fb.group({
      promt: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {
  }

  log(value: any): void {
    this.language = value;
  }

  showModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  enterPromt(type: number) {
    // Check type use AI
    let dataType: number = 10;
    switch (type) {
      case CHATTYPES.AW:
        dataType = CHATTYPES.AW
        break;
      case CHATTYPES.IMPROVE:
        dataType = CHATTYPES.IMPROVE
        break;
      case CHATTYPES.TRANSLATE:
        dataType = CHATTYPES.TRANSLATE
        break;
      case CHATTYPES.QA:
        dataType = CHATTYPES.QA
        break;
    
      default:
        dataType = 10
        break;
    }
    // Out data to layouts
    console.log(this.promtForm.controls['promt'].value);
    if (this.promtForm.controls['promt'].value) {
      console.log(this.language, dataType);
      this.prompt.emit({
        type: dataType,
        prompt: this.promtForm.controls['promt'].value,
        language: this.language
      });
      this.closeModal();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
