import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../products/product';
import { CartService } from '../shared/cart.service';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = 'InstaSMart';
  searchItem='';
  //isLoggedIn:boolean=false;
  public totalItem : number = 0;
cart:IProduct[]=[];
btnText:string='Login'

  get userName():string{
 
  if(this.authservice.currentUser)
  return this.authservice.currentUser?.userName;
 
  return '';
 
  }
  constructor(private router:Router,private authservice:AuthService,private cartService : CartService){}
 
 
  ngOnInit(): void {
   this.cartService.getCartItems()
   .subscribe(res=>{
     this.totalItem = res.length;
   })
   
   /*console.log('menu on init');
   this.isLoggedIn=this.authservice.isLoggedIn;
    if(sessionStorage.getItem('isLogged')==='true'){
     this.isLoggedIn=true;
   } console.log(this.isLoggedIn, 'from init of menu ');*/
   
    }

    get isLoggedIn():boolean{
      //service to return the loggedInstatus ofthe user
      //we will have to inject a authentication service which will checkt the loggedIn
     //still pending
      return this.authservice.isLoggedInFunc();
    }
 
 
    logOut():void{
      this.authservice.logOut();
      this.router.navigate(['home']);
    }

    ngOnDestroy(): void {
      console.log('menu destroyed');}
 
 
      ngOnChanges():void{
 
        console.log('menu component changes');
        /*
        if(sessionStorage.getItem('isLogged')=='true'){
          this.isLoggedIn=true;
          */
        }
      }

     


