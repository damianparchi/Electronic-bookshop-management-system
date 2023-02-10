import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import {HomePageComponent} from "./Components/home-page/home-page.component";
import {BasketComponent} from "./Components/basket/basket.component";
import {CheckoutInfoComponent} from "./Components/checkout-info/checkout-info.component";
import {CheckoutsListComponent} from "./Components/checkouts-list/checkouts-list.component";
import {CheckouthistoryComponent} from "./Components/checkouthistory/checkouthistory.component";
import {AdminSellComponent} from "./Components/admin-sell/admin-sell.component";
import {NewPasswordComponent} from "./Components/new-password/new-password.component";
import {RemindPasswordComponent} from "./Components/remind-password/remind-password.component";
import {BookrateComponent} from "./Components/bookrate/bookrate.component";
import {UserrateComponent} from "./Components/userrate/userrate.component";
import {UserdatadetailsComponent} from "./Components/userdatadetails/userdatadetails.component";
import {UserVerifyComponent} from "./Components/user-verify/user-verify.component";
import {AboutusComponent} from "./Components/aboutus/aboutus.component";

const routes: Routes = [
  {
    path:'', redirectTo: '/home',
    pathMatch: 'full'
  },

  { path: 'home', component: HomePageComponent },
  { path: 'aboutus', component: AboutusComponent},
  { path: 'basket', component: BasketComponent },
  { path: 'home/login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkoutFinish', component: CheckoutInfoComponent },
  { path: 'checkouts', component: CheckoutsListComponent },
  { path: 'history', component: CheckouthistoryComponent },
  { path: 'adminsell', component: AdminSellComponent },
  { path: 'update-password/:token', component: NewPasswordComponent },
  { path: 'update-password', component: NewPasswordComponent },
  { path: 'remindPassword', component: RemindPasswordComponent },
  { path: 'bookreviews', component: BookrateComponent },
  { path: 'books/rate/:bookId/:token', component: UserrateComponent },
  { path: 'books/info/:bookId', component: UserrateComponent},
  { path: 'userdata/info/:userdataId', component: UserdatadetailsComponent},
  { path: 'user/verify/:token', component: UserVerifyComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
