import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { IProduct } from '../products/product';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductService } from './product.service';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;

  let injector: TestBed;

  let httpMock: HttpTestingController;

  let dummyList:IProduct[]=[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports:[HttpClientTestingModule],
      providers: [ ProductService ]
    })
    .compileComponents();

    service=TestBed.get(ProductService);
    injector = getTestBed();

    httpMock = injector.get(HttpTestingController);
    dummyList=[
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
        }
        
    
    ]
    
  });
  afterEach(() => {
    httpMock.verify();
  });

  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check getProduct() for all products', () => {
    inject([HttpTestingController,ProductService],
        (httpMock:HttpTestingController,service:ProductService)=>
        {
    

    service.getProducts().subscribe(response=>expect(dummyList).toEqual(response));
    
    const mockReq=httpMock.expectOne(service.url);
    expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(dummyList);

      httpMock.verify();
})
  });


  it('should get product by id',()=>{
    let response:IProduct;
    
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
      }
   

    

    const fn=spyOn(service, 'getProductById').and.returnValue(of(dummyItem));

    service.getProductById(504).subscribe(res=>{response=res;expect(response).toEqual(dummyItem);});

   expect(fn).toHaveBeenCalled();

});

it('should test create product function',()=>{

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

 
 dummyList=[...dummyList,dummyItem];
 service.createProduct(dummyItem).subscribe(resp=>expect(resp).toEqual(dummyItem) )
 
 expect(dummyList.length).toEqual(4);

 const req = httpMock.expectOne(service.url);
 expect(req.request.method).toBe('POST');
 req.flush(dummyItem );

 

   
});

it('should check update function',()=>{
  let item= {
    id: 101,
      name:"Shirts",
      
      category:"Clothing",
      price: 600,
      rating: 4.5,
      imageurl:"../../assets/images/shirt.jpg",
      brand:"Zara",
      description:"This is  Zara blue shirt",
    
      qty: 0
    };

    service.updateProduct(item).subscribe(resp=>expect(resp).toEqual(item) )


    const req = httpMock.expectOne(`${service.url}/${item.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(item );
});

it('should check delete product function',()=>{
  //let response:Iproduct;
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
 dummyList=[...dummyList,dummyItem];
 //so the size of dummylist becomes 5.
 
 service.deleteProduct(dummyItem.id).subscribe(res=>{console.log(res)});
 
 expect(dummyList.length).toEqual(4);
 
 

 const req = httpMock.expectOne(`${service.url}/${dummyItem.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyItem);
  


});

});






  

