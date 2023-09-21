import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common/services/common.service';
import { convertToFormData, convertToFormDataV2, getFileNameFromPath } from 'src/app/shared/helper';
import { SettingService } from '../service/setting.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  public isLoading = false;
  public form: FormGroup;
  public tab: number = 1;
  dataEditor: string = '';
  hGutter = 24;
  vGutter = 24;
  public tabNum: number = 1;
  logo: any = [];
  metaImage: any = [];

  constructor(
    private settingService: SettingService,
    private commonService: CommonService,
    private fb: FormBuilder
  ) { 
    this.isLoading = true;
    this.commonService.loadingState(true);
  }

  ngOnInit(): void {
    this.getSettingList()
    this.form = this.initForm()
    // setTimeout(() => { 
    //   this.dataEditor = '';
    // }, 200)
  }
  // onChangeEditor(data: any){
  //   this.form.controls['shopDescription'].setValue(data);
  //   this.dataEditor = data;
  // }

  initForm() {

    return this.fb.group({
      phone: new FormControl('', []),
      name: new FormControl('', []),
      address: new FormControl('', []),
      linkWebsite: new FormControl('', []),
      linkFacebook: new FormControl('', []),
      logo: new FormControl({ value: "", preview: null }, []),
      
      metaDescription: new FormControl('', []),
      metaKeyword: new FormControl('', []),
      metaTitle: new FormControl('', []),
      metaImage: new FormControl({ value: "", preview: null }, []),
   });
  }

  changeFileUpload(data: any, field: string){
    console.log("data::", data)
    console.log("this.form.value::", this.form.value)
    this.form.controls[field].setValue(data)
  }

  getSettingList(){
    this.settingService.getSettingList().subscribe(data => {
      data?.map((item: any) => {
        let value = item.value
        if(['logo', 'metaImage'].includes(item.name)) {
          if(value != ''){
            value = {  value: '', preview: item.value || '' }
            if(item.name == 'logo'){
              this.logo = [{ value: "", preview: item?.value }];
            }
            if(item.name == 'metaImage'){
              this.metaImage = [{ value: "", preview: item?.value }];
            }
          }
        }
        if(value && this.form.controls[item.name]){
          this.form.controls[item.name].setValue(value)
        }
        // setTimeout(() => {
        //   if(['shopDescription'].includes(item.name)){
        //     this.dataEditor = item.value;
        //   }
        // }, 200)
      })
      setTimeout(() => {
        this.isLoading = false;
        this.commonService.loadingState(false);
      }, 200)
    })
  }

  // onSave() {
  //   let values = this.form.value;
  //   let data = convertToFormData(values, ['logo', 'metaImage']);
  //   ['logo', 'metaImage'].forEach((field) => {
  //     if(!data.get(field)){
  //       let name = getFileNameFromPath(this.form.controls[field].value?.preview || '')
  //       data.set(field, name)
  //     } 
  //   })
  //   this.isLoading = true;
  //   this.commonService.loadingState(true);
  //   this.settingService.editSetting(data).subscribe(data => {
  //     this.isLoading = false;
  //     setTimeout(() => {
  //       this.commonService.loadingState(false);
  //     }, 200)
  //   })    
  // }

  onSave() {
    let values = this.form.value;
    let data = convertToFormDataV2(values, ['logo', 'metaImage']);
    ['logo', 'metaImage'].forEach((field) => {
      console.log("field::", field)
      console.log("data.get(field)::", data.get(field))
      if(!data.get(field)){
        let name = getFileNameFromPath(this.form.controls[field].value?.preview || '')
        data.set(field, name)
      } 
    })
    this.isLoading = true;
    this.commonService.loadingState(true);
    this.settingService.editSetting(data).subscribe(data => {
      data?.map((item: any) => {
        let value = item.value
        if(['logo', 'metaImage'].includes(item.name)) {
          if(value != ''){
            value = {  value: '', preview: item.value || '' }
            if(item.name == 'logo'){
              this.logo = [{ value: "", preview: item?.value }];
            }
            if(item.name == 'metaImage'){
              this.metaImage = [{ value: "", preview: item?.value }];
            }
          }
        }
        if(value && this.form.controls[item.name]){
          this.form.controls[item.name].setValue(value)
        }
      })
      this.isLoading = false;
      setTimeout(() => {
        this.commonService.loadingState(false);
      }, 200)
    })    
  }
}
