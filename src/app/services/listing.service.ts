import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import{ GlobalConstants } from '../constants/global-constants';

@Injectable({
  providedIn: 'root'
})

export class ListingService {

  private apiURL = GlobalConstants.BASE_URL;
  private USER_ID = GlobalConstants.USER_ID;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getlist(src:any,dest:any,dt:any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + '/Listing?source='+src+'&destination='+dest+'&entry_date='+dt+'&user_id='+this.USER_ID,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:HttpErrorResponse) {
    let errorMessage :any;
    if(error.error instanceof HttpErrorResponse) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error;
      
      //`Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}