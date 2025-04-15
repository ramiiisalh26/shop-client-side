import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Role } from '../role/role';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const userRole: any = inject(AuthService).getRole();
  const expectedRoles: Role[] = route.data['role'];

  const hasRole: boolean = expectedRoles.some((role) => userRole === role);
 
  return hasRole || router.navigate(['unauthorized']);
};
