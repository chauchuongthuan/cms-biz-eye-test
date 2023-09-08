import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailScheduleComponent } from './pages/mail-schedule.component';

const routes: Routes = [
  { path: '', component: MailScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailScheduleRoutingModule { }
