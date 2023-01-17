import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IProduct } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  url='api/cartItems';
 cartItems: IProduct[] = [];

  //--method for get the cart list to display in cart component.
  getCartItems(): Observable<IProduct[]> {
  // Mapping the obtained result to our CartItem props. (pipe() and map())
  console.log('in cart service');
    return this.http.get<IProduct[]>(this.url).pipe(
      tap(data=>{console.log(data);
        //we are assigning data to this.products
        this.cartItems=data;
  }),
       map((result: any[]) => {
        //let cartItems: IProduct[] = [];

        for (let item of result) {
          let productExists = false
          
          for (let i in this.cartItems) {
            if (this.cartItems[i].id === item.id) {
              this.cartItems[i].qty++
              productExists = true
              break;
            }
            
          }
          if (!productExists) {
            this.cartItems.push(item);
          }

          
        } 
        console.log('cart service call ends');
        return this.cartItems;
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

    //@DeleteMapping deleteAll delete url/id  /api/products/111
    const url= `${this.url}/${id}`;

    return this.http.delete<IProduct>(url,{headers})
    .pipe(
      tap(data=>{
        console.log('deleted prd'+id);
        const foundIndex = this.cartItems.findIndex(item=>item.id===id);
       //if product id is not found means index returned will be -1
       if(foundIndex > -1)
       this.cartItems.splice(foundIndex,1);
       console.log(this.cartItems);
       },
     ));
 }



}
