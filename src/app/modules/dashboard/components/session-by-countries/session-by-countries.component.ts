import { Component, OnInit } from "@angular/core";
import { single } from "./data";
import { DashboardService } from "../../services/dashboard.service";
import { COUNTRIES } from "src/app/common/constant/countries";

@Component({
   selector: "app-session-by-countries",
   templateUrl: "./session-by-countries.component.html",
   styleUrls: ["./session-by-countries.component.scss"],
})
export class SessionByCountriesComponent implements OnInit {
   single: any[] = [];
   view: any = [700, 400];

   // options
   showXAxis: boolean = true;
   showYAxis: boolean = true;
   gradient: boolean = false;
   showLegend: boolean = true;
   showXAxisLabel: boolean = true;
   yAxisLabel: string = "Lượt truy cập theo quốc gia";
   showYAxisLabel: boolean = true;
   xAxisLabel: string = "Population";

   colorScheme = {
      domain: ["#3027FE", "#FF0A6C"],
   };

   constructor(private dashboardService: DashboardService) {
      // Object.assign(this, { single });
   }
   ngOnInit(): void {
      this.statisticCountry();
   }

   onResize(event: any) {
      this.view = [event.target.innerWidth / 1.35, 400];
   }

   statisticCountry() {
      this.dashboardService.statisticCountry().subscribe(
         (data: any) => {
            if (data) {
               this.single = [...this.single];
               data?.list?.accessByCountry.forEach((element: any) => {
                  this.single.push({
                     name: this.transferCountryName(element?.name?.slice(-2)),
                     value: parseInt(element.value) || 0,
                  });
               });
               // this.single.push(
               //   {
               //     name: "Window",
               //     value: parseInt(data.list?.accessByWindow) || 0
               //   },
               //   {
               //     name: "Mobile",
               //     value: parseInt(data.list?.accessByMobile) || 0
               //   },
               // )
            }
         },
         (error) => {
            console.log("error");
         },
      );
   }

   transferCountryName(countryCode: any) {
      const country = COUNTRIES.find((c) => c.code === countryCode);
      const countryLabel = country ? country.label : "Unknown";
      return countryLabel;
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
