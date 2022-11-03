import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottomBarComponent } from './Components/bottom-bar/bottom-bar.component';
import { LoginComponent } from './Components/login/login.component';
import { MainPanelComponent } from './Components/main-panel/main-panel.component';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  { path: 'home', component: BottomBarComponent },
  { path: 'wishlist', component: MainPanelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
