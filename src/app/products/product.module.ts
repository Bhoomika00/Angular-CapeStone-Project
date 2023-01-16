import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from '../state/products/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '../state/products/product.effects';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../materialModule/material.module';
import { RatingComponent } from '../shared/rating/rating.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [ProductListComponent,RatingComponent, ProductDetailComponent, ProductAddComponent],
  imports: [
    
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    
    
    HttpClientModule,
    MaterialModule,
    ProductRoutingModule,
   
    StoreModule.forFeature('products',productReducer),
    EffectsModule.forFeature(ProductEffects)
    
  ]
})
export class ProductModule { }
