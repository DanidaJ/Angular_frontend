import { Routes } from '@angular/router';
import {BookingComponent} from './booking/booking.component';
import {HomeComponent} from './home/home.component';



export const routes: Routes = [
  {path:'book',component:BookingComponent},
  {path:'started',component:BookingComponent},
  {path:'',component:HomeComponent},
];
