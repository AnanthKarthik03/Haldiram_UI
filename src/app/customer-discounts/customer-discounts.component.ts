import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../orders/orders.service';
@Component({
  selector: 'app-customer-discounts',
  templateUrl: './customer-discounts.component.html',
  styleUrls: ['./customer-discounts.component.css'],
})
export class CustomerDiscountsComponent implements OnInit {
  invoiceList = [];
  itemLists = [];

  constructor(
    private routers: Router,
    public fb: FormBuilder,
    public service: OrderService
  ) {}

  ngOnInit(): void {
    this.getItemListById();
  }

  // tslint:disable-next-line:typedef
  itemOnChange(item) {
    this.invoiceList = [];

    this.service.customerDiscount(item).subscribe((data) => {
      if (data.success) {
        this.invoiceList = data.data;
      }
    });
  }
  dashboard() {
    this.routers.navigate(['/Dashboard']);
  }

  getItemListById() {
    this.service.getItems().subscribe((data) => {
      if (data.success) {
        data.data.forEach((element) => {
          const temp = element.segment;
          const temp2 = element.description;
          const res = temp + '-' + temp2;

          this.itemLists.push({
            label: res,
            value: element.segment,
          });
        });

        this.itemLists.unshift({
          label: 'Select Item',
          value: null,
        });

        console.log(this.itemLists);
      } else {
      }
    });
  }
}
