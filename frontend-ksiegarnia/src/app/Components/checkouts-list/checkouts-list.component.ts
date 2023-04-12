import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../Services/admin/admin-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserServiceService} from "../../Services/user/user-service.service";
import {Router} from "@angular/router";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.css']
})
export class CheckoutsListComponent implements OnInit {

  constructor(private adminService: AdminServiceService, private matSnackBar: MatSnackBar, private userService: UserServiceService, private Route: Router, private dialog: MatDialog) { }

  role:any;
  isAdmin:boolean=false;
  isSeller:boolean=false;
  token: any;
  // userdataId: any;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
    // this.userdataId = null;
    // this.getUserData(this.userdataId);
    if(this.role==='admin'){
      this.isAdmin=true;
      this.isSeller=false;
      this.getallUsersbookCheckoutHistory();
    }
    else if(this.role==='seller'){
      this.isAdmin=false;
      this.isSeller=true;
      this.getallUsersbookCheckoutHistory();
    }

    this.adminService.autoRefresh.subscribe(() => {
      if(this.role==='admin'){
        this.getallUsersbookCheckoutHistory();
      }
      else if(this.role==='seller'){
        this.getallUsersbookCheckoutHistory();
      }
    });

    this.getUsersData();


  }



  checkoutedBooks: any;
  orderdetails = new Array<any>();
  adresdetails = new Array<any>();
  // obj: any;
  checkoutedOrders: any;
  city: any;
  name: any;
  surname: any;
  mobilePhone:any;
  houseApartmentNr:any;
  street: any;
  postCode: any;
  cardNumber: any;
  expirationDate: any;
  cvvnumber:any;

  userdataId: any;

  // DetailAdress(userdataId) {
  //   if (localStorage.getItem('token') === null) {
  //     this.matSnackBar.open('Aby robić zakupy musisz być zalogowany!', 'ok', {
  //       duration: 5000
  //     });
  //     this.Route.navigateByUrl('login');
  //     return;
  //   } else {
  //     this.Route.navigateByUrl('userdata/info/' + userdataId);
  //   }
  //   this.userService.getUserDataa(userdataId).subscribe((odp: any) => {
  //
  //     if(userdataId = odp.obj.userdataId) {
  //       this.name = odp.obj.name;
  //       this.surname = odp.obj.surname;
  //       this.mobilePhone = odp.obj.mobilePhone;
  //       this.city = odp.obj.city;
  //       this.houseApartmentNr = odp.obj.houseApartmentNr;
  //       this.street = odp.obj.street;
  //       this.postCode = odp.obj.postcode;
  //       this.cardNumber = odp.obj.cardNumber;
  //       this.expirationDate = odp.obj.expirationDate;
  //       this.cvvnumber = odp.obj.cvvnumber;
  //       console.log(this.name + this.surname + this.mobilePhone + this.city + this.houseApartmentNr + this.street + this.postCode + this.cardNumber + this.expirationDate + this.cvvnumber)
  //     }
  //
  //   })
  // }

  getUsersData() {
    this.userService.getUsersData().subscribe((odp: any) => {
      console.log(odp.obj);

    });
  }

  getUserData(userdataId: any) {
    this.userService.getUserDataa(userdataId).subscribe((odp: any) => {
      this.checkoutedOrders = odp.obj.userdataId;
      console.log('All orderbooks for order status= :  ', this.checkoutedOrders);
      console.log(odp.obj.userdataId);
      // console.log("no of orders ", odp.obj.length);
      // console.log('Info o uzyt:', odp.obj[2].name);
      this.name = odp.obj.name[0];
      console.log(this.name)
      this.surname = odp.obj.surname;
      this.mobilePhone = odp.obj.mobilePhone;
      this.city = odp.obj.city;
      this.houseApartmentNr = odp.obj.houseApartmentNr;
      this.street = odp.obj.street;
      this.postCode = odp.obj.postCode;
      this.cardNumber = odp.obj.cardNumber;
      this.expirationDate = odp.obj.expirationDate;
      this.cvvnumber = odp.obj.cvvnumber;
      console.log(this.name)

      // for (let i = 0; i < 3; i++) {
      //   console.log ("Miejsce w kolejce:" + i);
      //   console.log("Imie : "+odp.obj[i].name);
      //   console.log("Nazwisko : "+odp.obj[i].surname);
      //   console.log("Numer telefonu : "+odp.obj[i].mobilePhone);
      //   console.log("Miasto : "+odp.obj[i].booksList[0].city);
      //   console.log("Nr Mieszkania/Domu : "+odp.obj[i].houseApartmentNr);
      //   console.log("Ulica : "+odp.obj[i].street);
      //   console.log("Kod Pocztowy : "+odp.obj[i].postCode);
      //   console.log("Województwo : "+odp.obj[i].province);
      //   console.log("Numer Karty : "+odp.obj[i].cardNumber);
      //   console.log("Data ważności Karty : "+odp.obj[i].expirationDate);
      //   console.log("Numer CVC Karty : "+odp.obj[i].cvvnumber);


        // var p = {checkoutId:odp.obj[i].checkoutId, checkoutStatus:odp.obj[i].checkoutStatus, bookName:odp.obj[i].booksList[0].bookName,
        //   bookDesc:odp.obj[i].booksList[0].bookDesc, author:odp.obj[i].booksList[0].author,
        //   bookCover:odp.obj[i].booksList[0].bookCover,  totalCost:odp.obj[i].amountOfBooks[0].totalCost,
        //   amountOfBooks:odp.obj[i].amountOfBooks[0].booksAmount, userdataId: odp.obj[i].userdataId
        // };

        // this.orderdetails.push(p);
        // console.log("after push ",this.orderdetails);

      // }
    });
  }

  userAdresses:any;

  getallUsersbookCheckoutHistory() {
    console.log('order status api called');
    this.adminService.getCheckouts().subscribe(response => {
      this.checkoutedBooks = response.obj;
      // console.log('All orderbooks for order status= :  ', this.checkoutedBooks);
      // console.log(response.obj[0].userdataId);
      // console.log("no of orders " + response.obj.length);


      for (let i = 0; i < response.obj.length; i++) {
        // console.log("Miejsce w kolejce:" + i);
        // console.log("checkoutId : " + response.obj[i].checkoutId);
        // console.log("checkoutStatus : " + response.obj[i].checkoutStatus);
        // console.log("bookName : " + response.obj[i].booksList[0].bookName);
        // console.log("bookDesc : " + response.obj[i].booksList[0].bookDesc);
        // console.log("author : " + response.obj[i].booksList[0].author);
        // console.log("bookCover : " + response.obj[i].booksList[0].bookCover);
        // console.log("totalCost : " + response.obj[i].amountOfBooks[0].totalCost);
        // console.log("booksAmount : " + response.obj[i].amountOfBooks[0].booksAmount);
        // console.log("userDataId : " + response.obj[i].userdataId);


        var p = {
          checkoutId: response.obj[i].checkoutId,
          checkoutStatus: response.obj[i].checkoutStatus,
          bookName: response.obj[i].booksList[0].bookName,
          bookDesc: response.obj[i].booksList[0].bookDesc,
          author: response.obj[i].booksList[0].author,
          bookCover: response.obj[i].booksList[0].bookCover,
          totalCost: response.obj[i].amountOfBooks[0].totalCost,
          amountOfBooks: response.obj[i].amountOfBooks[0].booksAmount,
          userdataId: response.obj[i].userdataId
        };

        this.orderdetails.push(p);
        console.log(this.orderdetails);
        // console.log("after push ", this.orderdetails);
        //
        // this.userdataId = response.obj[i].userdataId;
        // this.getUserData(this.userdataId)
        // console.log("miasta: ", this.getUserData(this.userdataId))
        //



      }

      this.userService.getUsersData().subscribe((odp: any) => {
        this.userAdresses = odp.obj;
        for (let i = 0; i < odp.obj.length; i++) {
          // console.log ("Miejsce w kolejce:" + i);
          // console.log("Imie : "+odp.obj[i].name);
          // console.log("Nazwisko : "+odp.obj[i].surname);
          // console.log("Numer telefonu : "+odp.obj[i].mobilePhone);
          // console.log("Miasto : "+odp.obj[i].city);
          // console.log("Nr Mieszkania/Domu : "+odp.obj[i].houseApartmentNr);
          // console.log("Ulica : "+odp.obj[i].street);
          // console.log("Kod Pocztowy : "+odp.obj[i].postCode);
          // console.log("Województwo : "+odp.obj[i].province);
          // console.log("Numer Karty : "+odp.obj[i].cardNumber);
          // console.log("Data ważności Karty : "+odp.obj[i].expirationDate);
          // console.log("Numer CVC Karty : "+odp.obj[i].cvvnumber);


          var c = {
            userdataId: odp.obj[i].userdataId,
            name: odp.obj[i].name,
            surname: odp.obj[i].surname,
            mobilePhone: odp.obj[i].mobilePhone,
            city: odp.obj[i].city,
            houseApartmentNr: odp.obj[i].houseApartmentNr,
            street: odp.obj[i].street,
            postcode: odp.obj[i].postcode,
            province: odp.obj[i].province,
            cardNumber: odp.obj[i].cardNumber,
            expirationDate: odp.obj[i].expirationDate,
            cvvnumber: odp.obj[i].cvvnumber,
          };

          this.adresdetails.push(c);
          console.log(this.adresdetails);
        }

      });
    });
  }



  updateOrderAdmin(checkoutId:any,status:any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Jesteś pewien, że chcesz zatwierdzić złożone zamówienie?',
        buttonText: {
          ok: 'Tak',
          cancel: 'Nie'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        console.log('Order Id',checkoutId);
        console.log('Order status',status);
        this.adminService.updateCheckoutStatus(checkoutId,status).subscribe(
          (response: any) => {
            this.matSnackBar.open("Zamówienie zostało zatwierdzone!", 'success', {duration: 5000});
            setTimeout(function(){
              window.location.reload();
            }, 1500);

          },
          (error: any) => {
            this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
          }
        );
      }
    })

  }

  deleteOrderAdmin(checkoutId:any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Jesteś pewien, że chcesz usunąć złożone zamówienie?',
        buttonText: {
          ok: 'Tak',
          cancel: 'Nie'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        console.log('Order Id', checkoutId);
        this.adminService.deleteCheckoutFromHistory(checkoutId).subscribe(
          (response: any) => {
            this.matSnackBar.open("Zamówienie zostało odrzucone", 'success', {duration: 5000});
            setTimeout(function () {
              window.location.reload();
            }, 1500);

          },
          (error: any) => {
            this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
          }
        );
      }
  })
  }

  updateOrderSeller(orderId:any,status:any) {
    console.log('Order Id',orderId);
    console.log('Order status',status);
    this.adminService.updateCheckoutStatus(orderId,status).subscribe(
      (response: any) => {
        this.matSnackBar.open("Zaktualizowano status zamówienia!", 'success', {duration: 5000});
        setTimeout(function(){
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
  }



}
