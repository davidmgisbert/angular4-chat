import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
