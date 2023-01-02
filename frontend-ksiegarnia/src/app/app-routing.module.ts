import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import {HomePageComponent} from "./Components/home-page/home-page.component";
import {BasketComponent} from "./Components/basket/basket.component";
import {CheckoutInfoComponent} from "./Components/checkout-info/checkout-info.component";
import {CheckoutsListComponent} from "./Components/checkouts-list/checkouts-list.component";
import {CheckouthistoryComponent} from "./Components/checkouthistory/checkouthistory.component";

const routes: Routes = [
  {
    path:'', redirectTo: '/login',
    pathMatch: 'full'
  },

  { path: 'home', component: HomePageComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'home/login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkoutFinish', component: CheckoutInfoComponent},
  { path: 'checkouts', component: CheckoutsListComponent},
  { path: 'history', component: CheckouthistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
