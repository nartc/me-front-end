//Cores
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FileValueAccessor } from './components/product-add/productAdd.directive';
import { UppercaseDirective } from './components/coupon-add/coupon-add.directive';
//PrimeNG
import { FileUploadModule, 
         InputTextModule,
         InputTextareaModule,
         InputMaskModule,
         SpinnerModule,
         PanelModule,
         ButtonModule,
         MessagesModule,
         GrowlModule,
         MenuModule,
         DataTableModule,
         SharedModule,
         ConfirmDialogModule, ConfirmationService,
         SplitButtonModule,
         DropdownModule,
         RadioButtonModule,
         DialogModule,
         DataGridModule,
         TooltipModule,
         CheckboxModule,
         ToggleButtonModule
       } from 'primeng/primeng';
       
//Services
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { HttpService } from './services/http.service';
import { ClientService } from './services/client.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { CartService } from './services/cart.service';
import { CouponService } from './services/coupon.service';
import { VendorOrderService } from './services/vendor-order.service';
import { ActivityService } from './services/activity.service';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
 
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductSaleComponent } from './components/product-sale/product-sale.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartComponent } from './components/cart/cart.component';
import { ClientOrdersComponent } from './components/client-orders/client-orders.component';
import { ClientOrderDetailComponent } from './components/client-order-detail/client-order-detail.component';
import { VendorOrdersComponent } from './components/vendor-orders/vendor-orders.component';
import { VendorOrderDetailComponent } from './components/vendor-order-detail/vendor-order-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { CouponDetailComponent } from './components/coupon-detail/coupon-detail.component';
import { CouponAddComponent } from './components/coupon-add/coupon-add.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[LoginGuard]},
  {path: 'dashboard/:role/:id', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'clients', component: ClientsComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'client-detail/:id', component: ClientDetailComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'add-client', component: ClientAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'edit-client/:id', component: ClientEditComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'cart/:role/:id', component: CartComponent, canActivate:[AuthGuard]},
  {path: 'sale/:role', component: ProductSaleComponent, canActivate:[AuthGuard]},
  {path: 'products', component: ProductsComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'product-detail/:id', component: ProductDetailComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'add-product', component: ProductAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'edit-product/:id', component: ProductEditComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'client-orders', component: ClientOrdersComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'vendor-orders', component: VendorOrdersComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'vendor-order-detail/:id', component: VendorOrderDetailComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'client-order-detail/:role/:id', component: ClientOrderDetailComponent, canActivate:[AuthGuard]},
  {path: 'coupons', component: CouponComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'add-coupon', component: CouponAddComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'coupon/:id', component: CouponDetailComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProductSaleComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ClientsComponent,
    ClientDetailComponent,
    ClientAddComponent,
    ClientEditComponent,
    ProductEditComponent,
    SidebarComponent,
    CartComponent,
    ClientOrdersComponent,
    ClientOrderDetailComponent,
    VendorOrdersComponent,
    VendorOrderDetailComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FileValueAccessor,
    CouponComponent,
    CouponDetailComponent,
    CouponAddComponent,
    UppercaseDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    FlashMessagesModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FileUploadModule, 
    InputTextModule,
    InputTextareaModule,
    SpinnerModule,
    InputMaskModule,
    PanelModule,
    ButtonModule,
    MessagesModule,
    GrowlModule,
    MenuModule,
    DataTableModule,
    SharedModule,
    ConfirmDialogModule,
    SplitButtonModule,
    DropdownModule,
    RadioButtonModule,
    DialogModule,
    DataGridModule,
    TooltipModule,
    CheckboxModule,
    ToggleButtonModule
  ],
  providers: [
    ConfirmationService,
    AuthService,
    LocalStorageService,
    HttpService,
    ClientService,
    ProductService,
    OrderService,
    CartService,
    CouponService,
    VendorOrderService,
    AuthGuard,
    AdminGuard,
    LoginGuard,
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
