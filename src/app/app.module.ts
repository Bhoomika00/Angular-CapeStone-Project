import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './user/login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './materialModule/material.module';
import { ContactUsComponent } from './contactUs/contact-us.component';
import { InMemoryEventDbService } from './shared/in-memory-event-db-service.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';



    

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
   
    AboutUsComponent,
    CartComponent,
    LoginComponent,
    ContactUsComponent,
    CheckoutComponent,
    PageNotFoundComponent
    

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryEventDbService),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([AppEffects]),

    //All matt Module
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
