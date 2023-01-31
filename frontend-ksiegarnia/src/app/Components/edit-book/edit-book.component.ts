import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Book} from "../../Model/book.model";
import {BookService} from "../../Services/book/book.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookName = new FormControl(this.editBook.bookName, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  author = new FormControl(this.editBook.author, [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(5), Validators.maxLength(25)]);
  cost = new FormControl(this.editBook.cost, [Validators.required, Validators.pattern("^[0-9].*$"), Validators.minLength(1)]);
  quantityOfBooks = new FormControl(this.editBook.quantityOfBooks, [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(1)]);
  bookDesc = new FormControl(this.editBook.bookDesc, [Validators.minLength(10), Validators.maxLength(255), Validators.required]);

  updatebook: Book = new Book();
  private imageFile: string;

  constructor(@Inject(MAT_DIALOG_DATA) public editBook: any, private bookService: BookService, private dialogRef: MatDialogRef<EditBookComponent>, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateBook() {

    this.updatebook.bookName = this.editBook.bookName;
    this.updatebook.author = this.editBook.author;
    this.updatebook.cost = this.editBook.cost;
    this.updatebook.quantityOfBooks = this.editBook.quantityOfBooks;
    this.updatebook.bookDesc = this.editBook.bookDesc;


    setTimeout(() => {
      this.bookService.updateBook(this.editBook.bookId, this.updatebook).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.dialogRef.close({ data: this.updatebook });
            // setTimeout(function(){
            //   window.location.reload();
            // }, 500);
            this.matSnackBar.open("Ksiazka edytowana pomyślnie!", 'ok', {duration: 10000});


          } else {
            // this.matSnackBar.open("Nie udało się edytować książki!", 'ok', {duration: 4000});
            // this.dialogRef.close(1);
            // setTimeout(function(){
            //   window.location.reload();
            // }, 1000);
          }
        },
        (error: any) => {
          // this.dialogRef.close();

          console.log('coś nie tak')
        }
      );
    });
  }

  bookNameVal() {
    return this.bookName.hasError("required") ? "Podaj tytuł książki!" :
      this.bookName.hasError("minlength") ? "Tytuł powinien mieć min. 3 znaki!" :
        this.bookName.hasError("maxlength") ? "25 znaków maksymalnie!" : "";
  }

  bookAuthorVal() {
    return this.author.hasError("required") ? "Podaj imie i nazwisko autora książki!" :
      this.author.hasError("minlength") ? "Autor powinien mieć min. 5 znaków!" :
        this.author.hasError("pattern") ? "Pole Autor powinno zawierać tylko litery!" :
          this.author.hasError("maxlength") ? "25 znaków maksymalnie!" : "";
  }

  bookCostVal() {
    return this.cost.hasError("required") ? "Podaj cenę książki!" : "";
  }

  quantityOfBooksVal() {
    return this.quantityOfBooks.hasError("required") ? "Podaj ilość Książek do sprzedania!" : "";
  }

  bookDescVal() {
    return this.bookDesc.hasError("required") ? "Krótki opis książki jest wymagany! " :
      this.bookDesc.hasError("minlength") ? "Opis wymaga minimum 10 znaków!" :
        this.bookDesc.hasError("maxlength") ? "Opis to maksimum 255 znaków!" : "";
  }

  PictureOn(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;
    }
  }

}
