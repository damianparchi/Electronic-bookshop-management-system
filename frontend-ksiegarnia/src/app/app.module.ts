import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPanelComponent } from './Components/main-panel/main-panel.component';
import { BottomBarComponent } from './Components/bottom-bar/bottom-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FlexLayoutModule} from "@angular/flex-layout"
import { MatRadioModule } from '@angular/material/radio';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { RegisterComponent } from './Components/register/register.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { BooklistComponent } from './Components/booklist/booklist.component';
import { SellerComponent } from './Components/seller/seller.component';
import { BookaddComponent } from './Components/bookadd/bookadd.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ConfirmDialogComponent } from './Components/confirm-dialog/confirm-dialog.component';
import { EditBookComponent } from './Components/edit-book/edit-book.component';
import { AdminComponent } from './Components/admin/admin.component';
import { BasketComponent } from './Components/basket/basket.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from "@angular/material/table";
import { CheckoutInfoComponent } from './Components/checkout-info/checkout-info.component';
import { SearchPipe } from './Components/searchbooks/search.pipe';
import {MatPaginatorModule} from "@angular/material/paginator";
import { CheckoutsListComponent } from './Components/checkouts-list/checkouts-list.component';
import { CheckouthistoryComponent } from './Components/checkouthistory/checkouthistory.component';
import { AdminSellComponent } from './Components/admin-sell/admin-sell.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';
import { RemindPasswordComponent } from './Components/remind-password/remind-password.component';
import {MatMenuModule} from "@angular/material/menu";
import { BookrateComponent } from './Components/bookrate/bookrate.component';
import { UserrateComponent } from './Components/userrate/userrate.component';
import { MatDatepickerModule} from "@angular/material/datepicker";
import { UserdatadetailsComponent } from './Components/userdatadetails/userdatadetails.component';
import { UserVerifyComponent } from './Components/user-verify/user-verify.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    BottomBarComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    BooklistComponent,
    SellerComponent,
    BookaddComponent,
    ConfirmDialogComponent,
    EditBookComponent,
    AdminComponent,
    BasketComponent,
    CheckoutInfoComponent,
    SearchPipe,
    CheckoutsListComponent,
    CheckouthistoryComponent,
    AdminSellComponent,
    NewPasswordComponent,
    RemindPasswordComponent,
    BookrateComponent,
    UserrateComponent,
    UserdatadetailsComponent,
    UserVerifyComponent,
    AboutusComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        FlexLayoutModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTooltipModule,
        MatBadgeModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatDatepickerModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
