import { Routes } from '@angular/router';
import {BookingComponent} from './booking/booking.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {EventComponent} from './event/event.component';
import {LoginComponent} from './login/login.component';
import { CustomerGuard } from './customer.guard';
import { VendorGuard } from './vendor.guard';
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from './admin.guard';


export const routes: Routes = [
  {path:'book',component:BookingComponent,
  canActivate: [CustomerGuard],},
  {path:'',component:HomeComponent},
  {path:'signup',component:UserComponent },
  {path:'events',component:EventComponent,
    canActivate: [VendorGuard],},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent,canActivate: [AdminGuard],

  },
  {path:"**",redirectTo:"login"}




];
