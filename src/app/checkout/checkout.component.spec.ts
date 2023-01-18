import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../materialModule/material.module';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports:[FormsModule,ReactiveFormsModule,MaterialModule,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should check the input attributes of Name ',()=>{
    const ip=fixture.debugElement.query(By.css('#name'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('name');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('name');
  });

  it('should check the input attributes of Card holder Name ',()=>{
    const ip=fixture.debugElement.query(By.css('#cname'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('cname');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('cname');
  });

  it('should check the input attributes of Address ',()=>{
    const ip=fixture.debugElement.query(By.css('#addr'));
    expect(ip).toBeTruthy();

    
    expect(ip.nativeElement.getAttribute('name')).toEqual('addr');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('addr');
  });

  it('should check the input attributes of card Number ',()=>{
    const ip=fixture.debugElement.query(By.css('#cnum'));
    expect(ip).toBeTruthy();

    
    expect(ip.nativeElement.getAttribute('name')).toEqual('cnum');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('cnum');
  });

  

  it('should check button is disabled if form is not valid',()=>{
    const ip=fixture.debugElement.query(By.css('#btn'));
    expect(ip).toBeTruthy();

    
    fixture.detectChanges();
    expect(ip.nativeElement.disabled).toBeTruthy();
  });
  
});
