import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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


  cancelDetails:any;

  cancelInfo:any=[];
  pnr:any='';

  constructor(public router: Router,private notify: NotificationService,
    private managebookingService: ManagebookingService,
    private spinner: NgxSpinnerService ,private seo:SeoService,
    private location: Location, private route: ActivatedRoute,) { 

      this.route.params.subscribe(params => {
        this.pnr = params['pnr'];
       
      });

      

      this.spinner.show();
    const request= {
      "pnr":this.pnr
     };

      this.managebookingService.getcancelTicketInfo(request).subscribe(
        res=>{ 

         // console.log(res);

          if(res.status==1){
            
            this.cancelDetails=res.data;
                       
          } 
          if(res.status==0){
            this.notify.notify(res.message,"Error");
            this.router.navigate(['manage-booking']);
          } 

          this.spinner.hide();
        },
      error => {
        this.spinner.hide();
        this.notify.notify(error.error.message,"Error");
      });



    //console.log(this.cancelDetails);

    // if(this.cancelDetails == null){

    //   this.router.navigate(['manage-booking']);

    // }

   
   

  }



  cancel_ticket(){

    if(confirm("Are you sure cancel the ticket ? ")) {
      
   
    this.spinner.show();
    const request= {
      "pnr":this.pnr
     };

     
    this.managebookingService.cancelTicket(request).subscribe(
      res=>{ 
        
        if(res.status==1){    
          this.cancelDetails.cancel_status  =false;    
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
