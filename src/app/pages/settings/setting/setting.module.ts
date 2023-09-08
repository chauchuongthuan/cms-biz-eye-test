import { NgModule } from '@angular/core'
import { SettingComponent } from './page/setting.component';
import { SettingService } from './service/setting.service';

@NgModule({
  imports: [],
  declarations: [SettingComponent],
  providers: [SettingService],
  exports: []
})
export class SettingModule { }
