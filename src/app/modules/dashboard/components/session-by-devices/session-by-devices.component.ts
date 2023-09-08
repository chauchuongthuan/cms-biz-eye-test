import { Component, OnInit } from "@angular/core";
import { single } from "./data";
import { DashboardService } from "../../services/dashboard.service";

@Component({
   selector: "app-session-by-devices",
   templateUrl: "./session-by-devices.component.html",
   styleUrls: ["./session-by-devices.component.scss"],
})
export class SessionByDevicesComponent implements OnInit {
   single: any[] = [];
   view: any[] = [700, 400];
   below: any = "below";
   // options
   gradient: boolean = true;
   showLegend: boolean = true;
   showLabels: boolean = true;
   isDoughnut: boolean = false;

   colorScheme = {
      domain: ["#3027FE", "#FF0A6C"],
   };
   isReady = false;

   constructor(private dashboardService: DashboardService) {
      // Object.assign(this, { single });
   }

   ngOnInit(): void {
      this.isReady = true;
      this.statisticDevice();
   }

   statisticDevice() {
      this.dashboardService.statisticDevice().subscribe(
         (data: any) => {
            if (data) {
               this.single = [...this.single];
               this.single.push(
                  {
                     name: "Window",
                     value: parseInt(data.list?.accessByWindow) || 0,
                  },
                  {
                     name: "Mobile",
                     value: parseInt(data.list?.accessByMobile) || 0,
                  },
               );
            }
         },
         (error) => {
            console.log("error");
         },
      );
   }
   // onSelect(data: any): void {
   //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
   // }

   // onActivate(data: any): void {
   //   console.log('Activate', JSON.parse(JSON.stringify(data)));
   // }

   // onDeactivate(data: any): void {
   //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
   // }
}
