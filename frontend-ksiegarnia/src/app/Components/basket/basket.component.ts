import { Component, OnInit } from '@angular/core';
import {Book} from "../../Model/book.model";
import {Dane} from "../../Model/dane.model"
import {Router} from "@angular/router";
import {BasketService} from "../../Services/basket/basket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, Validators} from "@angular/forms";
import {UserServiceService} from "../../Services/user/user-service.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  length: any = sessionStorage.length;
  books: Book = new Book();
  error: null;
  book: any[] = [];
  quantity = 1;
  bookDesc = {
    cost: null,
    amountId: null,
    amountOfBook : null
  };
  value: any = [];
  daneUzytkownika: Dane = new Dane();
  imie = new FormControl('', [Validators.required]);
  nazwisko = new FormControl('', [Validators.required]);
  numerTel = new FormControl('', [Validators.required, Validators.pattern('[0-9]{9,9}')]);
  Miasto = new FormControl('', [Validators.required]);
  Ulica = new FormControl('', [Validators.required]);
  nrMieszkaniaDomu = new FormControl('', [Validators.required]);
  kodPocztowy = new FormControl('', [Validators.required]);


  constructor(private basketService: BasketService, private router: Router, private matsnackbar: MatSnackBar, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getBooksFromBasket();
    this.getBasketItems();
  }


  getBasketItems() {
    this.basketService.getBasketItemsCount().subscribe((response: any) => {
      this.length = response.obj;
      console.log('Liczba ksiazek w koszyku: ' + response.obj);
    });
  }

  getBooksFromBasket() {
    this.basketService.getBooksInBasket().subscribe((Response) => {
      this.book = Response.obj;
      for (const i of this.book) {
        this.quantity = i.booksAmount[0].booksAmount;
      }
    });
  }

  plusBtn(bookId:any, amountDesc:any) {
    this.bookDesc.amountId = amountDesc.amount_id;
    this.bookDesc.cost = amountDesc.booksAmount;
    this.bookDesc.amountOfBook = amountDesc.booksAmount;

    this.basketService.plusBooks(bookId, this.bookDesc).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error));
    console.log('Book id' + bookId);
    window.location.reload();
  }

  minusBtn(bookId: any, amountDesc:any) {
    console.log('decreasing items');
    this.bookDesc.amountId = amountDesc.amount_id;
    this.bookDesc.cost =  amountDesc.booksAmount;
    this.bookDesc.amountOfBook = amountDesc.booksAmount;
    this.basketService.minusBooks(bookId, this.bookDesc).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    console.log('Book id ' + bookId);
    window.location.reload();
  }

  removeBookFromBasket(key) {
    this.basketService.removeItemFromBasket(key).subscribe((Response) => {
      console.log('removing book', Response);
      this.matsnackbar.open('Usunięto książkę z koszyka!', 'ok', {
        duration: 5000
      });
      setTimeout(function(){
        window.location.reload();
      }, 1500);
    });
    sessionStorage.removeItem(key);
    console.log('usunieta ksiazka: ', key);
  }

  handleResponse(data: any): void {
    console.log(data);
    this.matsnackbar.open(data.message , 'ok', {
      duration: 5000
    });
  }

  handleError(error: any) {
    this.error = error.error.message;
    console.log(error);
    console.log('error', this.error);
    this.matsnackbar.open(error.error.message, 'ok', {
      duration: 5000
    });
  }

  change = false;

  changeView2() {
    if ( this.change === false) {
      this.change = true;
    } else if ( this.change === true) {
      this.change = false;
    }
  }

  change1 = false;

  changeView() {
    if(this.change1 === false) {
      this.change1 = true;

    }else if (this.change1 === true) {
      this.change1 = false;
    }
  }
  change2 = false;

  changeView3() {
    if ( this.change2 === false) {
      this.change2 = true;
    } else if ( this.change2 === true) {
      this.change2 = false;
    }
  }

  dwieFun() {
    this.changeView();
    this.changeView3();
  }

  goback3() {
    this.changeView();
    this.changeView();
    window.location.reload();
  }

  confirmOrder(bookId: any) {
    // zamowienie
  }

  goback2(){
    window.location.reload();
  }

  adressId: any;
  saveData(){
    this.daneUzytkownika.imie = this.imie.value;
    this.daneUzytkownika.nazwisko = this.nazwisko.value;
    this.daneUzytkownika.nrTel = this.numerTel.value;
    this.daneUzytkownika.miasto = this.Miasto.value;
    this.daneUzytkownika.ulica = this.Ulica.value;
    this.daneUzytkownika.nrMieszkaniaDomu = this.nrMieszkaniaDomu.value;
    this.daneUzytkownika.kodPocztowy = this.kodPocztowy.value;

    if (this.adressId === null) {
      this.userService.addUserData(this.daneUzytkownika).subscribe((Response) => {
        console.log('UserData: ', Response);
      });
    } else {
      console.log("smthng wrong")

    }
  }



}
