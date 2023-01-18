import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IProduct } from '../products/product';
import { productReducer } from '../state/products/product.reducer';

@Injectable({
  providedIn: 'root'
})
export class CartService {



    cartItem:IProduct[]=[];
    productList=new BehaviorSubject<IProduct[]>([]);

    getProducts(){
      return this.productList.asObservable();

    }

    setProducts(product:IProduct[]){
      this.cartItem.push(...product);
      this.productList.next(product);

    }

    addToCart(product:IProduct){
     
      this.productList.next(this.cartItem);
      const foundProduct = this.cartItem.find(({name})=>name===product.name);
      if(!foundProduct){
        
        this.cartItem.push({...product,qty:1});
        return;
      }
      foundProduct.qty+=1;

    }

    deleteCart(id:number){
      //const id=p.id;
      const comIndex=this.cartItem.findIndex(item=>item.id===id);
      if(comIndex >-1){
          this.cartItem.splice(comIndex,1);
      }
      this.productList.next(this.cartItem);
  }

  emptyCart(){
    this.cartItem=[];
   this.productList.next(this.cartItem);

  }




 }