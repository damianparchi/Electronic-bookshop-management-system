import { Component, OnInit } from '@angular/core';
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
  selectedValue = 'relevance';
  value: any = [];
  page = 0;
  bookSearch: any;
  error = null;
  CurrentPageNo: 0;
  book: Book = new Book();
  constructor(private router: Router, private bookService: BookService,
              private matsnackbar: MatSnackBar, private basket: BasketService) { }

  ngOnInit(): void {
    this.getallApprovedBooks();
    this.getSearchBookData();
  }

  Detail(bookId) {
    console.log('Redirected to page no ' + bookId);
    this.router.navigateByUrl('books/info/' + bookId);

  }

  getallApprovedBooks() {
    this.approvedBookServiceMethod(this.page, 'book_id', 'asc');
  }

  approvedBookServiceMethod(page ?: any, order?: string, sortby?: string) {
    this.bookService.getAllConfirmedBooks(page, order, sortby).subscribe((response: any) => {
      this.bookList = response.obj.content;
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
    this.ngOnInit();
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
    window.location.reload();
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

