import { CanActivateFn, Router  } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { Injectable } from '@angular/core';

export const authGuard: CanActivateFn = (route, state, router: Router, authService: AuthService) => {
  return authService.isLoggedIn().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
