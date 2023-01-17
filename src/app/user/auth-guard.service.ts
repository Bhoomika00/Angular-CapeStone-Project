import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.checkLoggedIn(state.url);


}
 checkLoggedIn(url:string):boolean{
    //checking if user is login or not
    if(this.authService.isLoggedInFunc()){
        
        //this route will be active only for admin users
        //create one admin user and use it


    if(this.authService.isAdmin()){
     console.log('Auth guard check for admin role');
     //this.router.navigate(['/addProduct']);
     return true;
    }
    else{
        alert('Only admins can access this page');
        this.router.navigate(['#'])
        return true;
    }
    
}
    
    this.authService.redirectToUrl=url;
    this.router.navigate(['/login']);
    return false;
 }
}





