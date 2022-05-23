import {Component, OnInit} from '@angular/core';
import {DataServiceService} from "../service/data-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  private dataSubscription: Subscription;
  dataList: any[] = [];

  constructor(private dataServiceService: DataServiceService) {
  }


  ngOnInit() {
  }


  ionViewWillEnter() {
    this.dataServiceService.callDataService();
    this.dataSubscription = this.dataServiceService.getData().subscribe(resData => {
      this.dataList = resData;
    });

  }

  ionViewWillLeave() {
    this.dataSubscription.unsubscribe();
    this.dataServiceService.cancelDataServiceTimer();
  }

}
