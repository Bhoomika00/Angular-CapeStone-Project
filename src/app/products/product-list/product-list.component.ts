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

  deleteEntry(a:IProduct):void{
    if(a && a.id){

      if(confirm(`Are you sure you want to delete ${a.name} details`)){
                this.store.dispatch(ProductActions.deleteProduct({ productId: a.id }));  
      }
      else{
                this.store.dispatch(ProductActions.clearCurrentProduct()); 
      }
    }

  }

}
