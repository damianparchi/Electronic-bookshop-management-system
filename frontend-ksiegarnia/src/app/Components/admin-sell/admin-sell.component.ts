import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BookService} from "../../Services/book/book.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {EditBookComponent} from "../edit-book/edit-book.component";
import {BookaddComponent} from "../bookadd/bookadd.component";

@Component({
  selector: 'app-admin-sell',
  templateUrl: './admin-sell.component.html',
  styleUrls: ['./admin-sell.component.css']
})
export class AdminSellComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: BookService,
              private _route:ActivatedRoute, private matsnackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getallBooks();
    this.getUserName();
    this.wasEdited = false;
  }

  adminSellerBooks: boolean = false;
  orderBooks: boolean = false;
  wasEdited: boolean = false;
  name: any;
  books: any[] = [];
  status: string;

  deleteBook(bookId) {
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
        this.service.deleteBook(bookId).subscribe((message) => {
          if (message.statusCode === 202) {
            console.log("usunięto")
            setTimeout(function(){
              window.location.reload();
            }, 1000);
          } else {
            console.log("error")
          }
        });
      }
    });
  }

  sendAgain(bookId: any) {
    this.status = 'W oczekiwaniu...';
    this.service.sendAgain(bookId, this.status).subscribe((message) => {
      if (message.statusCode === 202) {
        this.matsnackbar.open('Wysłano do ponownego sprawdzenia!', 'OK', {
          duration: 4000,
        });
        setTimeout(function(){ location.reload(); }, 700);
      } else {
        this.matsnackbar.open('Error in Book Deletion', 'ok', { duration: 4000 });
      }
    });
  }

  editBook(book: any): void {
    this.wasEdited = true;
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '25rem',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        bookName: book.bookName,
        author: book.author,
        cost: book.cost,
        quantityOfBooks: book.quantityOfBooks,
        bookDesc: book.bookDesc,
        bookId: book.bookId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      setTimeout(function(){
        window.location.reload();
      }, 1000);

    });
  }

  getallBooks() {
    this.adminSellerBooks=true;
    this.orderBooks=false;
    this.service.getallBooks().subscribe( response => {
      this.books = response.obj;
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
