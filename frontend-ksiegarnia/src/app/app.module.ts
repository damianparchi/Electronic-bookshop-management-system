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
        FlexLayoutModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTooltipModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
