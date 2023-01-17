import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/products/product.state';
import { IProduct } from '../product';
import * as ProductActions from '../../state/products/product.action'
import { getCurrentProduct, getError, getProducts } from 'src/app/state/products/product.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:IProduct[]=[];
  href!:string;

  products$!:Observable<IProduct[]>;
  selectedProduct$!:Observable<any>;
  errorMessage$!: Observable<string>;

  constructor(private store:Store<State>,private router:Router){}

  ngOnInit(): void {
    this.href=this.router.url;
    console.log(this.href);

    this.products$ = this.store.select(getProducts);
       this.products$.subscribe(resp=>this.productList=resp);
       
       this.errorMessage$ = this.store.select(getError);
   
       this.store.dispatch(ProductActions.loadProducts());
   
       
       this.selectedProduct$ = this.store.select(getCurrentProduct);
   
  }

  
  
  
  productSelected(product:IProduct):void{
        this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}));
       }

      
         //document.getElementById('admin')?.hidden;
         addnewproduct(){
          console.log('in new product');
           //using ngrx
          this.store.dispatch(ProductActions.initializeCurrentProduct());
          this.router.navigate([this.href,'addProduct'])
            
        }
      
        
  

}
