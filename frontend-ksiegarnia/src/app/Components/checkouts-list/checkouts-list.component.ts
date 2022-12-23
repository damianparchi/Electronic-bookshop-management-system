import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../../Services/admin/admin-service.service";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.css']
})
export class CheckoutsListComponent implements OnInit {

  constructor(private adminService: AdminServiceService) { }

  role:any;
  isAdmin:boolean=false;
  isSeller:boolean=false;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if(this.role==='admin'){
      this.isAdmin=true;
      this.isSeller=false;
      this.getallUserOrderedBooks();
    }
    else if(this.role==='seller'){
      this.isAdmin=false;
      this.isSeller=true;
      this.getallUserOrderedBooks();
    }

    this.adminService.autoRefresh.subscribe(() => {
      if(this.role==='admin'){
        this.getallUserOrderedBooks();
      }
      else if(this.role==='seller'){
        this.getallUserOrderedBooks();
      }
    });

  }

  checkoutedBooks: any;
  orderdetails = new Array<any>();

  getallUserOrderedBooks() {
    console.log('order status api called');
    this.adminService.getCheckouts().subscribe( response => {
      this.checkoutedBooks = response.obj;
      console.log('All orderbooks for order status= :  ', this.checkoutedBooks);
      console.log("no of orders "+response.obj.length);

      for (let i = 0; i < response.obj.length; i++) {
        console.log ("Block statement execution no." + i);
        console.log("orderId : "+response.obj[i].checkoutId);
        console.log("orderStatus : "+response.obj[i].checkoutStatus);
        console.log("bookName : "+response.obj[i].booksList[0].bookName);
        console.log("bookDetails : "+response.obj[i].booksList[0].bookDesc);
        console.log("authorName : "+response.obj[i].booksList[0].author);
        console.log("image : "+response.obj[i].booksList[0].bookCover);
        console.log("bookprice : "+response.obj[i].booksList[0].cost);
        console.log("totalprice : "+response.obj[i].amountOfBooks[0].totalCost);
        console.log("quantityOfBook : "+response.obj[i].amountOfBooks[0].booksAmount);


        var p = {checkoutId:response.obj[i].checkoutId, checkoutStatus:response.obj[i].checkoutStatus, bookName:response.obj[i].booksList[0].bookName,
          bookDesc:response.obj[i].booksList[0].bookDesc, author:response.obj[i].booksList[0].author,
          bookCover:response.obj[i].booksList[0].bookCover,  totalCost:response.obj[i].amountOfBooks[0].totalCost,
          amountOfBooks:response.obj[i].amountOfBooks[0].booksAmount
        };

        this.orderdetails.push(p);
        console.log("after push ",this.orderdetails);
      }
    });
  }

}
