import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TokenService} from "../../Services/token/token.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BasketService} from "../../Services/basket/basket.service";
import {BookService} from "../../Services/book/book.service";
import { MatDialog } from '@angular/material/dialog';
import { BookaddComponent } from '../bookadd/bookadd.component';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {

  username: any;
  role: any;
  isUser = false;
  isSeller = false;
  isAdmin = false;
  length: any;
  @Input() output: any;
  @Output() toggleEvent = new EventEmitter<boolean>();
  opened = false;
  bookName: string;

  ontoggel(input: any) {
    console.log('input' + input);
    this.toggleEvent.emit(input);
    this.opened = !this.opened;
  }

  constructor(private token: TokenService,
              private dialog: MatDialog,
              private route: Router,
              private matsnackbar: MatSnackBar,
              private basketService: BasketService,
              private BookService: BookService) { }

  ngOnInit(): void {

  this.username = localStorage.getItem('Name');
  this.role = localStorage.getItem('role');
  console.log('username: '+ this.username +' role: '+ this.role)

  if(this.role === 'user') {
    this.isUser = true;
  }
  if(this.role === 'seller') {
    this.isSeller = true;
  }
  if(this.role === 'admin') {
    this.isAdmin = true;
  }

  this.getCartItemCount();
}

  bookSearch() {
    // console.log(this.bookName);
    this.BookService.setSearchBookData(this.bookName);
  }

getCartItemCount() {
    this.basketService.getBasketItemsCount().subscribe((odp:any) => {
      this.length = odp.obj;

    });
}

addBook() {
  const dialogRef = this.dialog.open(BookaddComponent, {
    width: '25rem',
    panelClass: 'custom-dialog-container',
  });
  dialogRef.afterClosed().subscribe((resp) => {
    console.log('zamknij');
  });
}

  logout(event: MouseEvent) {
    console.log('wylogowanie');
    event.preventDefault();
    this.token.remove();
    this.token.signedIn();
    this.route.navigateByUrl('/login');
    this.matsnackbar.open('Wylogowano pomyślnie!', 'ok', {
      duration: 5000
    });
  }

}
