import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  url='api/cartItems'

  //--method for get the cart list to display in cart component.
  getCartItems(): Observable<IProduct[]> {
  // Mapping the obtained result to our CartItem props. (pipe() and map())
  console.log('in cart service');
    return this.http.get<IProduct[]>(this.url).pipe(
      map((result: any[]) => {
        let cartItems: IProduct[] = [];

        for (let item of result) {
          let productExists = false

          for (let i in cartItems) {
            if (cartItems[i].id === item.id) {
              cartItems[i].qty++
              productExists = true
              break;
            }
          }

          if (!productExists) {
            cartItems.push(item);
          }
        }
        console.log('cart service call ends');
        return cartItems;
      })
    );
    
  }

  //add the items in cart array 
  addProductToCart(product: IProduct): Observable<any> {
    const headers= new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.url, product,{ headers });
  }


}
