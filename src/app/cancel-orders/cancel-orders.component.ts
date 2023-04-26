import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 import * as _ from 'underscore';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../orders/orders.service';
@Component({
  selector: 'app-cancel-orders',
  templateUrl: './cancel-orders.component.html',
  styleUrls: ['./cancel-orders.component.css']
})
export class CancelOrdersComponent implements OnInit {
  constructor(
    private routers: Router,
    public fb: FormBuilder,
    public service: OrderService,
    private toastr: ToastrService
  ) {}
  p_order_type_id = 1061;
  p_sold_to_org_id = 236416;
  p_invoice_to_org_id = 12;
  p_price_list_id = 6059;
  p_salesrepid = -3;
  p_ship_from_org_id = '';
  
  ship_to = '';
  bill_to = '';
  shipTo = [];
  billTo = [];
  priceListD = [];
  itemListD = [];
  inventory = [];
  order = [];
  fromDate = new Date();
  toDate = new Date();
  orderList = [];
  orderListD = [];

  orderForm: FormGroup;
  itemLists = [];
  addForm = false;
  salePrint = false;
  displayModal = false;
  displayModal1 = false;
  finalArray = [];
  linesData = [];
  cancelOrderData = [];
  remarks = '';
  uomDropDown = [];
  uomDropDownD = [];
  uomList = [];
  ngOnInit(): void {
    this.orderData(this.fromDate, this.toDate, 'b');
    this.getLocation();
    this.priceList();
    this.inventory_org_id();
    this.getItemListById();
    this.orderType(101);
    // tslint:disable-next-line:no-unused-expression
    this.p_order_type_id === 1061;
    // tslint:disable-next-line:no-unused-expression
    this.p_sold_to_org_id === 236416;
    // tslint:disable-next-line:no-unused-expression
    this.p_invoice_to_org_id === 12;
    // tslint:disable-next-line:no-unused-expression
    this.p_price_list_id === 6059;
    // tslint:disable-next-line:no-unused-expression
    this.p_salesrepid === -3;

    //   p_order_type_id           NUMBER,
    //   p_sold_to_org_id          NUMBER,
    // p_ship_to_org_id          NUMBER,
    //   p_invoice_to_org_id       NUMBER,
    //   p_price_list_id           NUMBER,
    //   p_item_id                 NUMBER,
    //   p_ordered_quantity        NUMBER,
    //   p_salesrepid              NUMBER
    this.orderForm = this.fb.group({
      orderDetails: this.fb.array([this.pomanualInfo()]),
    });
  }

  // tslint:disable-next-line:typedef
  showModalDialog(id) {
    this.linesData = [];
    this.displayModal = true;

    this.linesData = _.filter(this.orderListD, (item) => item.ORD_NUM === id);

    console.log(this.linesData);
  }

