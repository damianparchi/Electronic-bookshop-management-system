import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../../Model/book.model";
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(book: Book[], searchTerm: string) {
    if (!book || !searchTerm) {
      return book;
    } else {
      return book.filter(book => {
        if (searchTerm && book.bookName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          return true;
        }
        if (searchTerm && book.author.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          return true;
        }
        if (searchTerm && book.status.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      });

    }
  }

}
