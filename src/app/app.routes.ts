import { Routes } from '@angular/router';
import {BookingComponent} from './booking/booking.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {EventComponent} from './event/event.component';





export const routes: Routes = [
  {path:'book',component:BookingComponent},
  {path:'started',component:BookingComponent},
  {path:'',component:HomeComponent},
  {path:'signup',component:UserComponent },
  {path:'events',component:EventComponent},




];
