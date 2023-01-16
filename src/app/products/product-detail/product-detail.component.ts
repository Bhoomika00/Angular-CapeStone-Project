import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';
import { ProductService } from 'src/app/shared/product.service';
import { getProducts } from 'src/app/state/products/product.selector';
import { IProduct } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit,OnDestroy{
  
  sub!:Subscription;
  product!:IProduct;// |undefined;
  id:number=0

  constructor(private activatedRoute:ActivatedRoute,private productService:ProductService,private cartService:CartService){}
 
  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((params)=>{
      console.log(params);
      let idd=params.get('id');
       if(idd){
         this.id=+idd;
       }
      
            this.productService.getProductById(this.id).subscribe(resp=>this.product=resp);
            return this.product;
      
    })
  }

  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  addCartItem(p:IProduct){
    this.cartService.addProductToCart(p).subscribe((res)=>console.log('in the addcartitem of detail'));
  }


}
