import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contactUs/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AuthGuard } from './user/auth-guard.service';
import { AdminHomeComponent } from './products/admin-home/admin-home.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
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
  loadChildren:()=>import('../app/products/product.module').then((m)=>m.ProductModule),
},
{path:'products/:id',component:ProductDetailComponent},
{path:'adminHome',component:AdminHomeComponent,pathMatch:'full'},
{path:'checkout',component:CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
