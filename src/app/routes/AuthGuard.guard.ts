import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/Auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
 const  authService= inject(AuthService);
 const  router= inject(Router);
  if (authService.getToken().length > 0) {
    return true;
  } else {
    console.log('You are not allowed to view this page');
    router.navigate(['/login']);
    return false;
  }
};
