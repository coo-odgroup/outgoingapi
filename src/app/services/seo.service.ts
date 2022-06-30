import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import{ GlobalConstants } from '../constants/global-constants';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Meta, Title } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private apiURL = GlobalConstants.BASE_URL;

  private MASTER_SETTING_USER_ID =  GlobalConstants.MASTER_SETTING_USER_ID;

  private meta_title = new  BehaviorSubject('ODBUS - Online Bus Ticket Booking in Odisha, Book Bus Tickets Online');
  private meta_keyword = new  BehaviorSubject('Online bus ticket booking, bus ticket booking Odisha, volvo ac bus booking, bus ticket booking, bus tickets');
  private meta_description = new  BehaviorSubject("Book bus tickets online from ODBUS, Odisha's first and Largest Online Bus Ticket Booking Platform with over 1000 bus operators to all routes in Odisha and surrounding States.");

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 

  private link: HTMLLinkElement;

  constructor(@Inject(DOCUMENT) private doc,private httpClient: HttpClient,private title: Title, private meta: Meta) {

    
   }

  deafultmeta_title = this.meta_title.asObservable();
  deafultmeta_keyword = this.meta_keyword.asObservable();
  deafultmeta_description = this.meta_description.asObservable();

 

  seolist (current_url:any){
   this.httpClient.get(this.apiURL + '/seolist?user_id='+ this.MASTER_SETTING_USER_ID , this.httpOptions).subscribe(
    resp =>{
      this.setMeta(resp['data'],current_url);
    }
   ); 

  }



  setMeta(res:any,current_url:any){

    if (this.link === undefined) {
      this.link = this.doc.createElement('link');
      this.link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(this.link);
    }
    this.link.setAttribute('href', this.doc.URL.split('?')[0]);
    this.meta.updateTag({ name: 'og:url', content: this.doc.URL }) ; 


    if(res){

      res.forEach((c) => {
        if(c.page_url == current_url) {           
          this.title.setTitle(c.meta_title);
          this.meta.updateTag({ name: 'description', content: c.meta_description });
          this.meta.updateTag({ name: 'keywords', content: c.meta_keyword }) ;
          this.meta.updateTag({ name: 'og:title', content: c.meta_title }) ;   
          this.meta.updateTag({ name: 'og:description', content: c.meta_description }) ; 
          
          const script = document.createElement('script');
          script.innerHTML = c.extra_meta;
          this.doc.head.append(script);
        }
  
      });

    }
  }


  
  seoList (){

    return this.httpClient.get<any>(this.apiURL + '/seolist?user_id='+ this.MASTER_SETTING_USER_ID ,this.httpOptions)
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
