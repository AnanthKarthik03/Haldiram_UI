import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import * as moment from "moment";
import { ExcelService } from 'src/app/excel.service';
import { OrderService } from '../orders/orders.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportList = [];
  excelData = [];
  fromDate = new Date();
  toDate = new Date();
   constructor(
    private routers: Router,
    private excelService: ExcelService,
    public service: OrderService,
  ) {}

  ngOnInit(): void {
    this.reportData(this.fromDate, this.toDate);
  }

  reportData(dt1,dt2) {
    const body = {
      from_dt: moment(dt1).format('DD-MM-YYYY'),
      to_dt: moment(dt2).format('DD-MM-YYYY'),
    };
    this.reportList = [];
    this.service.getFullfilment_report(body).subscribe((data) => {
      if (data.success) {
        this.reportList = data.data;

        console.log(this.reportList);
        
      }
    });
  }
  dashboard() {
    this.routers.navigate(['/Dashboard']);
  }

  excelDownload() {
    this.excelData = [];
    this.reportList.forEach((ele) => {
      this.excelData.push({
        OrderNumber: ele.OrderNO,
        OrderDate: moment(ele.OrderDate).format("DD-MM-YYYY"),
        CustomerName: ele.CustomerName,
        ItemName: ele.ItemName,
        ItemCategory: ele.ItemCategory,
        OrderQty: ele.OrderQty,
        ReceivedQty: ele.ReceivedQty,
        ShortExcessQty: ele.ShortExcessQty,
        OrderStatus: ele.OrderStatus,
      });
    });
    this.excelService.exportAsExcelFile(
      this.excelData,
      `Reports Details - ${moment().format("YYYY-MM-DD")} `
    );
  }

  dateChange() {
    console.log(`1`);
    
    this.reportData(this.fromDate, this.toDate);
  }

}
