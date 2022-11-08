import { Component, OnInit } from '@angular/core';
import {BookService} from "../../Services/book.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../Model/book.model";

@Component({
  selector: 'app-bookadd',
  templateUrl: './bookadd.component.html',
  styleUrls: ['./bookadd.component.css']
})
export class BookaddComponent implements OnInit {

  private imageFile: any;
  bookForm: FormGroup;

  addbook: Book = new Book();

  bookName = new FormControl(this.addbook.bookName, [

  ]);
  author = new FormControl(this.addbook.author, [

  ]);
  cost = new FormControl(this.addbook.cost, [

  ]);
  quantityOfBooks = new FormControl(this.addbook.quantityOfBooks, [

  ]);
  bookDesc = new FormControl(this.addbook.bookDesc, [

  ]);

  constructor(private bookService: BookService, private matsnackbar: MatSnackBar,
              private MatDialog: MatDialog,
              private dialogRef: MatDialogRef<BookaddComponent>,) { }

  ngOnInit(): void {}

  confirmAddBook() {
    this.bookService.addBook(this.addbook, this.imageFile).subscribe(
      (user) => {
        if (user.statusCode === 200) {
          this.matsnackbar.open(user.response, 'ok', {duration: 4000});
          this.dialogRef.close(1);
        }
      },
      (error: any) => {
        this.matsnackbar.open(error.error, 'ok', { duration: 4000 });
        console.log(error);
      }
    );
    if (this.bookForm.invalid) {
      return;
    }
  }

}
