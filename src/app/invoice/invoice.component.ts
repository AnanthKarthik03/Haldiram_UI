import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../orders/orders.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceList = [];
  // date = moment().format('DD-MM-YYYY');
  fromDate = new Date();
  toDate = new Date();
   constructor(
    private routers: Router,
    public fb: FormBuilder,
    public service: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.invoiceData(this.fromDate);
  }

  // tslint:disable-next-line:typedef
  invoiceData(dt1) {
    this.invoiceList = [];
    const body = {
      from_dt: moment(this.fromDate).format('DD-MM-YYYY'),
      to_dt: moment(this.toDate).format('DD-MM-YYYY'),
    };

 
    this.service.getInvoiceList(body).subscribe((data) => {
      if (data.success) {
        this.invoiceList = data.data;

        console.log(this.invoiceList);
        
      }
    });
  }
  dashboard() {
    this.routers.navigate(['/Dashboard']);
  }

  dateC(e) {
    if (this.fromDate) {
      this.invoiceData(this.fromDate);
    }
  }
}
