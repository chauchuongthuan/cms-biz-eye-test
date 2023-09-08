import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/modules/activities/services/activity.service';

@Component({
  selector: 'app-history-activity',
  templateUrl: './history-activity.component.html',
  styleUrls: ['./history-activity.component.scss']
})
export class HistoryActivityComponent implements OnInit {
  listOfData: any[] = [];
  constructor(
    private activities: ActivityService
  ) {
   }
  
  ngOnInit(): void {
    this.getActivity()

  }

  getActivity(){
    this.activities.getAllActivity().subscribe(data => {
      this.listOfData = data;
    })
  }

}
