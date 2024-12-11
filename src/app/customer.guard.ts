import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userType = localStorage.getItem('userType');

    // Allow access if the user type is 'Customer'
    if (userType === 'Customer') {
      return true;
    } else {
      // Redirect to an unauthorized page or login if the user is not a customer
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
