import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';
import { AuthGuard } from '../user/auth-guard.service';
import { LoginComponent } from '../user/login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  
  
   /*{path:'adminHome',component:AdminHomeComponent,
   canActivate:[AuthGuard],
  children:[ {path:'addProduct',component:ProductAddComponent}]
}, */

{path:'addProduct',pathMatch:'full',
canActivate:[AuthGuard],component:ProductAddComponent},
{path:'login',component:LoginComponent},
{path:'checkout',pathMatch:'full',component:CheckoutComponent}




   //
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
