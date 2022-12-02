import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Book} from "../../Model/book.model";
import {Dane} from "../../Model/dane.model"
import {Router} from "@angular/router";
import {BasketService} from "../../Services/basket/basket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, Validators} from "@angular/forms";
import {UserServiceService} from "../../Services/user/user-service.service";
import {CheckoutService} from "../../Services/checkout/checkout.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  constructor(private basketService: BasketService,
              private router: Router,
              private matsnackbar: MatSnackBar,
              private userService: UserServiceService,
              private checkout: CheckoutService) { }

  length: any = sessionStorage.length;
  books: Book = new Book();
  error: null;
  book: any[] = [];
  quantity = 1;
  si: any = sessionStorage.length;

  value: any = [];
  @Output() output: EventEmitter<any> = new EventEmitter();
  daneUzytkownika: Dane = new Dane();
  imie = new FormControl('', [Validators.required]);
  nazwisko = new FormControl('', [Validators.required]);
  numerTel = new FormControl('', [Validators.required, Validators.pattern('[0-9]{9,9}')]);
  Miasto = new FormControl('', [Validators.required]);
  Ulica = new FormControl('', [Validators.required]);
  nrMieszkaniaDomu = new FormControl('', [Validators.required]);
  kodPocztowy = new FormControl('', [Validators.required]);

  userdataId: any;
  key: any;
  bookDesc = {
    cost: null,
    amountId: null,
    amountOfBook : null
  };


  ngOnInit() {
    this.daneUzytkownika.imie = (localStorage.getItem('Name'));
    this.userdataId = null;
    this.putUserDataInsideForms(this.daneUzytkownika);
    this.getUserData();


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
      for (let i of this.book) {
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
    console.log('id ksiazki: ' + bookId);
    window.location.reload();
  }

  minusBtn(bookId: any, amountDesc:any) {
    this.bookDesc.amountId = amountDesc.amount_id;
    this.bookDesc.cost =  amountDesc.booksAmount;
    this.bookDesc.amountOfBook = amountDesc.booksAmount;
    console.log('zmniejsz ilosc ksiazki');
    this.basketService.minusBooks(bookId, this.bookDesc).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    console.log('id ksiazki: ' + bookId);
    window.location.reload();
  }

  handleResponse(data: any): void {
    console.log(data);
    this.matsnackbar.open(data.message , 'ok', {
      duration: 5000
    });
  }

  handleError(error: any) {
    this.error = error.error.message;
    console.log('error', this.error);
    this.matsnackbar.open(error.error.message, 'ok', {
      duration: 5000
    });
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

  confirmOrder(bookId: any) {
    console.log("zamowienie ksiazki: ", bookId);
    this.checkout.checkout(bookId, this.userdataId).subscribe(
      data => this.handleResponseCheckout(data),
      error => this.handleError(error)
    );
  }

  getUserData() {
    this.userService.getUserData().subscribe((odp) => {
      console.log('Info o uzyt:', odp);
      for (let i of odp.obj) {
        this.putUserDataInsideForms(i);
        console.log('userdata info:', i);
        this.userdataId = i.userdataId;
      }
    });
  }

  putUserDataInsideForms(userData: Dane) {
    this.imie.setValue(userData.imie);
    this.nazwisko.setValue(userData.nazwisko);
    this.numerTel.setValue(userData.nrTel);
    this.Miasto.setValue(userData.miasto);
    this.Ulica.setValue(userData.ulica);
    this.nrMieszkaniaDomu.setValue(userData.nrMieszkaniaDomu);
    this.kodPocztowy.setValue(userData.kodPocztowy);
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



  handleResponseCheckout(data: any): void {
    console.log('dataaaa', data);
    this.matsnackbar.open(data.message , 'ok', {
      duration: 5000
    });
    this.router.navigateByUrl('checkoutFinish');
  }

  goback2(){
    window.location.reload();
  }

  saveData(){
    this.daneUzytkownika.imie = this.imie.value;
    this.daneUzytkownika.nazwisko = this.nazwisko.value;
    this.daneUzytkownika.nrTel = this.numerTel.value;
    this.daneUzytkownika.miasto = this.Miasto.value;
    this.daneUzytkownika.ulica = this.Ulica.value;
    this.daneUzytkownika.nrMieszkaniaDomu = this.nrMieszkaniaDomu.value;
    this.daneUzytkownika.kodPocztowy = this.kodPocztowy.value;

    if (this.userdataId === null || this.userdataId === undefined) {
      console.log('info ustawione' + this.daneUzytkownika);
      this.userService.addUserData(this.daneUzytkownika).subscribe((Response) => {
        console.log('UserData: ', Response);
        window.location.reload();
      });

    } else {
      this.daneUzytkownika.userdataId = this.userdataId;
      console.log('userdataID ustawione' + this.userdataId);
      this.userService.updateUserData(this.daneUzytkownika).subscribe((Response) => {
        console.log('userdata info aktualne', Response);
      });
    }
  }
}
