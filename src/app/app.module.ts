//Cores
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FileValueAccessor } from './components/product-add/productAdd.directive';

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
         CarouselModule
       } from 'primeng/primeng';
       
//Services
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { HttpService } from './services/http.service';
import { ClientService } from './services/client.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { CartService } from './services/cart.service';

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

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard/:role/:id', component: DashboardComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'client-detail/:id', component: ClientDetailComponent},
  {path: 'add-client', component: ClientAddComponent},
  {path: 'edit-client/:id', component: ClientEditComponent},
  {path: 'cart/:role', component: CartComponent},
  {path: 'sale/:role', component: ProductSaleComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'add-product', component: ProductAddComponent},
  {path: 'edit-product/:id', component: ProductEditComponent},
  {path: 'client-orders', component: ClientOrdersComponent},
  {path: 'vendor-orders', component: VendorOrdersComponent},
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
    FileValueAccessor
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
    CarouselModule
  ],
  providers: [
    ConfirmationService,
    AuthService,
    LocalStorageService,
    HttpService,
    ClientService,
    ProductService,
    OrderService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
