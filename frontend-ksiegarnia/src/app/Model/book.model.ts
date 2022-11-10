import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class Book {
  [x: string]: any;
  bookId: number;
  Book: string;
  bookDesc: string;
  author: string;
  bookName: string;
  cost: number;
  quantityOfBooks: number;
  bookCover: string;
  status: string;



}
