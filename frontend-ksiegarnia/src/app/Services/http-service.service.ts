import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  public post(url: any, data: any, head: any): any {
    return this.http.post(url, data, head);
  }
  public put(url: any, data: any, head: any): any {
    return this.http.put(url, data, head);
  }

  public get(url: any, options: any): Observable<any> {
    return this.http.get(url, options);
  }

  public delete(url: any, options: any): Observable<any> {
    return this.http.delete(url, options);
  }
}
