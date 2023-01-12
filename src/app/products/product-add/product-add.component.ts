import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProduct!:FormGroup;
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.addProduct=this.fb.group({
      id:[],
      name: ['Abc',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      description: ['some information',[Validators.required]],
      brand: [0,[Validators.required]],
      category:['',[Validators.required]],
      imageurl: ['',Validators.required],
      price:[0,[Validators.required]],
      qty:[0,[Validators.required]]
    });
  }


  

}
