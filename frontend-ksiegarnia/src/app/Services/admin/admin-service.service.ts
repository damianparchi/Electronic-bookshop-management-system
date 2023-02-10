import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpServiceService} from "../httpService/http-service.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private baseUrl = 'http://localhost:8080';
  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

  constructor(private http: HttpClient, private httpService: HttpServiceService) { }

  private httpOptions = {
    headers: new HttpHeaders ({'content-type': 'application/json' , token: localStorage?.['token']})
  };

  getUnconfirmedBooks(status: string) {
    return this.httpService.get(this.baseUrl + "/admin/books" + '?status=' + status, this.httpOptions);
  }

  confirmBooks(bookId: number, status: string): Observable<any> {
    return this.httpService.put(this.baseUrl + "/admin/confirmBook/" + bookId + '?' + 'status=' + status, '', this.httpOptions);
  }

  deniedBooks(bookId: number, status: string): Observable<any> {
    return this.httpService.put(this.baseUrl + "/admin/confirmBook/" + bookId + '?' + 'status=' + status, '', this.httpOptions);
  }

  getCheckouts(): Observable<any> {
    console.log(this.httpService.get(this.baseUrl + "/ksiegarnia/checkouts/", this.httpOptions));
    return this.httpService.get(this.baseUrl + "/ksiegarnia/checkouts/", {});
  }
  private _autoRefresh$ = new Subject();

  get autoRefresh$() {
    return this._autoRefresh$;
  }

  updateCheckoutStatus(checkoutId: any, status: any): Observable<any> {
    console.log(this.baseUrl + "/ksiegarnia/updateOrderStatusByAdmin" + "?checkoutId="+checkoutId +"&status="+status, '',this.httpOptions);
    return this.httpService.put(this.baseUrl + "/ksiegarnia/updateOrderStatusByAdmin" + "?checkoutId="+checkoutId +"&status="+status, '',this.httpOptions);
  }

  deleteCheckoutFromHistory(checkoutId:any): Observable<any> {
    return this.httpService.delete(`${this.baseUrl}/ksiegarnia/deleteOrderFromHistory/${checkoutId}`,{headers: new HttpHeaders({token: localStorage?.['token']})});
  }






}
