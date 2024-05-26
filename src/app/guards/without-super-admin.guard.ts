import { CanActivateFn, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { inject } from '@angular/core';

export const withoutSuperAdminGuard: CanActivateFn = (route, state) => {
  const rest: RestService = inject(RestService);
  const router: Router = inject(Router);
  let result = true;

  rest.checkApp().subscribe(status => {
    result = false;
    router.navigate(['login'])
  }, ({ error }) => {
  })

  return result;
};
