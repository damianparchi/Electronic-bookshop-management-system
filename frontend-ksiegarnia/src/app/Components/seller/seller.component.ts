import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BookaddComponent} from "../bookadd/bookadd.component";
import {BookService} from "../../Services/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: BookService,
              private _route:ActivatedRoute) { }

  sellerBooks: boolean = false;
  orderBooks: boolean = false;
  name: any;
  books:any;

  ngOnInit(): void {
    this.getallBooks();
    this.getUserName();
  }


  getallBooks() {
    this.sellerBooks=true;
    this.orderBooks=false;
    this.service.getallBooks().subscribe( response => {
      this.books = response.object;
      console.log('Wszystki ksiazki ', this.books);
    });

  }

  addBook() {
    const dialogRef = this.dialog.open(BookaddComponent, {
      width: '25rem',
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((resp) => {
      console.log('zamknij');
    });
  }

  getUserName() {
    this.name = localStorage.getItem('Name');
  }

}
