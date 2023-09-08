import { Component, OnInit } from '@angular/core';
import { single } from './data';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-top-link',
  templateUrl: './top-link.component.html',
  styleUrls: ['./top-link.component.scss']
})
export class TopLinkComponent implements OnInit {
  listOfData: any[] = [];
  single: any[];
  view: any[] = [700, 400];

  // options
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme = {
    domain: ['#3673E8', '#1389fd', '#61B8FF', '#1389fd']
  };

  constructor(
    private dashboardService: DashboardService,
  ) {
  }
  ngOnInit(): void {
    this.statisticFavoritePost()
  }

  statisticFavoritePost(){
    this.dashboardService.statisticFavoritePost().subscribe((data: any) => {
      console.log("data favorite::", data.list?.favoritePost)
      if(data) {
        this.listOfData = data.list?.favoritePost;
      }
    }, error => {
      console.log("error");     
    })
  }
}
