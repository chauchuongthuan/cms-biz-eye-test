import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailListComponent } from './pages/mail-list.component';

const routes: Routes = [
  { path: '', component: MailListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailListRoutingModule { }
