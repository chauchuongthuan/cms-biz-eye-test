import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  listOfData: any[] = [];
  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.statisticNewUser()
  }

  statisticNewUser(){
    this.dashboardService.statisticNewUser().subscribe((data: any) => {
      if(data) {
        this.listOfData = data.list?.newUser;
      }
    }, error => {
      console.log("error");     
    })
  }
}
