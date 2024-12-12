import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userType = localStorage.getItem('userType');

    // Allow access if the user type is 'Admin'
    if (userType === 'Admin') {
      return true;
    } else {
      // Redirect to an unauthorized page or login if the user is not a admin
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
