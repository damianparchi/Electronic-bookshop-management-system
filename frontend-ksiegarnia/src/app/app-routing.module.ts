import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainPanelComponent } from './Components/main-panel/main-panel.component';
import { RegisterComponent } from './Components/register/register.component';
import {HomePageComponent} from "./Components/home-page/home-page.component";

const routes: Routes = [
  {
    path:'', redirectTo: 'home',
    pathMatch: 'full'
  },

  { path: 'home', component: HomePageComponent },
  { path: 'wishlist', component: MainPanelComponent },
  { path: 'home/login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
