import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { CancelOrdersComponent } from './cancel-orders/cancel-orders.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CustomerPriceListComponent } from './customer-price-list/customer-price-list.component';
import { CustomerDiscountsComponent } from './customer-discounts/customer-discounts.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cOrder',
    component: CancelOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customerPrice',
    component: CustomerPriceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customerDiscount',
    component: CustomerDiscountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
