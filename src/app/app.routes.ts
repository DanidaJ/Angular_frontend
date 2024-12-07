import { Routes } from '@angular/router';
import {BookingComponent} from './booking/booking.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {EventComponent} from './event/event.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';


export const routes: Routes = [
  {path:'book',component:BookingComponent, canActivate: [AuthGuard]},
  {path:'started',component:BookingComponent, canActivate: [AuthGuard]},
  {path:'',component:HomeComponent, canActivate: [AuthGuard]},
  {path:'signup',component:UserComponent },
  {path:'events',component:EventComponent, canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:"**",redirectTo:"login"}




];
