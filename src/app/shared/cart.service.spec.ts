import { TestBed } from '@angular/core/testing';
import { IProduct } from '../products/product';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
   let dummyCart:IProduct[]=[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);

    dummyCart=[ {
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
      }
   ]

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete the item in cart',()=>{
    let dummyItem ={
      id: 504,
      name:"OnePlus Nord 5G ",
      
      category:"Electronics",
      price: 10000,
      rating: 4.5,
      imageurl:"../../assets/images/mobile.jpg",
      brand:"One Plus",
      description:"This is New model of One plus. 12gb RAM and 6gb ROM",
      qty: 0    
   };
  
   dummyCart=[...dummyCart,dummyItem];
   service.deleteCart(dummyItem.id);
   expect(dummyCart.length).toEqual(3);
  });
});
