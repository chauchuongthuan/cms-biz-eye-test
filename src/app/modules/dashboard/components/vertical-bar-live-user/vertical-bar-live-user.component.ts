import { Component, OnInit } from "@angular/core";
import { Apollo, gql, QueryRef } from "apollo-angular";

const GET_ACCESS_BY_MINUTE = gql`
   subscription accessByMinute {
      accessByMinute {
         name
         value
         time
      }
   }
`;
@Component({
   selector: "app-vertical-bar-live-user",
   templateUrl: "./vertical-bar-live-user.component.html",
   styleUrls: ["./vertical-bar-live-user.component.scss"],
})
export class VerticalBarLiveUserComponent implements OnInit {
   public accessByMinuteQueryRef: QueryRef<any>;
   queryRef: QueryRef<any>;
   dataLiveUser: any[] = [
      {
         name: "00:00",
         value: "0",
      },
      {
         name: "00:01",
         value: "0",
      },
      {
         name: "00:02",
         value: "0",
      },
      {
         name: "00:03",
         value: "0",
      },
      {
         name: "00:04",
         value: "0",
      },
      {
         name: "00:05",
         value: "0",
      },
      {
         name: "00:06",
         value: "0",
      },
      {
         name: "00:07",
         value: "0",
      },
      {
         name: "00:08",
         value: "0",
      },
      {
         name: "00:09",
         value: "0",
      },
      {
         name: "00:10",
         value: "0",
      },
   ];
   multi: any[];

   view: any[] = [700, 400];

   // options
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = true;
   showXAxisLabel = true;
   xAxisLabel = "Thời gian";
   showYAxisLabel = true;
   yAxisLabel = "Người dùng";

   colorScheme = {
      domain: ["#3027FE", "#FF0A6C"],
   };

   constructor(private apollo: Apollo) {}

   ngOnInit(): void {
      // Check if data exists in local storage
      this.queryRef = this.apollo.watchQuery({
         query: gql`
            query {
               items(page: 1) {
                  name
                  value
                  time
               }
            }
         `,
      });
      const storedData = localStorage.getItem("dataLiveUser");
      if (storedData) {
         this.dataLiveUser = JSON.parse(storedData);
      }

      this.queryRef.subscribeToMore({
         document: GET_ACCESS_BY_MINUTE,
         updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
            if (this.dataLiveUser.length > 0) {
               let exist = this.dataLiveUser.find((x) => x.time == subscriptionData.data["accessByMinute"]["time"]);
               if (!exist) {
                  this.dataLiveUser = [
                     ...this.dataLiveUser,
                     {
                        name: subscriptionData.data["accessByMinute"]["time"],
                        value: parseInt(subscriptionData.data["accessByMinute"]["value"]) * 10,
                     },
                  ];
                  if (this.dataLiveUser.length >= 30) {
                     this.dataLiveUser.shift(); // Remove the first item from array

                     // Update local storage with the modified data
                     localStorage.setItem("dataLiveUser", JSON.stringify(this.dataLiveUser));
                  } else {
                     // Update local storage with the new data
                     localStorage.setItem("dataLiveUser", JSON.stringify(this.dataLiveUser));
                  }
               }
            } else {
               this.dataLiveUser = [
                  {
                     name: subscriptionData.data["accessByMinute"]["time"],
                     value: parseInt(subscriptionData.data["accessByMinute"]["value"]),
                  },
               ];
               localStorage.setItem("dataLiveUser", JSON.stringify(this.dataLiveUser));
            }
         },
      });
   }
   onSelect(event: any) {
      console.log(event);
   }

   getAccessByMinute() {
      this.accessByMinuteQueryRef = this.apollo.watchQuery({
         query: gql`
            query {
               items(page: 1) {
                  name
                  value
                  time
               }
            }
         `,
      });
      // this.accessByMinuteQueryRef.setVariables({})
      // this.accessByMinuteQueryRef.valueChanges.subscribe(({ data, loading }: {data: any, loading: any}) => {
      //   console.log('data---->', data);
      //   if(data && data['items']){
      //     this.dataLiveUser = data['items'];
      //     console.log('data---->', data);
      //   }
      // });
   }
}
