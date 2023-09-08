import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private settingService: SettingService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      
    });
  }

  submitForm(): void {
    let data = this.validateForm.value;
    let id = data.id;

    this.settingService.editSetting(data, id).subscribe((data: any) => {
      if (data.status) {}
    })
  }
}
