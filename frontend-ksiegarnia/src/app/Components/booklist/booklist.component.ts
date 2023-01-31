import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BookService} from "../../Services/book/book.service";
import {Book} from "../../Model/book.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BasketService} from "../../Services/basket/basket.service";

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  bookList = Array<any>();
  size: number;
  value: any = [];
  page = 0;
  bookSearch: any;
  error = null;
  CurrentPageNo: 0;
  bookId: any;
  book: Book = new Book();
  naglownej: boolean;
  constructor(private router: Router, private bookService: BookService,
              private matsnackbar: MatSnackBar, private basket: BasketService) {
  }

  ngOnInit(): void {
    this.getallApprovedBooks();
    this.getSearchBookData();
    this.getRateOfBook();
    this.naglownej == true;
  }

  addedtobasket() {
    this.getallApprovedBooks();
    this.getSearchBookData();
  }

  Detail(bookId) {
    if (localStorage.getItem('token') === null) {
      this.matsnackbar.open('Aby robić zakupy musisz być zalogowany!', 'ok', {
        duration: 5000,
        verticalPosition: 'top'

      });
      this.router.navigateByUrl('login');
      return;
    } else {
      this.router.navigateByUrl('books/info/' + bookId);
    }


  }

  totalRate:any;

  getallApprovedBooks() {
    this.approvedBookServiceMethod(this.page, 'book_id', 'asc');
  }
  name: any;
  sums = Array<any>();
  counts = Array<any>();
  results = Array<any>();


  getRateOfBook()  {
    this.bookService.getALlRates().subscribe((response: any) => {
        console.log('response', response);
        console.log('rate of books:', response.obj);
        this.totalRate= response.obj;
        for (let i = 0; i < response.obj.length; i++) {
          if(response.obj[i].rate > 0) {
            this.name = response.obj[i].bookId;
            if(!(this.name in this.sums)) {
              this.sums[this.name] = 0;
              this.counts[this.name] = 0;
            }
            this.sums[this.name] += Math.round(response.obj[i].rate * 10) / 10
            this.counts[this.name]++;

          }

        }
        for(this.name in this.sums) {
          this.results.push({
            name: this.name,
            rate: Math.round(this.sums[this.name] / this.counts[this.name] * 10) / 10
          })

          console.log("after push ", Math.round(this.results[0].rate * 10) / 10);

        }
      }
    );
  }





  approvedBookServiceMethod(page ?: any, order?: string, sortby?: string) {
    this.bookService.getAllConfirmedBooks(page, order, sortby).subscribe((response: any) => {
      this.bookList = response.obj.content;
      console.log(this.bookList)
      this.size = response.obj.totalElements;
      this.CurrentPageNo = response.obj.pageable.pageNumber;
    });
  }

  addingToBasket( bookId: any) {
    if (localStorage.getItem('token') === null) {
      this.matsnackbar.open('Aby robić zakupy musisz być zalogowany!', 'ok', {
        duration: 5000
      });
      this.router.navigateByUrl('login');
      return;
    }
    sessionStorage.setItem(bookId, bookId);
    this.addedtobasket();
    this.basket.addToBasket(bookId).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
}

  private handleError(error: any) {
    this.error = error.error.message;
    console.log(error);
    this.matsnackbar.open(error.error.message, 'ok', {
      duration: 5000
    });
  }

  private handleResponse(data: any) {
    console.log(data);
    this.matsnackbar.open('Dodano książkę do koszyka.' , 'ok', {
      duration: 5000
    });
    setTimeout(function(){
      window.location.reload();
    }, 2000);
  }

  booksearch:any;

  getSearchBookData() {
    this.bookService.getSearchBookData().subscribe((message) => {
      console.log('search data', message.books);
      this.bookSearch = message.books;
    });
  }

  totalPage: Array<number>;

  SetPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    console.log('page number you want is' + i);
    this.getallApprovedBooks();
  }

  previos(event: any) {
    event.preventDefault();
    this.page = this.page - 1;
    console.log('current page from previous' + 'next' + this.page);
    this.getallApprovedBooks();
  }

  next(event: any) {
    event.preventDefault();
    this.page = this.page + 1;
    console.log('current page from next ' + 'next' + this.page);
    this.getallApprovedBooks();
  }
}

