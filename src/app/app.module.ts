import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { DialogModule } from 'primeng/dialog';
import { OrdersComponent } from './orders/orders.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterComponent } from './register/register.component';
import { CancelOrdersComponent } from './cancel-orders/cancel-orders.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CustomerDiscountsComponent } from './customer-discounts/customer-discounts.component';
import { CustomerPriceListComponent } from './customer-price-list/customer-price-list.component';
import { ReportsComponent } from './reports/reports.component';
import { CoffeeDetailsComponent } from './coffee/coffee-details/coffee-details.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    OrdersComponent,
    RegisterComponent,
    CancelOrdersComponent,
    InvoiceComponent,
    CustomerDiscountsComponent,
    CustomerPriceListComponent,
    ReportsComponent,
    CoffeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    DialogModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