  // tslint:disable-next-line:typedef
  closeModalDialog() {
    this.displayModal = false;
  }
  // tslint:disable-next-line:typedef
  orderData(dt1, dt2, id) {
    this.orderList = [];
    const body = {
      from_dt: moment(dt1).format('DD-MM-YYYY'),
      to_dt: moment(dt2).format('DD-MM-YYYY'),
      cond:id
    };

    this.service.postOrderList(body).subscribe((data) => {
      if (data.success) {
        this.finalArray = _.uniq(data['data'], 'ORD_NUM');
        this.finalArray.forEach((item) => {
          this.orderList.push({
            ATTRIBUTE1: item.ATTRIBUTE1,
            ATTRIBUTE2: item.ATTRIBUTE2,
            ATTRIBUTE3: item.ATTRIBUTE3,
            TYPE: item.ATTRIBUTE3 === '0' ? 'Bags' : 'Bulk',
            ATTRIBUTE13: item.ATTRIBUTE13,
            PRODUCT_TYPE: item.PRODUCT_TYPE,
            OS: item.OS,
            SOLD_TO_ORG_ID: item.SOLD_TO_ORG_ID,
            // CustomerName: this.getCustomerName(item.SOLD_TO_ORG_ID),
            ORD_NUM: item.ORD_NUM,
            ORD_TYP: item.ORD_TYP,
            ITEM: item.ITEM,
            ORDERED_ITEM: item.ORDERED_ITEM,
            ORDERED_DATE: moment(item.ORDERED_DATE).format('YYYY-MM-DD'),
            ORDERED_QUANTITY: parseFloat(item.ORDERED_QUANTITY).toFixed(2),
            SHIP_FROM_LOCATION_NAME: item.SHIP_FROM_LOCATION_NAME,
            SHIP_TO_LOCATION_NAME: item.SHIP_TO_LOCATION_NAME,
            TOTAL_AMOUNT: item.TOTAL_AMOUNT
              ? parseFloat(item.TOTAL_AMOUNT).toFixed(2)
              : 0,
            HDR_FLOW_STATUS: item.HDR_FLOW_STATUS,
            SHIPPED_DATE: item.SHIPPED_DATE
              ? moment(item.SHIPPED_DATE).format('MMM DD,YYYY')
              : '-',
          });
        });
        data['data'].forEach((item) => {
          this.orderListD.push({
            ATTRIBUTE1: item.ATTRIBUTE1,
            ATTRIBUTE2: item.ATTRIBUTE2,
            ATTRIBUTE3: item.ATTRIBUTE3,
            ATTRIBUTE13: item.ATTRIBUTE13,
            PRODUCT_TYPE: item.PRODUCT_TYPE,
            ORD_NUM: item.ORD_NUM,
            ORD_TYP: item.ORD_TYP,
            ITEM: item.ITEM,
            ORDERED_ITEM: item.ORDERED_ITEM,
            ORDERED_DATE: moment(item.ORDERED_DATE).format('YYYY-MM-DD'),
            ORDERED_QUANTITY: parseFloat(item.ORDERED_QUANTITY).toFixed(2),
            TOTAL_AMOUNT: item.TOTAL_AMOUNT
              ? parseFloat(item.TOTAL_AMOUNT).toFixed(2)
              : 0,
          });
        });
        console.log(this.orderListD);
        // this.orderNumber = data.data[0].ORD_NUM.toString();
      }
    });
  }
  // tslint:disable-next-line:typedef
  getItemListById() {
    this.service.getItems().subscribe((data) => {
      if (data.success) {
        this.itemListD = data.data;
        data.data.forEach((element) => {
          const temp = element.segment;
          const temp2 = element.description;
          const res = temp + '-' + temp2;

          this.itemLists.push({
            label: res,
            value: element.item_id,
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
  // tslint:disable-next-line:typedef
  inventory_org_id() {
    this.service.inventory_org_id().subscribe((data) => {
      if (data.success) {
        this.itemListD = data.data;
        data.data.forEach((element) => {
          const temp = element.ORGANIZATION_CODE;
          const temp2 = element.ORGANIZATION_NAME;
          const res = temp + '-' + temp2;

          this.inventory.push({
            label: res,
            value: element.ORGANIZATION_ID,
          });
        });

        this.inventory.unshift({
          label: 'Select Inventory',
          value: null,
        });

        console.log(this.inventory);
      } else {
      }
    });
  }
  // tslint:disable-next-line:typedef
  orderType(id) {
    this.service.orderType(id).subscribe((data) => {
      if (data.success) {
        this.itemListD = data.data;
        data.data.forEach((element) => {
          this.order.push({
            label: element.orderType,
            value: 1061,
          });
        });

        this.order.unshift({
          label: 'Select order Type',
          value: null,
        });

        console.log(this.order);
      } else {
      }
    });
  }

  // tslint:disable-next-line:typedef
  priceList() {
    this.service.priceList().subscribe((data) => {
      if (data.success) {
        data.prices.forEach((element) => {
          this.priceListD.push({
            label: element.Name,
            value: parseInt(element.list_header_id, 10),
          });
        });
        this.priceListD.unshift({
          label: 'Select Price List',
          value: null,
        });
      }
    });
  }
  // tslint:disable-next-line:typedef
  getLocation() {
    this.service.getLocation().subscribe((data) => {
      // tslint:disable-next-line:no-string-literal
      if (data['success']) {
        console.log(data);

        // tslint:disable-next-line:no-string-literal
        data['data'].forEach((element) => {
          this.shipTo.push({
            label: element.shipping_address,
            value: parseInt(element.site_use_id, 10),
          });
        });
        data.bill_list.forEach((element) => {
          this.billTo.push({
            label: element.billing_address,
            value: parseInt(element.bill_site_id, 10),
          });
        });
        this.shipTo.unshift({
          label: 'Select Location',
          value: null,
        });
        this.billTo.unshift({
          label: 'Select Location',
          value: null,
        });

        console.log(this.shipTo);
      } else {
        this.shipTo = [];
      }
    });
  }
  // tslint:disable-next-line:typedef
  pomanualInfo() {
    return this.fb.group({
      p_item_id: '',
      p_item_price: '',
      p_ordered_quantity: 0,
      UNIT_OF_MEASURE: '',
    });
  }

  // tslint:disable-next-line:typedef
  addOrderRow() {
    const control = this.orderForm.controls.orderDetails as FormArray;
    control.push(this.pomanualInfo());
  }

  // tslint:disable-next-line:typedef
  removeOrderRow(i) {
    const control = this.orderForm.controls.orderDetails as FormArray;
    control.removeAt(i);
  }

  // tslint:disable-next-line:typedef
  dashboard() {
    this.routers.navigate(['/Dashboard']);
  }

  // tslint:disable-next-line:typedef
  save() {
    const finalArray = [];
    console.log(this.orderForm.value.orderDetails);
    console.log(this.orderForm.value.orderDetails[0].p_item_id);
    console.log(this.orderForm.value.orderDetails[0].p_ordered_quantity);

    this.orderForm.value.orderDetails.forEach((ele) => {
      finalArray.push({
        p_order_type_id: this.p_order_type_id,
        p_sold_to_org_id: this.p_sold_to_org_id,
        p_ship_to_org_id: this.ship_to,
        p_invoice_to_org_id: this.bill_to,
        p_price_list_id: this.p_price_list_id,
        p_salesrepid: this.p_salesrepid,
        p_ship_from_org_id: this.p_ship_from_org_id,
        p_item: ele.p_item_id,
        p_qty: ele.p_ordered_quantity,
        UNIT_OF_MEASURE: ele.UNIT_OF_MEASURE,
      });
    });

    console.log(finalArray);
    this.service.web_order_stg_t(finalArray).subscribe((data) => {
      console.log(data.data);
      if (data.success) {
        this.back();
        this.toastr.success('Order Successfull!');
        this.orderData(this.fromDate, this.toDate, 'b');
      }
    });
  }

  // tslint:disable-next-line:typedef
  itemOnChange(e, i) {
    console.log(e, i);
    console.log(this.itemListD);

    const dd = _.filter(
      this.itemListD,
      (item) => parseInt(item.item_id, 10) === parseInt(e, 10)
    );

    const dd1 = _.filter(
      this.uomList,
      (item) => parseInt(item.INVENTORY_ITEM_ID, 10) === parseInt(e, 10)
    );

    console.log(dd);
    if (dd.length > 0) {
      console.log(this.orderForm);

      // tslint:disable-next-line:no-string-literal
      this.orderForm.controls.orderDetails['controls'][
        i
      ].controls.p_item_price.setValue(dd[0].unit_price.toFixed(2));
     
    }
    if(dd1.length > 0){
      this.uomDropDown = [];
      this.uomDropDownD.push(
        { id: dd1[0].FROM_UOM_CODE, value: dd1[0].FROM_UOM_CODE  },
        { id: dd1[0].TO_UOM_CODE, value: dd1[0].TO_UOM_CODE ? dd1[0].TO_UOM_CODE : '-'  }
      );
      this.uomDropDown = _.uniq(this.uomDropDownD, 'value');
    }
  }
  uomChange(i, e) {
    console.log(i, e.target.value);
  }

  // tslint:disable-next-line:typedef
  newOrder() {
    this.addForm = true;
  }
  // tslint:disable-next-line:typedef
  back() {
    this.addForm = false;
  }

  // tslint:disable-next-line:typedef
  saleYesPrint() {
    this.salePrint = true;
  }

  // tslint:disable-next-line:typedef
  saleNoPrint() {
    this.addForm = false;
  }

  // tslint:disable-next-line:typedef
  tableView() {
    this.salePrint = false;
  }

  // tslint:disable-next-line:typedef
  dateChange() {
    this.orderData(this.fromDate, this.toDate, "b");
  }

  cancelOrder(item) {
    this.displayModal = false;
    this.displayModal1 = true;
    console.log(item);
    this.cancelOrderData = item;
  }

  cancelOrderSave() {
    console.log(this.cancelOrderData);
    let itemsList = [];
    this.cancelOrderData.forEach((item) => {
      itemsList.push('<br>' + item.ORDERED_ITEM + '-' + item.ITEM);
    });
    if (this.remarks) {
      const body = {
        order_num: this.cancelOrderData[0]['ORD_NUM'],
        item: itemsList.toString(),
        remarks: this.remarks,
      };

      console.log(body);

      this.service.cancel_orders(body).subscribe((data) => {
        if (data['success']) {
          this.displayModal1 = false;
          this.remarks = '';
          this.orderData(this.fromDate, this.toDate, "b");
          this.toastr.success('Order cancel request sent successfully!');
        }
      });
    } else {
      this.toastr.warning('Please Enter Remarks');
    }
  }

  invChange() {
    console.log(this.p_ship_from_org_id);

    this.service.getUomList(this.p_ship_from_org_id).subscribe((data) => {
      if (data['success']) {
        this.uomList = data['prices'];

        console.log(this.uomList);
        
      }
    });
  }
}
