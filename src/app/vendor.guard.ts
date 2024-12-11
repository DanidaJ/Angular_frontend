import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VendorGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userType = localStorage.getItem('userType');

    // Allow access if the user type is 'Vendor'
    if (userType === 'Vendor') {
      return true;
    } else {
      // Redirect to an unauthorized page or login if the user is not a vendor
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
