import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from './orders.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private routers: Router,
    public fb: FormBuilder,
    public service: OrderService,
    private toastr: ToastrService
  ) {}
  p_order_type_id = 1061;
  p_sold_to_org_id = '';
  p_bill_to_org_id = '';
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
  hideButton = false;
  finalArray = [];
  linesData = [];
  cancelOrderData = [];
  remarks = '';
  isLast = 0;
  uomDropDown = [];
  uomDropDownD = [];
  uomList = [];
  ordNum = '';
  spinner = false;
  reqIdArr = [];
  reqId = '';
  billToArr = [];
  shipToArr = [];
  disableCasteDropdown = true
  ngOnInit(): void {
    this.invChange();
    this.orderData(this.fromDate, this.toDate, 'a');
    this.getLocation();
    this.priceList();
    this.inventory_org_id();
    this.getItemListById();
    // this.orderType();
    this.getReqId();
    // tslint:disable-next-line:no-unused-expression
    this.p_order_type_id === 1061;
    // tslint:disable-next-line:no-unused-expression
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

  getReqId() {
    this.service.getOrder_requestId().subscribe((data) => {
      if (data['success']) {
        this.reqIdArr = data['data'];
      }
    });
  }

  getRId(id) {
    const dd = _.filter(
      this.reqIdArr,
      (item) => parseInt(item.ORDER_NUMBER, 10) === parseInt(id, 10)
    );

    if (dd.length > 0) {
      return dd[0].REQUEST_ID;
    } else {
      this.toastr.error('Please Generate the invoice');
    }
  }

  // tslint:disable-next-line:typedef
  showModalDialog(id) {
    this.linesData = [];
    this.displayModal = true;
    this.ordNum = id;
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
      cond: id,
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
            ORDERED_DATE: item.ORDERED_DATE,
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
            ORDERED_DATE: item.ORDERED_DATE,
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
          const temp3 = element.ORGANIZATION_DESC;
          const res = temp + '-' + temp2 + '-' + temp3;

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
            label: element.headerId + '-' + element.orderType,
            value: element.headerId,
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
        this.billToArr = data.bill_list;
        this.shipToArr = data.data;
        // tslint:disable-next-line:no-string-literal
        data['data'].forEach((element) => {
          this.shipTo.push({
            label: element.customer_name + ' - ' + element.shipping_address,
            value: parseInt(element.site_use_id, 10),
          });
        });
        data.bill_list.forEach((element) => {
          this.billTo.push({
            label: element.customer_name + ' - ' + element.billing_address,
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
      unit_list_price: '',
    });
  }

  // tslint:disable-next-line:typedef
  addOrderRow() {
    this.isLast = this.isLast + 1;
    console.log(this.isLast)
    const control = this.orderForm.controls.orderDetails as FormArray;
    control.push(this.pomanualInfo());
  }

  // tslint:disable-next-line:typedef
  removeOrderRow(i) {
    this.isLast = this.isLast - 1;
    const control = this.orderForm.controls.orderDetails as FormArray;
    control.removeAt(i);
  }

  // tslint:disable-next-line:typedef
  dashboard() {
    this.routers.navigate(['/Dashboard']);
  }

  // tslint:disable-next-line:typedef
  save() {
    // this.p_order_type_id === 1061;
    // // tslint:disable-next-line:no-unused-expression
    // this.p_sold_to_org_id === 236416;
    // // tslint:disable-next-line:no-unused-expression
    // this.p_invoice_to_org_id === 12;
    // // tslint:disable-next-line:no-unused-expression
    // this.p_price_list_id === 6059;
    // // tslint:disable-next-line:no-unused-expression
    // this.p_salesrepid === -3;

    this.spinner = true;
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
        p_item_price: ele.p_item_price,
        p_bill_to_org_id: this.p_bill_to_org_id,
      });
    });

    console.log(finalArray);
    this.service.web_order_stg_t(finalArray).subscribe((data) => {
      this.spinner = false;
      console.log(data.data);
      if (data.success) {
        this.spinner = false;
        this.back();
        this.toastr.success('Order Successfull!');
        this.orderData(this.fromDate, this.toDate, 'a');
      } else {
        this.spinner = false;
        this.toastr.error(data.data);
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

      // this.orderForm.controls.orderDetails['controls'][
      //   i
      // ].controls.p_item_price.setValue(dd[0].unit_price.toFixed(2));
    }
    if (dd1.length > 0) {
      this.uomDropDown = [];
      this.uomDropDownD.push(
        { id: dd1[0].FROM_UOM_CODE, value: dd1[0].FROM_UOM_CODE },
        {
          id: dd1[0].TO_UOM_CODE,
          value: dd1[0].TO_UOM_CODE ? dd1[0].TO_UOM_CODE : '-',
        }
      );
      this.uomDropDown = _.uniq(this.uomDropDownD, 'value');
    }
  }
  uomChange(i, e) {
    this.hideButton = true;
    console.log(i, e.target.value);
    // this.orderForm.controls.orderDetails['controls'][
    //   i
    // ].controls.p_item_price.setValue(dd[0].unit_price.toFixed(2));
    console.log(this.orderForm.value.orderDetails[i].p_item_id);

    const body = {
      name: this.p_price_list_id,
      item_id: this.orderForm.value.orderDetails[i].p_item_id,
      uom: this.orderForm.value.orderDetails[i].UNIT_OF_MEASURE,
    };

    console.log(body);

    this.service.get_advance_pricing(body).subscribe((data) => {
      if (data['data'].length > 0) {
        console.log(data['data']);
        this.orderForm.controls.orderDetails['controls'][
          i
        ].controls.p_item_price.setValue(data['data'][0].priceList.toFixed(2));
      } else {
        console.log(`nodata`);

        const dd = _.filter(
          this.itemListD,
          (item) =>
            parseInt(item.item_id, 10) ===
            parseInt(this.orderForm.value.orderDetails[i].p_item_id, 10)
        );

        if (dd.length > 0) {
          console.log(this.orderForm);

          this.orderForm.controls.orderDetails['controls'][
            i
          ].controls.p_item_price.setValue(dd[0].unit_price.toFixed(2));
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  newOrder() {
    this.addForm = true;
  }
  // tslint:disable-next-line:typedef
  back() {
    this.addForm = false;
    this.orderForm.reset();
    this.hideButton = false;
    this.ship_to = '';
    this.bill_to = '';
  }

  // tslint:disable-next-line:typedef
  saleYesPrint(order_number) {
    this.service
      .download_pdf({ order_number: order_number })
      .subscribe((data) => {
        if (data['success']) {
          this.toastr.success('Generated Succefully!!');
          this.reqId = data['request_id'];
          this.getReqId();
        } else {
          this.toastr.error('Please try again');
        }
      });

    // this.salePrint = true;
  }
  // /${this.getRId(id)}

  getPdfOut(id) {
    if (this.reqId === '') {
      this.reqId = this.getRId(id);
    }
    console.log(`sdfsdf`, this.reqId);

    if (this.reqId) {
      this.toastr.warning('Please wait while we are fetching the PDF!!');
      setTimeout(() => {
        this.service
          .downloadPdf_server({
            filename: `XXHBL_SO_ONHAND_PRINT_${this.reqId}_1.PDF`,
          })
          .subscribe((data) => {
            if (data['success']) {
              console.log(data);
              window.open(
                // `https://pfoodapp.prabhujihaldiram.com/customPortal/server/statements/XXHBL_SO_ONHAND_PRINT_${this.reqId}_1.PDF`,
                `http://192.168.1.49/customPortal/server/statements/XXHBL_SO_ONHAND_PRINT_${this.reqId}_1.PDF`,
                '_blank'
              );
              this.reqId = '';
            }
          });
      }, 3000);
    } else {
      return;
    }
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
    this.orderData(this.fromDate, this.toDate, 'a');
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
          this.orderData(this.fromDate, this.toDate, 'a');
          this.toastr.success('Order cancel request sent successfully!');
        }
      });
    } else {
      this.toastr.warning('Please Enter Remarks');
    }
  }

  invChange() {
    console.log(this.p_ship_from_org_id);

    this.service.getUomList(141).subscribe((data) => {
      if (data['success']) {
        this.uomList = data['prices'];

        console.log(this.uomList);
      }
    });
  }

  getTotalAmount(id) {
    const data = _.filter(this.orderListD, (item) => item.ORD_NUM === id);
    // console.log(data);
    let tot = 0;
    data.forEach((ele) => {
      tot += parseInt(ele.TOTAL_AMOUNT, 10);
    });

    return tot;
  }

  shipToChange(e) {
    console.log(e);
    console.log(this.billToArr);
    console.log(this.shipToArr);

    const shipLinkId = _.filter(
      this.shipToArr,
      (item) => parseInt(item.site_use_id, 10) === e
    );

    if (shipLinkId && shipLinkId.length > 0) {
      console.log(shipLinkId[0].linkId);

      const billLinkId = _.filter(
        this.billToArr,
        (item) => parseInt(item.linkId, 10) === shipLinkId[0].linkId
      );
      console.log(billLinkId[0].bill_site_id);
      console.log(billLinkId);

      if (billLinkId && billLinkId.length > 0) {
        this.bill_to = billLinkId[0].bill_site_id;
        this.p_sold_to_org_id = billLinkId[0].cust_account_id;
        this.p_bill_to_org_id = billLinkId[0].org_id;
        this.p_ship_from_org_id = billLinkId[0].ship_from_org_id;
        this.orderType(billLinkId[0].org_id)
      }
    }
  }
}
