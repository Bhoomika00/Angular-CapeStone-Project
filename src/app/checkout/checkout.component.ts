import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerCancelAction } from '@ngrx/router-store';
import { IProduct } from '../products/product';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkOut!:FormGroup;
  show:boolean=false;
  show1:boolean=true;
  cart:IProduct[]=[];
  cartTotal!: number;

  constructor(private router:Router,private fb:FormBuilder,private cartService:CartService){}
  ngOnInit(): void {
    this.checkOut=this.fb.group({
      cname:['John Abe',[Validators.required,Validators.minLength(2)]],
      cnum:['XXXX-XXXX-XXXX',[Validators.required,Validators.maxLength(12)]],
      expDate:['09/09/2025',[Validators.required]],
      cvv:['',[Validators.required,Validators.maxLength(3)]],
    });

    this.cartService.getCartItems().subscribe((items: IProduct[]) => {
      this.cart = items;
      this.calcCartTotal();
      console.log(items);
    })

    

  }

  onSubmit(){
    alert('Payment successfull');
    this.router.navigate(['/products']);
  }

  visibility(){
    this.show=!this.show;
    this.show1=!this.show1;
  }

  calcCartTotal() {
    this.cartTotal = 0
    this.cart.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }




}
