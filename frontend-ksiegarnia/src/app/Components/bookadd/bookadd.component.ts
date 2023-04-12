import {Component, OnInit} from '@angular/core';
import {BookService} from "../../Services/book/book.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../Model/book.model";

@Component({
  selector: 'app-bookadd',
  templateUrl: './bookadd.component.html',
  styleUrls: ['./bookadd.component.css']
})
export class BookaddComponent implements OnInit {

  private imageFile: string;
  bookForm: FormGroup;

  addbook: Book = new Book();

  bookName = new FormControl(this.addbook.bookName, [
    Validators.minLength(3),
    Validators.maxLength(25),
    Validators.required,
  ]);
  author = new FormControl(this.addbook.author, [
    Validators.minLength(5),
    Validators.maxLength(25),
    Validators.required,
  ]);
  cost = new FormControl(this.addbook.cost, [
    Validators.pattern("^[0-9].*$"),
    Validators.minLength(1),
    Validators.required,
  ]);
  quantityOfBooks = new FormControl(this.addbook.quantityOfBooks, [
    Validators.pattern("[0-9]*"),
    Validators.minLength(1),
    Validators.required,
  ]);
  bookDesc = new FormControl(this.addbook.bookDesc, [
    Validators.minLength(10),
    Validators.maxLength(255),
    Validators.required,
  ]);
  image = new FormControl(this.addbook.bookCover, [
    Validators.required,
  ]);


  constructor(private bookService: BookService, private matsnackbar: MatSnackBar,
              private dialog: MatDialog, private dialogRef: MatDialogRef<BookaddComponent>) {
  }

  ngOnInit(): void {
  }

  confirmAddBook() {
    if(this.imageFile != null) {
      this.bookService.addBook(this.addbook, this.imageFile).subscribe(
        (user) => {
          if (user.statusCode === 200) {
            this.matsnackbar.open("Książka dodania pomyślnie i wysłana do weryfikacji przez administratora! Sprawdzaj status na bieżąco." , 'ok', {duration: 4000});
            this.dialogRef.close(1);
            setTimeout(function(){
              window.location.reload();
            }, 1000);
          } else {
            this.matsnackbar.open("Dodanie książki nie powiodło się!", 'ok', {duration: 4000});
          }
        },
        (error: any) => {
          this.matsnackbar.open("Ksiazka nie dodana! " + error.error.message+".", 'ok', {duration: 4000});
          console.log(error)

        }
      );
      if (this.bookForm.invalid) {
        return;
      }
    }

  }

  PictureOn(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;
    }
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

  bookImageVal() {
    return this.image.hasError("required") ? "Zdjęcie okładki książki jest wymagane!" : "";
  }

}
