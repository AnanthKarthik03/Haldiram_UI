import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(public http: HttpClient) {}

  // tslint:disable-next-line:typedef
  orders(values) {
    const url = AppSettings.API.orders;
    return this.http.post<any>(url, values, this.token());
  }
  getLocation() {
    const url = AppSettings.API.getLocation;
    return this.http.get<any>(url, this.token());
  }
  priceList() {
    const url = AppSettings.API.priceList;
    return this.http.get<any>(url, this.token());
  }
  getItems() {
    const url = AppSettings.API.getItems;
    return this.http.get<any>(url, this.token());
  }
  getItemId() {
    const url = AppSettings.API.itemsId;
    return this.http.get<any>(url, this.token());
  }
  inventory_org_id() {
    const url = AppSettings.API.inventory_org_id;
    return this.http.get<any>(url, this.token());
  }
  orderType(id) {
    const url = AppSettings.API.orderType + '/' + id;
    return this.http.get<any>(url, this.token());
  }
  postOrderList(values) {
    const url = AppSettings.API.orderList_all;
    return this.http.post<any>(url, values, this.token());
  }
  web_order_stg_t(values) {
    const url = AppSettings.API.web_order_stg_t;
    return this.http.post<any>(url, values, this.token());
  }
  dashboard() {
    const url = AppSettings.API.dashboard;
    return this.http.get<any>(url, this.token());
  }
  customerbalance() {
    const url = AppSettings.API.customerbalance;
    return this.http.get<any>(url, this.token());
  }
  cancel_orders(values) {
    const url = AppSettings.API.cancel_orders;
    return this.http.post<any>(url, values, this.token());
  }
  getUomList(id) {
    const url = AppSettings.API.getUomList + '/' + id;
    return this.http.get<any>(url, this.token());
  }

  getUomData(id) {
    const url = AppSettings.API.uomId + '/' + id;
    return this.http.get<any>(url, this.token());
  }

  getInvoiceList(values) {
    const url = AppSettings.API.invoice;
    return this.http.post<any>(url, values, this.token());
  }
  get_advance_pricing(values) {
    const url = AppSettings.API.get_advance_pricing;
    return this.http.post<any>(url, values, this.token());
  }
  download_pdf(values) {
    const url = AppSettings.API.download_pdf;
    return this.http.post<any>(url, values, this.token());
  }
  downloadPdf_server(values) {
    const url = AppSettings.API.downloadPdf_serevr;
    return this.http.post<any>(url, values, this.token());
  }
  getOrder_requestId() {
    const url = AppSettings.API.getOrder_requestId;
    return this.http.get<any>(url, this.token());
  }

  customerPriceList(id) {
    const url = AppSettings.API.customerPriceList + '/' + id;
    return this.http.get<any>(url, this.token());
  }
  customerDiscount(id) {
    const url = AppSettings.API.customerDiscount + '/' + id;
    return this.http.get<any>(url, this.token());
  }
  getFullfilment_report(body) {
    const url = AppSettings.API.getFullfilment_report;
    return this.http.post<any>(url, body, this.token());
  }

  // tslint:disable-next-line:typedef
  token() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + sessionStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }
}
