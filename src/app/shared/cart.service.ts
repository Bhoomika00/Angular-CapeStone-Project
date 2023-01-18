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




  /* constructor(private http:HttpClient) { }
  url='api/cartItems';
 cartItems: IProduct[] = [];

 

  //--method for get the cart list to display in cart component.
  getCartItems(): Observable<IProduct[]> {
  // Mapping the obtained result to our CartItem props. (pipe() and map())
  console.log('in cart service');
    return this.http.get<IProduct[]>(this.url).pipe(
      
       map((result: any[]) => {
        let cart: IProduct[] = [];

        for (let item of result) {
          let productExists = false

         
          for (let i in cart) {
            if (cart[i].id === item.id) {
              cart[i].qty++
              productExists = true
              break;
            }
          }
             if (!productExists) {
            cart.push(item);
            
          }
        
          
          
          
        } 
        console.log('cart service call ends');
        this.cartItems=cart;
        
        
        return cart;
       
      })
    );
    
  }
  
  //add the items in cart array 
  addProductToCart(product: IProduct): Observable<any> {
    
    const headers= new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.url, product,{ headers });
  }

  deleteItem(id:number):Observable<{}>{
    const headers= new HttpHeaders({'Content-Type':'application/json'});

    
    const url= `${this.url}/${id}`;

    return this.http.delete<IProduct>(url,{headers})
    .pipe(
      tap(data=>{
        console.log('deleted prd'+id);
        const foundIndex = this.cartItems.findIndex(item=>item.id===id);
       //if product id is not found means index returned will be -1
       if(foundIndex > -1){
       this.cartItems.splice(foundIndex,1);}
       

       console.log(this.cartItems);
       }
     ));
 }


 */
}
