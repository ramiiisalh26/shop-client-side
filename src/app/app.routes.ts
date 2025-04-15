import { Routes } from '@angular/router';
import { hasRoleGuard } from './services/has_role_guard/has-role.guard';
import { Role } from './services/role/role';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full' ,
        loadComponent: () =>{
            return import('./home/home.component').then((m) => m.HomeComponent)
        },
    },
    {
        path: 'allProduct',
        loadComponent: () => {
            return import('./components/all-product/all-product.component').then((m) => m.AllProductComponent)
        }
    },
    {
        path: 'about-us',
        loadComponent: () => {
            return import('./components/about-us/about-us.component').then((m) => m.AboutUsComponent)
        }
    },
    {
        path: 'contact-us',
        loadComponent: () => {
            return import('./components/contact-us/contact-us.component').then((m) => m.ContactUsComponent)
        }
    },
    {
        path: 'login',
        loadComponent: () => {
            return import('./components/auth/login/login.component').then((m) => m.LoginComponent)
        },
        data: { roles: [] },
        canActivate: [hasRoleGuard]
    },
    {
        path: 'sign-up',
        loadComponent: () => {
            return import('./components/auth/signup/signup.component').then((m) => m.SignupComponent)
        }
    },
    {
        path: 'productItemPage',
        loadComponent: () =>{
            return import('./components/product-item-page/product-item-page.component').then((m) => m.ProductItemPageComponent);
        }
    },
    {
        path: 'check-out',
        loadComponent: ()=>{
            return import('./components/check-out/check-out.component').then((m) => m.CheckOutComponent);
        }
    },
    {
        path: 'admin',
        loadComponent: () =>{
            return import('./dashboard/admin/admin.component').then((m) => m.AdminComponent);
        },
        canActivate: [hasRoleGuard],
        data: {
            roles: [Role.ADMIN]
        }
    },
    {
        path: 'unauthorized', 
        loadComponent: ()=>{
            return import('./components/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent);
        }
    },
    // {
    //     path: 'logout',
    //     loadComponent: () =>{
    //         return import('./home/home.component').then((m) => m.HomeComponent)
    //     },
    // }
];
