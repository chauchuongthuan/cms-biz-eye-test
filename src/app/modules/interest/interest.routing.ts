import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterestComponent } from './pages/interest.component';

const routes: Routes = [
  { path: '', component: InterestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterestRoutingModule { }
