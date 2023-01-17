import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/materialModule/material.module';


import { ProductAddComponent } from './product-add.component';

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddComponent],
      imports:[StoreModule.forRoot({}),MaterialModule,
    FormsModule,ReactiveFormsModule,
    HttpClientTestingModule,
  BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.product={
      id: 504,
      name:"OnePlus Nord 5G ",
      
      category:"Electronics",
      price: 10000,
      rating: 4.5,
      imageurl:"../../assets/images/mobile.jpg",
      brand:"One Plus",
      description:"This is New model of One plus. 12gb RAM and 6gb ROM",
      qty: 0  
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the page title',()=>{
    const ip=fixture.debugElement.query(By.css('.pageTitle'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.textContent).toContain('Edit Product');

  });

  it('should check the input attributes of Name ',()=>{
    const ip=fixture.debugElement.query(By.css('#name'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('name');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('name');
  });

  it('should check the input attributes of Brand ',()=>{
    const ip=fixture.debugElement.query(By.css('#brand'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('brand');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('brand');
  });

  it('should check the input attributes of Category ',()=>{
    const ip=fixture.debugElement.query(By.css('#category'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('category');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('category');
  });

  it('should check the input attributes of Description ',()=>{
    const ip=fixture.debugElement.query(By.css('#description'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('description');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('description');
  });

  it('should check the input attributes of Price ',()=>{
    const ip=fixture.debugElement.query(By.css('#price'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('number');
    expect(ip.nativeElement.getAttribute('name')).toEqual('price');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('price');
  });

  it('should check the input attributes of rating ',()=>{
    const ip=fixture.debugElement.query(By.css('#rating'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('number');
    expect(ip.nativeElement.getAttribute('name')).toEqual('rating');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('rating');
  });

  it('should check the input attributes of ImageURL ',()=>{
    const ip=fixture.debugElement.query(By.css('#imageurl'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('imageurl');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('imageurl');
  });

  it('should check the input attributes of Quantity ',()=>{
    const ip=fixture.debugElement.query(By.css('#qty'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('number');
    expect(ip.nativeElement.getAttribute('name')).toEqual('qty');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('qty');
  });

  
  it('should check submit button is disabled if form is not valid',()=>{
    const ip=fixture.debugElement.query(By.css('#btn'));
    expect(ip).toBeTruthy();

    
    fixture.detectChanges();
    expect(ip.nativeElement.disabled).toBeTruthy();
  });
  









});

