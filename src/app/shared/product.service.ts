import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { IProduct} from 'src/app/products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  foundIndex:number=0;
  
    ///api/products --will be resolved from in-memory web api -- /api/products
  url="api/products";
 products:IProduct[]=[];

 //BehaviorSubject will ensure that every consumer get recent most value selection 
 private selectedProductSource= new BehaviorSubject<IProduct | null >(null);

//$ to indicate that it is observable
selectedProductChanges$=this.selectedProductSource.asObservable();


  constructor(private http:HttpClient){}  //injecting http client
   
  getProducts():Observable<IProduct[]>{
    
    return this.http.get<IProduct[]>(this.url).pipe(

        tap(data=>{console.log(data);
          //tapping the data and assigning data to this.products
          this.products=data;
    }),
        catchError(this.errorHandler)
    );

  }



changeSelectedProduct(selectedProduct:IProduct | null):void{
  console.log('in change selected before next');
  this.selectedProductSource.next(selectedProduct);
  console.log('in change selected after next');

}

//method to create a new object of IProduct type
newProduct():IProduct{
      return {
  
           id:0,
          name:'',
          category:'',
          price:0,
          imageurl:'\\assets\\images\\food.jpg',
          rating:0,
          brand:'',
          description:'',
          qty:0
  
      };
  
    }
  
  
   
  
    createProduct(product:IProduct):Observable<IProduct>{
       
      const headers= new HttpHeaders({'Content-Type':'application/json'});
        const newProduct={...product,id:null};
      console.log(`in create method  ${this.url}`)
  
        //http post method for posting the new product to the array
        return     this.http.post<IProduct>(this.url,newProduct,{headers})
        .pipe(
          tap(data=>{
  
           console.log('in create new product'+ JSON.stringify(data));
           console.log(JSON.stringify(this.products));
  
          },
          catchError(this.errorHandler)
          )
        )
    }
    
    //delete  api/events --- delete mapping api/products/id
    deleteProduct(id:number):Observable<{}>{
      const headers= new HttpHeaders({'Content-Type':'application/json'});
      const url= `${this.url}/${id}`;
  
      return this.http.delete<IProduct>(url,{headers})
      .pipe(
        tap(data=>{
          console.log('deleted prd'+id);
        
        },
        catchError(this.errorHandler))
  
      );
  
    }
  
  
  
  
     getProductById(id:number):Observable<IProduct>{
      return this.getProducts().pipe(
        tap(()=>{console.log('fetch product'+id);
         this.foundIndex =this.products.findIndex(item=>item.id ==id);
        }),
        map(()=>this.products[this.foundIndex]),
        catchError(this.errorHandler)
        );
  
     }

     updateProduct(product:IProduct):Observable<IProduct>{
      const headers= new HttpHeaders({'Content-Type':'application/json'});
      const url= `${this.url}/${product.id}`;
  
      //put http method
      return this.http.put<IProduct>(url,product, {headers}).pipe(
  
        tap(()=>{console.log('update product'+product.id);
        const foundIndex =this.products.findIndex(item=>item.id === product.id);
        
        }),
        map(()=>product),
        catchError(this.errorHandler)
        );
    
    
    
     }
  
  
  
  

  //errorhandler which returns the Observable with errorMessage
  errorHandler=(err:any)=>{

   let errorMessage:string;
   //a client side error or network error then ErrorEvent object will be thrown

   if(err.error instanceof ErrorEvent)
     {

       errorMessage = `An error has occured ${err.error.message}`
     }
     else{

      errorMessage =  `Backend error code ${err.status} ${err.body.error}`;

     }
     console.log(err);
     return throwError(errorMessage);


  }


  

}
