import { Component, OnInit } from '@angular/core';
import {Book} from "../../Model/book.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminServiceService} from "../../Services/admin-service.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  book = [];
  books = new Array<Book>();
  status: string;

  constructor(private adminService: AdminServiceService,
              private matsnackbar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUnconfirmedBooks(status);
    this.adminService.autoRefresh.subscribe(() => {
      this.getUnconfirmedBooks(status);
    });
  }

  getUnconfirmedBooks(status: string) {
    this.adminService.getUnconfirmedBooks('W oczekiwaniu...').subscribe(
      (response: any) => {
        this.books = response.object;
      },
      (error: any) => {
        this.matsnackbar.open(error.error.message, 'error', {duration: 5000});
      }
    );
  }

  confirmBooks(bookId: number, status: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Jesteś pewien, że chcesz zatwierdzić książkę?',
        buttonText: {
          ok: 'Tak',
          cancel: 'Nie'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.confirmBooks(bookId, status).subscribe(
          () => {
            this.matsnackbar.open('Książka została zatwierdzona!', 'success', {duration: 1500});
            setTimeout(function(){
              window.location.reload();
            }, 1000);
          },
          (error: any) => {
            this.matsnackbar.open(error.error.message, 'error', {duration: 5000});
          }
        );
      }
    });

  }

  deniedBooks(bookId: number, status: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:{
        message: 'Jesteś pewien, że chcesz odrzucić?',
        buttonText: {
          ok: 'Tak',
          cancel: 'Nie'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.deniedBooks(bookId, status).subscribe(() => {
            this.matsnackbar.open('Książka została odrzucona!', 'success', {duration: 3000});
            setTimeout(function(){
              window.location.reload();
            }, 2000);
          },
          (error: any) => {
            this.matsnackbar.open(error.error.message, 'error', {duration: 3000});
          }
        );
      }
    });
  }
}
