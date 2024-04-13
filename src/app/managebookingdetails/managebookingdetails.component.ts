import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagebookingService } from '../services/managebooking.service';
import { NotificationService } from '../services/notification.service';
import { NgxSpinnerService } from "ngx-spinner";


import { SeoService } from '../services/seo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-managebookingdetails',
  templateUrl: './managebookingdetails.component.html',
  styleUrls: ['./managebookingdetails.component.css']
})
export class ManagebookingdetailsComponent implements OnInit {

  tab1:boolean=true;
  tab2:boolean=false;
  tab3:boolean=false;

  bookingDetails:any;

  seats:any=[];
  totalseats:any=[];
  cancelInfo:any=[];
  currentUrl: string;

  constructor(public router: Router,private notify: NotificationService,
    private managebookingService: ManagebookingService,
    private spinner: NgxSpinnerService ,private seo:SeoService,
    private location: Location) { 

    this.currentUrl = location.path().replace('/','');
        this.seo.seolist(this.currentUrl); 

    this.bookingDetails= JSON.parse(localStorage.getItem("bookingDetails"));

    if(this.bookingDetails == null){

      this.router.navigate(['manage-booking']);

    }

   
   

  }



  cancel_ticket(){

    if(confirm("Are you sure cancel the ticket ? ")) {
      
   
    this.spinner.show();
    const request= {
      "pnr":this.bookingDetails.booking[0].pnr
     };

     
    this.managebookingService.cancelTicket(request).subscribe(
      res=>{ 
        
        if(res.status==1){    
          this.cancelInfo.cancel_status  =false;    
          this.notify.notify(res.message,"Success");                
        } 
        if(res.status==0){
          this.notify.notify(res.message,"Error");           
        } 

        this.spinner.hide();

      },
    error => {
      this.spinner.hide();
      this.notify.notify(error.error.message,"Error");
    }
    );

  }


  }

  

  ngOnInit(): void {
   
  }

}
