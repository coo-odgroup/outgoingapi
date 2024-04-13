import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate, Router, Route} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { SearchComponent } from './search/search.component';
import { BookingComponent } from './booking/booking.component';

import { TestimonialsComponent } from './testimonials/testimonials.component';
import { OperatorsComponent } from './operators/operators.component';
import { TncComponent } from './tnc/tnc.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManagebookingdetailsComponent } from './managebookingdetails/managebookingdetails.component';
import { SupportComponent } from './support/support.component';
import { FaqComponent } from './faq/faq.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NewsComponent } from './news/news.component';
import { CareersComponent } from './careers/careers.component';
import { RoutesComponent } from './routes/routes.component';
import { OffersComponent } from './offers/offers.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { OperatorDetailComponent } from './operator-detail/operator-detail.component';
import { AuthGuard } from './helpers/auth.guard';
import { SeoService } from './services/seo.service';
import { CommonModule, HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { PopularRoutesService } from './services/popular-routes.service';




export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listing', component: SearchComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'manage-booking', component: ManageBookingComponent },
  { path: 'manage-booking-detail', component: ManagebookingdetailsComponent},  
  { path: 'support', component: SupportComponent },
  { path: 'operators', component: OperatorsComponent },    
  { path: 'operator/:url', component: OperatorDetailComponent},   
  { path: 'routes', component: RoutesComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'terms-conditions', component: TncComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '404', component: PageErrorComponent },
  { path: 'thank-you', component: ThankyouComponent }, 
  { path: 'signup', component: SignupComponent},  
  { path: 'login', component: LoginComponent},  
  { path: 'otp', component: OtpComponent}, 
  { path: 'thankyou', component: ThankyouComponent}, 
  { path: '**', component: SearchComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule {
  currentUrl: any; 

  constructor(
    private seo:SeoService ,private router: Router ,private popularRoutesService:PopularRoutesService  
    ) {

      this.popularRoutesService.allroutes().subscribe(
        res=>{
          if(res.status==1)
          { 

            if(res.data.length>0){
              res.data.forEach(e => {
                let r: Route = {
                  path: e.source_url+'-'+e.destination_url+'-bus-services',
                  component: SearchComponent
                };
                routes.push(r);
              });  
          }  
          this.router.resetConfig(routes);         
        }       
        
        });
    }



}
