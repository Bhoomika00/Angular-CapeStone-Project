import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/products/product.state';
import * as ProductActions from '../../state/products/product.action'

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  href!:string;

  constructor(private store:Store<State>,private router:Router){}

  ngOnInit(): void {
    this.href=this.router.url;
    console.log(this.href);
  }

  addnewproduct(){
    console.log('in new product');
     //using ngrx
    this.store.dispatch(ProductActions.initializeCurrentProduct());
    this.router.navigate([this.href,'addProduct'])
      
  }

}
