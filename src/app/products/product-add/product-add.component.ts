import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
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




  displayMessage: { [key: string]: string } = {};
  private validationMessages!: { [key: string]: { [key: string]: string } };

  private genericValidator!: GenericValidator;

  constructor(private store: Store<State>, private fb: FormBuilder, private router: Router, private productService: ProductService) {

    this.validationMessages = {

      name: {
        required: 'Product name is required ',
        minLength: 'Product name must have 3 characters',
        maxLength: 'Product name must have less than  equal to 10 chars'
      },
      category: {
        required: 'Category is required'
      },
      price: {
        required: 'Price is required'
      }, image: {
        required: 'Image is required'
      }, rating: {
        required: 'Rating is required'
      },


    };
    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {
    this.addProduct = this.fb.group({
      id: [],
      name: ['Abc', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      description: ['some information', [Validators.required]],
      brand: [0, [Validators.required]],
      category: ['', [Validators.required]],
      imageurl: ['', Validators.required],
      price: [0, [Validators.required]],
      qty: [0, [Validators.required]],
      rating: [0, [Validators.required]]
    });

    this.product$ = this.store.select(getCurrentProduct)
      .pipe(
        tap(currentProduct => this.displayProduct(currentProduct))
      );
    this.product$.subscribe(resp => this.product = resp);
    console.log('selected current product in ng onit add product ', this.product);

    // Watch for value changes for validation
    this.addProduct.valueChanges.subscribe(
      () => this.displayMessage =
        this.genericValidator.processMessages(this.addProduct)
    );
    console.log('value in form changes')



    this.addProduct.valueChanges.
      subscribe(() => this.displayMessage = this.genericValidator.processMessages(this.addProduct))


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


  //validating on blur ,if user tabs out through the form fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.addProduct);

  }



}








