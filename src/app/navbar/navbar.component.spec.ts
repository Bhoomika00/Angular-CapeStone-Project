import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import {Location} from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { MaterialModule } from '../materialModule/material.module';
import { LoginComponent } from '../user/login/login.component';
import { CartComponent } from '../cart/cart.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ContactUsComponent } from '../contactUs/contact-us.component';
//import { AdminHomeComponent } from '../products/admin-home/admin-home.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductModule } from '../products/product.module';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '../app.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location: Location;
  let router: Router;
  //let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent,ProductListComponent,ProductDetailComponent,
        CartComponent,ContactUsComponent,CheckoutComponent,LoginComponent,
      HomeComponent],
      imports:[HttpClientTestingModule,MaterialModule,
      FormsModule,ReactiveFormsModule,ProductModule,StoreModule.forRoot({}),
      EffectsModule.forRoot([AppEffects]),BrowserAnimationsModule,
      RouterTestingModule.withRoutes([
        {path:'',pathMatch:'full',redirectTo:'home'},
        {path:'home',component:HomeComponent},
        {path:'about-us',component:AboutUsComponent},
  {path:'cart',
  component:CartComponent,
  
//canActivate:[AuthGuard]
}  ,
  {path:'login',component:LoginComponent},
  {path:'contact-us',component:ContactUsComponent},//this will be module
  {path:'products',
  
  component:ProductListComponent,
  loadChildren:()=>import('../products/product.module').then((m)=>m.ProductModule),
},
{path:'products/:id',component:ProductDetailComponent},

{path:'checkout',component:CheckoutComponent}
      ])
    ]
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  //test for home navigation
  it(`navigate to "" redirects  to /home`, fakeAsync(() => {
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/home");
    });
  }));

  it(`navigate to  Home redirects  to /home`, fakeAsync(() => {
    router.navigate(["/home"]).then(() => {
      expect(location.path()).toBe("/home");
    });
  }));

  it(`navigate to About us redirects to /about-us`, fakeAsync(() => {
    router.navigate(["/about-us"]).then(() => {
      expect(location.path()).toBe("/about-us");
    });
  }));

  it(`navigate to Cart-icon redirects to /cart`, fakeAsync(() => {
    router.navigate(["/cart"]).then(() => {
      expect(location.path()).toBe("/cart");
    });
  }));

  it(`navigate to Login redirects you to /login`, fakeAsync(() => {
    router.navigate(["/login"]).then(() => {
      expect(location.path()).toBe("/login");
    });
  }));

  it(`navigate to Contact Us redirects you to /contact-us`, fakeAsync(() => {
    router.navigate(["/contact-us"]).then(() => {
      expect(location.path()).toBe("/contact-us");
    });
  }));

  it(`navigate to Products redirects you to /products`, fakeAsync(() => {
    router.navigate(["/products"]).then(() => {
      expect(location.path()).toBe("/products");
    });
  }));

  it(`navigate to Checkout redirects you to /checkout`, fakeAsync(() => {
    router.navigate(["/checkout"]).then(() => {
      expect(location.path()).toBe("/checkout");
    });
  }));









});
