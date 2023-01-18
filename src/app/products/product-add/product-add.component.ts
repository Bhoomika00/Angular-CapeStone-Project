import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, reduce, tap } from 'rxjs';
import { GenericValidator } from 'src/app/shared/genericvalidator';
import { getCurrentProduct } from 'src/app/state/products/product.selector';
import { State } from 'src/app/state/products/product.state';
import { IProduct } from '../product';
import * as ProductActions from '../../state/products/product.action'
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProduct!: FormGroup;
  product$!: Observable<IProduct | null | undefined>;
  product!: IProduct | null | undefined;

  pageTitle = 'Edit Product';
  errorMessage = '';
  buttonName:string='Save Entry';




 
  constructor(private store: Store<State>, private fb: FormBuilder, 
    private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.addProduct = this.fb.group({
      id: [],
      name: ['Abc', [Validators.required, 
        Validators.minLength(2)]],
      description: ['some information', [Validators.required,Validators.minLength(4),
        Validators.maxLength(200)]],
      brand: ['', [Validators.required,Validators.minLength(2)]],
      category: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      price: [1, [Validators.required,Validators.min(1)]],
      qty: [1, [Validators.required,Validators.min(1)]],
      rating: [1, [Validators.required,Validators.max(5),Validators.min(1)]]
      });


    this.product$ = this.store.select(getCurrentProduct)
      .pipe(
        tap(currentProduct => this.displayProduct(currentProduct))
      );
    this.product$.subscribe(resp => this.product = resp);
    console.log('selected current product in ng onit add product ', this.product);

    // Watch for value changes for validation
    console.log('value in form changes')



   

  }


  displayProduct(productParam: IProduct | null | undefined): void {

    this.product = productParam;
    if (this.product) {
      //reset the form to its original
      this.addProduct.reset();

      if (this.product.id == 0) {
        this.pageTitle = 'Add Product';
      }
      else {

        this.pageTitle = `Edit Product: ${this.product.name}`;

      }
      //update the data on the form
      this.addProduct.patchValue({
        id: this.product.id,
        name: this.product.name,
        imageurl: this.product.imageurl,
        rating: this.product.rating,
        price: this.product.price,
        category: this.product.category,
        qty: this.product.qty,
        brand: this.product.brand,
        description: this.product.description,
      })

    }

  }


  saveProduct(originalProduct: IProduct): void {
    console.log('in save product');
    if (this.addProduct.valid) {
      if (this.addProduct.dirty) {
        console.log('inside save  product if condition');
        const product = { ...originalProduct, ...this.addProduct.value };

        if (product.id === 0) {
          this.store.dispatch(ProductActions.createProduct({ product })); //using ngrx
        }

        else {
          console.log('in update product in saveProduct')
          this.store.dispatch(ProductActions.updateProduct({ product }));  //using ngrx
        }
      }
    }
    this.router.navigate(['products'])
  }


  
  

  deleteEntry(a:IProduct):void{
    /* this.buttonName='Delete entry';
    var ele=document.getElementById('btn'); 
    if(ele)  ele.style.backgroundColor="red";*/
    if(a && a.id){

      if(confirm(`Are you sure you want to delete ${a.name} details`)){
                this.store.dispatch(ProductActions.deleteProduct({ productId: a.id }));  
      }
      else{
                this.store.dispatch(ProductActions.clearCurrentProduct()); 
      }
    }

  }

  public myError = (controlName: string, errorName: string) =>{
    return this.addProduct.controls[controlName].hasError(errorName);
    }





}








