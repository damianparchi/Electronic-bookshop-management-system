import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BookaddComponent} from "../bookadd/bookadd.component";
import {BookService} from "../../Services/book/book.service";
import {ActivatedRoute} from "@angular/router";
import {AddBookCoverComponent} from "../add-book-cover/add-book-cover.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {EditBookComponent} from "../edit-book/edit-book.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: BookService,
              private _route:ActivatedRoute, private matsnackbar: MatSnackBar) { }

  sellerBooks: boolean = false;
  orderBooks: boolean = false;
  wasEdited: boolean = false;

  name: any;
  books: any[] = [];
  status: string;

  ngOnInit(): void {
    this.getallBooks();
    this.getUserName();
    this.wasEdited = false;

  }

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
      window.location.reload();

    });
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

  OnPicDialog(bookId): void {
    const dialogRef = this.dialog.open(AddBookCoverComponent, {
      width: '25rem',
      panelClass: 'custom-dialog-container',
      data: { bookId },
    });
    dialogRef.afterClosed().subscribe((resp) => {
      console.log('The dialog was closed');
    });
  }

}
