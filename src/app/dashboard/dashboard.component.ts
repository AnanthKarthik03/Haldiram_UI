import { Component, OnInit } from '@angular/core';
import { OrderService } from '../orders/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public service: OrderService) {}
  counts = {};
  customerCounts = {};
  ngOnInit(): void {
    this.dashboardCount();
    this.customerbalance();
  }

  dashboardCount() {
    this.service.dashboard().subscribe((data) => {
      if (data['success']) {
        console.log(data);
        this.counts['total'] = data['total'][0].count
          ? data['total'][0].count
          : 0;
        this.counts['pending'] = data['pending'][0].count
          ? data['pending'][0].count
          : 0;
        this.counts['cancelled'] = data['cancelled'][0].count
          ? data['cancelled'][0].count
          : 0;

        console.log(this.counts);
      }
    });
  }

  customerbalance() {
    this.service.customerbalance().subscribe((data) => {
      console.log(data['data']);

      //       CREDIT: 2500000
      // OPEN: 7322299.87
      // TOTALBALANCE: "91468.57 Dr."
      this.customerCounts['total'] = data['data'][0].TOTALBALANCE;
      this.customerCounts['credit'] = data['data'][0].CREDIT;
      this.customerCounts['open'] = data['data'][0].OPEN;
      console.log(this.customerCounts);
    });
  }
}
