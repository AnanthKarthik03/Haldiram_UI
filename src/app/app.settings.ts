import { environment } from '../environments/environment';

export class AppSettings {
  public static API = {
    AUTH: environment.apiUrl + 'validUser',
    orders: environment.apiUrl + 'create_order',
    getLocation: environment.apiUrl + 'booking_location_list',
    priceList: environment.apiUrl + 'priceList',
    // getItems: environment.apiUrl + 'items_price_id',
    getItems: environment.apiUrl + 'items_id',
    inventory_org_id: environment.apiUrl + 'inventory_org_id',
    orderType: environment.apiUrl + 'orderType',
    orderList_all: environment.apiUrl + 'orderList_all',
    web_order_stg_t: environment.apiUrl + 'web_order_stg_t',
    getLatestStgId: environment.apiUrl + 'getLatestStgId',
    dashboard: environment.apiUrl + 'dashboard',
    regestration: environment.apiUrl + 'registration',
    otp: environment.apiUrl + 'otp',
    password: environment.apiUrl + 'password',
    customerbalance: environment.apiUrl + 'customerbalance',
    cancel_orders: environment.apiUrl + 'cancel_orders',
    getUomList: environment.apiUrl + 'getUomList',
    invoice: environment.apiUrl + 'invoice_all',
    get_advance_pricing: environment.apiUrl + 'get_advance_pricing',
    download_pdf: environment.apiUrl + 'download_pdf',
    downloadPdf_serevr: environment.apiUrl + 'downloadPdf',
    getOrder_requestId: environment.apiUrl + 'getOrder_requestId',
    customerPriceList: environment.apiUrl + 'customerPriceList',
    customerDiscount: environment.apiUrl + 'customerDiscount',
    getFullfilment_report: environment.apiUrl + 'fullfilment_report',
    uomId: environment.apiUrl + 'uom_id',
    itemsId: environment.apiUrl + 'items_id',
  };
}
