import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { single } from './data';
import { SessionByCountriesComponent } from '../components/session-by-countries/session-by-countries.component';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('containerRef') containerRef: ElementRef
  single: any[] = [];
  view: any = [700, 400];
  width: any;
  colorScheme = {
    domain: ['#3673E8', '#3673E8', '#3673E8', '#3673E8', '#3673E8', '#3673E8']
  };
  cardColor: string = '#232837';
  
  constructor(
    private dashboardService: DashboardService,
  ) {
  }

  ngOnInit(): void {
    this.statistic()
    

  }
  statistic(){
    this.dashboardService.statistic().subscribe((data: any) => {
      if(data) {
        this.single = [...this.single];
        this.single.push(
          {
            name: "Total Posts",
            value: data.list?.totalPost || 0
          },
          {
            name: "Total Review Posts",
            value: data.list?.totalReviewPost || 0
          },
          {
            name: "Total Publish Posts",
            value: data.list?.totalPublishedPost || 0
          },
          {
            name: "Total Users",
            value: data.list?.totalUser || 0
          },
          {
            name: "Access",
            value: parseInt(data.list?.access) || 0
          },
          {
            name: "Access By Month",
            value: parseInt(data.list?.accessByMonth) || 0
          },
        )
      }
    }, error => {
      console.log("error");     
    })
  }

  onSelect(event: any) {
    console.log(event);
  }
  
}