import { Component, OnInit } from '@angular/core';
import {BookService} from "../../Services/book/book.service";
import {AdminServiceService} from "../../Services/admin/admin-service.service";
import {UserServiceService} from "../../Services/user/user-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-checkouthistory',
  templateUrl: './checkouthistory.component.html',
  styleUrls: ['./checkouthistory.component.css']
})
export class CheckouthistoryComponent implements OnInit {

  constructor(private bookService: BookService, private userService: UserServiceService, private adminService: AdminServiceService, private matSnackBar: MatSnackBar, private dialog: MatDialog) { }

  orderList = Array<any>();

  role:any;
  isAdmin:boolean=false;
  isSeller:boolean=false;
  isUser:boolean=false;
  orderedBooks: any;
  bookSearch:any;
  token: any;
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
    if(this.role==='admin'){
      this.isAdmin=true;
      this.isSeller=false;
      this.isUser = false;
      this.getallUsersbookCheckoutHistory();
    }
    else if(this.role==='seller'){
      this.isAdmin=false;
      this.isSeller=true;
      this.isUser = false;
      this.getallUsersbookCheckoutHistory();
    }
    else if(this.role==='user'){
      this.isAdmin=false;
      this.isSeller=false;
      this.isUser = true;
      this.getallUsersbookCheckoutHistory();
    }

    this.adminService.autoRefresh$.subscribe(() => {
      if(this.role==='admin'){
        this.getallUsersbookCheckoutHistory();
      }
      else if(this.role==='seller'){
        this.getallUsersbookCheckoutHistory();
      }
      else if(this.role==='user'){
        this.getallUsersbookCheckoutHistory();
      }
    });
  }

  getallUsersbookCheckoutHistory() {
    console.log('order status api called');
    this.userService.getCheckoutHistory(this.token).subscribe( response => {
      this.orderedBooks = response.obj;
      console.log('All orderbooks for order status= :  ', this.orderedBooks);
      console.log("no of orders "+response.obj.length);


      for (let i = 0; i < response.obj.length; i++) {
        console.log("Block statement execution no." + i);
        console.log("orderId : " + response.obj[i].checkoutId);
        console.log("orderStatus : " + response.obj[i].checkoutStatuss);
        console.log("bookName : " + response.obj[i].booksList[0].bookName);
        console.log("bookDetails : " + response.obj[i].booksList[0].bookDesc);
        console.log("authorName : " + response.obj[i].booksList[0].author);
        console.log("image : " + response.obj[i].booksList[0].bookCover);
        console.log("bookprice : " + response.obj[i].booksList[0].cost);
        console.log("totalprice : " + response.obj[i].amountOfBooks[0].totalCost);
        console.log("quantityOfBook : " + response.obj[i].amountOfBooks[0].booksAmount);


        var p = {
          checkoutId: response.obj[i].checkoutId,
          checkoutStatus: response.obj[i].checkoutStatus,
          bookName: response.obj[i].booksList[0].bookName,
          bookDesc: response.obj[i].booksList[0].bookDesc,
          author: response.obj[i].booksList[0].author,
          bookCover: response.obj[i].booksList[0].bookCover,
          totalCost: response.obj[i].amountOfBooks[0].totalCost,
          amountOfBooks: response.obj[i].amountOfBooks[0].booksAmount
        };

        this.orderList.push(p);
        console.log("after push ", this.orderList);
      }
    });
  }

  public error = null;
  handleError(error) {
    // this.isLoading = false;
    this.error = error.error.message;
    console.log(error);
    this.matSnackBar.open(error.error.messager, 'ok', {
      duration: 5000
    });
  }

  handleResponse(data) {
    this.matSnackBar.open('Sucessfull Update Password ', 'ok', {
      duration: 5000
    });
    // this.route.navigateByUrl('\login');
  }


    updateOrderAdmin(orderId:any,status:any) {
      console.log('Order Id',orderId);
      console.log('Order status',status);
      // this.adminService.updateOrderStatus(orderId,status).subscribe(
      //   (response: any) => {
      //     this.matSnackBar.open("Order updated by Admin", 'success', {duration: 5000});
      //
      //   },
      //   (error: any) => {
      //     this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      //   }
      // );
    }

    updateOrderSeller(orderId:any,status:any) {
      console.log('Order Id',orderId);
      console.log('Order status',status);
      // this.adminService.updateOrderStatus(orderId,status).subscribe(
      //   (response: any) => {
      //     this.matSnackBar.open("Order updated by Seller", 'success', {duration: 5000});
      //
      //   },
      //   (error: any) => {
      //     this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      //   }
      // );
    }

  deleteFromHistory(checkoutId:any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:{
        message: 'Jesteś pewien, że chcesz usunąć?',
        buttonText: {
          ok: 'Tak',
          cancel: 'Nie'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.deleteCheckoutFromHistory(checkoutId).subscribe((message) => {
          if (message.statusCode === 202) {
            console.log("usunięto")
            this.matSnackBar.open('Usunięto zamówienie z historii zamówień!', 'ok', {
              duration: 5000

            });
            setTimeout(function(){
              window.location.reload();
            }, 1500);
          } else {
            console.log("error")
          }
        });
      }
    });
  }

}
