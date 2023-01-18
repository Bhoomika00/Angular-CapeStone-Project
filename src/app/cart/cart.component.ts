import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from '../products/product';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:IProduct[]=[];
 

 
  cartTotal: number=0;
  totalPrice:number=0;

  constructor(private cartService:CartService){}
  

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((items: IProduct[]) => {
      this.cartItems = items;
      this.calcCartTotal();
      console.log(items);
    })

    
  }
  ngOnchanges():void{
    this.calcCartTotal();
  }

  

  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  incr(item:IProduct){
    item.qty++;
    this.calcCartTotal();
    
  }

  decr(item:IProduct){
    if(item.qty==1){ 
      if(confirm('Item Qunatity will be made 0. Do you want Proceed?')){
      //this.removeItem(item)
    }}
    else{
    item.qty--;
    this.calcCartTotal();
  }
}

   removeItem(item:IProduct){

    if(confirm(`Are you sure to remove the ${item.name} from cart?`)){
    this.cartService.deleteCart(item.id);
      //console.log(item);
      this.calcCartTotal();
    
    console.log(this.cartItems);
    }
    this.calcCartTotal();
  }
 
}
