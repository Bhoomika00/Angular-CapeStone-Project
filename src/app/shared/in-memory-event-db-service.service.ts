import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IProduct } from '../products/product';
import { IUser } from '../user/login/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryEventDbService implements InMemoryDbService {

  constructor() { }

  createDb(){
    const products:IProduct[]=
    [
      {
        "id": 101,
          "name":"Shirts",
          
          "category":"Clothing",
          "price": 500,
          "rating": 3.5,
          "imageurl":"../../assets/images/shirt.jpg",
          "brand":"Zara",
      "description":"This is shirt",
    
          "qty": 0
        },
        {"id": 102,
        "name":"Apple",
        
        "category":"Food",
        "price": 100,
        "rating": 5,
        "imageurl":"../../assets/images/veggies.jpg",
        "brand":"Kashmir apple farms",
        "description":"This is Apple",
        "qty": 0
        },
        {
        "id": 501,
          "name": "Dell latitude 4.0",
          
          "category":"Electronics",
          "price": 50000,
          "rating": 4,
          "imageurl":"../../assets/images/laptop.jpg",
          "brand":"Dell",
          "description":"This is Dell Laptop",
          "qty": 0
        },
        {
        "id": 504,
          "name":"OnePlus Nord 5G ",
          
          "category":"Electronics",
          "price": 10000,
          "rating": 4.5,
          "imageurl":"../../assets/images/mobile.jpg",
          "brand":"One Plus",
          "description":"This is New model of One plus. 12gb RAM and 6gb ROM",
          "qty": 0
        }

    ]

    //cart db
    const cartItems:IProduct[]=[];

    //users db
    const users:IUser[]=[
      {
        "id":1,
        "userName":"Bhoomika",
        "password":"abcd",
        "isAdmin":true
      },
      {
        "id":2,
        "userName":"admin",
        "password":"admin",
        "isAdmin":true
      },
      {
        "id":3,
        "userName":"Sakura",
        "password":"sakura",
        "isAdmin":false
      }
    ]
    return{products,cartItems,users}
  }
}
