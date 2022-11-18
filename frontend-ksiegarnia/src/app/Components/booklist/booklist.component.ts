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
  page: number;
  bookSearch: any;
  error = null;
  CurrentPageNo: 0;
  totalPage: Array<number>;
  book: Book = new Book();
  constructor(private router: Router, private bookService: BookService,
              private matsnackbar: MatSnackBar, private basket: BasketService) { }

  ngOnInit(): void {
    this.getallApprovedBooks();
  }

  Detail(bookId) {
    console.log('Redirected to page no ' + bookId);
    this.router.navigateByUrl('books/info/' + bookId);

  }

  getallApprovedBooks() {
    this.approvedBookServiceMethod();
  }

  approvedBookServiceMethod() {
    this.bookService.getAllConfirmedBooks().subscribe((response: any) => {
      console.log(response);
      console.log('Books are the' + response.object);
      this.bookList = response.object.content;
      this.size = response.object.totalElements;
      this.CurrentPageNo = response.object.pageable.pageNumber;
      this.totalPage = new Array(response.object.totalPages);
      console.log('Total pages is: ' + this.totalPage);
      console.log('total books are ' + this.size);
      console.log('curret page number is ' + this.CurrentPageNo);
      console.log('Books are  ', this.bookList.length);
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
    this.matsnackbar.open('Book added successfully Into Cart' , 'ok', {
      duration: 5000
    });
  }

}

