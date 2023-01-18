import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../products/product';
import { CartService } from '../shared/cart.service';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {

 
  searchItem='';
  
  //isLoggedIn:boolean=false;
  @Input() totalItem : number = 0;
cart:IProduct[]=[];
btnText:string='Login'

  get userName():string{
 
  if(this.authservice.currentUser)
  return this.authservice.currentUser?.userName;
 
  return '';
 
  }
  constructor(private router:Router,private authservice:AuthService,private cartService : CartService){}
  ngOnChanges(changes: SimpleChanges): void {
    /* this.cartService.getProducts()
    .subscribe(res=>{
      //this.cart=res;
     this.totalItem=res.length
    })
    */  
 
    // this.totalItem=this.cart.length;
    // console.log(this.totalItem)

    //this.totalItem=this.cartService.cartItems.length;
   
  }
 
 
  ngOnInit(): void {
   this.cartService.getProducts()
   .subscribe(res=>{
     
     
     //this.totalItem=res.length
     this.cart=res;
     
   })
   //this.totalItem=this.cartService.cartItems.length;


   
    }
    cartCount(){
      return this.cart.reduce((sum,item)=>sum+=item.qty,0);
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
 
 
      }

     


