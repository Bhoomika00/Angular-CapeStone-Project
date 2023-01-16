import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from '../products/product';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges {

  cartItems:IProduct[]=[];
 

 
  cartTotal: number=0;
  totalPrice:number=0;

  constructor(private cartService:CartService){}
  ngOnChanges(changes: SimpleChanges): void {
    this.cartItems.forEach(item => {
      this.totalPrice = (item.qty * item.price);
      //this.cartTotal+=this.totalPrice;
    })
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items: IProduct[]) => {
      this.cartItems = items;
      this.calcCartTotal();
    })

    
  }

  

  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }
  
}
