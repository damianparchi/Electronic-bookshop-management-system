import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../Services/book/book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Comment} from "../../Model/comment.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../Model/book.model"

@Component({
  selector: 'app-userrate',
  templateUrl: './userrate.component.html',
  styleUrls: ['./userrate.component.css']
})
export class UserrateComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
              private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) { }

  @Input('starCount')  starCount = 5;
  color: string;
  private snackBarDuration = 2000;
  ratingArr: any[] = [];
  rate: number;
  book: Book;
  bookId: any;
  comment: any;

  commentForm: FormGroup;
  addcomment: Comment = new Comment();

  commentText = new FormControl(this.addcomment.commentText, [
    Validators.required,
    Validators.minLength(1),
  ]);

  rateText = new FormControl(this.addcomment.rate, [
    Validators.required,
  ]);

  commentVal() {
    return this.commentText.hasError("required") ? "Komentarz mile widziany!" :
            this.commentText.hasError("minlength") ? "Komentarz mile widziany!" :
              this.commentText.hasError("{{rate==0}}")?"Przy oddawaniu komentarza pamiętaj o ocenieniu książki!": "";
  }

  // rateVal() {
  //   return this.rateText.hasError("required") ? "Oceń książkę!" :
  //     this.rateText.hasError("minlength") ? "Komentarz mile widziany!" :  "";
  // }

  totalRate: any;
  cena: any;
  opis: any;

  bookCover: any;
  bookName: any;
  Author: any;
  token: any;
  sztuk: any;
  // coment: any;

  ngOnInit(): void {
    this.getCommentOfBook();


    this.bookService.autoRefresh$.subscribe(() => {
      this.getRateOfBook(this.bookId);
    });
    this.bookService.getOneBook(this.bookId, this.token);
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    console.log('bookId:', this.bookId);
    this.token = localStorage.getItem('token');
    // console.log('token:', this.token);
    this.getBookById();
    //var b = [] as number[];

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    // this.getRateOfBook(this.bookId);
    // this.getColor();
  }

  commentt: any;
  user:any
  comments = Array<any>();
  comments2 = Array<any>();
  bookIdd:any
  bookElo: any;
  getCommentOfBook()  {
    this.bookService.getALlRates().subscribe((response: any) => {
      for (let i = 0; i < response.obj.length; i++) {
        this.bookElo = response.obj[i].bookId;
        this.user = response.obj[i].username;
        // this.comment = response.obj[i].commentt;
        var c = {
          bookElo: response.obj[i].bookId,
          user: response.obj[i].username,
          commentt: response.obj[i].comment,
        }
        this.comments.push(c)
        console.log(this.comments);
        console.log(response.obj[i].bookId);
      }
        // console.log('response', response);
        // console.log('rate of books:', response.obj);
        // console.log(response.obj);
        // console.log('booookid:', response.obj[0].bookId);
        // this.totalRate= response.obj;
        // console.log(response.obj)
        // this.bookService.getOneBook(this.bookId , this.token).subscribe((odp: any) => {
        //   if (odp.obj != null ) {
        //     console.log(odp.obj.bookId)
        //     this.bookIdd = odp.obj.bookId;
        //     var c = {
        //       bookIdd: odp.obj.bookId,
        //     }
        //     this.comments2.push(c);
        //     console.log(this.comments2)
        //   }
        // });
        for (let i = 0; i < response.obj.length; i++) {

          // if(response.obj[i].comment != null) {
            console.log(response.obj);


        //         this.getBookById();
        //         console.log(response.obj[i].bookId);
                this.comment = response.obj[i].comment;
                console.log(response.obj[i].comment)
                this.user = response.obj[i].username;
                this.bookId = response.obj[i].bookId
                console.log(response.obj[i].bookId);
        //         // this.bookIdd = this.bookId;
        //
                var p = {
                  // commentt: response.obj[i].comment,
                  // username: response.obj[i].username,
                  // bookId: this.bookId,
                }
        //
        //         this.comments.push(p);
            console.log("after push ", this.comments);
        //

            // }


          //
          //
          //
          //

        }
      }
    );
  }

  stringValue = null;

  isNameCheck(): boolean {
    if (typeof this.stringValue != 'undefined' && this.stringValue) {
      return false;
    }
    return true;
  }


  getBookById() {
    console.log('get book called');
    this.bookService.getOneBook(this.bookId , this.token).subscribe((response: any) => {
      if (response.obj != null) {
        this.bookId = response.obj.bookId;
        this.book = response.obj;
        this.bookCover = response.obj.bookCover;
        this.Author = response.obj.author;
        this.bookName = response.obj.bookName;
        this.sztuk = response.obj.quantityOfBooks;
        this.cena = response.obj.cost;
        this.opis = response.obj.bookDesc;
        console.log(response.obj)
      }
    });
  }

  getColor() {
    if (this.totalRate >= 3 || this.totalRate >= 2) {
      this.color = 'rgb(245,182,110)';
    }
    if (this.totalRate >= 4) {
      this.color = 'rgb(16,136,16)';
    }
    if (this.totalRate < 2) {
      this.color = 'rgb(250,0,0)';
    }
  }

  getRateOfBook(bookId: number)  {
    console.log('book id for avgrate:', bookId);
    this.bookService.getRateByBookId(bookId).subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('rate of books:', response.obj);
        this.totalRate = response.obj;

      }

    );

  }

  submitRate() {
    const data = {
      rate: this.rate,
      comment: this.comment,
      bookId: this.bookId,
    };
    console.log('rating is', data.rate);
    console.log('review is ', data.comment);
    console.log('bookid is ', data.bookId);
    this.comment == data.comment;
    this.bookService.ratingandreview(this.bookId, data , this.token).subscribe((response: any) => {

          console.log('submit rate response:', response);
          this.snackBar.open(response.response, 'ok', { duration: 2000 });
        setTimeout(function(){
          window.location.reload();
        }, 2000);
          // this.router.navigateByUrl('home');
        },
        (error: any) => {
          this.snackBar.open("Możesz ocenić i skomentować książkę tylko raz!", 'ok', { duration: 2000 });
        }


      );

    if (this.commentForm.invalid) {
      return;
    }

  }

  showIcon(index: number) {
    if (this.rate >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(rating: any) {
    this.snackBar.open('Oceniłeś ' + rating + ' / ' + this.starCount +", teraz dodaj komentarz jeśli tego jeszcze nie zrobiłeś!", '', {
      duration: this.snackBarDuration,
    });
    this.rate = rating;
    return false;
  }

}
