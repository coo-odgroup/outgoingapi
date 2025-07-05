import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  pnr:any;
  wallet_balance:any;

      
  constructor(private router: Router) {


   }

  ngOnInit(): void {
    if(this.pnr==null){     
      this.router.navigate(['/']);
    }
    this.pnr=localStorage.getItem('pnr');
    this.wallet_balance=localStorage.getItem('wallet_balance');


  }

}
